import type { NextApiHandler } from 'next';

import { track } from '../../../../common/user-event-tracker';
import {
  extractDeviceInfoFromRequest,
  sessionResolver,
} from '../../../../common/api-utils';
import {
  expandCartItems,
  fetchCartDoc,
  isValidCartDocData,
} from '../../../../common/api-utils/cart';
import { apiStandardError } from '../../../../common/api-utils/error';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiStandardErrorCode,
  ApiSuccessResponse,
  Cart,
} from '../../../../common/types';
import {
  asyncTryCatch,
  isAsyncTryCatchError,
  yup,
} from '../../../../common/utils';

export type AddCartItemApiRequestBody = {
  item: {
    productId: string;
    quantity: number;
  };
};

export type AddCartItemApiSuccessResponse = ApiSuccessResponse<Cart>;
export type AddCartItemApiErrorResponse =
  ApiErrorResponse<ApiStandardErrorCode>;
export type AddCartItemApiResponse = ApiResponse<Cart>;

export const ADD_CART_ITEM_REQUEST_BODY_SCHEMA = yup.object().shape({
  item: yup
    .object()
    .shape({
      productId: yup.string().required(),
      quantity: yup.number().required().positive().integer(),
    })
    .required(),
});

export const isValidAddCartItemRequestBody = (
  data: any
): data is AddCartItemApiRequestBody =>
  ADD_CART_ITEM_REQUEST_BODY_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

export const postHandler: NextApiHandler<AddCartItemApiResponse> = async (
  req,
  res
) => {
  const session = await sessionResolver(req);
  if (!session) {
    return res.status(403).json(apiStandardError('FORBIDDEN'));
  }

  const { body } = req;
  const isRequestBodyValid = isValidAddCartItemRequestBody(body);

  if (!isRequestBodyValid) {
    return res.status(400).json(apiStandardError('BAD_REQUEST'));
  }

  const fetchCartDocResult = await asyncTryCatch(() =>
    fetchCartDoc(session.user.id)
  );

  if (isAsyncTryCatchError(fetchCartDocResult)) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to fetch data',
      })
    );
  }

  const [cartDoc] = fetchCartDocResult;

  const cartDocData = cartDoc.data();
  const existingItems =
    (isValidCartDocData(cartDocData) && cartDocData.items) || [];

  let isExists = false;

  const newItems = existingItems.map((item) => {
    if (item.productId === body.item.productId) {
      isExists = true;
      return {
        productId: item.productId,
        quantity: item.quantity + body.item.quantity,
      };
    }
    return item;
  });

  if (!isExists) {
    newItems.push({
      productId: body.item.productId,
      quantity: body.item.quantity,
    });
  }

  const setCartDocResult = await asyncTryCatch(() =>
    cartDoc.ref.set(
      {
        items: newItems,
      },
      { merge: true }
    )
  );

  if (isAsyncTryCatchError(setCartDocResult)) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to update data',
      })
    );
  }

  const expandCartItemsResult = await asyncTryCatch(() =>
    expandCartItems(newItems)
  );

  if (isAsyncTryCatchError(expandCartItemsResult)) {
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch products',
    });
  }

  const [items] = expandCartItemsResult;

  // send user event
  const newlyAddedProduct = items.find(
    (item) => item.product.id == body.item.productId
  );

  newlyAddedProduct &&
    track({
      event: {
        eventType: 'ADD_TO_CART',
        items: [
          {
            id: body.item.productId,
            price:
              newlyAddedProduct.product.salePrice ||
              newlyAddedProduct.product.price,
            quantity: body.item.quantity,
          },
        ],
      },
      req,
      res,
    });

  return res.status(200).json({ items });
};

export default postHandler;
