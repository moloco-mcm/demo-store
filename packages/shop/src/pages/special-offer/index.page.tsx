import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import keyBy from 'lodash/keyBy';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import Stack from '@rmp-demo-store/ui/stack';
import { fontSize, fontWeight, space } from '@rmp-demo-store/ui/theme-utils';
import ErrorDisplay from '@rmp-demo-store/ui/error-display';

import {
  fetchCreativeAuctionLogDocSnapshot,
  translateCreativeAuctionLogDocToCreativeAuctionLog,
} from '../../common/api-utils/creativeAuctionLog';
import { translateProductDocsToProducts } from '../../common/api-utils/products';
import { getFirebaseAdminApp } from '../../common/firebase-admin';
import { ApiStandardErrorCode, DecidedItem, Seller } from '../../common/types';
import { asyncTryCatch, isAsyncTryCatchError } from '../../common/utils';
import { AppLayout } from '../../containers/app-layout';
import SingleProduct from '../../components/product/single';
import { ProductDisplayItem } from '../../components/product/types';
import { fireTrackingEvents } from '../../common/utils/tracker';
import {
  fetchSellerDocSnapshot,
  translateSellerDocToSeller,
} from '../../common/api-utils/seller';

type Props = {
  seller?: Seller;
  decidedItems?: DecidedItem[];
  error?: {
    code: ApiStandardErrorCode;
    message: string;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query } = context;

  const requestId = query?.requestId;
  if (typeof requestId !== 'string') {
    return {
      props: {
        error: {
          code: 'BAD_REQUEST',
          message: 'invalid request',
        },
      },
    };
  }

  const auctionLogFetchResult = await asyncTryCatch(() =>
    fetchCreativeAuctionLogDocSnapshot(requestId)
  );

  if (isAsyncTryCatchError(auctionLogFetchResult)) {
    return {
      props: {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch auction log',
        },
      },
    };
  }

  const [auctionLogDocSnapshot] = auctionLogFetchResult;

  const auctionLog = translateCreativeAuctionLogDocToCreativeAuctionLog(
    auctionLogDocSnapshot
  );

  if (!auctionLog || !auctionLog.response.items) {
    return {
      props: {
        error: {
          code: 'NOT_FOUND',
          message: 'Not found',
        },
      },
    };
  }

  // fetch products
  const { items } = auctionLog.response;
  const firestore = getFirebaseAdminApp().firestore();

  const productDocRefs = items.map(({ itemId }) =>
    firestore.collection('products').doc(itemId)
  );

  const productFetchResult = await asyncTryCatch(() =>
    firestore.getAll(...productDocRefs)
  );

  if (isAsyncTryCatchError(productFetchResult)) {
    return {
      props: {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch products',
        },
      },
    };
  }

  const [productDocSnapshots] = productFetchResult;

  const products = translateProductDocsToProducts(productDocSnapshots);

  const productIdToDecidedItemsMap = keyBy(items, (item) => item.itemId);

  const decidedItems: DecidedItem[] = products.map((product) => {
    const decidedItem = productIdToDecidedItemsMap[product.id];
    return {
      product: product,
      impTrackers: decidedItem.impTrackers,
      clickTrackers: decidedItem.clickTrackers,
    };
  });

  // fetch seller information based on the first item
  const sellerId = decidedItems[0].product.adAccountId;

  const sellerFetchResult = await asyncTryCatch(() =>
    fetchSellerDocSnapshot(sellerId)
  );

  if (isAsyncTryCatchError(sellerFetchResult)) {
    return {
      props: {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch seller information',
        },
      },
    };
  }

  const [sellerDocSnapshot] = sellerFetchResult;
  const seller = translateSellerDocToSeller(sellerDocSnapshot);

  return {
    props: {
      seller,
      decidedItems,
    },
  };
};

const SpecialOfferPage: NextPage<Props> = (props) => {
  const { seller, decidedItems, error } = props;

  const router = useRouter();
  const { t } = useTranslation();

  const handleItemClick = (item: ProductDisplayItem) => {
    const { product } = item;
    router.push(`/products/${product.id}`);
  };

  const handleItemVisible = (item: DecidedItem) => {
    const { impTrackers } = item;
    if (impTrackers) {
      fireTrackingEvents(impTrackers);
    }
  };

  return (
    <>
      <Head>
        <title>{t('specialOffer:title')}</title>
      </Head>
      <AppLayout
        title="" // empty title
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
            <div
              css={`
                padding: ${space(2)} ${space(3)};
              `}
            >
              <h1
                css={`
                  font-size: ${fontSize('lg')};
                  font-weight: ${fontWeight('bold')};
                `}
              >
                {seller?.name}
              </h1>
              <h3
                css={`
                  font-size: ${fontSize('sm')};
                `}
              >
                Special offer
              </h3>
            </div>
            <Stack
              direction="column"
              spacing={2}
              css={`
                padding: 0 ${space(3)} ${space(3)} ${space(3)};
              `}
            >
              {decidedItems?.map((item, index) => {
                return (
                  <SingleProduct
                    key={`${item.product.id}-${index}`}
                    item={{
                      product: item.product,
                    }}
                    onClickItem={handleItemClick}
                    onVisibleItem={() => handleItemVisible(item)}
                  />
                );
              })}
            </Stack>
          </>
        )}
      </AppLayout>
    </>
  );
};

export default SpecialOfferPage;
