import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { withSentry } from '@sentry/nextjs';

import { sessionResolver, yup } from '../../../common/utils';
import { createSignedRmpPortalUrl } from '../../../common/utils/rmp';

const REQUEST_BODY_SCHEMA = yup.object().shape({
  colorMode: yup.mixed().oneOf(['light', 'dark', 'useDeviceSetting']),
  language: yup.mixed().oneOf(['en', 'ko']),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'POST') return res.status(404).end();

  const session = await sessionResolver(req);

  if (!session) {
    return res.status(403).end();
  }

  const isValidRequest = REQUEST_BODY_SCHEMA.isValidSync(req.body);

  if (!isValidRequest) {
    return res.status(400).end();
  }

  const adAccountId = '1329'; // TODO: replace ad account id after updating demo product catalog (@sjhan-moloco)
  const adAccountTitle = 'Test Ad Account';
  const email = session.user.email;
  const externalUserId = session.user.id;
  const name = session.user.email;
  const nonce = nanoid();
  const path = `/embed/sponsored-ads/cm/a/${adAccountId}`;
  const role = 'AD_ACCOUNT_OWNER';
  const platformId = process.env.NEXT_PUBLIC_RMP_PLATFORM_ID || '';
  const secret = process.env.RMP_SSO_SECRET || '';
  const colorMode = req.body.colorMode;
  const language = req.body.language;

  const rmpPortalUrl = createSignedRmpPortalUrl({
    baseUrl: process.env.NEXT_PUBLIC_RMP_PORTAL_URL || '',
    adAccountId,
    adAccountTitle,
    email,
    name,
    nonce,
    path,
    role,
    externalUserId,
    platformId,
    secret,
    version: '1.0.0',
    colorMode,
    language,
  });

  return res.status(200).json({
    signedUrl: rmpPortalUrl,
  });
};

export default withSentry(handler);

export const config = {
  api: {
    // ref: https://github.com/getsentry/sentry-javascript/issues/3852#issuecomment-918820923
    externalResolver: true,
  },
};
