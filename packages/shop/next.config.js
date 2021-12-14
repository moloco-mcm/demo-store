/** @type {import('next').NextConfig} */

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

const moduleExports = {
  target: 'experimental-serverless-trace',
  reactStrictMode: true,
  // ref: https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = SENTRY_DSN
  ? withSentryConfig(moduleExports, sentryWebpackPluginOptions) // Use Sentry Config only when SENTRY_DSN was provided
  : moduleExports;
