import { Meta } from '@storybook/react/types-6-0';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Checkbox from '../src/checkbox';
import Stack from '../src/stack';

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>State</h3>
        <Stack direction="column" spacing={2}>
          <Checkbox defaultChecked>Checked</Checkbox>
          <Checkbox>Unchecked</Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
        </Stack>
      </section>
      <section>
        <h3>Color</h3>
        <Stack direction="column" spacing={2}>
          <Checkbox defaultChecked>Option</Checkbox>
          <Checkbox colorScheme="pink" defaultChecked>
            Option
          </Checkbox>
          <Checkbox colorScheme="green" defaultChecked>
            Option
          </Checkbox>
          <Checkbox colorScheme="yellow" defaultChecked>
            Option
          </Checkbox>
        </Stack>
      </section>
      <section>
        <h3>Disabled</h3>
        <Stack direction="column" spacing={2}>
          <Checkbox disabled>Option</Checkbox>
          <Checkbox disabled defaultChecked>
            Option
          </Checkbox>
          <Checkbox disabled indeterminate>
            Option
          </Checkbox>
        </Stack>
      </section>
      <section>
        <h3>Icon</h3>
        <Stack direction="column" spacing={2}>
          <Checkbox icon={<FontAwesomeIcon icon={faPlus} />} defaultChecked>
            Option
          </Checkbox>
          <Checkbox icon={<FontAwesomeIcon icon={faMinus} />} defaultChecked>
            Option
          </Checkbox>
        </Stack>
      </section>
    </Stack>
  );
};
