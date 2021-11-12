import { Meta, Story } from '@storybook/react/types-6-0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Input, { InputAddon, InputAdornment, InputGroup } from '../src/input';
import Stack from '../src/stack';

export default {
  title: 'UI/Input',
  component: Input,
} as Meta;

const Template: Story<React.ComponentProps<typeof Input>> = (args) => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>Size</h3>
        <Stack direction="column" spacing={2}>
          <Input {...args} size="xs" placeholder="extra small size" />
          <Input {...args} size="sm" placeholder="small size" />
          <Input {...args} size="md" placeholder="medium size" />
          <Input {...args} size="lg" placeholder="large size" />
        </Stack>
      </section>
      <section>
        <h3>Disabled</h3>
        <Stack direction="column" spacing={2}>
          <Input {...args} placeholder="Disabled" disabled />
        </Stack>
      </section>
      <section>
        <h3>ReadOnly</h3>
        <Stack direction="column" spacing={2}>
          <Input {...args} placeholder="ReadOnly" isReadOnly />
        </Stack>
      </section>
      <section>
        <h3>Invalid</h3>
        <Stack direction="column" spacing={2}>
          <Input {...args} placeholder="Invalid value" isInvalid />
        </Stack>
      </section>
      <section>
        <h3>Adornments</h3>
        <Stack direction="column" spacing={2}>
          <InputGroup>
            <InputAdornment placement="left" colorScheme="green">
              <FontAwesomeIcon icon={faCheck} />
            </InputAdornment>
            <Input placeholder="Default" {...args} />
          </InputGroup>
          <InputGroup variant="underline" size="sm">
            <InputAdornment placement="left">
              <FontAwesomeIcon icon={faDollarSign} />
            </InputAdornment>
            <Input placeholder="Small size" {...args} />
            <InputAdornment placement="right">.00</InputAdornment>
          </InputGroup>
        </Stack>
      </section>
      <section>
        <h3>Addon</h3>
        <Stack direction="column" spacing={2}>
          <InputGroup variant={args.variant}>
            <Input placeholder="Default" {...args} />
            <InputAddon placement="right">@moloco.com</InputAddon>
          </InputGroup>
          <InputGroup variant={args.variant}>
            <InputAddon placement="left">+82</InputAddon>
            <Input placeholder="Phone number" {...args} />
          </InputGroup>
        </Stack>
      </section>
    </Stack>
  );
};

export const Outline = Template.bind({});

Outline.args = {
  variant: 'outline',
};

export const Underline = Template.bind({});

Underline.args = {
  variant: 'underline',
};

export const Unstyled = Template.bind({});

Unstyled.args = {
  variant: 'unstyled',
};

export const Variants = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>Outline (default)</h3>
        <Stack direction="column" spacing={2}>
          <Input size="md" placeholder="Default" />
        </Stack>
      </section>
      <section>
        <h3>Underline</h3>
        <Stack direction="column" spacing={2}>
          <Input variant="underline" placeholder="Underline" />
        </Stack>
      </section>
      <section>
        <h3>Unstyled</h3>
        <Stack direction="column" spacing={2}>
          <Input variant="unstyled" placeholder="Unstyled" />
        </Stack>
      </section>
    </Stack>
  );
};
