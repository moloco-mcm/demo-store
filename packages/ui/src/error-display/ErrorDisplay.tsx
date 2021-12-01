import React from 'react';
import { css } from 'styled-components/macro';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import Stack from '../stack';
import { color, fontSize, space } from '../theme-utils';
import { FontSizeKey, SpaceKey } from '../theme/types';
import { ErrorDisplaySize } from './types';
import {
  ErrorDisplayContext,
  useErrorDisplayContext,
} from './ErrorDisplayContext';

export type ErrorDisplayOptions = {
  fillParent?: boolean;
  size?: ErrorDisplaySize;
};

export type ErrorDisplayProps = React.PropsWithChildren<
  {
    className?: string;
  } & ErrorDisplayOptions
>;

const ELEMENT_SIZES: Record<
  ErrorDisplaySize,
  {
    icon: FontAwesomeIconProps['size'];
    title: FontSizeKey;
    message: FontSizeKey;
    space: SpaceKey;
  }
> = {
  sm: {
    icon: '2x',
    title: 'xl',
    message: 'sm',
    space: 2,
  },
  md: {
    icon: '3x',
    title: '2xl',
    message: 'md',
    space: 3,
  },
};

export const ErrorDisplay = (props: ErrorDisplayProps) => {
  const { fillParent = true, size = 'md', className, children } = props;

  const sizes = ELEMENT_SIZES[size];

  return (
    <ErrorDisplayContext.Provider value={{ size }}>
      <Stack
        direction="column"
        spacing={sizes.space}
        align="center"
        justify="center"
        className={className}
        css={`
          ${fillParent &&
          css`
            height: 100%;
          `}
        `}
      >
        <FontAwesomeIcon
          icon={faExclamationCircle}
          size={sizes.icon}
          css={`
            color: ${color('gray.600')};
          `}
        />
        <div
          css={`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          {children}
        </div>
      </Stack>
    </ErrorDisplayContext.Provider>
  );
};

type ErrorTitleProps = {
  className?: string;
};

const ErrorTitle: React.FC<ErrorTitleProps> = (props) => {
  const { className, children } = props;

  const { size } = useErrorDisplayContext();

  return (
    <h3
      className={className}
      css={`
        font-size: ${fontSize(ELEMENT_SIZES[size].title)};
        text-align: center;
        max-width: 35ch;
      `}
    >
      {children}
    </h3>
  );
};

type ErrorMessageProps = {
  className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { className, children } = props;

  const { size } = useErrorDisplayContext();

  return (
    <p
      className={className}
      css={`
        font-size: ${fontSize(ELEMENT_SIZES[size].message)};
        text-align: center;
        max-width: 50ch;
      `}
    >
      {children}
    </p>
  );
};

type ErrorActionsProps = {
  className?: string;
};

const ErrorActions: React.FC<ErrorActionsProps> = (props) => {
  const { className, children } = props;

  const { size } = useErrorDisplayContext();

  return (
    <div
      className={className}
      css={`
        margin-top: ${space(ELEMENT_SIZES[size].space)};
      `}
    >
      {children}
    </div>
  );
};

ErrorDisplay.Title = ErrorTitle;
ErrorDisplay.Message = ErrorMessage;
ErrorDisplay.Actions = ErrorActions;
