import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Select from '../src/select';
import Stack from '../src/stack';

export default {
  title: 'UI/Select',
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <h3>Size</h3>
        <Stack direction="column" align="center" spacing={2}>
          <Select size="xs">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
          <Select size="sm">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
          <Select size="md">
            <option value="option-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              cursus, turpis a sollicitudin aliquam, velit lectus efficitur
              nunc, ut mollis urna orci in sapien.
            </option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
          <Select size="lg">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
        </Stack>
      </section>
      <section>
        <h3>Placeholder</h3>
        <Stack direction="column" align="center" spacing={2}>
          <Select placeholder="Placeholder Text">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
        </Stack>
      </section>
      <section>
        <h3>Invalid</h3>
        <Stack direction="column" align="center" spacing={2}>
          <Select isInvalid>
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
        </Stack>
      </section>
      <section>
        <h3>Disabled</h3>
        <Stack direction="column" align="center" spacing={2}>
          <Select isDisabled>
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
        </Stack>
      </section>
      <section>
        <h3>Variant</h3>
        <Stack direction="column" align="center" spacing={2}>
          <Select variant="outline">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
          <Select variant="underline">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
          <Select variant="unstyled">
            <option value="option-1">Option 1</option>
            <option value="option-2">Option 2</option>
            <option value="option-3">Option 3</option>
          </Select>
        </Stack>
      </section>
    </Stack>
  );
};
