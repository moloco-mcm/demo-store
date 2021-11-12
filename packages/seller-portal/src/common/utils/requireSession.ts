import type { GetServerSideProps } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { IncomingMessage } from 'http';

import { getFirebaseAdminApp } from '../firebase-admin';

export type Session = {
  user: {
    id: string;
    email: string;
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
        email: decodedIdToken.email || '',
      };

      return {
        user,
      };
    } catch (e) {
      return undefined;
    }
  }

  return undefined;
};

export const requireSession = <P = { [key: string]: unknown }>(
  gssp: (
    context: Parameters<GetServerSideProps<P>>[0],
    session: Session
  ) => ReturnType<GetServerSideProps<P>>
) => {
  const wrappedGssp: GetServerSideProps<P> = async (context) => {
    const { req, locale } = context;

    const session = await sessionResolver(req);

    if (!session) {
      return {
        redirect: {
          destination: `/${locale}/signin`,
          permanent: true,
        },
      };
    }

    return gssp(context, session);
  };

  return wrappedGssp;
};
