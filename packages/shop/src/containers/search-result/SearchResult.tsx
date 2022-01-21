import React from 'react';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { ErrorDisplay } from '@rmp-demo-store/ui/error-display';
import Spinner from '@rmp-demo-store/ui/spinner';
import Stack from '@rmp-demo-store/ui/stack';

import useSearch from '../../hooks/use-search';
import SingleProduct from '../../components/product/single';
import { ProductDisplayItem } from '../../components/product/types';
import { space } from '@rmp-demo-store/ui/theme-utils';
import useSponsoredProducts from '../../hooks/use-sponsored-products';
import Carousel from '../../components/product/carousel';
import { fireTrackingEvents } from '../../common/utils/tracker';
import { DecidedItem } from '../../common/types';
import { SectionTitle } from './StyledComponents';

type Props = {
  searchWord: string;
};

const CACHE_TIME = 1000 * 60 * 5;
const STALE_TIME = 1000 * 60 * 5;

export const SearchResult: React.FC<Props> = (props) => {
  const { searchWord } = props;

  const router = useRouter();

  const {
    isLoading: isAdsLoading,
    data: adsData,
    isError: isAdsError,
  } = useSponsoredProducts({
    inventoryId: 'SEARCH',
    inventoryType: 'SEARCH',
    numOfItems: 10,
    searchQuery: searchWord,
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearch({ searchWord, staleTime: STALE_TIME });

  const { t: commonT } = useTranslation('common');
  const { t: searchT } = useTranslation('search');

  if (isError) {
    return (
      <ErrorDisplay
        size="sm"
        css={`
          padding: ${space(6)} 0;
        `}
      >
        <ErrorDisplay.Title>{commonT('error.title')}</ErrorDisplay.Title>
      </ErrorDisplay>
    );
  }

  // show sponsored products and search result simultaneously
  if (isLoading || isAdsLoading) {
    return (
      <SingleProduct
        isLoading
        css={`
          padding: ${space(3)};
        `}
      />
    );
  }

  const sponsoredItems = adsData?.items.map((item) => ({
    isAd: true,
    ...item,
  }));

  const hasSearchResult = !(
    data?.pages.length === 1 && data?.pages[0].products.length === 0
  );

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

  const handleLastItemVisible = () => {
    fetchNextPage();
  };

  return (
    <>
      {!isAdsError && sponsoredItems && sponsoredItems?.length > 0 && (
        <section>
          <SectionTitle>{searchT('sponsoredProducts')}</SectionTitle>
          <Carousel
            numOfRows={1}
            isLoading={isAdsLoading}
            items={sponsoredItems}
            onClickItem={handleItemClick}
            onVisibleItem={handleItemVisible}
          />
        </section>
      )}
      <section>
        {hasSearchResult ? (
          <>
            <SectionTitle>
              {searchT('searchResult', { searchWord })}
            </SectionTitle>
            <Stack
              direction="column"
              spacing={2}
              css={`
                padding: 0 ${space(3)} ${space(3)} ${space(3)};
              `}
            >
              {data?.pages.map((page, pageIndex) => {
                const isLastPage = data.pages.length - 1 === pageIndex;

                return page.products.map((p, index) => {
                  const isLastItem = page.products.length - 1 === index;

                  return (
                    <SingleProduct
                      key={`${p.id}-${index}`}
                      item={{
                        product: p,
                      }}
                      onClickItem={handleItemClick}
                      onVisibleItem={
                        isLastPage && isLastItem && hasNextPage
                          ? handleLastItemVisible
                          : undefined
                      }
                    />
                  );
                });
              })}
              {isFetchingNextPage && (
                <div
                  css={`
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <Spinner />
                </div>
              )}
            </Stack>
          </>
        ) : (
          <ErrorDisplay
            size="sm"
            css={`
              padding: ${space(6)} 0;
            `}
          >
            <ErrorDisplay.Title>
              {searchT('noResults.title', { searchWord })}
            </ErrorDisplay.Title>
            <ErrorDisplay.Message>
              {searchT('noResults.message')}
            </ErrorDisplay.Message>
          </ErrorDisplay>
        )}
      </section>
    </>
  );
};
