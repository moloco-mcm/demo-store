import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components/macro';
// manual importing fontawesome css prevents flashing unstyled fontawesome icon
// ref: https://github.com/FortAwesome/react-fontawesome/issues/234
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from 'react-query';
import * as Sentry from '@sentry/nextjs';

import { createTheme } from '@rmp-demo-store/ui/theme';
import GlobalStyle from '@rmp-demo-store/ui/global-style';
import CSSReset from '@rmp-demo-store/ui/css-reset';

import '../common/i18n';

if (process.env.NODE_ENV !== 'development') {
  // send react-query logs to sentry
  setLogger({
    log: (message) => {
      Sentry.captureMessage(message);
    },
    warn: (message) => {
      Sentry.captureMessage(message);
    },
    error: (error) => {
      Sentry.captureException(error);
    },
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  // ref: https://react-query.tanstack.com/guides/ssr
  const [queryClient] = React.useState(() => new QueryClient());

  const theme = createTheme({
    mode: 'light',
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <GlobalStyle baseFontSize={16} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
