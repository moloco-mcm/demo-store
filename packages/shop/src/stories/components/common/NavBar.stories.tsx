import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import NavBar from '../../../components/common/nav-bar';

export default {
  title: 'components/common/NavBar',
  component: NavBar,
} as Meta;

const Template: Story<React.ComponentProps<typeof NavBar>> = (args) => (
  <NavBar {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  title: '상품 상세보기',
};

export const WithBrand = Template.bind({});
WithBrand.args = {
  showBrand: true,
  showSearchButton: true,
};

export const WithButtons = Template.bind({});
WithButtons.args = {
  showBackButton: true,
  showHomeButton: true,
  showSearchButton: true,
  title: '상품 상세보기',
};

export const WithItemsInCart = Template.bind({});
WithItemsInCart.args = {
  showBackButton: true,
  showHomeButton: true,
  showSearchButton: true,
  title: '상품 상세보기',
  numOfItemsInCart: 3,
};

export const WithManyItemsInCart = Template.bind({});
WithManyItemsInCart.args = {
  showBackButton: true,
  showHomeButton: true,
  showSearchButton: true,
  title: '상품 상세보기',
  numOfItemsInCart: 300,
};
