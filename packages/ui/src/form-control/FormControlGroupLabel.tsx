import React from 'react';
import 'styled-components/macro';
import { fontSize, fontWeight, space } from '../theme-utils';

export const FormControlGroupLabel: React.FC = (props) => {
  const { children } = props;
  return (
    <div
      css={`
        font-size: ${fontSize('lg')};
        font-weight: ${fontWeight('medium')};
        padding: ${space(4)} 0;
      `}
    >
      {children}
    </div>
  );
};
