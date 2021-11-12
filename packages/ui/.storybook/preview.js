import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from 'storybook-dark-mode';

import { createTheme } from '../src/theme';
import GlobalStyle from '../src/global-style';
import CSSReset from '../src/css-reset';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => {
    const prefersDarkMode = useDarkMode();

    const theme = React.useMemo(
      () =>
        createTheme({
          mode: prefersDarkMode ? 'dark' : 'light',
        }),
      [prefersDarkMode]
    );

    return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    );
  },
];
