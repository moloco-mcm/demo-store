import React from 'react';
import styled, { css } from 'styled-components';
import { color, fontSize, mode, space } from '../theme-utils';
import { ColorNameWithHue } from '../theme/types';
import { InputSize } from './types';

type InputAdornmentProps = React.PropsWithChildren<{
  placement?: 'left' | 'right';
  size?: InputSize;
  className?: string;
  colorScheme?: ColorNameWithHue;
}>;

const sizeStyles = (args: { inputSize: InputSize }) => {
  const { inputSize } = args;
  const styles = {
    xs: css`
      font-size: ${fontSize('xs')};
      width: ${space(6)};
      height: ${space(6)};
    `,
    sm: css`
      font-size: ${fontSize('sm')};
      width: ${space(8)};
      height: ${space(8)};
    `,
    md: css`
      font-size: ${fontSize('md')};
      width: ${space(10)};
      height: ${space(10)};
    `,
    lg: css`
      font-size: ${fontSize('lg')};
      width: ${space(12)};
      height: ${space(12)};
    `,
  };
  return styles[inputSize];
};

const colorStyles = (args: { colorScheme: ColorNameWithHue }) => {
  const { colorScheme } = args;
  if (colorScheme === 'gray') {
    return css`
      color: ${mode(color(['gray', 400]), color(['whiteAlpha', 400]))};
    `;
  }

  return css`
    color: ${mode(color([colorScheme, 600]), color([colorScheme, 200]))};
  `;
};

const DivElement = styled.div<{
  inputSize: InputSize;
  placement: 'left' | 'right';
  colorScheme: ColorNameWithHue;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 2;

  ${(props) =>
    props.placement === 'left' &&
    css`
      left: 0;
    `}

  ${(props) =>
    props.placement === 'right' &&
    css`
      right: 0;
    `}

  ${sizeStyles}
  ${colorStyles}
`;

export const InputAdornment = React.forwardRef<
  HTMLDivElement,
  InputAdornmentProps
>((props, ref) => {
  const {
    children,
    size = 'md',
    placement = 'left',
    colorScheme = 'gray',
    ...rest
  } = props;
  return (
    <DivElement
      ref={ref}
      inputSize={size}
      placement={placement}
      colorScheme={colorScheme}
      {...rest}
    >
      {children}
    </DivElement>
  );
});

InputAdornment.displayName = 'InputAdornment';
