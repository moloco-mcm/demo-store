import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import { yup } from '../../common/utils';
import { getFirebaseAdminApp } from '../../common/firebase-admin';

// set session expiration to 5 days.
const SESSION_EXPIRES_IN = 60 * 60 * 24 * 5 * 1000;

const REQUEST_BODY_SCHEMA = yup.object().shape({
  idToken: yup.string().required(),
});

// ref: https://firebase.google.com/docs/auth/admin/manage-cookies#create_session_cookie
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'POST') return res.status(404).end();

  let idToken;
  try {
    const body = await REQUEST_BODY_SCHEMA.validate(req.body);
    idToken = body.idToken;
  } catch (error) {
    res.status(400).end();
    return;
  }

  try {
    const expiresIn = SESSION_EXPIRES_IN;
    const auth = getFirebaseAdminApp().auth();
    const { uid } = await auth.verifyIdToken(idToken);

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    const expires = new Date(Date.now() + expiresIn).toUTCString();

    res.setHeader('Set-Cookie', [
      `session=${sessionCookie}; Expires=${expires}; Path=/; Secure; HttpOnly`,
      `userId=${uid}; Expires=${expires}; Path=/; Secure;`, // not use HttpOnly, so client side javascript can access
    ]);

    res.status(200).end();
  } catch (error) {
    res.status(401).end();
    return;
  }
};

export default withSentry(handler);

export const config = {
  api: {
    // ref: https://github.com/getsentry/sentry-javascript/issues/3852#issuecomment-918820923
    externalResolver: true,
  },
};
