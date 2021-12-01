import React from 'react';
import { ErrorDisplaySize } from './types';

export type ErrorDisplayContextValue = {
  size: ErrorDisplaySize;
};

export const ErrorDisplayContext =
  React.createContext<ErrorDisplayContextValue>({
    size: 'md',
  });

export const useErrorDisplayContext = () =>
  React.useContext(ErrorDisplayContext);
