import React from 'react';
import 'styled-components/macro';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { space, mode, color, transparentize } from '../theme-utils';
import { ColorNameWithHue } from '../theme/types';

export type AlertStatus = 'error' | 'success' | 'warning' | 'info';

export type AlertOptions = {
  status?: AlertStatus;
};

// alert context
export type AlertContextValue = {
  status: AlertStatus;
};

export const AlertContext = React.createContext<AlertContextValue>({
  status: 'info',
});

export const useAlertContext = () => React.useContext(AlertContext);

const STATUS_TO_COLOR_SCHEME_MAP: { [key in AlertStatus]: ColorNameWithHue } = {
  error: 'red',
  success: 'green',
  warning: 'orange',
  info: 'blue',
};

const STATUS_TO_ICON_MAP: {
  [key in AlertStatus]: FontAwesomeIconProps['icon'];
} = {
  error: faExclamationCircle,
  success: faCheckCircle,
  warning: faExclamationCircle,
  info: faInfoCircle,
};

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  React.PropsWithChildren<AlertOptions>;

export const AlertIcon = () => {
  const { status } = useAlertContext();

  const icon = STATUS_TO_ICON_MAP[status];
  const colorScheme = STATUS_TO_COLOR_SCHEME_MAP[status];

  return (
    <FontAwesomeIcon
      icon={icon}
      size="lg"
      fixedWidth
      css={`
        flex-shrink: 0;
        margin-right: ${space(2)};
        color: ${mode(color([colorScheme, 500]), color([colorScheme, 200]))};
      `}
    />
  );
};

export const Alert = (props: AlertProps) => {
  const { children, status = 'info', ...rest } = props;

  const colorScheme = STATUS_TO_COLOR_SCHEME_MAP[status];

  return (
    <AlertContext.Provider value={{ status }}>
      <div
        role="alert"
        {...rest}
        css={`
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: ${space(3)} ${space(4)};
          background-color: ${mode(
            color([colorScheme, 100]),
            transparentize([colorScheme, 200], 0.35)
          )};
        `}
      >
        {children}
      </div>
    </AlertContext.Provider>
  );
};

Alert.Icon = AlertIcon;

export default Alert;
