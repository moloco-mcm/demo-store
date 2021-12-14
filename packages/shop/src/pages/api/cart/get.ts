import type { NextApiHandler } from 'next';

import { asyncTryCatch, isAsyncTryCatchError } from '../../../common/utils';
import { getFirebaseAdminApp } from '../../../common/firebase-admin';
import { sessionResolver } from '../../../common/api-utils';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiStandardErrorCode,
  ApiSuccessResponse,
} from '../../../common/types/api-response';
import { Cart } from '../../../common/types';
import {
  expandCartItems,
  isValidCartDocData,
} from '../../../common/api-utils/cart';

export type GetCartApiSuccessResponse = ApiSuccessResponse<Cart>;
export type GetCartApiErrorResponse = ApiErrorResponse<ApiStandardErrorCode>;
export type GetCartApiResponse = ApiResponse<Cart>;

const getHandler: NextApiHandler<GetCartApiResponse> = async (req, res) => {
  const session = await sessionResolver(req);
  if (!session) {
    return res
      .status(403)
      .json({ code: 'FORBIDDEN', message: 'Not authorized' });
  }

  const firestore = getFirebaseAdminApp().firestore();

  const fetchCartDocResult = await asyncTryCatch(() =>
    firestore.collection('cart').doc(session.user.id).get()
  );

  if (isAsyncTryCatchError(fetchCartDocResult)) {
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch data',
    });
  }

  const [cartDoc] = fetchCartDocResult;

  const cartDocData = cartDoc.data();

  // return empty cart if cart doc does not exist yet
  if (!cartDoc.exists || !cartDocData) {
    return res.status(200).json({
      items: [],
    });
  }

  if (!isValidCartDocData(cartDocData)) {
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Invalid cart data',
    });
  }

  const expandCartItemsResult = await asyncTryCatch(() =>
    expandCartItems(cartDocData.items)
  );

  if (isAsyncTryCatchError(expandCartItemsResult)) {
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch products',
    });
  }

  const [items] = expandCartItemsResult;

  return res.status(200).json({ items });
};

export default getHandler;
