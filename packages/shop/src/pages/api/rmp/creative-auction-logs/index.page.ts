import type { NextApiHandler } from 'next';

import {
  asyncTryCatch,
  isAsyncTryCatchError,
  yup,
} from '../../../../common/utils';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
} from '../../../../common/types';
import { apiStandardError } from '../../../../common/api-utils/error';
import {
  fetchCreativeAuctionLogDocSnapshot,
  translateCreativeAuctionLogDocToCreativeAuctionLog,
} from '../../../../common/api-utils/creativeAuctionLog';
import { CreativeAuctionLog } from '../../../../common/types/creativeAuctionLog';

export type GetCreativeAuctionLogApiRequestQuery = {
  requestId: string;
};

type ResponseBody = {
  items: CreativeAuctionLog['response']['items'];
};

export type GetCreativeAuctionLogApiSuccessResponse =
  ApiSuccessResponse<ResponseBody>;
export type GetCreativeAuctionLogApiErrorResponse = ApiErrorResponse;
export type GetCreativeAuctionLogApiResponse = ApiResponse<ResponseBody>;

const REQUEST_BODY_SCHEMA = yup.object().shape({
  requestId: yup.string().required(),
});

export const isValidGetCreativeAuctionLogRequestQuery = (
  query: any
): query is GetCreativeAuctionLogApiRequestQuery =>
  REQUEST_BODY_SCHEMA.isValidSync(query, {
    strict: true,
    abortEarly: true,
  });

export const getHandler: NextApiHandler<GetCreativeAuctionLogApiResponse> =
  async (req, res) => {
    const { query } = req;
    const isRequestQueryValid = isValidGetCreativeAuctionLogRequestQuery(query);

    if (!isRequestQueryValid) {
      return res.status(400).json(apiStandardError('BAD_REQUEST'));
    }

    const { requestId } = query;

    const fetchLogResult = await asyncTryCatch(() =>
      fetchCreativeAuctionLogDocSnapshot(requestId)
    );

    if (isAsyncTryCatchError(fetchLogResult)) {
      const [, error] = fetchLogResult;
      return res.status(500).json(
        apiStandardError('INTERNAL_SERVER_ERROR', {
          message: error.message || 'Failed to read auction log',
        })
      );
    }

    const [docSnapshot] = fetchLogResult;

    const creativeAuctionLog =
      translateCreativeAuctionLogDocToCreativeAuctionLog(docSnapshot);

    if (!creativeAuctionLog) {
      return res.status(404).json(apiStandardError('NOT_FOUND'));
    }

    return res.status(200).json({
      items: creativeAuctionLog.response.items,
    });
  };

export default getHandler;
