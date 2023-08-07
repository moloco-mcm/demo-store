import { nanoid } from 'nanoid';
import * as rmpEventApiClient from '../user-api-client';
import * as amplitudeClient from '../amplitude/node';
import type { IncomingMessage, ServerResponse } from 'http';
import { extractDeviceInfoFromRequest, sessionResolver } from '../api-utils';
import { browserIdResolver } from '../api-utils/browserId';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

type Event = {
  eventType:
    | 'SEARCH'
    | 'ITEM_PAGE_VIEW'
    | 'ADD_TO_CART'
    | 'PURCHASE'
    | 'ADD_TO_WISHLIST'
    | 'HOME'
    | 'LAND'
    | 'PAGE_VIEW';
  items?: {
    id: string;
    price: {
      currency: string;
      amount: number;
    };
    quantity: number;
  }[];
  revenue?: {
    currency: string;
    amount: number;
  };
  pageId?: string;
  searchQuery?: string;
  sessionId?: string;
};

export const track = async (params: {
  event: Event;
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
  res: ServerResponse;
}) => {
  const { event, req, res } = params;
  const { eventType, pageId, searchQuery, items, revenue } = event;
  const eventId = nanoid();
  const timestamp = Date.now();
  const channelType = 'SITE';

  const session = await sessionResolver(req);
  const browserId = browserIdResolver(req, res);
  const userId = session?.user.id || browserId;

  const device = extractDeviceInfoFromRequest(req);

  // Send to Amplitude
  amplitudeClient.track(
    eventType.toLowerCase(),
    {
      item_ids: items?.map((item) => item.id),
      item_currencies: items?.map((item) => item.price.currency),
      item_prices: items?.map((item) => item.price.amount),
      item_quantities: items?.map((item) => item.quantity),
      revenue_currency: revenue?.currency,
      revenue_price: revenue?.amount,
      search_query: searchQuery,
      page_id: pageId,
      // ip_address: device.ip,
      sent_at: new Date(timestamp).toISOString(),
    },
    {
      // platform: 'web', // channelType,
      user_id: userId,
      os_name: device.os,
      os_version: device.osVersion,
      device_model: device.model,
    }
  );

  // Send directly to RMP
  rmpEventApiClient.insertEvent({
    id: eventId,
    timestamp,
    channelType,
    userId,
    ...event,
  });
};
