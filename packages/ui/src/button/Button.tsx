import React from 'react';
import styled, { css } from 'styled-components/macro';

import Spinner from '../spinner';
import {
  color,
  fontWeight,
  fontSize,
  space,
  radius,
  shadow,
  transitionDuration,
  mode,
  transparentize,
} from '../theme-utils';
import { ColorNameWithHue } from '../theme/types';

export type ButtonOptions = {
  variant?: 'contained' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: ColorNameWithHue;
  className?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;

  // TODO: implement more props
  // fullWidth?: boolean;
  // loadingText?: boolean;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.PropsWithChildren<ButtonOptions>;

const sizeVariants = (options: ButtonOptions) => {
  const { size = 'md' } = options;
  const styles = {
    xs: css`
      font-size: ${fontSize('xs')};
      padding: 0 ${space(2)} 0 ${space(2)};
      height: ${space(6)};
      min-width: ${space(6)};
    `,
    sm: css`
      font-size: ${fontSize('sm')};
      padding: 0 ${space(3)} 0 ${space(3)};
      height: ${space(8)};
      min-width: ${space(8)};
    `,
    md: css`
      font-size: ${fontSize('md')};
      padding: 0 ${space(4)} 0 ${space(4)};
      height: ${space(10)};
      min-width: ${space(10)};
    `,
    lg: css`
      font-size: ${fontSize('lg')};
      padding: 0 ${space(6)} 0 ${space(6)};
      height: ${space(12)};
      min-width: ${space(12)};
    `,
  };
  return styles[size];
};

const variantGhost = (
  colorScheme: Exclude<ButtonOptions['colorScheme'], undefined>
) => {
  return css`
    color: ${mode(color([colorScheme, 600]), color([colorScheme, 200]))};
    border-radius: ${radius('md')};
    background-color: ${color('transparent')};
    :hover {
      background-color: ${mode(
        color([colorScheme, 50]),
        transparentize([colorScheme, 200], 0.12)
      )};
    }
    :active {
      background-color: ${mode(
        color([colorScheme, 100]),
        transparentize([colorScheme, 200], 0.24)
      )};
    }
  `;
};

const colorVariants = (options: ButtonOptions) => {
  const { colorScheme = 'blue' } = options;

  if (options.variant === 'outline') {
    return css`
      border: 1px solid;
      border-color: ${colorScheme === 'gray'
        ? mode(color('gray.200'), color('whiteAlpha.300'))
        : color('current')};
      ${variantGhost(colorScheme)}
    `;
  }

  if (options.variant === 'ghost') {
    return variantGhost(colorScheme);
  }

  // contained
  if (colorScheme === 'gray') {
    return css`
      color: ${mode(color(['gray', 800]), color(['whiteAlpha', 900]))};
      border-radius: ${radius('md')};
      background-color: ${mode(
        color(['gray', 100]),
        color(['whiteAlpha', 200])
      )};
      :hover {
        background-color: ${mode(
          color(['gray', 200]),
          color(['whiteAlpha', 300])
        )};
      }
      :active {
        background-color: ${mode(
          color(['gray', 300]),
          color(['whiteAlpha', 400])
        )};
      }
    `;
  }

  return css`
    color: ${mode(color('white'), color(['gray', 800]))};
    border-radius: ${radius('md')};
    background-color: ${mode(
      color([colorScheme, 500]),
      color([colorScheme, 200])
    )};
    :hover {
      background-color: ${mode(
        color([colorScheme, 600]),
        color([colorScheme, 300])
      )};
    }
    :active {
      background-color: ${mode(
        color([colorScheme, 700]),
        color([colorScheme, 400])
      )};
    }
  `;
};

const ButtonElement = styled.button<ButtonOptions>`
  line-height: 1.2;
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  transition: all ${transitionDuration('normal')};
  outline: none;
  border: 0;
  margin: 0;
  cursor: pointer;
  position: relative;
  user-select: none;
  font-weight: ${fontWeight('semiBold')};

  ${(props) => sizeVariants(props)}
  ${(props) => colorVariants(props)};

  :focus {
    box-shadow: ${shadow('outline')};
  }
  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: ${shadow('none')};
  }
`;

const ButtonIcon: React.FC<{ placement: 'left' | 'right' }> = (props) => {
  const { children, placement } = props;
  return (
    <span
      css={`
        display: inline-flex;
        align-self: center;
        flex-shrink: 0;
        ${placement === 'left' &&
        css`
          margin-right: ${space(2)};
        `}
        ${placement === 'right' &&
        css`
          margin-left: ${space(2)};
        `}
      `}
    >
      {children}
    </span>
  );
};

// TODO: support disabled status with href prop (rendered as a tag) (@sjhan-moloco)
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { children, isLoading, disabled, leftIcon, rightIcon, href, ...rest } =
    props;

  const childrenWithIcons = (
    <>
      {leftIcon && <ButtonIcon placement="left">{leftIcon}</ButtonIcon>}
      {children}
      {rightIcon && <ButtonIcon placement="right">{rightIcon}</ButtonIcon>}
    </>
  );

  return (
    <ButtonElement
      // skip typechecking to support both of a and button tag
      //@ts-expect-error
      ref={ref}
      href={href}
      as={href ? 'a' : 'button'}
      {...rest}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <div
          css={`
            display: flex;
            position: absolute;
            align-items: center;
          `}
        >
          <Spinner
            color="current"
            css={`
              width: 1em;
              height: 1em;
            `}
          />
        </div>
      )}
      {isLoading ? (
        // hide children while loading
        <span
          css={`
            opacity: 0;
          `}
        >
          {childrenWithIcons}
        </span>
      ) : (
        childrenWithIcons
      )}
    </ButtonElement>
  );
});
