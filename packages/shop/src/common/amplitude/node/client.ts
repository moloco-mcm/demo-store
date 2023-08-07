import * as amplitude from '@amplitude/analytics-node';
import * as Sentry from '@sentry/nextjs';
import { asyncTryCatch, isAsyncTryCatchError } from '../../utils';

const AMPLITUDE_API_KEY = process.env.AMPLITUDE_API_KEY;

let isInitialized = false;
const instance = amplitude.createInstance();

export const track = async (...params: Parameters<typeof amplitude.track>) => {
  if (!AMPLITUDE_API_KEY) return;

  if (!isInitialized) {
    await instance.init(AMPLITUDE_API_KEY, {
      logLevel:
        process.env.NODE_ENV === 'production'
          ? amplitude.Types.LogLevel.Error
          : amplitude.Types.LogLevel.Debug,
    }).promise;
    isInitialized = true;
  }

  const result = await asyncTryCatch(() => instance.track(...params).promise);

  if (isAsyncTryCatchError(result)) {
    const error = result[1];
    Sentry.captureException(error);
    return;
  }
};
