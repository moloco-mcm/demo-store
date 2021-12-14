import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import VisibilityChecker from '../../../components/common/visibility-checker';

export default {
  title: 'components/common/VisibilityChecker',
  component: VisibilityChecker,
} as Meta;

const Template: Story<React.ComponentProps<typeof VisibilityChecker>> = (
  args
) => (
  <div
    css={`
      width: 200px;
      height: 200px;
      overflow: scroll;
    `}
  >
    <div
      css={`
        width: 100%;
        height: 125%;
        background-color: blue;
        color: white;
      `}
    >
      Scroll down
    </div>
    <VisibilityChecker {...args} />
    <div
      css={`
        width: 100%;
        height: 125%;
        background-color: blue;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      `}
    >
      Scroll up
    </div>
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  children: <div>test div</div>,
};

export const FireMultiple = Template.bind({});
FireMultiple.args = {
  fireOnce: false,
  children: <div>test div</div>,
};
