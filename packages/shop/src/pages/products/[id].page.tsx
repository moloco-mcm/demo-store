import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import 'styled-components/macro';
import { nanoid } from 'nanoid';
import pickBy from 'lodash/pickBy';

import ErrorDisplay from '@rmp-demo-store/ui/error-display';
import { space } from '@rmp-demo-store/ui/theme-utils';

import ProductDetail from '../../components/product/detail';
import { useAddCartItemMutation } from '../../hooks/use-cart';
import AppLayout from '../../containers/app-layout';
import RecommendedProducts from '../../containers/recommended-products';
import SponsoredProducts from '../../containers/sponsored-products';
import { insertEvent } from '../../common/user-api-client';
import {
  extractDeviceInfoFromRequest,
  sessionResolver,
} from '../../common/api-utils';
import { asyncTryCatch, isAsyncTryCatchError } from '../../common/utils';
import {
  fetchProductDocSnapshot,
  translateProductDocToProduct,
} from '../../common/api-utils/products';
import { ApiStandardErrorCode, Product } from '../../common/types';
import { browserIdResolver } from '../../common/api-utils/browserId';

type Props = {
  product?: Product;
  error?: {
    code: ApiStandardErrorCode;
    message: string;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { req, res, params } = context;

  const productId = params?.id;
  if (typeof productId !== 'string') {
    return {
      props: {
        error: {
          code: 'BAD_REQUEST',
          message: 'invalid request',
        },
      },
    };
  }

  const productFetchResult = await asyncTryCatch(() =>
    fetchProductDocSnapshot(productId)
  );

  if (isAsyncTryCatchError(productFetchResult)) {
    return {
      props: {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch product',
        },
      },
    };
  }

  const [productDocSnapshot] = productFetchResult;

  const product = translateProductDocToProduct(productDocSnapshot);

  if (!product) {
    return {
      props: {
        error: {
          code: 'NOT_FOUND',
          message: 'Not found',
        },
      },
    };
  }

  const session = await sessionResolver(req);
  const browserId = browserIdResolver(req, res);
  const userId = session?.user.id || browserId;

  insertEvent({
    id: nanoid(),
    eventType: 'ITEM_PAGE_VIEW',
    timestamp: Date.now(),
    channelType: 'SITE',
    userId,
    device: extractDeviceInfoFromRequest(req),
    items: [
      {
        id: productId,
        price: product.salePrice || product.price,
        quantity: 1,
      },
    ],
  });

  return {
    props: {
      // remove undefined fields
      product: pickBy(product, (v) => v !== undefined) as Product,
    },
  };
};

const ProductDetailPage: NextPage<Props> = (props) => {
  const router = useRouter();

  const { t } = useTranslation();
  const { error, product } = props;

  const { mutate: addFn, isLoading: isCartUpdating } = useAddCartItemMutation({
    onError: (error) => {
      if (error.code === 'FORBIDDEN') {
        router.push(`/signin?redirectTo=${router.asPath}`);
      }
      // TODO: show error toast (@sjhan-moloco)
    },
  });

  const handleAddToCartButtonClick = (args: { productId: string }) => {
    const { productId } = args;
    addFn({ item: { productId, quantity: 1 } });
  };

  return (
    <>
      <Head>
        <title>{t('productDetail:title')}</title>
      </Head>
      <AppLayout
        title={t('productDetail:title')}
        showHomeButton
        showBackButton
        showCartButton
      >
        {error ? (
          <ErrorDisplay
            css={`
              padding: ${space(12)} 0;
            `}
          >
            <ErrorDisplay.Title>{t('common:error.title')}</ErrorDisplay.Title>
            {/* TODO: localize server error (@sjhan-moloco) */}
            <ErrorDisplay.Message>{error.message}</ErrorDisplay.Message>
          </ErrorDisplay>
        ) : (
          <>
            <ProductDetail
              isCartUpdating={isCartUpdating}
              product={product}
              onAddToCartButtonClick={handleAddToCartButtonClick}
            />
            <RecommendedProducts
              title={t('productDetail:recommended')}
              inventoryId="PRODUCT_DETAIL"
              inventoryType="PRODUCT_DETAIL"
              items={product && [product?.id]}
              enabled={!!product}
            />
            <SponsoredProducts
              title={t('productDetail:sponsored')}
              inventoryId="PRODUCT_DETAIL"
              inventoryType="PRODUCT_DETAIL"
              items={product && [product?.id]}
              numOfItems={2}
              enabled={!!product}
              css={`
                padding-bottom: ${space(12)};
              `}
            />
          </>
        )}
      </AppLayout>
    </>
  );
};

export default ProductDetailPage;
