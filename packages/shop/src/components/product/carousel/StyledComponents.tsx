import styled from 'styled-components/macro';

import Stack from '@rmp-demo-store/ui/stack';
import {
  fontSize,
  fontWeight,
  lineHeight,
  size,
  space,
} from '@rmp-demo-store/ui/theme-utils';

export const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollContainer = styled(Stack).attrs(() => ({
  spacing: 3,
}))`
  flex-wrap: nowrap;
  padding: 0 ${space(3)};

  & > *:last-child {
    padding-right: ${space(3)};
  }
`;

export const ErrorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductItem = {
  Container: styled(Stack).attrs(() => ({
    direction: 'column',
    spacing: 0.5,
  }))`
    width: ${size(32)};
    cursor: pointer;
    user-select: none;
    & * {
      user-select: none;
    }
  `,
  ImageContainer: styled.div`
    width: ${size(32)};
    height: ${size(32)};
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
  `,
  InfoContainer: styled.div`
    font-size: ${fontSize('sm')};
    min-height: 6.5rem;
  `,
  Title: styled.div`
    font-size: ${fontSize('sm')};
    font-weight: ${fontWeight('medium')};
    line-height: ${lineHeight('shorter')};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: ${space(0.5)};
    height: 2.5em;
  `,
  OriginalPrice: styled.div`
    font-size: ${fontSize('xs')};
    text-decoration: line-through;
    opacity: 0.4;
  `,
  FinalPrice: styled.div`
    font-size: ${fontSize('md')};
    font-weight: ${fontWeight('semiBold')};
  `,
};
