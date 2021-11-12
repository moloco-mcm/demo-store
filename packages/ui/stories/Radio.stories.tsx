import { Meta } from '@storybook/react/types-6-0';
import Radio from '../src/radio';
import Stack from '../src/stack';

export default {
  title: 'UI/Radio',
  component: Radio,
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>Size</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Radio name="test" value="test1">
            Option 1
          </Radio>
          <Radio name="test" value="test2">
            Option 2
          </Radio>
          <Radio name="test" value="test2" disabled>
            Option 2
          </Radio>
          <Radio name="test" value="test2" disabled defaultChecked>
            Option 2
          </Radio>
        </Stack>
      </section>
    </Stack>
  );
};
