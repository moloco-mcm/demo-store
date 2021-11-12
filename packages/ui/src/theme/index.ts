import cloneDeep from 'lodash/cloneDeep';

import defaultTheme from './defaultTheme';
import { ColorMode, ThemeType } from './types';

export const createTheme = (options?: { mode?: ColorMode }): ThemeType => {
  const { mode = 'light ' } = options || {};

  return Object.assign(cloneDeep(defaultTheme), { mode });
};
