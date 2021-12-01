import React from 'react';
import styled from 'styled-components/macro';
import { radius } from '../theme-utils';
import {
  RootElement as CheckboxRootElement,
  InputElement,
  ControlElement as CheckboxControlElement,
  LabelElement,
} from '../checkbox';
import { ColorNameWithHue } from '../theme/types';

export type RadioOptions = {
  colorScheme?: ColorNameWithHue;
};

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.PropsWithChildren<RadioOptions>;

const ControlElement = styled(CheckboxControlElement)`
  border-radius: ${radius('full')};
`;

const RootElement = styled(CheckboxRootElement)`
  ${InputElement}:checked + ${ControlElement} {
    &:before {
      content: '';
      display: inline-block;
      position: relative;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: currentColor;
    }
  }
`;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const { colorScheme = 'blue', children, ...rest } = props;
    return (
      <RootElement colorScheme={colorScheme}>
        <InputElement type="radio" ref={ref} {...rest} />
        <ControlElement colorScheme={colorScheme} />
        <LabelElement disabled={props.disabled}>{children}</LabelElement>
      </RootElement>
    );
  }
);
