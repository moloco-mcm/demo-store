import styled from 'styled-components/macro';

import {
  border,
  color,
  fontSize,
  fontWeight,
  space,
} from '@rmp-demo-store/ui/theme-utils';

export const Summary = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${space(2)};
    padding: ${space(3)};
    border-bottom: ${border(1)};
    border-color: inherit;
  `,
  Label: styled.div`
    color: ${color('gray.500')};
  `,
  Value: styled.div`
    text-align: right;
    font-weight: ${fontWeight('medium')};
  `,
};

export const Final = {
  Container: styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${space(2)};
    padding: ${space(3)};
    font-weight: ${fontWeight('medium')};
  `,
  Label: styled.div`
    font-size: ${fontSize('xl')};
  `,
  Value: styled.div`
    text-align: right;
    font-size: ${fontSize('xl')};
  `,
};
