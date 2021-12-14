import styled from 'styled-components/macro';

import Stack from '@rmp-demo-store/ui/stack';
import { fontWeight, space } from '@rmp-demo-store/ui/theme-utils';

export const Container = styled(Stack).attrs({
  direction: 'column',
  spacing: 1,
})``;

export const Title = styled.h3`
  padding: 0 ${space(3)};
  font-weight: ${fontWeight('bold')};
`;
