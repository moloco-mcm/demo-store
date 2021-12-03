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
  title: '닭가슴살外 고양이 통살 간식 23종 [모음]',
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
  imageUrl:
    'https://images.pet-friends.co.kr/storage/pet_friends/product/id/5/4/6/2/7/9/c/546279c7c5a42561f63ed6f37bd02bc3/10000/0692d8ed0b1a07bb2690f39794375acc.jpeg',
  description: '맛있는 고양이 간식 모음',
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
