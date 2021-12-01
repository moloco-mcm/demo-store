import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

import { FormControlOptions, useFormControlContext } from '../form-control';

import {
  InputVariant,
  InputSize,
  baseStyles,
  sizeStyles,
  variantStyles,
} from '../input';
import { fontSize } from '../theme-utils';

export type SelectOptions = {
  className?: string;
  variant?: InputVariant;
  size?: InputSize;
  placeholder?: string;
} & Omit<FormControlOptions, 'isReadOnly' | 'isHorizontal'>;

export type SelectProps = React.HtmlHTMLAttributes<HTMLSelectElement> &
  SelectOptions;

const SelectElement = styled.select<{
  variant: InputVariant;
  inputSize: InputSize;
  isInvalid?: boolean;
}>`
  ${baseStyles}
  ${variantStyles}
  ${sizeStyles}
  padding-right: 2rem;
`;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const {
      variant = 'outline',
      size = 'md',
      placeholder,
      isInvalid = false,
      isDisabled = false,
      children,
      ...rest
    } = props;

    const formControlContext = useFormControlContext();

    return (
      <div
        css={`
          width: 100%;
          height: fit-content;
          position: relative;
        `}
      >
        <SelectElement
          ref={ref}
          variant={variant}
          inputSize={size}
          disabled={
            isDisabled !== undefined
              ? isDisabled
              : formControlContext.isDisabled
          }
          isInvalid={
            isInvalid !== undefined ? isInvalid : formControlContext.isInvalid
          }
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </SelectElement>
        <div
          css={`
            position: absolute;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            top: 50%;
            transform: translateY(-50%);
            right: 0.5rem;
            width: 1.5rem;
            font-size: ${fontSize('sm')};

            ${isDisabled &&
            css`
              opacity: 0.5;
            `}
          `}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            role="presentation"
            aria-hidden
          />
        </div>
      </div>
    );
  }
);
