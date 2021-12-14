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
import { ProductItem } from './StyledComponents';

type Props<T> = {
  className?: string;
  isLoading?: boolean;
  item?: T;
  onClickItem?: (item: T) => void;
  onVisibleItem?: (item: T) => void;
};

export const SingleProduct = <T extends ProductDisplayItem>(
  props: Props<T>
) => {
  const { className, isLoading, item, onClickItem, onVisibleItem } = props;

  const handleClick = () => {
    if (isLoading) return;
    if (!item) return;
    onClickItem?.(item);
  };

  const handleVisible = () => {
    if (isLoading) return;
    if (!item) return;
    onVisibleItem?.(item);
  };

  return (
    <VisibilityChecker onVisible={handleVisible}>
      <ProductItem.Container className={className} onClick={handleClick}>
        <ProductItem.ImageContainer>
          <SkeletonLoader
            isLoaded={!isLoading}
            skeletonHeight={'full'}
            css={`
              width: 100%;
              height: 100%;
            `}
          >
            <>
              <ProductItem.Image src={item?.product.imageUrl} />
            </>
          </SkeletonLoader>
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
                    {item?.product &&
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

export default SingleProduct;
