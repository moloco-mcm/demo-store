import React from 'react';
import { Grid, Top, Side, Content } from './StyledComponents';

type Props = {
  top?: React.ReactNode;
  side?: React.ReactNode;
  content: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ top, side, content }) => {
  return (
    <Grid>
      {top && <Top>{top}</Top>}
      {side && <Side>{side}</Side>}
      <Content>{content}</Content>
    </Grid>
  );
};

export default MainLayout;
