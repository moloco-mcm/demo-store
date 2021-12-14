import styled from 'styled-components/macro';

import Stack from '@rmp-demo-store/ui/stack';
import {
  fontSize,
  fontWeight,
  size,
  space,
} from '@rmp-demo-store/ui/theme-utils';
import Skeleton from '@rmp-demo-store/ui/skeleton';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${space(3)};
`;

export const ProductItem = {
  Container: styled.div`
    cursor: pointer;
  `,
  ImageContainer: styled.div`
    position: relative;
    width: 100%;
    padding-top: 100%;
  `,
  Image: styled.img`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  `,
  ImageSkeleton: styled(Skeleton)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
  `,
  InfoContainer: styled.div`
    padding-top: ${space(2)};
  `,
  Title: styled.h3`
    font-weight: ${fontWeight('semiBold')};
    font-size: ${fontSize('sm')};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  PriceContainer: styled(Stack).attrs({
    direction: 'column',
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
