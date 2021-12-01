import { createHmac } from 'crypto';
import qs from 'query-string';

export const createSignedRmpPortalUrl = (params: {
  baseUrl: string;
  path: string;
  platformId: string;
  adAccountId?: string;
  adAccountTitle?: string;
  name: string;
  email: string;
  role?: string;
  externalUserId: string;
  nonce: string;
  secret: string;
  version: string;
  colorMode?: 'light' | 'dark' | 'useDeviceSetting';
  language?: 'en' | 'ko';
}): string => {
  const {
    baseUrl,
    path,
    platformId,
    adAccountId,
    adAccountTitle,
    name,
    email,
    role,
    externalUserId,
    nonce,
    secret,
    version,
    colorMode = 'light',
    language,
  } = params;

  // unix timestamp in seconds
  const timestamp = `${Math.floor(Date.now() / 1000)}`;

  // gather params in an alphabetical order
  const ssoParams = [
    adAccountId || '',
    adAccountTitle || '',
    email,
    externalUserId,
    name,
    nonce,
    path,
    platformId,
    role || '',
    timestamp,
    version,
  ];

  // concatenate the values with line break “\n”
  const concatenatedString = ssoParams.join('\n');

  // create a signature
  const signature = createHmac('sha256', secret)
    .update(concatenatedString)
    .digest('base64');

  // build url params
  const queryString = qs.stringify({
    ad_account_id: adAccountId,
    ad_account_title: adAccountTitle,
    email,
    external_user_id: externalUserId,
    name,
    nonce,
    path,
    platform_id: platformId,
    role,
    timestamp,
    version,
    signature,
    'config:color_mode': colorMode,
    'config:language': language,
  });

  return `${baseUrl}/sso?${queryString}`;
};
