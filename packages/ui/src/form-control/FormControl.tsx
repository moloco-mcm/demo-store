import React from 'react';
import { css } from 'styled-components/macro';

export type FormControlOptions = {
  isHorizontal?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export type FormControlContext = {
  id: string;
} & FormControlOptions;

const Context = React.createContext<FormControlContext>({ id: '' });
Context.displayName = 'FormControlContext';

export type FormControlProps = React.PropsWithChildren<
  FormControlContext & { className?: string }
>;

export const useFormControlContext = () => React.useContext(Context);

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  (props, ref) => {
    const {
      id,
      isHorizontal,
      isDisabled,
      isInvalid,
      isReadOnly,
      className,
      children,
    } = props;

    const contextValue = React.useMemo(
      () => ({
        id,
        isHorizontal,
        isDisabled,
        isInvalid,
        isReadOnly,
      }),
      [id, isHorizontal, isDisabled, isInvalid, isReadOnly]
    );

    return (
      <Context.Provider value={contextValue}>
        <div
          className={className}
          ref={ref}
          css={`
            ${isHorizontal &&
            css`
              display: flex;
              align-items: baseline;
            `}
          `}
        >
          {children}
        </div>
      </Context.Provider>
    );
  }
);
