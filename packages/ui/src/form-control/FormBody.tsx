import React, { HTMLAttributes } from 'react';
import { css } from 'styled-components/macro';

import { useFormControlContext } from './FormControl';

export type FormBodyProps = React.PropsWithChildren<{}> &
  HTMLAttributes<HTMLDivElement>;

export const FormBody = React.forwardRef<HTMLDivElement, FormBodyProps>(
  (props, ref) => {
    const { children } = props;

    const { isHorizontal } = useFormControlContext();

    return (
      <div
        ref={ref}
        css={`
          ${isHorizontal &&
          css`
            width: 100%;
          `}
        `}
      >
        {children}
      </div>
    );
  }
);
