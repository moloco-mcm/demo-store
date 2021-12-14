import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import TabBar from '../../../components/common/tab-bar';

export default {
  title: 'components/common/TabBar',
  component: TabBar,
} as Meta;

const Template: Story<React.ComponentProps<typeof TabBar>> = (args) => (
  <TabBar {...args} />
);

export const Basic = Template.bind({});
