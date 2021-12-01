import React from 'react';
import 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { color, fontSize, fontWeight, space } from '../theme-utils';

export const Stat = (
  props: React.PropsWithChildren<{ className?: string }>
) => {
  const { children, className } = props;
  return (
    <div
      css={`
        position: relative;
      `}
      className={className}
    >
      <dl>{children}</dl>
    </div>
  );
};

export const StatLabel: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <dt
      css={`
        font-weight: ${fontWeight('medium')};
        font-size: ${fontSize('sm')};
      `}
      className={className}
    >
      {children}
    </dt>
  );
};

export const StatNumber: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <dd
      css={`
        font-weight: ${fontWeight('semiBold')};
        font-size: ${fontSize('2xl')};
      `}
      className={className}
    >
      {children}
    </dd>
  );
};

export const StatHelpText: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <p
      css={`
        font-size: ${fontSize('sm')};
        opacity: 0.8;
      `}
      className={className}
    >
      {children}
    </p>
  );
};

export const StatUpArrow: React.FC = () => {
  return (
    <FontAwesomeIcon
      icon={faCaretUp}
      size="lg"
      css={`
        color: ${color('green.400')};
        margin-right: ${space(1)};
      `}
    />
  );
};

export const StatDownArrow: React.FC = () => {
  return (
    <FontAwesomeIcon
      icon={faCaretDown}
      size="lg"
      css={`
        color: ${color('red.400')};
        margin-right: ${space(1)};
      `}
    />
  );
};

export const StatFlat: React.FC = () => {
  return (
    <FontAwesomeIcon
      icon={faMinus}
      size="lg"
      css={`
        color: ${color('gray.400')};
        margin-right: ${space(1)};
      `}
    />
  );
};

Stat.Label = StatLabel;
Stat.Number = StatNumber;
Stat.HelpText = StatHelpText;
Stat.UpArrow = StatUpArrow;
Stat.DownArrow = StatDownArrow;
Stat.Flat = StatFlat;
