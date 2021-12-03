import React from 'react';
import 'styled-components/macro';

import Stack from '@rmp-demo-store/ui/stack';
import ErrorDisplay from '@rmp-demo-store/ui/error-display';
import { space } from '@rmp-demo-store/ui/theme-utils';

import { Product } from '../../../common/types';
import { CartItem } from './cart-item/CartItem';

type Props = {
  isLoading?: boolean;
  isUpdating?: boolean;
  isError?: boolean;
  items?: {
    product: Product;
    quantity: number;
  }[];
  onDeleteItem?: (productId: string) => void;
  onUpdateQuantityOfItem?: (productId: string, newQuantity: number) => void;
};

export const ProductsInCart = (props: Props) => {
  const {
    isLoading,
    isUpdating,
    isError,
    items,
    onDeleteItem,
    onUpdateQuantityOfItem,
  } = props;

  if (isError) {
    return (
      <div
        css={`
          padding: ${space(3)};
        `}
      >
        <ErrorDisplay size="sm">
          {/* TODO: localize error message (@sjhan-moloco) */}
          <ErrorDisplay.Title>Something went wrong</ErrorDisplay.Title>
        </ErrorDisplay>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <CartItem isLoading={isLoading} />
      </div>
    );
  }

  return (
    <Stack direction="column" spacing={3}>
      {items?.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          isLoading={isLoading}
          isUpdating={isUpdating}
          onIncreaseQuantity={() =>
            onUpdateQuantityOfItem?.(item.product.id, item.quantity + 1)
          }
          onDecreaseQuantity={() =>
            onUpdateQuantityOfItem?.(item.product.id, item.quantity - 1)
          }
          onDeleteItem={() => onDeleteItem?.(item.product.id)}
        />
      ))}
    </Stack>
  );
};
