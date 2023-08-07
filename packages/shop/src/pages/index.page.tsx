import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import RecommendedProducts from '../containers/recommended-products';
import AppLayout from '../containers/app-layout';
import SponsoredProducts from '../containers/sponsored-products';
import BannerAd from '../containers/banner-ad';
import { space } from '@rmp-demo-store/ui/theme-utils';
import {
  extractDeviceInfoFromRequest,
  sessionResolver,
} from '../common/api-utils';
import { browserIdResolver } from '../common/api-utils/browserId';
import { track } from '../common/user-event-tracker';

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { req, res } = context;

  track({
    event: {
      eventType: 'PAGE_VIEW',
      pageId: 'HOME',
    },
    req,
    res,
  });

  return {
    props: {},
  };
};

const Home: NextPage<{}> = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>Demo Store</title>
      </Head>
      <AppLayout showBrand showSearchButton showCartButton showTabBar>
        <BannerAd
          inventoryId="10001"
          width={640}
          height={150}
          css={`
            margin-bottom: ${space(3)};
          `}
        />
        <RecommendedProducts
          title={t('recommended')}
          numOfRows={2}
          numOfItems={30}
          inventoryId="home_recommendation"
        />
        <SponsoredProducts
          title={t('sponsored')}
          inventoryId="home_auction"
          numOfItems={3}
        />
      </AppLayout>
    </>
  );
};

export default Home;
