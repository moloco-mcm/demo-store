import React from 'react';
import { keyframes } from 'styled-components/macro';

import { ColorKey, ColorNameWithHue } from '../theme/types';
import { color, mode } from '../theme-utils';

type SpinnerOptions = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: ColorKey;
  colorScheme?: ColorNameWithHue;
};

type SpinnerProps = { className?: string } & SpinnerOptions;

const rotateFrames = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const sizes = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (props, ref) => {
    const {
      size: sizeProp = 'md',
      color: colorProp,
      colorScheme = 'gray',
      ...rest
    } = props;

    return (
      <div
        {...rest}
        ref={ref}
        css={`
          display: inline-block;
          width: ${sizes[sizeProp]};
          height: ${sizes[sizeProp]};
          animation: ${rotateFrames} 0.45s linear infinite;
          border-width: 2px;
          border-radius: 9999px;
          border-color: ${colorProp
            ? color(colorProp)
            : mode(color([colorScheme, 400]), color([colorScheme, 200]))};
          border-right-color: ${color('transparent')};
          border-bottom-color: ${color('transparent')};
        `}
      />
    );
  }
);
