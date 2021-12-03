import * as Sentry from '@sentry/nextjs';

import { asyncTryCatch, isAsyncTryCatchError } from './flow-control';

export const fireTrackingEvents = (trackingUrls: string[]) => {
  setTimeout(() => {
    trackingUrls.forEach(async (url) => {
      const result = await asyncTryCatch(() => fetch(url));

      if (isAsyncTryCatchError(result)) {
        const [, error] = result;
        Sentry.captureException(error);
        return;
      }
    });
  }, 0);
};
