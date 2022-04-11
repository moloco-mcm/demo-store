import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { IncomingMessage, ServerResponse } from 'http';
import { nanoid } from 'nanoid';

const BROWSER_ID_EXPIRES_IN = 1000 * 60 * 60 * 24 * 365 * 10; // 10 yr

export const browserIdResolver = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  },
  res: ServerResponse
): string => {
  const { browserId } = req.cookies;

  if (browserId) {
    return browserId;
  }

  // set a new browserId
  const newBrowserId = nanoid();
  res.setHeader(
    'Set-Cookie',
    `browserId=${newBrowserId}; MaxAge=${new Date(
      Date.now() + BROWSER_ID_EXPIRES_IN
    ).toUTCString()}; Path=/; Secure; HttpOnly`
  );

  console.log('create browserId ', newBrowserId);
  return newBrowserId;
};
