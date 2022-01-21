import enCommon from './en/common.json';
import koCommon from './ko/common.json';

import enSignIn from './en/signIn.json';
import koSignIn from './ko/signIn.json';

import enCart from './en/cart.json';
import koCart from './ko/cart.json';

import enHome from './en/home.json';
import koHome from './ko/home.json';

import enProductDetail from './en/productDetail.json';
import koProductDetail from './ko/productDetail.json';

import enAccount from './en/account.json';
import koAccount from './ko/account.json';

import enCheckoutComplete from './en/checkoutComplete.json';
import koCheckoutComplete from './ko/checkoutComplete.json';

import enSearch from './en/search.json';
import koSearch from './ko/search.json';

export const defaultNS = 'common';

export const resources = {
  en: {
    common: enCommon,
    signIn: enSignIn,
    cart: enCart,
    home: enHome,
    productDetail: enProductDetail,
    account: enAccount,
    checkoutComplete: enCheckoutComplete,
    search: enSearch,
  },
  ko: {
    common: koCommon,
    signIn: koSignIn,
    cart: koCart,
    home: koHome,
    productDetail: koProductDetail,
    account: koAccount,
    checkoutComplete: koCheckoutComplete,
    search: koSearch,
  },
} as const;

export default resources;
