import React from 'react';
import 'styled-components/macro';
import { radius } from '../theme-utils';

import { Button, ButtonProps } from './Button';

export type IconButtonOptions = {
  isRound?: boolean;
};

export type IconButtonProps = ButtonProps & IconButtonOptions;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { children, isRound, ...rest } = props;
    return (
      <Button
        ref={ref}
        {...rest}
        css={`
          padding: 0;
          border-radius: ${radius(isRound ? 'full' : 'md')};
        `}
      >
        {children}
      </Button>
    );
  }
);
