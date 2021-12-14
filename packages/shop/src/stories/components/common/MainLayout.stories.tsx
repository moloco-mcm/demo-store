import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import { fontSize } from '@rmp-demo-store/ui/theme-utils';
import MainLayout from '../../../components/common/main-layout';

export default {
  title: 'components/common/MainLayout',
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
} as Meta;

export const Basic = () => {
  return (
    <MainLayout>
      <div
        css={`
          font-size: ${fontSize('lg')};
          height: 1500px;
        `}
      >
        App Content
      </div>
    </MainLayout>
  );
};
