import type { NextApiHandler } from 'next';
import { withSentry } from '@sentry/nextjs';

import deleteHandler from './delete';
import postHandler from './post';
import putHandler from './put';

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      return postHandler(req, res);
    case 'PUT':
      return putHandler(req, res);
    case 'DELETE':
      return deleteHandler(req, res);
    default:
      return res.status(404).end();
  }
};

export default withSentry(handler);

export const config = {
  api: {
    // ref: https://github.com/getsentry/sentry-javascript/issues/3852#issuecomment-918820923
    externalResolver: true,
  },
};
