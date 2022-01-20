import React from 'react';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { ErrorDisplay } from '@rmp-demo-store/ui/error-display';
import Spinner from '@rmp-demo-store/ui/spinner';

import useSearch from '../../hooks/use-search';
import SingleProduct from '../../components/product/single';
import { ProductDisplayItem } from '../../components/product/types';

type Props = {
  searchWord: string;
};

export const SearchResult: React.FC<Props> = (props) => {
  const { searchWord } = props;

  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearch(searchWord);
  const { t } = useTranslation('common');

  if (isError) {
    return (
      <ErrorDisplay size="sm">
        <ErrorDisplay.Title>{t('error.title')}</ErrorDisplay.Title>
      </ErrorDisplay>
    );
  }

  if (isLoading) {
    return <SingleProduct isLoading />;
  }

  if (data?.pages.length === 1 && data?.pages[0].products.length === 0) {
    return <div>No results</div>;
  }

  const handleItemClick = (item: ProductDisplayItem) => {
    const { product } = item;
    router.push(`/products/${product.id}`);
  };

  const handleLastItemVisible = () => {
    fetchNextPage();
  };

  return (
    <>
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
    </>
  );
};
