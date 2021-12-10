import styled from 'styled-components/macro';

import {
  border,
  fontSize,
  fontWeight,
  size,
  space,
} from '@rmp-demo-store/ui/theme-utils';
export const ProductItem = {
  Container: styled.div`
    max-width: ${size('container.sm')};
    margin: 0 auto;
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
  InfoContainer: styled.div`
    padding: ${space(3)};
    border-bottom: ${border(1)};
    border-color: inherit;
  `,
  Title: styled.h3`
    font-weight: ${fontWeight('semiBold')};
    font-size: ${fontSize('xl')};
  `,
  PriceContainer: styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  `,
  OriginalPrice: styled.div`
    font-size: ${fontSize('sm')};
    text-decoration: line-through;
    opacity: 0.4;
  `,
  FinalPrice: styled.div`
    font-weight: ${fontWeight('semiBold')};
    font-size: ${fontSize('xl')};
  `,
  ActionsContainer: styled.div`
    margin-top: ${space(3)};
    display: flex;
    justify-content: flex-end;
  `,
  Description: styled.p`
    padding: ${space(3)};
  `,
};
