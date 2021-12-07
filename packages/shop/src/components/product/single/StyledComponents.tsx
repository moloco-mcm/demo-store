import styled from 'styled-components/macro';

import {
  border,
  fontSize,
  fontWeight,
  size,
  space,
} from '@rmp-demo-store/ui/theme-utils';
import Stack from '@rmp-demo-store/ui/stack';

export const ProductItem = {
  Container: styled.div`
    display: flex;
    cursor: pointer;
  `,
  ImageContainer: styled.div`
    width: ${size(32)};
    height: ${size(32)};
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  InfoContainer: styled.div`
    flex: 1;
    padding-left: ${space(3)};
  `,
  Title: styled.h3`
    font-weight: ${fontWeight('semiBold')};
    font-size: ${fontSize('md')};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  PriceContainer: styled(Stack).attrs({
    spacing: 1,
    align: 'baseline',
  })``,
  OriginalPrice: styled.div`
    font-size: ${fontSize('xs')};
    text-decoration: line-through;
    opacity: 0.4;
  `,
  FinalPrice: styled.div`
    font-weight: ${fontWeight('semiBold')};
    font-size: ${fontSize('md')};
  `,
};
