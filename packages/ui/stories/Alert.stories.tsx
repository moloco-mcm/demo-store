import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Alert from '../src/alert';
import Stack from '../src/stack';

export default {
  title: 'UI/Alert',
  component: Alert,
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <Alert status="error">
        <Alert.Icon />
        Error message
      </Alert>
      <Alert status="success">
        <Alert.Icon />
        Success message
      </Alert>
      <Alert status="warning">
        <Alert.Icon />
        Warning message
      </Alert>
      <Alert status="info">
        <Alert.Icon />
        Info message
      </Alert>
    </Stack>
  );
};
