import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';

import reactQueryClientProviderDecorator from '../decorators/reactQueryClientProviderDecorator';
import Home from '../../pages/index.page';

export default {
  title: 'pages/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
  decorators: [reactQueryClientProviderDecorator()],
} as Meta;

const Template: Story<React.ComponentProps<typeof Home>> = (args) => (
  <Home {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
