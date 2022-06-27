import { useRouter } from 'next/router';
import { DecidedItem } from '../../common/types';
import { fireTrackingEvents } from '../../common/utils/tracker';
import Carousel from '../../components/product/carousel';
import useRecommendedProducts from '../../hooks/use-recommended-products/useRecommendedProducts';
import { Container, Title } from './StyledComponents';

type Props = {
  className?: string;
  title?: string;
  numOfItems?: number;
  numOfRows?: number;
  inventoryId: string;
  items?: string[];
  enabled?: boolean;
};

export const RecommendedProducts = (props: Props) => {
  const {
    className,
    title,
    numOfItems = 30,
    numOfRows = 1,
    inventoryId,
    items,
    enabled,
  } = props;

  const router = useRouter();

  const { isLoading, data, isError } = useRecommendedProducts({
    inventoryId,
    numOfItems,
    items,
    enabled,
  });

  const recommendedItems = data?.items;

  const handleItemClick = (item: DecidedItem) => {
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

  return (
    <Container className={className}>
      {title && <Title>{title}</Title>}
      <Carousel<DecidedItem>
        numOfRows={numOfRows}
        isLoading={isLoading || enabled === false}
        items={recommendedItems}
        isError={isError}
        onClickItem={handleItemClick}
        onVisibleItem={handleItemVisible}
      />
    </Container>
  );
};
