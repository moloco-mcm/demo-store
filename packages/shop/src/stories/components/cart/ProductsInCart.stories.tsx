import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import ProductsInCart from '../../../components/cart/products-in-cart';
import { MOCK_ITEMS } from './consts';

export default {
  title: 'components/cart/ProductsInCart',
  component: ProductsInCart,
} as Meta;

const Template: Story<React.ComponentProps<typeof ProductsInCart>> = (args) => (
  <ProductsInCart {...args} />
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

export const Error = Template.bind({});
Error.args = {
  isLoading: true,
  isError: true,
  items: MOCK_ITEMS,
};

export const Empty = Template.bind({});
Empty.args = {
  isLoading: false,
  isError: false,
  items: undefined,
};
