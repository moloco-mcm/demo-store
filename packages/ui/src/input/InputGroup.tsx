import React from 'react';
import styled from 'styled-components';
import { InputSize, InputVariant } from './types';

const DivElement = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

export type InputGroupProps = React.PropsWithChildren<{
  size?: InputSize;
  variant?: InputVariant;
  className?: string;
}>;

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  (props, ref) => {
    const {
      children,
      variant = 'outline',
      size = 'md',
      className,
      ...rest
    } = props;

    let hasLeftAdornment = false;
    let hasRightAdornment = false;

    let hasLeftAddon = false;
    let hasRightAddon = false;

    // check if there are any Left/RightAdornment elements
    const childrenArray = React.Children.toArray(children);
    childrenArray.forEach((child) => {
      if (!React.isValidElement(child)) return;
      if (
        // @ts-ignore
        child.type?.displayName === 'InputAdornment'
      ) {
        if (child.props?.placement === 'left') hasLeftAdornment = true;
        if (child.props?.placement === 'right') hasRightAdornment = true;
      }
      if (
        // @ts-ignore
        child.type?.displayName === 'InputAddon'
      ) {
        if (child.props?.placement === 'left') hasLeftAddon = true;
        if (child.props?.placement === 'right') hasRightAddon = true;
      }
    });

    // pass size/variant prop to children
    const clonedChildren = React.Children.toArray(children).reduce(
      (acc: React.ReactElement[], currentChild) => {
        if (!React.isValidElement(currentChild)) return acc;

        const newProps = {
          size: currentChild.props?.size || size,
          variant: currentChild.props?.variant || variant,
        };

        return [
          ...acc,
          // @ts-ignore
          currentChild.type.displayName === 'Input'
            ? React.cloneElement(currentChild, {
                ...newProps,
                hasLeftAdornment, // auto set props for Input component
                hasRightAdornment,
                hasLeftAddon,
                hasRightAddon,
              })
            : React.cloneElement(currentChild, newProps),
        ];
      },
      []
    );

    return (
      <DivElement ref={ref} className={className} {...rest}>
        {clonedChildren}
      </DivElement>
    );
  }
);
