import type { NextApiHandler } from 'next';
import { nanoid } from 'nanoid';

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
} from '../../../../common/types';
import {
  extractDeviceInfoFromRequest,
  sessionResolver,
} from '../../../../common/api-utils';
import { apiStandardError } from '../../../../common/api-utils/error';
import { browserIdResolver } from '../../../../common/api-utils/browserId';
import { BannerAd } from '../../../../common/types/bannerAd';

const CREATIVE_AUCTION_LOG_RETENTION_PERIOD = 3 * 24 * 60 * 60 * 1000; // 3 days

export type GetBannerAdApiRequestBody = {
  inventory: {
    inventoryId: string;
    items?: string[];
    categories?: string[];
    searchQuery?: string;
  };
};

type ResponseBody = {
  bannerAd?: BannerAd;
};

export type GetBannerAdApiSuccessResponse = ApiSuccessResponse<ResponseBody>;
export type GetBannerAdApiErrorResponse = ApiErrorResponse;
export type GetBannerAdApiResponse = ApiResponse<ResponseBody>;

const REQUEST_BODY_SCHEMA = yup.object().shape({
  inventory: yup
    .object()
    .shape({
      inventoryId: yup.string().required(),
      items: yup.array().of(yup.string().required()),
      categories: yup.array().of(yup.string().required()),
      searchQuery: yup.string(),
    })
    .required(),
});

export const isValidGetBannerAdRequestBody = (
  data: any
): data is GetBannerAdApiRequestBody =>
  REQUEST_BODY_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

export const postHandler: NextApiHandler<GetBannerAdApiResponse> = async (
  req,
  res
) => {
  const { body } = req;
  const isRequestBodyValid = isValidGetBannerAdRequestBody(body);

  if (!isRequestBodyValid) {
    return res.status(400).json(apiStandardError('BAD_REQUEST'));
  }

  const session = await sessionResolver(req);
  const browserId = browserIdResolver(req, res);

  const requestId = nanoid();

  const decisionApiResult = await asyncTryCatch(() =>
    DecisionApiClient.creativeAuction({
      requestId,
      sessionId: browserId,
      inventory: {
        inventoryId: body.inventory.inventoryId,
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

  // return early if no ad has returned
  if (!response.banner || !response.items || response.items.length === 0) {
    return res.status(200).json({});
  }

  // store auction response to firestore
  const firestore = getFirebaseAdminApp().firestore();
  const logDocRef = firestore.collection('creativeAuctionLog').doc(requestId);
  const storeLogResult = await asyncTryCatch(() =>
    logDocRef.set({
      response,
      expireAt: new Date(Date.now() + CREATIVE_AUCTION_LOG_RETENTION_PERIOD),
    })
  );

  if (isAsyncTryCatchError(storeLogResult)) {
    const [, error] = storeLogResult;
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: error.message || 'Failed to create auction log',
      })
    );
  }

  return res.status(200).json({
    bannerAd: {
      requestId,
      imageUrl: response.banner.imageUrl,
      impTrackers: response.banner.impTrackers,
      clickTrackers: response.banner.clickTrackers,
    },
  });
};

export default postHandler;
