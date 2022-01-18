import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';

import CartPage from '../../pages/cart/index.page';
import reactQueryClientProviderDecorator from '../decorators/reactQueryClientProviderDecorator';

export default {
  title: 'pages/Cart',
  component: CartPage,
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
  decorators: [reactQueryClientProviderDecorator()],
} as Meta;

const Template: Story<React.ComponentProps<typeof CartPage>> = (args) => (
  <CartPage {...args} />
);
export const Basic = Template.bind({});
Basic.args = {};
