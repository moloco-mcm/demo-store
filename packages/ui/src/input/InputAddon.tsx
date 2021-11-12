import React from 'react';
import styled, { css } from 'styled-components';
import { color, fontSize, radius, space, border, mode } from '../theme-utils';
import { InputSize, InputVariant } from './types';

type InputAddonProps = React.PropsWithChildren<{
  variant?: InputVariant;
  placement?: 'left' | 'right';
  size?: InputSize;
  className?: string;
}>;

const sizeStyles = (args: { inputSize: InputSize }) => {
  const { inputSize } = args;
  const styles = {
    xs: css`
      font-size: ${fontSize('xs')};
      height: ${space(6)};
      padding: 0 ${space(2)};
      border-radius: ${radius('sm')};
    `,
    sm: css`
      font-size: ${fontSize('sm')};
      height: ${space(8)};
      padding: 0 ${space(3)};
      border-radius: ${radius('sm')};
    `,
    md: css`
      font-size: ${fontSize('md')};
      height: ${space(10)};
      padding: 0 ${space(4)};
      border-radius: ${radius('md')};
    `,
    lg: css`
      font-size: ${fontSize('lg')};
      height: ${space(12)};
      padding: 0 ${space(3)};
      border-radius: ${radius('lg')};
    `,
  };
  return styles[inputSize];
};

const variantStyles = (args: { variant: InputVariant }) => {
  const { variant } = args;

  const styles = {
    outline: css`
      border: ${border(1)};
      border-color: inherit;
      background-color: ${mode(color('gray.100'), color('whiteAlpha.100'))};
    `,
    underline: css`
      border-bottom: ${border(1)};
      border-color: inherit;
      border-radius: 0%;
      background-color: ${color('transparent')};
    `,
    unstyled: css`
      background: ${color('transparent')};
      padding-left: 0;
      padding-right: 0;
      height: auto;
    `,
  };

  return styles[variant];
};

const DivElement = styled.div<{
  inputSize: InputSize;
  placement: 'left' | 'right';
  variant: InputVariant;
}>`
  flex: 0 0 auto;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  ${sizeStyles}
  ${variantStyles}

  ${(props) =>
    props.placement === 'left' &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-color: ${color('transparent')};
    `}

  ${(props) =>
    props.placement === 'right' &&
    css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-color: ${color('transparent')};
    `}
`;

export const InputAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  (props, ref) => {
    const {
      children,
      size = 'md',
      placement = 'left',
      variant = 'outline',
      ...rest
    } = props;
    return (
      <DivElement
        ref={ref}
        inputSize={size}
        placement={placement}
        variant={variant}
        {...rest}
      >
        {children}
      </DivElement>
    );
  }
);

InputAddon.displayName = 'InputAddon';
