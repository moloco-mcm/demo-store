import React from 'react';
import styled from 'styled-components';
import { SpaceKey } from '../theme/types';
import { Property } from 'csstype';

export type StackOptions = {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: SpaceKey;
  align?: Property.AlignItems;
  justify?: Property.JustifyContent;
  wrap?: Property.FlexWrap;
  // TODO: add more props
  // divider?: React.ReactElement;
};

export type StackProps = React.PropsWithChildren<StackOptions> & {
  className?: string;
};

const StackElement = styled('div').withConfig<StackOptions>({
  shouldForwardProp: (prop, defaultFn) =>
    !['direction', 'spacing'].includes(prop) && defaultFn(prop), // filter out React only props
})(
  (props) => ({
    display: 'flex',
    flexDirection: props.direction,
    alignItems: props.align,
    justifyContent: props.justify,
    flexWrap: props.wrap,
  }),
  (props) => {
    const { direction = 'row', spacing = 0 } = props;
    const marginValue = props.theme.space[spacing];

    const directionStyles = {
      column: {
        marginTop: marginValue,
        marginInlineEnd: 0,
        marginBottom: 0,
        marginInlineStart: 0,
      },
      row: {
        marginTop: 0,
        marginInlineEnd: 0,
        marginBottom: 0,
        marginInlineStart: marginValue,
      },
      'column-reverse': {
        marginTop: 0,
        marginInlineEnd: 0,
        marginBottom: marginValue,
        marginInlineStart: 0,
      },
      'row-reverse': {
        marginTop: 0,
        marginInlineEnd: marginValue,
        marginBottom: 0,
        marginInlineStart: 0,
      },
    };

    return {
      // apply all children elements except the first one
      // ref: https://emmenko.medium.com/patching-lobotomized-owl-selector-for-emotion-ssr-5a582a3c424c
      '& > *:not(style) ~ *:not(style)': directionStyles[direction],
    };
  }
);

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <StackElement ref={ref} {...rest}>
        {children}
      </StackElement>
    );
  }
);

Stack.defaultProps = {
  direction: 'row',
};
