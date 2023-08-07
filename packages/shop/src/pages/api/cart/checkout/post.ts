import type { NextApiHandler } from 'next';
import { nanoid } from 'nanoid';

import { track } from '../../../../common/user-event-tracker';
import { asyncTryCatch, isAsyncTryCatchError } from '../../../../common/utils';
import { getFirebaseAdminApp } from '../../../../common/firebase-admin';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiStandardErrorCode,
  ApiSuccessResponse,
} from '../../../../common/types';
import {
  extractDeviceInfoFromRequest,
  sessionResolver,
} from '../../../../common/api-utils';
import { apiStandardError } from '../../../../common/api-utils/error';
import {
  expandCartItems,
  fetchCartDoc,
  isValidCartDocData,
} from '../../../../common/api-utils/cart';

type ResponseBody = {
  orderId: string;
};

export type CheckoutApiRequestBody = void;
export type CheckoutApiSuccessResponse = ApiSuccessResponse<ResponseBody>;
export type CheckoutApiErrorResponse = ApiErrorResponse<ApiStandardErrorCode>;
export type CheckoutApiResponse = ApiResponse<ResponseBody>;

export const postHandler: NextApiHandler<CheckoutApiResponse> = async (
  req,
  res
) => {
  const session = await sessionResolver(req);
  if (!session) {
    return res.status(403).json(apiStandardError('FORBIDDEN'));
  }

  const userId = session.user.id;
  const firestore = getFirebaseAdminApp().firestore();

  const fetchCartDocResult = await asyncTryCatch(() => fetchCartDoc(userId));

  if (isAsyncTryCatchError(fetchCartDocResult)) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to fetch data',
      })
    );
  }

  const [cartDoc] = fetchCartDocResult;
  const cartDocData = cartDoc.data();
  const cartItems =
    (isValidCartDocData(cartDocData) && cartDocData.items) || [];

  if (cartItems.length === 0) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'No items in cart',
      })
    );
  }

  // fetch products
  const expandCartItemsResult = await asyncTryCatch(() =>
    expandCartItems(cartItems)
  );

  if (isAsyncTryCatchError(expandCartItemsResult)) {
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch products',
    });
  }

  const [items] = expandCartItemsResult;

  // create order
  const orderId = nanoid();
  const orderDocRef = firestore.collection('orders').doc(orderId);
  const createOrderResult = await asyncTryCatch(() =>
    orderDocRef.set({
      userId,
      items: items.map((item) => ({
        productId: item.product.id,
        price: item.product.salePrice || item.product.price,
        quantity: item.quantity,
      })),
      createdAt: Date.now(),
    })
  );

  if (isAsyncTryCatchError(createOrderResult)) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to create order',
      })
    );
  }

  // send user event
  track({
    event: {
      eventType: 'PURCHASE',
      items: items.map((item) => ({
        id: item.product.id,
        price: item.product.salePrice || item.product.price,
        quantity: item.quantity,
      })),
      revenue: {
        currency: items[0]?.product.price.currency,
        amount: items.reduce((acc, currentItem) => {
          return acc + currentItem.product.price.amount;
        }, 0),
      },
    },
    req,
    res,
  });

  // empty cart
  const result = await asyncTryCatch(() =>
    cartDoc.ref.set(
      {
        items: [],
      },
      { merge: true }
    )
  );

  if (isAsyncTryCatchError(result)) {
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to checkout',
    });
  }

  return res.status(200).json({
    orderId,
  });
};

export default postHandler;
