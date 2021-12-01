import { Meta } from '@storybook/react/types-6-0';
import Spinner from '../src/spinner';
import Stack from '../src/stack';

export default {
  title: 'UI/Spinner',
  component: Spinner,
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>Size</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Stack>
      </section>
      <section>
        <h3>Color Scheme</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Spinner colorScheme="gray" />
          <Spinner colorScheme="blue" />
          <Spinner colorScheme="green" />
        </Stack>
      </section>
    </Stack>
  );
};
