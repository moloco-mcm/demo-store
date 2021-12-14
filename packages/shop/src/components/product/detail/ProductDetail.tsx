import React from 'react';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';

import Button from '@rmp-demo-store/ui/button';
import { SkeletonText } from '@rmp-demo-store/ui/skeleton/SkeletonText';

import { Product } from '../../../common/types';
import Rating from '../rating';
import { formatCurrency } from '../../../common/utils';
import { ProductItem } from './StyledComponents';
import SkeletonLoader from '../../common/skeleton-loader';

type Props = {
  isLoading?: boolean;
  isCartUpdating?: boolean;
  product?: Product;
  onAddToCartButtonClick?: (args: { productId: string }) => void;
};

export const ProductDetail = (props: Props) => {
  const { isLoading, product, isCartUpdating, onAddToCartButtonClick } = props;

  const { t } = useTranslation('common');

  const handleAddToCartButtonClick = () => {
    if (!product) return;
    onAddToCartButtonClick?.({ productId: product.id });
  };

  return (
    <ProductItem.Container>
      <ProductItem.ImageContainer>
        {!isLoading && (
          <ProductItem.Image src={product?.imageUrl}></ProductItem.Image>
        )}
      </ProductItem.ImageContainer>
      <ProductItem.InfoContainer>
        <SkeletonLoader isLoaded={!isLoading} skeletonHeight={3}>
          <ProductItem.Title>{product?.title}</ProductItem.Title>
        </SkeletonLoader>
        <Rating
          isLoading={isLoading}
          rating={product?.rating}
          reviewCount={product?.reviewCount}
        />
        <ProductItem.PriceContainer>
          <SkeletonLoader isLoaded={!isLoading} skeletonHeight={3}>
            <>
              {product?.salePrice ? (
                <>
                  <ProductItem.FinalPrice>
                    {formatCurrency(product.salePrice.amount, {
                      currency: product.salePrice.currency,
                    })}
                  </ProductItem.FinalPrice>
                  <ProductItem.OriginalPrice>
                    {formatCurrency(product.price.amount, {
                      currency: product.price.currency,
                    })}
                  </ProductItem.OriginalPrice>
                </>
              ) : (
                <ProductItem.FinalPrice>
                  {product &&
                    formatCurrency(product.price.amount, {
                      currency: product.price.currency,
                    })}
                </ProductItem.FinalPrice>
              )}
            </>
          </SkeletonLoader>
        </ProductItem.PriceContainer>
        {!isLoading && (
          <ProductItem.ActionsContainer>
            <Button
              colorScheme="purple"
              isLoading={isCartUpdating}
              onClick={handleAddToCartButtonClick}
            >
              {t('buttons.addToCart')}
            </Button>
          </ProductItem.ActionsContainer>
        )}
      </ProductItem.InfoContainer>
      <ProductItem.Description>
        {isLoading ? (
          <SkeletonText noOfLines={3} spacing={2} />
        ) : (
          product?.description
        )}
      </ProductItem.Description>
    </ProductItem.Container>
  );
};
