import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import 'styled-components/macro';

import ErrorDisplay from '../src/error-display';
import Button from '../src/button';

export default {
  title: 'UI/ErrorDisplay',
  component: ErrorDisplay,
} as Meta;

export const Basic = () => {
  return (
    <ErrorDisplay>
      <ErrorDisplay.Title>Something went wrong.</ErrorDisplay.Title>
    </ErrorDisplay>
  );
};

export const WithMessage = () => {
  return (
    <ErrorDisplay>
      <ErrorDisplay.Title>Something went wrong.</ErrorDisplay.Title>
      <ErrorDisplay.Message>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        cursus, turpis a sollicitudin aliquam, velit lectus efficitur nunc, ut
        mollis urna orci in sapien.
      </ErrorDisplay.Message>
    </ErrorDisplay>
  );
};

export const SmallSize = () => {
  return (
    <ErrorDisplay size="sm">
      <ErrorDisplay.Title>Something went wrong.</ErrorDisplay.Title>
      <ErrorDisplay.Message>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        cursus, turpis a sollicitudin aliquam, velit lectus efficitur nunc, ut
        mollis urna orci in sapien.
      </ErrorDisplay.Message>
      <ErrorDisplay.Actions>
        <Button colorScheme="gray" size="sm">
          Retry
        </Button>
      </ErrorDisplay.Actions>
    </ErrorDisplay>
  );
};

export const WithButtons = () => {
  return (
    <ErrorDisplay>
      <ErrorDisplay.Title>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        cursus, turpis a sollicitudin aliquam, velit lectus efficitur nunc, ut
        mollis urna orci in sapien.
      </ErrorDisplay.Title>
      <ErrorDisplay.Message>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        cursus, turpis a sollicitudin aliquam, velit lectus efficitur nunc, ut
        mollis urna orci in sapien.
      </ErrorDisplay.Message>
      <ErrorDisplay.Actions>
        <Button colorScheme="gray">Retry</Button>
      </ErrorDisplay.Actions>
    </ErrorDisplay>
  );
};

export const FullScreen = () => {
  return (
    <div
      css={`
        width: 100%;
        height: 100vh;
      `}
    >
      <ErrorDisplay>
        <ErrorDisplay.Title>Something went wrong.</ErrorDisplay.Title>
        <ErrorDisplay.Message>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          cursus, turpis a sollicitudin aliquam, velit lectus efficitur nunc, ut
          mollis urna orci in sapien.
        </ErrorDisplay.Message>
      </ErrorDisplay>
    </div>
  );
};

FullScreen.parameters = {
  layout: 'fullscreen',
};
