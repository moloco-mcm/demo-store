import React from 'react';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import Stack from '@rmp-demo-store/ui/stack';
import { space } from '@rmp-demo-store/ui/theme-utils';
import { ErrorDisplay } from '@rmp-demo-store/ui/error-display';

import useSearch from '../../hooks/use-search';
import SingleProduct from '../../components/product/single';

type Props = {
  searchWord: string;
};

export const SearchResult: React.FC<Props> = (props) => {
  const { searchWord } = props;
  const { data, isLoading, isError } = useSearch(searchWord);
  const { t } = useTranslation('common');

  if (isError) {
    return (
      <ErrorDisplay size="sm">
        <ErrorDisplay.Title>{t('error.title')}</ErrorDisplay.Title>
      </ErrorDisplay>
    );
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      css={`
        padding: 0 ${space(2)} ${space(2)} ${space(2)};
      `}
    >
      {isLoading && <SingleProduct isLoading />}
      {!isLoading &&
        data?.products.map((p) => (
          <SingleProduct
            key={p.id}
            item={{
              product: p,
            }}
          />
        ))}
    </Stack>
  );
};
