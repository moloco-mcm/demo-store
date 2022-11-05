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
    title: 'Hairdressing Scissors Hair Grooming Set',
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
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1001_1080.png',
    description:
      'This adjustable scissors set contains different types of tools, can meet your different needs. There is a screw on the scissors, which allows you to adjust the scissors tightness. The scissors are made of stainless steel, is not easy to be rusted, not easy to deform. It comes with a drawstring bag, let you can easily store these tools, so you can carry them easily. The tools are designed with smooth and fine surface, provide a good touch feeling. Specification: Material: Stainless steel + sponge. Color: Show as picture. Size: Scissors 17cm, Hair clip: 9cm, cleaning cloth: 11x7.5cm. Note There might be a bit color distortions due to different computer resolutions. There might be a slight errors due to different hand measurement. Package included: 1x Straight scissors. 1x Fine line scissors. 2x Hair clip. 1x Tool. 1x Cape. 1x Cleaning cloth. 1x Hairdressing tool. 1x Scissor with tooth. 1x Drawstring bag.',
    adAccountId: '10000',
  },
};

const RIGHT = {
  product: {
    id: '3602',
    title: 'Bath Buddy Thermometer',
    price: {
      currency: 'USD',
      amount: 30,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1000_1080.png',
    adAccountId: '10000',
  },
};

const AD_LEFT = {
  isAd: true,
  ...LEFT,
};

const AD_RIGHT = {
  isAd: true,
  ...RIGHT,
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
