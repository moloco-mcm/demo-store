import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import Stack from '@rmp-demo-store/ui/stack';

import CheckoutComplete from '../../components/cart/checkout-complete';
import AppLayout from '../../containers/app-layout';
import useOrder from '../../hooks/use-order';
import RecommendedProducts from '../../containers/recommended-products';

const CheckoutCompletePage: NextPage<{}> = () => {
  const router = useRouter();
  const { t } = useTranslation('checkoutComplete');

  const orderIdQueryParam = router.query['orderId'];

  const orderId =
    typeof orderIdQueryParam === 'string' ? orderIdQueryParam : undefined;

  const { data } = useOrder(orderId);

  const productIds = data?.items.map((item) => item.product.id);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <AppLayout title={t('title')}>
        <Stack direction="column" spacing={6}>
          <CheckoutComplete />
          <RecommendedProducts
            title={t('recommended')}
            inventoryId="PURCHASE_COMPLETE"
            items={productIds}
            enabled={!!productIds}
          />
        </Stack>
      </AppLayout>
    </>
  );
};

export default CheckoutCompletePage;
