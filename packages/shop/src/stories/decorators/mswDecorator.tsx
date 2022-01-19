import { DecoratorFn } from '@storybook/react';

import { worker } from '../mocks/browser';

const mswDecorator = (): DecoratorFn => {
  return (storyFn, { parameters }) => {
    const { msw = [] } = parameters;

    worker.resetHandlers();

    if (!Array.isArray(msw)) {
      throw new Error(
        `[MSW] expected to receive an array of handlers but received "${typeof msw}" instead.`
      );
    }

    // update handlers
    if (msw.length > 0) {
      worker.use(...msw);
    }

    return storyFn();
  };
};

export default mswDecorator;
