import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Button, { IconButton } from '../src/button';
import Stack from '../src/stack';

export default {
  title: 'UI/Button',
  component: Button,
} as Meta;

const Template: Story<React.ComponentProps<typeof Button>> = (args) => {
  return <Button {...args}>Button</Button>;
};

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>Size</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Button size="xs">Button</Button>
          <Button size="sm">Button</Button>
          <Button size="md">Button</Button>
          <Button size="lg">Button</Button>
        </Stack>
      </section>

      <section>
        <h3>Variants</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Button variant="contained">Button</Button>
          <Button variant="outline">Button</Button>
          <Button variant="ghost">Button</Button>
        </Stack>
      </section>
      <section>
        <h3>With Icon</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Button
            variant="contained"
            leftIcon={<FontAwesomeIcon icon={faCheck} />}
          >
            Button
          </Button>
          <Button
            variant="contained"
            leftIcon={<FontAwesomeIcon icon={faCheck} />}
            isLoading
          >
            Button
          </Button>
          <Button
            variant="outline"
            rightIcon={<FontAwesomeIcon icon={faDollarSign} />}
          >
            Button
          </Button>
          <Button
            variant="ghost"
            leftIcon={<FontAwesomeIcon icon={faDollarSign} />}
            rightIcon={<FontAwesomeIcon icon={faCheck} />}
          >
            Button
          </Button>
        </Stack>
      </section>
      <section>
        <h3>Color Scheme</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Button colorScheme="blue">Button</Button>
          <Button colorScheme="red">Button</Button>
          <Button colorScheme="pink">Button</Button>
          <Button colorScheme="yellow">Button</Button>
          <Button colorScheme="green">Button</Button>
          <Button colorScheme="teal">Button</Button>
          <Button colorScheme="gray">Button</Button>
        </Stack>
      </section>
      <section>
        <Stack direction="row" align="center" spacing={2}>
          <Button colorScheme="blue" variant="outline">
            Button
          </Button>
          <Button colorScheme="red" variant="outline">
            Button
          </Button>
          <Button colorScheme="pink" variant="outline">
            Button
          </Button>
          <Button colorScheme="yellow" variant="outline">
            Button
          </Button>
          <Button colorScheme="green" variant="outline">
            Button
          </Button>
          <Button colorScheme="teal" variant="outline">
            Button
          </Button>
          <Button colorScheme="gray" variant="outline">
            Button
          </Button>
        </Stack>
      </section>
      <section>
        <Stack direction="row" align="center" spacing={2}>
          <Button colorScheme="blue" variant="ghost">
            Button
          </Button>
          <Button colorScheme="red" variant="ghost">
            Button
          </Button>
          <Button colorScheme="pink" variant="ghost">
            Button
          </Button>
          <Button colorScheme="yellow" variant="ghost">
            Button
          </Button>
          <Button colorScheme="green" variant="ghost">
            Button
          </Button>
          <Button colorScheme="teal" variant="ghost">
            Button
          </Button>
          <Button colorScheme="gray" variant="ghost">
            Button
          </Button>
        </Stack>
      </section>
      <section>
        <h3>Disabled</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Button variant="contained" disabled>
            Button
          </Button>
          <Button variant="outline" disabled>
            Button
          </Button>
        </Stack>
      </section>
      <section>
        <h3>Loading</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Button variant="contained" isLoading>
            Button
          </Button>
          <Button variant="outline" isLoading>
            Button
          </Button>
        </Stack>
      </section>
      <section>
        <h3>Icon Button</h3>
        <Stack direction="row" align="center" spacing={2}>
          <IconButton variant="contained">
            <FontAwesomeIcon icon={faDollarSign} />
          </IconButton>
          <IconButton variant="contained" isRound>
            <FontAwesomeIcon icon={faDollarSign} />
          </IconButton>
          <IconButton variant="outline">
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
          <IconButton variant="ghost">
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
          <IconButton variant="outline" isLoading>
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
        </Stack>
      </section>
      <section>
        <h3>With A tag</h3>
        <Stack direction="row" align="center" spacing={2}>
          <Button size="xs" href="https://moloco.com" target="_blank">
            Button
          </Button>
          <Button size="sm" href="https://moloco.com" target="_blank" isLoading>
            Button
          </Button>
          <Button
            size="md"
            variant="outline"
            href="https://moloco.com"
            target="_blank"
          >
            Button
          </Button>
          <IconButton size="lg" href="https://moloco.com" target="_blank">
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
        </Stack>
      </section>
    </Stack>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  colorScheme: 'blue',
  variant: 'contained',
  size: 'md',
  disabled: false,
};
