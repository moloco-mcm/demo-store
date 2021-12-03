import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { IncomingMessage } from 'http';
import * as Sentry from '@sentry/nextjs';

import { getFirebaseAdminApp } from '../firebase-admin';

export type Session = {
  user: {
    id: string;
    email?: string;
  };
};

export const sessionResolver = async (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
): Promise<Session | undefined> => {
  const { session: sessionCookie } = req.cookies;

  if (sessionCookie) {
    try {
      const decodedIdToken = await getFirebaseAdminApp()
        .auth()
        .verifySessionCookie(sessionCookie);

      const user = {
        id: decodedIdToken.uid,
        email: decodedIdToken.email,
      };

      Sentry.setUser(user);

      return {
        user,
      };
    } catch (e) {
      return undefined;
    }
  }

  return undefined;
};
