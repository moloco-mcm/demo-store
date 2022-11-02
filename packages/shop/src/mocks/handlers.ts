import { rest } from 'msw';
import {
  CreativeAuctionHttpRequestBody,
  CreativeAuctionHttpResponseBody,
} from '@moloco-rmp/decision-api-client/dist/types/v1/creative-auction/types';

const MOCK_EVENT_TRACKING_URL = `${process.env.RMP_USER_EVENT_API_URL}/__mock__`;
const RMP_CREATIVE_AUCTION_API_URL = `${process.env.RMP_DECISION_API_URL}/rmp/decision/v1/platforms/:platformId/creative-auction`;

const mockTrackingUrl = (args: {
  type: 'imp' | 'click';
  creativeId?: string;
  itemId?: string;
}) => {
  const { type, creativeId, itemId } = args;
  const queryParams = new URLSearchParams();
  queryParams.append('type', type);

  if (creativeId) {
    queryParams.append('creativeId', creativeId);
  }

  if (itemId) {
    queryParams.append('itemId', itemId);
  }

  return `${MOCK_EVENT_TRACKING_URL}?${queryParams.toString()}`;
};

export const handlers = [
  rest.post<CreativeAuctionHttpRequestBody>(
    RMP_CREATIVE_AUCTION_API_URL,
    (req, res, ctx) => {
      const { request_id } = req.body;

      const creativeId = 'TEST_CREATIVE_ID';
      const itemCount = 7;

      return res(
        ctx.json<CreativeAuctionHttpResponseBody>({
          request_id: request_id,
          banner: {
            creative_id: 'TEST_CREATIVE_ID',
            image_url:
              'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1000_1080.png',
            imp_trackers: [mockTrackingUrl({ type: 'imp', creativeId })],
            click_trackers: [mockTrackingUrl({ type: 'click', creativeId })],
          },
          items: new Array(itemCount).fill(0).map((_, index) => {
            const itemId = Number(1000 + index).toString();

            return {
              item_id: itemId,
              imp_trackers: [mockTrackingUrl({ type: 'imp', itemId })],
              click_trackers: [mockTrackingUrl({ type: 'click', itemId })],
            };
          }),
        })
      );
    }
  ),
  rest.get(MOCK_EVENT_TRACKING_URL, (_req, res, ctx) => res(ctx.status(200))),
];
