import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import PageLoader, {
  PageLoaderRef,
} from '../../../components/common/page-loader';
import Button from '@rmp-demo-store/ui/button';
import Stack from '@rmp-demo-store/ui/stack';
import { space } from '@rmp-demo-store/ui/theme-utils';

export default {
  title: 'components/common/PageLoader',
  component: PageLoader,
} as Meta;

const Template: Story<React.ComponentProps<typeof PageLoader>> = (args) => {
  const ref = React.useRef<PageLoaderRef | null>(null);

  const handleResetClick = () => {
    ref.current?.reset();
  };

  const handleStartClick = () => {
    ref.current?.start();
  };

  const handleDoneClick = () => {
    ref.current?.done();
  };

  return (
    <div
      css={`
        position: relative;
      `}
    >
      <div
        css={`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 10;
        `}
      >
        <PageLoader ref={ref} />
      </div>
      <Stack
        spacing={3}
        css={`
          padding-top: ${space(10)};
        `}
      >
        <Button onClick={handleResetClick} colorScheme="gray">
          Reset
        </Button>
        <Button onClick={handleStartClick} colorScheme="gray">
          Start
        </Button>
        <Button onClick={handleDoneClick} colorScheme="gray">
          Done
        </Button>
      </Stack>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
