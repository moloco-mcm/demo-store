import { InterpolationFunction } from 'styled-components';
import { DefaultStyledProps } from './types';

/**
 * Apply interpolation function based on the current theme mode
 * @param lightModeFn style interpolation function for the light mode
 * @param darkModeFn style interpolation function for the dark mode
 * @returns style interpolation function
 */
export const mode =
  <P extends DefaultStyledProps>(
    lightModeFn: InterpolationFunction<P>,
    darkModeFn: InterpolationFunction<P>
  ) =>
  (props: P) =>
    props.theme.mode === 'light' ? lightModeFn(props) : darkModeFn(props);
