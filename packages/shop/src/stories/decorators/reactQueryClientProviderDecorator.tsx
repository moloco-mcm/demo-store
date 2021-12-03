import { DecoratorFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

// ref: https://github.com/storybookjs/storybook/issues/8426
const Story = ({ storyFn }: any) => storyFn();

const reactQueryClientProviderDecorator = (): DecoratorFn => {
  return (storyFn, { parameters }) => {
    const config = parameters.reactQuery || {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // disable to be consistent with redux-based queries
          refetchInterval: false, // disable to be consistent with redux-based queries
          staleTime: 1000 * 60 * 5, // 5 mins
          cacheTime: 1000 * 60 * 30, // 30 mins
        },
      },
    };

    const reactQueryClient = new QueryClient(config);

    return (
      <QueryClientProvider client={reactQueryClient}>
        <Story storyFn={storyFn} />
      </QueryClientProvider>
    );
  };
};

export default reactQueryClientProviderDecorator;
