import get from 'lodash/get';

import {
  ColorKey,
  FontWeightKey,
  FontSizeKey,
  SpaceKey,
  ColorNameWithHue,
  ColorHue,
  ShadowKey,
  BorderKey,
  BreakpointKey,
  SizeKey,
  RadiusKey,
  TransitionDurationKey,
  TransitionPropertyKey,
  TransitionTimingFnKey,
  ZIndexKey,
  FontKey,
  LineHeightKey,
  ContainerSizeKey,
  LetterSpacingKey,
} from '../theme/types';
import { DefaultStyledProps } from './types';

export const font =
  <P extends DefaultStyledProps>(key: FontKey) =>
  (props: P) =>
    props.theme.fonts[key];

export const fontWeight =
  <P extends DefaultStyledProps>(key: FontWeightKey) =>
  (props: P) =>
    props.theme.fontWeights[key];

export const fontSize =
  <P extends DefaultStyledProps>(key: FontSizeKey) =>
  (props: P) =>
    props.theme.fontSizes[key];

export const color =
  <P extends DefaultStyledProps>(
    arg: ColorKey | [ColorNameWithHue, ColorHue]
  ) =>
  (props: P): string => {
    if (Array.isArray(arg)) {
      const [name, hue] = arg;
      return props.theme.colors[name][hue];
    }
    return get(props.theme.colors, arg);
  };

export const space =
  <P extends DefaultStyledProps>(key: SpaceKey) =>
  (props: P) =>
    props.theme.space[key];

export const size =
  <P extends DefaultStyledProps>(
    arg: SizeKey | ['container', ContainerSizeKey]
  ) =>
  (props: P): string => {
    if (Array.isArray(arg)) {
      const [key, subKey] = arg;
      return props.theme.sizes[key][subKey];
    }
    return get(props.theme.sizes, arg);
  };

export const radius =
  <P extends DefaultStyledProps>(key: RadiusKey) =>
  (props: P) =>
    props.theme.radius[key];

export const shadow =
  <P extends DefaultStyledProps>(key: ShadowKey) =>
  (props: P) =>
    props.theme.shadows[key];

export const border =
  <P extends DefaultStyledProps>(key: BorderKey) =>
  (props: P) =>
    props.theme.borders[key];

export const breakpoints =
  <P extends DefaultStyledProps>(key: BreakpointKey) =>
  (props: P) =>
    props.theme.breakpoints[key];

export const transitionDuration =
  <P extends DefaultStyledProps>(key: TransitionDurationKey) =>
  (props: P) =>
    props.theme.transitions.duration[key];

export const transitionProperty =
  <P extends DefaultStyledProps>(key: TransitionPropertyKey) =>
  (props: P) =>
    props.theme.transitions.property[key];

export const transitionTimingFn =
  <P extends DefaultStyledProps>(key: TransitionTimingFnKey) =>
  (props: P) =>
    props.theme.transitions.timingFn[key];

export const zIndex =
  <P extends DefaultStyledProps>(key: ZIndexKey) =>
  (props: P) =>
    props.theme.zIndices[key];

export const lineHeight =
  <P extends DefaultStyledProps>(key: LineHeightKey) =>
  (props: P) =>
    props.theme.lineHeights[key];

export const letterSpace =
  <P extends DefaultStyledProps>(key: LetterSpacingKey) =>
  (props: P) =>
    props.theme.letterSpacings[key];
