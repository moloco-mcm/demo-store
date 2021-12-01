import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components/macro';
// manual importing fontawesome css prevents flashing unstyled fontawesome icon
// ref: https://github.com/FortAwesome/react-fontawesome/issues/234
import '@fortawesome/fontawesome-svg-core/styles.css';
import { appWithTranslation } from 'next-i18next';

import { createTheme } from '@rmp-demo-store/ui/theme';
import GlobalStyle from '@rmp-demo-store/ui/global-style';
import CSSReset from '@rmp-demo-store/ui/css-reset';
import ColorModeContext, { ColorModeProvider } from '../contexts/color-mode';
import nextI18NextConfig from '../../next-i18next.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <ColorModeContext.Consumer>
        {({ colorMode }) => {
          const theme = createTheme({
            mode: colorMode,
          });

          return (
            <ThemeProvider theme={theme}>
              <CSSReset />
              <GlobalStyle />
              <Component {...pageProps} />
            </ThemeProvider>
          );
        }}
      </ColorModeContext.Consumer>
    </ColorModeProvider>
  );
}
export default appWithTranslation(MyApp, nextI18NextConfig);
