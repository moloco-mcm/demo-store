import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import CheckoutComplete from '../../../components/cart/checkout-complete';

export default {
  title: 'components/cart/CheckoutComplete',
  component: CheckoutComplete,
} as Meta;

const Template: Story<React.ComponentProps<typeof CheckoutComplete>> = (
  args
) => <CheckoutComplete {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
