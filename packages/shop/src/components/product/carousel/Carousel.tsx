import React from 'react';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd } from '@fortawesome/free-solid-svg-icons';

import { space } from '@rmp-demo-store/ui/theme-utils';
import ErrorDisplay from '@rmp-demo-store/ui/error-display';

import Rating from '../rating';
import {
  Container,
  ScrollContainer,
  ErrorContainer,
  ProductItem,
} from './StyledComponents';
import { ProductItemSkeletons } from './ProductItemSkeletons';
import { formatCurrency } from '../../../common/utils';
import { ProductDisplayItem } from '../types';
import VisibilityChecker from '../../common/visibility-checker';

type Props<T> = {
  isLoading?: boolean;
  numOfRows?: number;
  items?: T[];
  onClickItem?: (item: T) => void;
  onVisibleItem?: (item: T) => void;
  isError?: boolean;
};

type ScrollState = 'START' | 'DRAGGING' | 'IDLE';

export const Carousel = <T extends ProductDisplayItem>(props: Props<T>) => {
  const {
    numOfRows = 1,
    isLoading,
    items,
    isError,
    onClickItem,
    onVisibleItem,
  } = props;

  const { t } = useTranslation('common');

  const scrollState = React.useRef<ScrollState>('IDLE');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mousePosition = React.useRef<{
    mouseX: number;
    scrollLeft: number;
  } | null>(null);

  React.useEffect(() => {
    // reset scroll position
    if (!containerRef.current) return;
    containerRef.current.scrollTo({ left: 0 });
  }, [isLoading, items]);

  const itemChunks =
    !isLoading &&
    items?.reduce<T[][]>((acc, current, index) => {
      const columnIndex = Math.floor(index / numOfRows);
      if (!acc[columnIndex]) {
        acc[columnIndex] = [];
      }
      acc[columnIndex].push(current);
      return acc;
    }, []);

  const productItems =
    itemChunks &&
    itemChunks.map((c, index) => (
      <div key={index}>
        {c?.map((item) => (
          <VisibilityChecker
            key={item.product.id}
            fireOnce
            onVisible={() => {
              onVisibleItem?.(item);
            }}
          >
            <div
              onMouseUp={() => {
                if (scrollState.current === 'DRAGGING') return;
                onClickItem?.(item);
              }}
            >
              <ProductItem.Container>
                <ProductItem.ImageContainer>
                  <ProductItem.Image
                    src={item.product.thumbnailUrl}
                    alt="Picture of the product"
                    draggable={false}
                  />
                </ProductItem.ImageContainer>
                <ProductItem.InfoContainer>
                  <ProductItem.Title>
                    {item.isAd && (
                      <FontAwesomeIcon
                        icon={faAd}
                        css={`
                          margin-right: ${space(1)};
                          opacity: 0.7;
                          vertical-align: middle;
                        `}
                      />
                    )}
                    {item.product.title}
                  </ProductItem.Title>
                  <Rating
                    rating={item.product.rating}
                    reviewCount={item.product.reviewCount}
                    size="xs"
                  />
                  {item.product.salePrice ? (
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
                      {formatCurrency(item.product.price.amount, {
                        currency: item.product.price.currency,
                      })}
                    </ProductItem.FinalPrice>
                  )}
                </ProductItem.InfoContainer>
              </ProductItem.Container>
            </div>
          </VisibilityChecker>
        ))}
      </div>
    ));

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!containerRef.current) return;
    e.stopPropagation();

    mousePosition.current = {
      scrollLeft: containerRef.current.scrollLeft,
      mouseX: e.clientX,
    };

    scrollState.current = 'START';
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!containerRef.current) return;
    if (!mousePosition.current) return;
    if (scrollState.current === 'IDLE') return;

    const dx = e.clientX - mousePosition.current.mouseX;
    containerRef.current.scrollLeft = mousePosition.current.scrollLeft - dx;

    scrollState.current = 'DRAGGING';
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!containerRef.current) return;
    scrollState.current = 'IDLE';
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!containerRef.current) return;
    scrollState.current = 'IDLE';
  };

  if (isError) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorDisplay size="sm">
            <ErrorDisplay.Title>{t('error.title')}</ErrorDisplay.Title>
          </ErrorDisplay>
        </ErrorContainer>
        <ScrollContainer
          css={`
            visibility: hidden;
          `}
        >
          <ProductItemSkeletons numOfRows={numOfRows} />
        </ScrollContainer>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container ref={containerRef}>
        <ScrollContainer>
          <ProductItemSkeletons numOfRows={numOfRows} />
        </ScrollContainer>
      </Container>
    );
  }

  return (
    <Container
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <ScrollContainer>{productItems}</ScrollContainer>
    </Container>
  );
};
