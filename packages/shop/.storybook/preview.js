import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { MemoryRouter } from 'react-router';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { createTheme } from '@rmp-demo-store/ui/theme';
import GlobalStyle from '@rmp-demo-store/ui/global-style';
import CSSReset from '@rmp-demo-store/ui/css-reset';

import { worker } from '../src/stories/mocks/browser';
import mswDecorator from '../src/stories/decorators/mswDecorator';
import '../src/common/i18n';

worker.start();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  mswDecorator(),
  (Story, context) => {
    const { i18n } = useTranslation();
    const { language } = context.globals;

    React.useEffect(() => {
      i18n.changeLanguage(language);
    }, [i18n, language]);

    const theme = createTheme({
      mode: 'light',
    });

    return (
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <CSSReset />
          <GlobalStyle baseFontSize={16} />
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    );
  },
];

export const globalTypes = {
  language: {
    name: 'Language',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'ko', right: '🇰🇷', title: '한국어' },
      ],
    },
  },
};
