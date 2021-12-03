import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import DualProducts from '../../../components/product/dual';

export default {
  title: 'components/product/DualProducts',
  component: DualProducts,
} as Meta;

const LEFT = {
  product: {
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
  },
};

const RIGHT = {
  product: {
    id: '3602',
    title: '고양이 낚시대 BEST 24종 [모음]',
    price: {
      currency: 'USD',
      amount: 30,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://images.pet-friends.co.kr/storage/pet_friends/product/id/a/d/3/4/e/3/d/ad34e3d2d2daa836ecbdca1a20028b5d/10000/f0ab7129674d7d4ed6730ccc540e91f6.jpeg',
  },
};

const AD_LEFT = {
  isAd: true,
  ...LEFT,
};

const AD_RIGHT = {
  isAd: true,
  ...LEFT,
};

const Template: Story<React.ComponentProps<typeof DualProducts>> = (args) => (
  <DualProducts {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  isLoading: false,
  left: LEFT,
  right: RIGHT,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  left: LEFT,
  right: RIGHT,
};

export const Ad = Template.bind({});
Ad.args = {
  isLoading: false,
  left: AD_LEFT,
  right: AD_RIGHT,
};
