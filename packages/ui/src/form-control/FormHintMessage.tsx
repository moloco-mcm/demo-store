import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { color, fontSize, space } from '../theme-utils/get';

export type FormHintMessageProps = React.PropsWithChildren<{}> &
  HTMLAttributes<HTMLDivElement>;

const DivElement = styled.div`
  display: flex;
  align-items: center;
  color: ${color('gray.500')};
  margin-top: ${space(2)};
  font-size: ${fontSize('sm')};
`;

export const FormHintMessage = React.forwardRef<
  HTMLDivElement,
  FormHintMessageProps
>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <DivElement ref={ref} {...rest}>
      {children}
    </DivElement>
  );
});
