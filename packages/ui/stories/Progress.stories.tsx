import { Meta } from '@storybook/react/types-6-0';
import Progress from '../src/progress';
import Stack from '../src/stack';

export default {
  title: 'UI/Progress',
  component: Progress,
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>Size</h3>
        <Stack direction="column" spacing={2}>
          <Progress size="xs" value={30} />
          <Progress size="sm" value={40} />
          <Progress size="md" value={50} />
          <Progress size="lg" value={60} />
        </Stack>
      </section>
      <section>
        <h3>Indeterminate</h3>
        <Stack direction="column" spacing={2}>
          <Progress size="md" value={50} isIndeterminate />
        </Stack>
      </section>
      <section>
        <h3>Color Scheme</h3>
        <Stack direction="column" spacing={2}>
          <Progress colorScheme="gray" value={20} />
          <Progress colorScheme="blue" value={40} />
          <Progress colorScheme="green" value={60} />
        </Stack>
      </section>
    </Stack>
  );
};
