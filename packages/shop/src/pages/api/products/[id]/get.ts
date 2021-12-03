import type { NextApiHandler } from 'next';
import { apiStandardError } from '../../../../common/api-utils/error';
import { translateProductDocToProduct } from '../../../../common/api-utils/products';
import { getFirebaseAdminApp } from '../../../../common/firebase-admin';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiStandardErrorCode,
  ApiSuccessResponse,
} from '../../../../common/types/api-response';
import { Product } from '../../../../common/types/product';
import { asyncTryCatch, isAsyncTryCatchError } from '../../../../common/utils';

export type GetProductApiSuccessResponse = ApiSuccessResponse<Product>;
export type GetProductApiErrorResponse = ApiErrorResponse<ApiStandardErrorCode>;
export type GetProductApiResponse = ApiResponse<Product>;

const getHandler: NextApiHandler<GetProductApiResponse> = async (req, res) => {
  const { query } = req;

  const { id: productId } = query;

  if (typeof productId !== 'string') {
    return res.status(400).json(apiStandardError('BAD_REQUEST'));
  }

  if (!productId) {
    return res.status(404).json(apiStandardError('NOT_FOUND'));
  }

  const firestore = getFirebaseAdminApp().firestore();
  const productFetchResult = await asyncTryCatch(() =>
    firestore.collection('products').doc(productId).get()
  );

  if (isAsyncTryCatchError(productFetchResult)) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to fetch product',
      })
    );
  }

  const [productDocSnapshots] = productFetchResult;

  const product = translateProductDocToProduct(productDocSnapshots);

  if (!product) {
    return res.status(404).json(apiStandardError('NOT_FOUND'));
  }

  return res.status(200).json(product);
};

export default getHandler;
