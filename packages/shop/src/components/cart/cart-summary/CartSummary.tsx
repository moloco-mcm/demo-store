import React from 'react';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';
import { Product } from '../../../common/types';
import { formatCurrency } from '../../../common/utils';
import SkeletonLoader from '../../common/skeleton-loader';
import { Summary, Final } from './StyledComponents';

type Props = {
  isLoading?: boolean;
  items?: {
    product: Product;
    quantity: number;
  }[];
};

export const CartSummary = (props: Props) => {
  const { isLoading, items = [] } = props;

  const { t } = useTranslation('cart');

  const currency =
    items.length > 0 ? items[0].product.price.currency : undefined;

  const summary = items.reduce<{
    original: number;
    discount: number;
    final: number;
  }>(
    (acc, currentItem) => {
      const { product, quantity } = currentItem;
      return {
        original: acc.original + product.price.amount * quantity,
        discount:
          acc.discount +
          (product.salePrice
            ? (product.price.amount - product.salePrice.amount) * quantity
            : 0),
        final:
          acc.final +
          (product.salePrice
            ? product.salePrice.amount
            : product.price.amount) *
            quantity,
      };
    },
    {
      original: 0,
      discount: 0,
      final: 0,
    }
  );

  return (
    <>
      <Summary.Container>
        <Summary.Label>{t('originalPrice')}</Summary.Label>
        <SkeletonLoader isLoaded={!isLoading}>
          <Summary.Value>
            {formatCurrency(summary.original, { currency })}
          </Summary.Value>
        </SkeletonLoader>
        <Summary.Label>{t('discount')}</Summary.Label>
        <SkeletonLoader isLoaded={!isLoading}>
          <Summary.Value>
            -{formatCurrency(summary.discount, { currency })}
          </Summary.Value>
        </SkeletonLoader>
      </Summary.Container>
      <Final.Container>
        <Final.Label>{t('finalPrice')}</Final.Label>
        <SkeletonLoader isLoaded={!isLoading} skeletonHeight={3}>
          <Final.Value>
            {summary && formatCurrency(summary.final, { currency })}
          </Final.Value>
        </SkeletonLoader>
      </Final.Container>
    </>
  );
};
