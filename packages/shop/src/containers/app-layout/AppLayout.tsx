import React from 'react';
import { useRouter } from 'next/router';
import 'styled-components/macro';

import { zIndex } from '@rmp-demo-store/ui/theme-utils';

import MainLayout from '../../components/common/main-layout';
import NavBar from '../../components/common/nav-bar';
import PageLoader, { PageLoaderRef } from '../../components/common/page-loader';
import TabBar from '../../components/common/tab-bar';
import useCart from '../../hooks/use-cart';

type Props = React.PropsWithChildren<React.ComponentProps<typeof NavBar>> & {
  showTabBar?: boolean;
};

export const AppLayout = (props: Props) => {
  const { children, showTabBar, ...rest } = props;
  const pageLoaderRef = React.useRef<PageLoaderRef | null>(null);
  const router = useRouter();
  // prevent 403 error from being reported
  const { data: cart } = useCart({ ignoreNotAuthorizedError: true });

  // ref: https://github.com/vercel/next.js/blob/canary/examples/with-loading/pages/_app.js
  React.useEffect(() => {
    const handleStart = () => {
      pageLoaderRef.current?.start();
    };
    const handleStop = () => {
      pageLoaderRef.current?.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  const numOfItemsInCart = cart?.items.reduce<number>(
    (acc, current) => acc + current.quantity,
    0
  );

  return (
    <MainLayout withSafeArea={showTabBar}>
      <NavBar {...rest} numOfItemsInCart={numOfItemsInCart} />
      <div
        css={`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: ${zIndex('overlay')};
        `}
      >
        <PageLoader ref={pageLoaderRef} />
      </div>
      {children}
      {showTabBar && <TabBar />}
    </MainLayout>
  );
};
