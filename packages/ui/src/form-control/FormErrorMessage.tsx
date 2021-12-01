import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { mode } from '../theme-utils';
import { color, fontSize, space } from '../theme-utils/get';

import { useFormControlContext } from './FormControl';

export type FormErrorMessageProps = React.PropsWithChildren<{}> &
  HTMLAttributes<HTMLDivElement>;

const DivElement = styled.div`
  display: flex;
  align-items: center;
  color: ${mode(color('red.500'), color('red.300'))};
  margin-top: ${space(2)};
  font-size: ${fontSize('sm')};
`;

export const FormErrorMessage = React.forwardRef<
  HTMLDivElement,
  FormErrorMessageProps
>((props, ref) => {
  const { children, ...rest } = props;

  const { isInvalid } = useFormControlContext();

  // do not show message if inValid is either false or undefined
  if (!isInvalid) return null;

  return (
    isInvalid && (
      <DivElement ref={ref} {...rest}>
        {children}
      </DivElement>
    )
  );
});
