import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import Rating from '../../../components/product/rating';

export default {
  title: 'components/product/Rating',
  component: Rating,
} as Meta;

const Template: Story<React.ComponentProps<typeof Rating>> = (args) => (
  <Rating {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  rating: 4.6,
  reviewCount: 10398,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
