import React from 'react';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'styled-components/macro';

import { space } from '@rmp-demo-store/ui/theme-utils';

import { formatCurrency } from '../../../common/utils';
import SkeletonLoader from '../../common/skeleton-loader';
import Rating from '../rating';
import { ProductDisplayItem } from '../types';
import VisibilityChecker from '../../common/visibility-checker';
import { Container, ProductItem } from './StyledComponents';

type Props<T> = {
  className?: string;
  isLoading?: boolean;
  left?: T;
  right?: T;
  onClickItem?: (item: T) => void;
  onVisibleItem?: (item: T) => void;
};

export const DualProducts = <T extends ProductDisplayItem>(props: Props<T>) => {
  const { className, isLoading, left, right, onClickItem, onVisibleItem } =
    props;

  const renderProductItem = (item?: T) => {
    return (
      <VisibilityChecker
        fireOnce
        onVisible={() => !isLoading && item && onVisibleItem?.(item)}
      >
        <ProductItem.Container onClick={() => item && onClickItem?.(item)}>
          <ProductItem.ImageContainer>
            {isLoading ? (
              <ProductItem.ImageSkeleton />
            ) : (
              <ProductItem.Image src={item?.product.imageUrl} />
            )}
          </ProductItem.ImageContainer>
          <ProductItem.InfoContainer>
            <SkeletonLoader isLoaded={!isLoading} skeletonHeight={3}>
              <ProductItem.Title>
                {item?.isAd && (
                  <FontAwesomeIcon
                    icon={faAd}
                    css={`
                      margin-right: ${space(1)};
                      opacity: 0.7;
                      vertical-align: middle;
                    `}
                  />
                )}
                {item?.product.title}
              </ProductItem.Title>
            </SkeletonLoader>
            <Rating
              isLoading={isLoading}
              rating={item?.product.rating}
              reviewCount={item?.product.reviewCount}
              size="sm"
            />
            <ProductItem.PriceContainer>
              <SkeletonLoader isLoaded={!isLoading} skeletonHeight={3}>
                <>
                  {item?.product.salePrice ? (
                    <>
                      <ProductItem.FinalPrice>
                        {formatCurrency(item.product.salePrice.amount, {
                          currency: item.product.salePrice.currency,
                        })}
                      </ProductItem.FinalPrice>
                      <ProductItem.OriginalPrice>
                        {formatCurrency(item.product.price.amount, {
                          currency: item.product.price.currency,
                        })}
                      </ProductItem.OriginalPrice>
                    </>
                  ) : (
                    <ProductItem.FinalPrice>
                      {item &&
                        formatCurrency(item.product.price.amount, {
                          currency: item.product.price.currency,
                        })}
                    </ProductItem.FinalPrice>
                  )}
                </>
              </SkeletonLoader>
            </ProductItem.PriceContainer>
          </ProductItem.InfoContainer>
        </ProductItem.Container>
      </VisibilityChecker>
    );
  };
  return (
    <Container className={className}>
      {renderProductItem(left)}
      {renderProductItem(right)}
    </Container>
  );
};
