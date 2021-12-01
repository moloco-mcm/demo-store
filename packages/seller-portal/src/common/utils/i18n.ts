import Cookies from 'js-cookie';

// set cookie to persist language config
// ref: https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
export const persistLanguageSetting = (language: string) =>
  Cookies.set('NEXT_LOCALE', language);
