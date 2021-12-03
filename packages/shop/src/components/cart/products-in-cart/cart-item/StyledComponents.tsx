import styled from 'styled-components/macro';

import Stack from '@rmp-demo-store/ui/stack';
import { IconButton } from '@rmp-demo-store/ui/button';

import {
  border,
  fontSize,
  fontWeight,
  radius,
  size,
  space,
} from '@rmp-demo-store/ui/theme-utils';

export const Item = {
  Container: styled.div`
    border-bottom: ${border(1)};
    border-color: inherit;
  `,
  ImageContainer: styled.div`
    flex: 0 0 ${size(24)};
    width: ${size(24)};
    height: ${size(24)};
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  InfoContainer: styled.div`
    flex: 1;
  `,
  Title: styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  OriginalPrice: styled.div`
    font-size: ${fontSize('xs')};
    text-decoration: line-through;
    opacity: 0.4;
  `,
  FinalPrice: styled.div`
    font-size: ${fontSize('lg')};
    font-weight: ${fontWeight('semiBold')};
  `,
  ActionsContainer: styled(Stack).attrs({
    spacing: 3,
    justify: 'space-between',
  })<{ isHidden?: boolean }>`
    margin: ${space(3)} 0;
    visibility: ${(props) => (props.isHidden ? 'hidden' : 'visible')};
  `,
  QtyChangeButtonGroup: styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: stretch;
  `,
  QtyDecreaseButton: styled(IconButton).attrs({
    variant: 'contained',
    colorScheme: 'gray',
    size: 'sm',
  })`
    border-radius: ${radius('md')} 0 0 ${radius('md')};
  `,
  QtyIncreaseButton: styled(IconButton).attrs({
    variant: 'contained',
    colorScheme: 'gray',
    size: 'sm',
  })`
    border-radius: 0 ${radius('md')} ${radius('md')} 0;
  `,
  Qty: styled.div`
    border-top: ${border(1)};
    border-bottom: ${border(1)};
    border-color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${fontWeight('medium')};
    user-select: none;
    padding: 0 ${space(3)};
  `,
  DeleteButton: styled(IconButton).attrs({
    variant: 'outline',
    colorScheme: 'gray',
    size: 'sm',
  })``,
};
