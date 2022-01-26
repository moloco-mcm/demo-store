import type { NextApiHandler } from 'next';

import { apiStandardError } from '../../../common/api-utils/error';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiStandardErrorCode,
  ApiSuccessResponse,
} from '../../../common/types/api-response';
import {
  asyncTryCatch,
  isAsyncTryCatchError,
  yup,
} from '../../../common/utils';
import { Product } from '../../../common/types/product';
import { getFirebaseAdminApp } from '../../../common/firebase-admin';
import { translateProductDocsToProducts } from '../../../common/api-utils/products';
import { loadSearchIndex } from './searchIndex';

export type SearchApiRequestBody = {
  searchWord: string;
  pageIndex?: number;
};

type ResponseBody = {
  products: Product[];
  hasNextPage: boolean;
};

export type SearchApiSuccessResponse = ApiSuccessResponse<ResponseBody>;
export type SearchApiErrorResponse = ApiErrorResponse<ApiStandardErrorCode>;
export type SearchApiResponse = ApiResponse<ResponseBody>;

const REQUEST_BODY_SCHEMA = yup.object().shape({
  searchWord: yup.string().required(),
});

const searchIndex = loadSearchIndex();

const isValidSearchRequestBody = (data: any): data is SearchApiRequestBody =>
  REQUEST_BODY_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

const postHandler: NextApiHandler<SearchApiResponse> = async (req, res) => {
  const { body } = req;
  const isRequestBodyValid = isValidSearchRequestBody(body);

  if (!isRequestBodyValid) {
    return res.status(400).json(apiStandardError('BAD_REQUEST'));
  }

  const { pageIndex, searchWord } = body;

  const firestore = getFirebaseAdminApp().firestore();

  const itemIds = searchIndex.search(searchWord, {
    limit: 20,
  });

  if (itemIds.length === 0) {
    return res.status(200).json({
      products: [],
      hasNextPage: false,
    });
  }

  const productDocRefs = itemIds.map((itemId) =>
    firestore.collection('products').doc(String(itemId))
  );

  const productFetchResult = await asyncTryCatch(() =>
    firestore.getAll(...productDocRefs)
  );

  if (isAsyncTryCatchError(productFetchResult)) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to fetch products',
      })
    );
  }

  const [productDocSnapshots] = productFetchResult;

  const products = translateProductDocsToProducts(productDocSnapshots);

  return res.status(200).json({
    products: products,
    // TODO: implement pagination
    hasNextPage: false,
  });
};

export default postHandler;
