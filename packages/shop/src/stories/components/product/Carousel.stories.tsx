import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import Carousel from '../../../components/product/carousel';

export default {
  title: 'components/product/Carousel',
  component: Carousel,
} as Meta;

const Template: Story<React.ComponentProps<typeof Carousel>> = (args) => (
  <Carousel {...args} />
);

const items: React.ComponentProps<typeof Carousel>['items'] = [
  {
    product: {
      id: '3600',
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
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3601',
      title: 'Hairdressing Scissors Hair Grooming Set',
      price: {
        currency: 'USD',
        amount: 2600,
      },
      rating: 4.3,
      reviewCount: 2600,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1001_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1001_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3602',
      title: 'Baby Soothing Body Wash',
      price: {
        currency: 'USD',
        amount: 12400,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1002_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1002_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3603',
      title: 'Birthday party paper shavings',
      price: {
        currency: 'USD',
        amount: 17000,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1003_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1003_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3604',
      title: 'Baby Shea Butter Oil Rub w/ Argan Oil',
      price: {
        currency: 'USD',
        amount: 129,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1004_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1004_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3605',
      title: 'Baby Shampoo Cap',
      price: {
        currency: 'USD',
        amount: 100,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1005_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1005_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3606',
      title: 'Silicone Skin Cream',
      price: {
        currency: 'USD',
        amount: 2600,
      },
      rating: 4.3,
      reviewCount: 2600,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1006_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1006_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3607',
      title: 'Diaper Rash Cream',
      price: {
        currency: 'USD',
        amount: 12400,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1007_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1007_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3608',
      title: 'Ezcema Care Moisturizing Cream',
      price: {
        currency: 'USD',
        amount: 17000,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1008_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1008_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3609',
      title: 'Baby  Powder',
      price: {
        currency: 'USD',
        amount: 129,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1009_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1009_300.png',
      adAccountId: '10000',
    },
  },
  {
    product: {
      id: '3610',
      title: 'Baby Food Container ',
      price: {
        currency: 'USD',
        amount: 100,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1010_1080.png',
      thumbnailUrl:
        'https://rmp-cdn.moloco.com/moloco-feed/images/w300/1010_300.png',
      adAccountId: '10000',
    },
  },
];

export const Basic = Template.bind({});
Basic.args = {
  items,
};

export const TwoRows = Template.bind({});
TwoRows.args = {
  items,
  numOfRows: 2,
};

export const ThreeRows = Template.bind({});
ThreeRows.args = {
  items,
  numOfRows: 3,
};

export const Loading = Template.bind({});
Loading.args = {
  items,
  isLoading: true,
};
