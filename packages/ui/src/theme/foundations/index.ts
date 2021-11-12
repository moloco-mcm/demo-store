import { ThemeFoundationType } from '../types';

import breakpoints from './breakpoints';
import sizes from './sizes';
import typography from './typography';
import colors from './colors';
import radius from './radius';
import zIndices from './zIndices';
import shadows from './shadows';
import borders from './borders';
import space from './space';
import transitions from './transitions';

const foundations: ThemeFoundationType = {
  breakpoints,
  zIndices,
  radius,
  colors,
  ...typography,
  sizes,
  shadows,
  space,
  borders,
  transitions,
};

export default foundations;
