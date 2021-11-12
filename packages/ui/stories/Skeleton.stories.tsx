import { Meta } from '@storybook/react/types-6-0';
import Skeleton from '../src/skeleton';
import { SkeletonText } from '../src/skeleton/SkeletonText';
import Stack from '../src/stack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from 'styled-components/macro';

export default {
  title: 'UI/Skeleton',
  component: Skeleton,
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>Skeleton</h3>
        <Stack direction="column" spacing={2}>
          <Skeleton />
          <Skeleton height={4} />
        </Stack>
      </section>
      <section>
        <h3>SkeletonText</h3>
        <Stack direction="column" spacing={4}>
          <SkeletonText noOfLines={3} />
          <SkeletonText noOfLines={1} />
        </Stack>
      </section>
    </Stack>
  );
};
