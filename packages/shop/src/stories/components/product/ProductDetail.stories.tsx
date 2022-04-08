import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import ProductDetail from '../../../components/product/detail';

export default {
  title: 'components/product/ProductDetail',
  component: ProductDetail,
} as Meta;

const PRODUCT = {
  id: '3606',
  title: 'Bath Buddy Thermometer',
  price: {
    currency: 'USD',
    amount: 100,
  },
  salePrice: {
    currency: 'USD',
    amount: 80,
  },
  rating: 4.3,
  reviewCount: 9433,
  imageUrl: 'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1000_1080.png',
  description:
    'Available in a friendly duck design, the Bath Pal floating thermometer helps you keep your baby’s bath water at a comfortable temperature. Its soft edges are baby friendly and allow the baby to be engaged while bathing. You also get to read the temperature continuously and the thermometer works without a battery.',
};

const Template: Story<React.ComponentProps<typeof ProductDetail>> = (args) => (
  <ProductDetail {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  isLoading: false,
  product: PRODUCT,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  product: PRODUCT,
};

export const UpdatingCart = Template.bind({});
UpdatingCart.args = {
  isLoading: false,
  isCartUpdating: true,
  product: PRODUCT,
};
