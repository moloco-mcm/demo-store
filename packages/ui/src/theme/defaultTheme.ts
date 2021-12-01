import foundations from './foundations';
import { ThemeType } from './types';

const theme: ThemeType = {
  mode: 'light',
  ...foundations,
};

export default theme;
