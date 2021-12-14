import type { NextApiHandler } from 'next';
import { nanoid } from 'nanoid';
import keyBy from 'lodash/keyBy';

import {
  asyncTryCatch,
  isAsyncTryCatchError,
  yup,
} from '../../../../common/utils';
import { getFirebaseAdminApp } from '../../../../common/firebase-admin';
import DecisionApiClient from '../../../../common/decision-api-client';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
  DecidedItem,
} from '../../../../common/types';
import {
  extractDeviceInfoFromRequest,
  sessionResolver,
} from '../../../../common/api-utils';
import { translateProductDocsToProducts } from '../../../../common/api-utils/products';
import { apiStandardError } from '../../../../common/api-utils/error';

export type GetSponsoredProductsApiRequestBody = {
  inventory: {
    type: string;
    inventoryId: string;
    numItems: number;
    items?: string[];
    categories?: string[];
    searchQuery?: string;
  };
};

type ResponseBody = {
  items: DecidedItem[];
};

export type GetSponsoredProductsApiSuccessResponse =
  ApiSuccessResponse<ResponseBody>;
export type GetSponsoredProductsApiErrorResponse = ApiErrorResponse;
export type GetSponsoredProductsApiResponse = ApiResponse<ResponseBody>;

const REQUEST_BODY_SCHEMA = yup.object().shape({
  inventory: yup.object().shape({
    type: yup.string().required(),
    inventoryId: yup.string().required(),
    numItems: yup.number().required().positive().integer(),
    items: yup.array().of(yup.string().required()),
    categories: yup.array().of(yup.string().required()),
    searchQuery: yup.string(),
  }),
});

export const isValidGetRecommendationRequestBody = (
  data: any
): data is GetSponsoredProductsApiRequestBody =>
  REQUEST_BODY_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

export const postHandler: NextApiHandler<
  GetSponsoredProductsApiResponse
> = async (req, res) => {
  const { body } = req;
  const isRequestBodyValid = isValidGetRecommendationRequestBody(body);

  if (!isRequestBodyValid) {
    return res.status(400).json(apiStandardError('BAD_REQUEST'));
  }

  const session = await sessionResolver(req);

  const decisionApiResult = await asyncTryCatch(() =>
    DecisionApiClient.auction({
      requestId: nanoid(),
      // TODO: pass real session id if user is not logged in
      sessionId: !session ? nanoid() : undefined,
      inventory: {
        type: body.inventory.type,
        inventoryId: body.inventory.inventoryId,
        numItems: body.inventory.numItems,
        items: body.inventory.items,
        categories: body.inventory.categories,
        searchQuery: body.inventory.searchQuery,
      },
      user: session?.user && {
        userId: session.user.id,
      },
      device: extractDeviceInfoFromRequest(req),
    })
  );

  if (isAsyncTryCatchError(decisionApiResult)) {
    const [, error] = decisionApiResult;
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: error.message || 'Failed to fetch auction result',
      })
    );
  }

  const [response] = decisionApiResult;

  // return early if no decided items
  if (response.decidedItems.length === 0) {
    return res.status(200).json({ items: [] });
  }

  // fetch products
  const firestore = getFirebaseAdminApp().firestore();

  const productDocRefs = response.decidedItems.map(({ itemId }) =>
    firestore.collection('products').doc(itemId)
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

  // build response
  const productIdToDecidedItemsMap = keyBy(
    response.decidedItems,
    (decidedItem) => decidedItem.itemId
  );

  const items = products.map((product) => {
    const decidedItem = productIdToDecidedItemsMap[product.id];
    return {
      product: product,
      impTrackers: decidedItem.impTrackers,
      clickTrackers: decidedItem.clickTrackers,
    };
  });

  return res.status(200).json({ items });
};

export default postHandler;
