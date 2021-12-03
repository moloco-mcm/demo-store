import type { NextApiHandler } from 'next';

import { sessionResolver } from '../../../../common/api-utils';
import {
  expandCartItems,
  fetchCartDoc,
  isValidCartDocData,
} from '../../../../common/api-utils/cart';
import { apiStandardError } from '../../../../common/api-utils/error';
import { translateProductDocsToProducts } from '../../../../common/api-utils/products';
import { getFirebaseAdminApp } from '../../../../common/firebase-admin';
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

export type DeleteCartItemApiRequestBody = {
  productId: string;
};

export type DeleteCartItemApiSuccessResponse = ApiSuccessResponse<Cart>;
export type DeleteCartItemApiErrorResponse =
  ApiErrorResponse<ApiStandardErrorCode>;
export type DeleteCartItemApiResponse = ApiResponse<Cart>;

const DELETE_CART_ITEM_REQUEST_BODY_SCHEMA = yup.object().shape({
  productId: yup.string().required(),
});

export const isValidDeleteCartItemRequestBody = (
  data: any
): data is DeleteCartItemApiRequestBody =>
  DELETE_CART_ITEM_REQUEST_BODY_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

export const deleteHandler: NextApiHandler<DeleteCartItemApiResponse> = async (
  req,
  res
) => {
  const session = await sessionResolver(req);
  if (!session) {
    return res.status(403).json(apiStandardError('FORBIDDEN'));
  }

  const { body } = req;
  const isRequestBodyValid = isValidDeleteCartItemRequestBody(body);

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

  const newItems = existingItems.filter(
    (item) => item.productId !== body.productId
  );

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

  return res.status(200).json({ items });
};

export default deleteHandler;
