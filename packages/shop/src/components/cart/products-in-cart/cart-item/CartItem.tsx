import React from 'react';
import 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMinus,
  faPlus,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import Stack from '@rmp-demo-store/ui/stack';

import { Product } from '../../../../common/types';
import SkeletonLoader from '../../../common/skeleton-loader';
import { formatCurrency } from '../../../../common/utils';
import { Item } from './StyledComponents';

type Props = {
  isLoading?: boolean;
  isUpdating?: boolean;
  item?: {
    product: Product;
    quantity: number;
  };
  onIncreaseQuantity?: () => void;
  onDecreaseQuantity?: () => void;
  onDeleteItem?: () => void;
};

export const CartItem = (props: Props) => {
  const {
    isLoading,
    isUpdating,
    item,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onDeleteItem,
  } = props;

  const isLastQuantity = (item?.quantity || 0) - 1 < 1;

  return (
    <Item.Container>
      <Stack spacing={3}>
        <Item.ImageContainer>
          <SkeletonLoader
            isLoaded={!isLoading}
            skeletonHeight={'full'}
            css={`
              width: 100%;
              height: 100%;
            `}
          >
            <>
              <Item.Image
                src={item?.product.thumbnailUrl}
                alt="Product Image"
              />
            </>
          </SkeletonLoader>
        </Item.ImageContainer>
        <Item.InfoContainer>
          <SkeletonLoader isLoaded={!isLoading}>
            <Item.Title>{item?.product.title}</Item.Title>
          </SkeletonLoader>
          <SkeletonLoader isLoaded={!isLoading}>
            {item?.product.salePrice ? (
              <>
                <Item.FinalPrice>
                  {item &&
                    formatCurrency(item.product.salePrice.amount, {
                      currency: item.product.salePrice.currency,
                    })}
                </Item.FinalPrice>
                <Item.OriginalPrice>
                  {item &&
                    formatCurrency(item.product.price.amount, {
                      currency: item.product.price.currency,
                    })}
                </Item.OriginalPrice>
              </>
            ) : (
              <Item.FinalPrice>
                {item &&
                  formatCurrency(item.product.price.amount, {
                    currency: item.product.price.currency,
                  })}
              </Item.FinalPrice>
            )}
          </SkeletonLoader>
        </Item.InfoContainer>
      </Stack>
      <Item.ActionsContainer isHidden={isLoading}>
        <Item.DeleteButton
          onClick={() => onDeleteItem?.()}
          disabled={isUpdating}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Item.DeleteButton>
        <Item.QtyChangeButtonGroup>
          {isLastQuantity ? (
            <Item.QtyDecreaseButton
              onClick={() => onDeleteItem?.()}
              disabled={isUpdating}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Item.QtyDecreaseButton>
          ) : (
            <Item.QtyDecreaseButton
              onClick={() => onDecreaseQuantity?.()}
              disabled={isUpdating}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Item.QtyDecreaseButton>
          )}

          <Item.Qty>{item?.quantity}</Item.Qty>
          <Item.QtyIncreaseButton
            onClick={() => onIncreaseQuantity?.()}
            disabled={isUpdating}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Item.QtyIncreaseButton>
        </Item.QtyChangeButtonGroup>
      </Item.ActionsContainer>
    </Item.Container>
  );
};
