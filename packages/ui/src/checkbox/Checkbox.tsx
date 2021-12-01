import React from 'react';
import styled, { css } from 'styled-components/macro';

import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  color,
  mode,
  radius,
  border,
  transitionDuration,
  space,
  fontSize,
  size,
  shadow,
} from '../theme-utils';
import { ColorNameWithHue } from '../theme/types';
import { useFormControlContext } from '../form-control';

type CheckboxOptions = {
  colorScheme?: ColorNameWithHue;
  icon?: React.ReactNode;
  indeterminate?: boolean;
};

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> &
  CheckboxOptions;

export const InputElement = styled.input`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

export const ControlElement = styled.span<{ colorScheme: ColorNameWithHue }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  position: relative;
  transition-property: box-shadow;
  transition-duration: ${transitionDuration('normal')};
  user-select: none;

  width: ${size(4)};
  height: ${size(4)};

  border: ${border(1)};
  border-radius: ${radius('sm')};
  border-color: inherit;
  transition-property: box-shadow;
  transition-duration: ${transitionDuration('normal')};

  color: ${color('white')};

  & > * {
    visibility: hidden;
    font-size: 0.65em;
  }
`;

export const RootElement = styled.label<{ colorScheme: ColorNameWithHue }>`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  position: relative;

  :disabled {
    cursor: not-allowed;
  }

  ${InputElement}:disabled + ${ControlElement} {
    background-color: ${mode(color(`gray.100`), color('whiteAlpha.100'))};
    border-color: ${mode(color(`gray.200`), color('transparent'))};
  }

  ${InputElement}:indeterminate + ${ControlElement} > *,
  ${InputElement}:checked + ${ControlElement} > * {
    visibility: visible;
  }

  ${InputElement}:indeterminate:not(:disabled) + ${ControlElement}, 
  ${InputElement}:checked:not(:disabled) + ${ControlElement} {
    color: ${mode(color('white'), color('gray.900'))};
    ${({ colorScheme }) => css`
      background-color: ${mode(
        color([colorScheme, 500]),
        color([colorScheme, 200])
      )};
      border-color: ${mode(
        color([colorScheme, 500]),
        color([colorScheme, 200])
      )};

      :hover {
        background-color: ${mode(
          color([colorScheme, 600]),
          color([colorScheme, 300])
        )};
        border-color: ${mode(
          color([colorScheme, 600]),
          color([colorScheme, 300])
        )};
      }
    `}
  }

  ${InputElement}:indeterminate:disabled + ${ControlElement},
  ${InputElement}:checked:disabled + ${ControlElement} {
    background-color: ${mode(color(`gray.200`), color('whiteAlpha.300'))};
    border-color: ${mode(color(`gray.200`), color('transparent'))};
    color: ${mode(color('gray.500'), color('whiteAlpha.500'))};
  }

  ${InputElement}:focus + ${ControlElement} {
    box-shadow: ${shadow('outline')};
  }
`;

export const LabelElement = styled.span<{ disabled?: boolean }>`
  font-size: ${fontSize('md')};
  margin-left: ${space(2)};
  user-select: none;
  ${(props) => props.disabled && `opacity: 0.4`};
`;

// ref: https://www.a11ymatters.com/pattern/checkbox/#custom-checkbox-design
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      id,
      colorScheme = 'blue',
      icon = <FontAwesomeIcon icon={faCheck} />,
      indeterminate = false,
      children,
      ...rest
    } = props;

    const inputElementRef = React.useRef<HTMLInputElement>(null);
    React.useLayoutEffect(() => {
      if (inputElementRef.current) {
        inputElementRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputElementRef]);

    React.useImperativeHandle(
      ref,
      () => inputElementRef.current as HTMLInputElement
    );

    const formControlContext = useFormControlContext();
    const isDisabled = props.disabled || formControlContext.isDisabled;

    return (
      <RootElement colorScheme={colorScheme}>
        <InputElement
          type="checkbox"
          ref={inputElementRef}
          disabled={isDisabled}
          {...rest}
        />
        <ControlElement colorScheme={colorScheme}>
          {indeterminate ? <FontAwesomeIcon icon={faMinus} /> : icon}
        </ControlElement>
        <LabelElement disabled={isDisabled}>{children}</LabelElement>
      </RootElement>
    );
  }
);
