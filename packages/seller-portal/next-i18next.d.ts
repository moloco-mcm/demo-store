import 'next-i18next';
import common from './src/assets/i18n/en/common.json';
import signIn from './src/assets/i18n/en/signIn.json';
import sideBar from './src/assets/i18n/en/sideBar.json';
import home from './src/assets/i18n/en/home.json';

const resources = {
  common,
  signIn,
  sideBar,
  home,
} as const;

type ResourcesType = typeof resources;
declare module 'next-i18next' {
  type DefaultNamespace = 'common';
  interface Resources extends ResourcesType {}
}
