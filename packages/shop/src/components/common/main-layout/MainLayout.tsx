import React from 'react';
import 'styled-components/macro';

import { fontSize, fontWeight, color } from '@rmp-demo-store/ui/theme-utils';

import { Background, BannerContainer, AppContainer } from './StyledComponents';

type Props = {
  withSafeArea?: boolean;
};

export const MainLayout: React.FC<Props> = (props) => {
  const { children, withSafeArea } = props;
  return (
    <div>
      <Background />
      <BannerContainer>
        <div
          css={`
            margin-top: 50%;
            padding-right: 18%;
          `}
        >
          <h1
            css={`
              font-size: ${fontSize('xl')};
              font-weight: ${fontWeight('semiBold')};
            `}
          >
            Welcome to Moloco’s Demo Store!
          </h1>
          <p
            css={`
              color: ${color('gray.600')};
            `}
          >
            Experience how Moloco’s machine learning engine can work for your
            customers
          </p>
        </div>
      </BannerContainer>
      <AppContainer withSafeArea={withSafeArea}>{children}</AppContainer>
    </div>
  );
};
