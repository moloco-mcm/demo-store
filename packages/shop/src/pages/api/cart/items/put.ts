import type { NextApiHandler } from 'next';

import { sessionResolver } from '../../../../common/api-utils';
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
} from '../../../../common/types/api-response';
import { Cart } from '../../../../common/types/cart';
import {
  asyncTryCatch,
  isAsyncTryCatchError,
  yup,
} from '../../../../common/utils';
import {
  AddCartItemApiRequestBody,
  ADD_CART_ITEM_REQUEST_BODY_SCHEMA,
} from './post';

export type UpdateCartItemApiRequestBody = AddCartItemApiRequestBody;

export type UpdateCartItemSuccessApiResponse = ApiSuccessResponse<Cart>;
export type UpdateCartItemErrorApiResponse =
  ApiErrorResponse<ApiStandardErrorCode>;
export type UpdateCartItemApiResponse = ApiResponse<Cart>;

const UPDATE_CART_ITEM_REQUEST_BODY_SCHEMA = ADD_CART_ITEM_REQUEST_BODY_SCHEMA;

export const isValidUpdateCartItemRequestBody = (
  data: any
): data is UpdateCartItemApiRequestBody =>
  UPDATE_CART_ITEM_REQUEST_BODY_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

export const putHandler: NextApiHandler<UpdateCartItemApiResponse> = async (
  req,
  res
) => {
  const session = await sessionResolver(req);
  if (!session) {
    return res.status(403).json(apiStandardError('FORBIDDEN'));
  }

  const { body } = req;
  const isRequestBodyValid = isValidUpdateCartItemRequestBody(body);

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

  const newItems = existingItems.map((item) => {
    if (item.productId === body.item.productId) {
      return {
        productId: item.productId,
        quantity: body.item.quantity,
      };
    }
    return item;
  });

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

  // TODO: send RMP user event if needed (@sjhan-moloco)

  return res.status(200).json({ items });
};

export default putHandler;
