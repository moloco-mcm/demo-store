import React from 'react';
import styled, { css } from 'styled-components';
import { FormControlOptions, useFormControlContext } from '../form-control';
import {
  color,
  fontSize,
  space,
  radius,
  shadow,
  transitionDuration,
  mode,
  transitionProperty,
  border,
  size,
} from '../theme-utils';
import { FontSizeKey, SpaceKey, RadiusKey } from '../theme/types';
import { InputVariant, InputSize } from './types';

export type InputOptions = {
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
  hasLeftAdornment?: boolean;
  hasRightAdornment?: boolean;
  hasLeftAddon?: boolean;
  hasRightAddon?: boolean;
} & FormControlOptions;

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  InputOptions;

const sizeValues: Record<
  InputSize,
  {
    fontSize: FontSizeKey;
    padding: SpaceKey;
    height: SpaceKey;
    borderRadius: RadiusKey;
  }
> = {
  xs: {
    fontSize: 'xs',
    padding: 2,
    height: 6,
    borderRadius: 'sm',
  },
  sm: {
    fontSize: 'sm',
    padding: 3,
    height: 8,
    borderRadius: 'sm',
  },
  md: {
    fontSize: 'md',
    padding: 4,
    height: 10,
    borderRadius: 'md',
  },
  lg: {
    fontSize: 'lg',
    padding: 4,
    height: 12,
    borderRadius: 'md',
  },
};

export const baseStyles = () => {
  return css`
    width: 100%;
    min-width: 0;
    outline: 0;
    position: relative;
    appearance: none;
    border: none;
    color: inherit;
    transition-property: ${transitionProperty('common')};
    transition-duration: ${transitionDuration('normal')};
  `;
};

export const sizeStyles = (args: {
  variant: InputVariant;
  inputSize: InputSize;
  hasLeftAdornment?: boolean;
  hasRightAdornment?: boolean;
  hasLeftAddon?: boolean;
  hasRightAddon?: boolean;
}) => {
  const {
    variant,
    inputSize,
    hasLeftAdornment,
    hasRightAdornment,
    hasLeftAddon,
    hasRightAddon,
  } = args;

  const value = sizeValues[inputSize];
  const style = css`
    font-size: ${fontSize(value.fontSize)};

    height: ${size(value.height)};
    ${variant === 'outline' &&
    css`
      padding: 0 ${space(value.padding)} 0 ${space(value.padding)};
      border-radius: ${radius(value.borderRadius)};
    `}
    // add extra left padding if LeftAdornment exists 
    ${hasLeftAdornment &&
    css`
      padding-left: ${space(value.height)};
    `}
    // add extra right padding if RightAdornment exists
    ${hasRightAdornment &&
    css`
      padding-right: ${space(value.height)};
    `}
    // adjust left border radius if hasLeftAddon exists 
    ${hasLeftAddon &&
    css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}
    // adjust right border radius if hasRightAddon exists 
    ${hasRightAddon &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}
  `;
  return style;
};

export const variantStyles = (args: {
  variant: InputVariant;
  isInvalid?: boolean;
}) => {
  const { variant, isInvalid } = args;

  const styles = {
    outline: css`
      border: ${border(1)};
      border-color: inherit;
      background-color: inherit;

      :hover {
        border-color: ${mode(color('gray.300'), color('whiteAlpha.400'))};
      }

      :read-only {
        box-shadow: ${shadow('none')};
        user-select: all;
      }

      :disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      ${isInvalid &&
      css`
        border-color: ${mode(color('red.500'), color('red.300'))};
        box-shadow: 0 0 0 1px ${mode(color('red.500'), color('red.300'))};
      `}

      :focus {
        border-color: ${mode(color('blue.500'), color('blue.300'))};
        box-shadow: 0 0 0 1px ${mode(color('blue.500'), color('blue.300'))};
      }
    `,
    underline: css`
      border-bottom: ${border(1)};
      border-color: inherit;
      border-radius: 0%;
      padding-left: 0;
      padding-right: 0;

      background-color: ${color('transparent')};

      :read-only {
        box-shadow: ${shadow('none')};
        user-select: all;
      }

      ${isInvalid &&
      css`
        border-color: ${mode(color('red.500'), color('red.300'))};
        box-shadow: 0 1px 0 0 ${mode(color('red.500'), color('red.300'))};
      `}

      :focus {
        border-color: ${mode(color('blue.500'), color('blue.300'))};
        box-shadow: 0 1px 0 0 ${mode(color('blue.500'), color('blue.300'))};
      }
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

const InputElement = styled.input<{
  variant: InputVariant;
  inputSize: InputSize;
  hasLeftAdornment?: boolean;
  hasRightAdornment?: boolean;
  isInvalid?: boolean;
  hasLeftAddon?: boolean;
  hasRightAddon?: boolean;
}>`
  ${baseStyles}
  ${variantStyles}
  ${sizeStyles}
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      variant = 'outline',
      size = 'md',
      isInvalid = false,
      isDisabled = false,
      isReadOnly = false,
      ...rest
    } = props;

    const formControlContext = useFormControlContext();

    return (
      <InputElement
        ref={ref}
        inputSize={size}
        variant={variant}
        id={formControlContext.id}
        disabled={isDisabled || formControlContext.isDisabled}
        readOnly={isReadOnly || formControlContext.isReadOnly}
        isInvalid={isInvalid || formControlContext.isInvalid}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';
