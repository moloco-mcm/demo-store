import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import {
  fontSize,
  fontWeight,
  space,
  transitionDuration,
  transitionProperty,
} from '../theme-utils/get';

import { FormControlContext, useFormControlContext } from './FormControl';

export type FormLabelProps = React.PropsWithChildren<{}> &
  HTMLAttributes<HTMLLabelElement>;

const LabelElement = styled.label<Exclude<FormControlContext, 'id'>>`
  display: block;
  font-size: ${fontSize('md')};
  margin-right: ${space(3)};
  margin-bottom: ${space(2)};
  font-weight: ${fontWeight('normal')};
  transition-property: ${transitionProperty('common')};
  transition-duration: ${transitionDuration('normal')};
  opacity: 1;

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.4;
    `}

  ${(props) =>
    props.isHorizontal &&
    css`
      width: 15ch;
      flex-grow: 0;
      flex-shrink: 0;
      margin-bottom: 0;
      text-align: right;
    `}
`;

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const { id, ...restContext } = useFormControlContext();

    return (
      <LabelElement
        ref={ref}
        id={`${id}-label`}
        htmlFor={id}
        {...restContext}
        {...rest}
      >
        {children}
      </LabelElement>
    );
  }
);
