import React from 'react';
import { css, keyframes } from 'styled-components/macro';
import { mode, color, DefaultStyledProps, size, radius } from '../theme-utils';
import { SizeKey } from '../theme/types';

type SkeletonOptions = {
  height?: SizeKey;
};

type SkeletonProps = { className?: string } & SkeletonOptions;

const fade = (startColor: string, endColor: string) => keyframes`
    from {
      background-color: ${startColor};
      border-color: ${startColor};
    }
    to {
      background-color: ${endColor};
      border-color: ${endColor};
    }
  `;

const defaultStyles = (props: DefaultStyledProps) => {
  const startColor = mode(color('gray.100'), color('gray.800'))(props);
  const endColor = mode(color('gray.400'), color('gray.600'))(props);

  return css`
    opacity: 0.7;
    border-radius: ${radius('sm')};
    border-color: ${startColor};
    background: ${endColor};
    animation: 0.8s linear infinite alternate
      ${fade(startColor as string, endColor as string)};
  `;
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const { height: heightProp = 2, ...rest } = props;
    return (
      <div
        ref={ref}
        {...rest}
        css={`
          pointer-events: none;
          user-select: none;
          height: ${size(heightProp)};
          &::before,
          &::after,
          * {
            visibility: hidden;
          }
          ${defaultStyles}
        `}
      />
    );
  }
);
