const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'en',
  },
  // Use a reserved env variable name for AWS Lambda to check if the server is running in Netlify production env
  // https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html
  localePath: process.env.AWS_LAMBDA_FUNCTION_NAME
    ? path.resolve('./packages/demo-store-seller-portal/src/assets/i18n') // use full path when the app is running in Netlify function env
    : path.resolve('./src/assets/i18n'),
};
