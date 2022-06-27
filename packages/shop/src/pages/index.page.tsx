import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import RecommendedProducts from '../containers/recommended-products';
import AppLayout from '../containers/app-layout';
import SponsoredProducts from '../containers/sponsored-products';

const Home: NextPage<{}> = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>Demo Store</title>
      </Head>
      <AppLayout showBrand showSearchButton showCartButton showTabBar>
        <RecommendedProducts
          title={t('recommended')}
          numOfRows={2}
          numOfItems={30}
          inventoryId="HOME"
        />
        <SponsoredProducts
          title={t('sponsored')}
          inventoryId="HOME"
          numOfItems={3}
        />
      </AppLayout>
    </>
  );
};

export default Home;
