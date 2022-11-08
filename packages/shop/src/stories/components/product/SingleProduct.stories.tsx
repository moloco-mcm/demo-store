import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import SingleProduct from '../../../components/product/single';

export default {
  title: 'components/product/SingleProduct',
  component: SingleProduct,
} as Meta;

const ITEM = {
  product: {
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
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1000_1080.png',
    thumbnailUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1000_300.png',
    description:
      'Available in a friendly duck design, the Bath Pal floating thermometer helps you keep your baby’s bath water at a comfortable temperature. Its soft edges are baby friendly and allow the baby to be engaged while bathing. You also get to read the temperature continuously and the thermometer works without a battery.',
    adAccountId: '10000',
  },
};

const AD_ITEM = {
  isAd: true,
  ...ITEM,
};

const Template: Story<React.ComponentProps<typeof SingleProduct>> = (args) => (
  <SingleProduct {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  isLoading: false,
  item: ITEM,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  item: ITEM,
};

export const Ad = Template.bind({});
Ad.args = {
  isLoading: false,
  item: AD_ITEM,
};
