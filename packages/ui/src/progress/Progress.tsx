import React from 'react';
import { keyframes, css } from 'styled-components/macro';

import { ColorNameWithHue } from '../theme/types';
import {
  color,
  mode,
  radius,
  transitionDuration,
  transitionProperty,
} from '../theme-utils';

type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
type ProgressOptions = {
  size?: ProgressSize;
  colorScheme?: ColorNameWithHue;
  isIndeterminate?: boolean;
  value?: number;
  className?: string;
};

const trackStyles = (options: { size: ProgressSize }) => {
  const trackHeights = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  };

  return css`
    border-radius: ${radius('sm')};
    background-color: ${mode(color('gray.100'), color('whiteAlpha.300'))};
    height: ${trackHeights[options.size]};
  `;
};

const progressKeyframe = keyframes`
  0% {
    left: -40%;
  }
  100% {
    left: 100%;
  }
`;

const barStyles = (options: {
  colorScheme: ColorNameWithHue;
  isIndeterminate: boolean;
}) => {
  const { isIndeterminate, colorScheme } = options;

  if (isIndeterminate) {
    return css`
      position: absolute;
      will-change: left;
      min-width: 50%;
      background-image: linear-gradient(
        to right,
        transparent 0%,
        ${mode(color([colorScheme, 500]), color([colorScheme, 200]))} 25%,
        ${mode(color([colorScheme, 500]), color([colorScheme, 200]))} 75%,
        transparent 100%
      );
      animation: ${progressKeyframe} 1s ease infinite normal none running;
    `;
  }

  return css`
    background-color: ${mode(
      color([colorScheme, 500]),
      color([colorScheme, 200])
    )};
  `;
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressOptions>(
  (props, ref) => {
    const {
      size: sizeProp = 'md',
      colorScheme = 'blue',
      isIndeterminate = false,
      value = 0,
      className,
    } = props;

    return (
      <div
        ref={ref}
        css={`
          position: relative;
          overflow: hidden;
          ${trackStyles({ size: sizeProp })}
        `}
        className={className}
      >
        <div
          style={{ width: `${value}%` }}
          role="progressbar"
          css={`
            height: 100%;
            transition-property: ${transitionProperty('common')}
              ${transitionProperty('dimensions')};
            transition-duration: ${transitionDuration('slow')};

            ${barStyles({
              colorScheme,
              isIndeterminate,
            })}
          `}
        />
      </div>
    );
  }
);
