import Color from 'tinycolor2';
import { ColorHue, ColorKey, ColorNameWithHue } from '../theme/types';
import { color } from './get';
import { DefaultStyledProps } from './types';

/**
 * Make a theme color transparent
 * @param colorKey the name of the theme color to transparentize
 * @param alpha the alpha value to apply (0-1)
 */
export const transparentize =
  <P extends DefaultStyledProps>(
    colorKey: ColorKey | [ColorNameWithHue, ColorHue],
    alpha: number
  ) =>
  (props: P): string => {
    const originalColor = color(colorKey)(props);
    return Color(originalColor).setAlpha(alpha).toRgbString();
  };

/**
 * Lighten a specified color
 * @param color - colorKey the name of the theme color to manipulate
 * @param amount - the amount to lighten (0-1)
 */
export const lighten =
  <P extends DefaultStyledProps>(
    colorKey: ColorKey | [ColorNameWithHue, ColorHue],
    alpha: number
  ) =>
  (props: P): string => {
    const originalColor = color(colorKey)(props);
    return Color(originalColor).lighten(alpha).toHexString();
  };

/**
 * Darken a specified color
 * @param color - colorKey the name of the theme color to manipulate
 * @param amount - the amount to lighten (0-1)
 */
export const darken =
  <P extends DefaultStyledProps>(
    colorKey: ColorKey | [ColorNameWithHue, ColorHue],
    alpha: number
  ) =>
  (props: P): string => {
    const originalColor = color(colorKey)(props);
    return Color(originalColor).darken(alpha).toHexString();
  };
