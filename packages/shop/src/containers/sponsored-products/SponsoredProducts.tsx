import React from 'react';
import { useRouter } from 'next/router';
import 'styled-components/macro';

import SingleProduct from '../../components/product/single';
import useSponsoredAds from '../../hooks/use-sponsored-products';
import {
  Container,
  Title,
  ProductContainer,
  TitleContainer,
} from './StyledComponents';
import DualProducts from '../../components/product/dual';
import Carousel from '../../components/product/carousel';
import SkeletonLoader from '../../components/common/skeleton-loader';
import { fireTrackingEvents } from '../../common/utils/tracker';
import { DecidedItem } from '../../common/types';

type Props = {
  className?: string;
  title?: string;
  numOfItems?: number;
  inventoryType: string;
  inventoryId: string;
  items?: string[];
  enabled?: boolean;
  searchQuery?: string;
};

type SponsoredItem = DecidedItem & { isAd?: boolean };

export const SponsoredProducts = (props: Props) => {
  const {
    className,
    title,
    numOfItems = 1,
    inventoryType,
    inventoryId,
    items,
    enabled = true,
    searchQuery,
  } = props;

  const router = useRouter();

  const { isLoading, data, isError } = useSponsoredAds({
    inventoryId,
    inventoryType,
    numOfItems: 10,
    items,
    enabled,
    searchQuery,
  });

  const sponsoredItems = data?.items.map((item) => ({ isAd: true, ...item }));

  const handleItemClick = (item: SponsoredItem) => {
    const { product, clickTrackers } = item;

    if (clickTrackers) {
      fireTrackingEvents(clickTrackers);
    }

    router.push(`/products/${product.id}`);
  };

  const handleItemVisible = (item: DecidedItem) => {
    const { impTrackers } = item;
    if (impTrackers) {
      fireTrackingEvents(impTrackers);
    }
  };

  // render nothing when error occurs
  if (isError) return null;

  // render nothing when no items has been returned from auction
  if (sponsoredItems && sponsoredItems.length === 0) return null;

  return (
    <Container className={className}>
      <TitleContainer>
        {title && (
          <SkeletonLoader isLoaded={!isLoading && enabled}>
            <Title>{title}</Title>
          </SkeletonLoader>
        )}
      </TitleContainer>
      {numOfItems === 1 && (
        <ProductContainer>
          <SingleProduct<SponsoredItem>
            item={sponsoredItems?.[0]}
            isLoading={isLoading || enabled === false}
            onClickItem={handleItemClick}
            onVisibleItem={handleItemVisible}
          />
        </ProductContainer>
      )}
      {numOfItems === 2 && (
        <ProductContainer>
          <DualProducts<SponsoredItem>
            left={sponsoredItems?.[0]}
            right={sponsoredItems?.[1]}
            isLoading={isLoading || enabled === false}
            onClickItem={handleItemClick}
            onVisibleItem={handleItemVisible}
          />
        </ProductContainer>
      )}
      {numOfItems >= 3 && (
        <Carousel<SponsoredItem>
          numOfRows={1}
          isLoading={isLoading || enabled === false}
          items={sponsoredItems}
          isError={isError}
          onClickItem={handleItemClick}
          onVisibleItem={handleItemVisible}
        />
      )}
    </Container>
  );
};
