import { breakpoints, color, space } from '@rmp-demo-store/ui/theme-utils';
import styled, { css } from 'styled-components/macro';

export const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: 0;
  background-color: ${color('gray.50')};
`;

export const BannerContainer = styled.div`
  position: fixed;
  width: 512px;
  height: 100%;

  display: none;
  @media only screen and (min-width: ${breakpoints('lg')}) {
    display: flex;
    margin: 0 0 0 calc(50vw - 512px);
  }
`;

export const AppContainer = styled.div<{ withSafeArea?: boolean }>`
  position: relative;
  width: 100%;
  min-height: 100vh;

  @media only screen and (min-width: ${breakpoints('sm')}) {
    width: 420px;
    margin: 0 auto;
  }

  @media only screen and (min-width: ${breakpoints('lg')}) {
    margin: 0 0 0 calc(50vw - 1px);
  }

  background: ${color('white')};
  border-width: 0 1px;
  border-color: inherit;

  ${(props) =>
    props.withSafeArea &&
    css`
      padding-bottom: ${space(12)};
    `}
`;
