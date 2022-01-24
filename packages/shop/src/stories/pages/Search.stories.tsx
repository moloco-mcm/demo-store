import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import { rest } from 'msw';

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
    nextRouter: {
      path: '/search',
      asPath: '/search?searchWord=test',
    },
  },
  decorators: [reactQueryClientProviderDecorator()],
} as Meta;

const MOCK_PRODUCTS = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

const mockAuctionApiHandler = rest.post(
  '/api/rmp/auction',
  (_req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json({
        items: MOCK_PRODUCTS.map((p) => ({
          product: p,
          clickTrackers: [],
          impTrackers: [],
        })),
      })
    );
  }
);

const Template: Story<React.ComponentProps<typeof Search>> = (args) => (
  <Search {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};
Basic.parameters = {
  msw: [
    mockAuctionApiHandler,
    rest.post('/api/search', (_req, res, ctx) => {
      return res(
        ctx.delay(100),
        ctx.json({
          products: MOCK_PRODUCTS,
          hasNextPage: true,
        })
      );
    }),
  ],
};

export const Loading = Template.bind({});
Loading.args = {};
Loading.parameters = {
  msw: [
    mockAuctionApiHandler,
    rest.post('/api/search', (_req, res, ctx) => {
      return res(ctx.delay(1_000_000), ctx.status(500));
    }),
  ],
};

export const Error = Template.bind({});
Error.args = {};
Error.parameters = {
  msw: [
    mockAuctionApiHandler,
    rest.post('/api/search', (_req, res, ctx) => {
      return res(ctx.status(500));
    }),
  ],
};

export const NoResult = Template.bind({});
NoResult.args = {};
NoResult.parameters = {
  msw: [
    mockAuctionApiHandler,
    rest.post('/api/search', (_req, res, ctx) => {
      return res(
        ctx.json({
          products: [],
          hasNextPage: false,
        })
      );
    }),
  ],
};
