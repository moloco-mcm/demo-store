import { v1 } from '@moloco-rmp/event-api-client';
import { asyncTryCatch, isAsyncTryCatchError } from '../utils';
import * as Sentry from '@sentry/nextjs';

export const client = v1.createClient({
  baseURL: process.env.RMP_USER_EVENT_API_URL,
  apiKey: process.env.RMP_USER_EVENT_API_KEY || '',
  platformId: process.env.NEXT_PUBLIC_RMP_PLATFORM_ID || '',
});

export const insertEvent = async (
  ...params: Parameters<typeof client.events.insertEvent>
) => {
  const result = await asyncTryCatch(() =>
    client.events.insertEvent(...params)
  );

  if (isAsyncTryCatchError(result)) {
    const error = result[1];
    Sentry.captureException(error);
    return;
  }
};
