module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
  ],
  typescript: {
    // disable DocGen for Switch component because the DocGen module has a bug to use 'switch' which is a reserved keyword in JS as a variable name.
    reactDocgenTypescriptOptions: {
      exclude: ['**/switch/*.tsx'],
    },
  },
};
