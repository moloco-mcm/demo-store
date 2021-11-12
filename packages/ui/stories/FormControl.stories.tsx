import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import {
  FormControl,
  FormErrorMessage,
  FormHintMessage,
  FormLabel,
} from '../src/form-control';
import Stack from '../src/stack';
import Input from '../src/input';
import Select from '../src/select';

export default {
  title: 'UI/FormControl',
  component: FormControl,
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <FormControl id="normal-input">
        <FormLabel>Normal</FormLabel>
        <Input type="text" placeholder="Normal" />
        <FormHintMessage>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        </FormHintMessage>
        <FormErrorMessage>This will be not shown</FormErrorMessage>
      </FormControl>
      <FormControl id="invalid-input" isInvalid>
        <FormLabel>Invalid</FormLabel>
        <Input type="text" placeholder="Invalid" />
        <FormHintMessage>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        </FormHintMessage>
        <FormErrorMessage>
          Here goes the error message for this field
        </FormErrorMessage>
      </FormControl>
      <FormControl id="disabled-input" isDisabled>
        <FormLabel>Disabled</FormLabel>
        <Input type="text" placeholder="Disabled" />
        <FormHintMessage>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        </FormHintMessage>
        <FormErrorMessage>This will be not shown</FormErrorMessage>
      </FormControl>
      <FormControl id="normal-select">
        <FormLabel>Select</FormLabel>
        <Select placeholder="Normal">
          <option value="option-1">Option 1</option>
          <option value="option-2">Option 2</option>
          <option value="option-3">Option 3</option>
        </Select>
        <FormErrorMessage>This will be not shown</FormErrorMessage>
      </FormControl>
      <FormControl id="invalid-select" isInvalid>
        <FormLabel>Invalid Select</FormLabel>
        <Select placeholder="Normal">
          <option value="option-1">Option 1</option>
          <option value="option-2">Option 2</option>
          <option value="option-3">Option 3</option>
        </Select>
        <FormErrorMessage>
          Here goes the error message for this field
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
};
