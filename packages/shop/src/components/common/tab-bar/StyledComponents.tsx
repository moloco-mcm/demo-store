import styled, { css } from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  border,
  space,
  color,
  breakpoints,
} from '@rmp-demo-store/ui/theme-utils';

export const Container = styled.nav`
  position: fixed;
  width: 100%;
  @media only screen and (min-width: ${breakpoints('sm')}) {
    width: calc(420px - 2px);
  }
  bottom: 0;
  border-top: ${border(1)};
  border-color: inherit;
  z-index: 10;
  background-color: ${color('white')};

  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const TabItem = styled.a`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${space(3)} 0;
  cursor: not-allowed;

  &[href] {
    cursor: pointer;
  }
`;

const ACTIVE_ITEM_STYLE = css`
  color: ${color('purple.500')};
`;

export const TabItemIcon = styled(FontAwesomeIcon).attrs({
  size: 'lg',
})<{ $isActive?: boolean }>`
  ${(props) => props.$isActive && ACTIVE_ITEM_STYLE};
`;
