import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';

import reactQueryClientProviderDecorator from '../decorators/reactQueryClientProviderDecorator';
import Search from '../../pages/search/index.page';

export default {
  title: 'pages/Search',
  component: Search,
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
  decorators: [reactQueryClientProviderDecorator()],
} as Meta;

const Template: Story<React.ComponentProps<typeof Search>> = (args) => (
  <Search {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
