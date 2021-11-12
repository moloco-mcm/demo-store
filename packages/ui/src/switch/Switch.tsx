import React from 'react';
import styled from 'styled-components/macro';
import {
  color,
  lineHeight,
  mode,
  radius,
  shadow,
  transitionDuration,
  transitionProperty,
} from '../theme-utils';
import { ColorNameWithHue } from '../theme/types';

export type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchOptions = {
  colorScheme?: ColorNameWithHue;
  size?: SwitchSize;
};

export type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  SwitchOptions;

const sizes = {
  sm: {
    trackWidth: '1.375rem',
    trackHeight: '0.75rem',
  },
  md: {
    trackWidth: '1.875rem',
    trackHeight: '1rem',
  },
  lg: {
    trackWidth: '2.875rem',
    trackHeight: '1.5rem',
  },
};

const InputElement = styled.input`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

const TrackElement = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  justify-content: flex-start;
  box-sizing: content-box;
  cursor: pointer;
  border-radius: ${radius('full')};
  padding: 2px;

  transition-property: ${transitionProperty('common')};
  transition-duration: ${transitionDuration('fast')};
  background: ${mode(color('gray.300'), color('whiteAlpha.400'))};
`;

const ThumbElement = styled.span`
  background-color: ${color('white')};
  transition-property: transform;
  transition-duration: ${transitionDuration('normal')};
  border-radius: inherit;
`;

const RootElement = styled.label<{
  colorScheme: ColorNameWithHue;
  size: SwitchSize;
}>`
  display: inline-block;
  vertical-align: middle;
  line-height: ${lineHeight('normal')};

  ${ThumbElement} {
    width: ${(props) => sizes[props.size].trackHeight};
    height: ${(props) => sizes[props.size].trackHeight};
  }

  ${TrackElement} {
    width: ${(props) => sizes[props.size].trackWidth};
    height: ${(props) => sizes[props.size].trackHeight};
  }

  ${InputElement}:disabled + ${TrackElement} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${InputElement}:checked + ${TrackElement} {
    background-color: ${(props) =>
      mode(color([props.colorScheme, 500]), color([props.colorScheme, 200]))};

    ${ThumbElement} {
      transform: ${(props) =>
        `translateX(calc(${sizes[props.size].trackWidth} - ${
          sizes[props.size].trackHeight
        }))}`};
    }
  }

  ${InputElement}:focus + ${TrackElement} {
    box-shadow: ${shadow('outline')};
  }
`;

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { colorScheme = 'blue', size = 'md', ...rest } = props;

    return (
      <RootElement colorScheme={colorScheme} size={size}>
        <InputElement type="checkbox" ref={ref} {...rest} />
        <TrackElement>
          <ThumbElement />
        </TrackElement>
      </RootElement>
    );
  }
);
