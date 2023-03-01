import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

// ref: https://firebase.google.com/docs/auth/admin/manage-cookies#create_session_cookie
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'POST') return res.status(404).end();

  // delete cookies
  res.setHeader('Set-Cookie', [
    `session=deleted; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
    `userId=deleted; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
  ]);

  res.status(200).end();
};

export default withSentry(handler);

export const config = {
  api: {
    // ref: https://github.com/getsentry/sentry-javascript/issues/3852#issuecomment-918820923
    externalResolver: true,
  },
};
