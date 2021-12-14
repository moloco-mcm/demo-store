import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import CartSummary from '../../../components/cart/cart-summary';
import { MOCK_ITEMS } from './consts';

export default {
  title: 'components/cart/CartSummary',
  component: CartSummary,
} as Meta;

const Template: Story<React.ComponentProps<typeof CartSummary>> = (args) => (
  <CartSummary {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  isLoading: false,
  items: MOCK_ITEMS,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  items: MOCK_ITEMS,
};
