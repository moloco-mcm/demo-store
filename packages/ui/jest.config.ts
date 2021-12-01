import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(test).+(ts|js|tsx|jsx)'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
};

export default config;
