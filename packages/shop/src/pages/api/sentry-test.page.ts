import { withSentry } from '@sentry/nextjs';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (_req, _res) => {
  throw new Error('API throw error test');
};

export default withSentry(handler);

export const config = {
  api: {
    // ref: https://github.com/getsentry/sentry-javascript/issues/3852#issuecomment-918820923
    externalResolver: true,
  },
};
