import { sentryEnv } from '../sentry';

describe('/common/utils/sentry/sentryEnv', () => {
  test('should add deploy-preview prefix', () => {
    expect(sentryEnv({ stage: 'prod', buildContext: 'deploy-preview' })).toBe(
      'deploy-preview-prod'
    );

    expect(sentryEnv({ stage: 'test', buildContext: 'deploy-preview' })).toBe(
      'deploy-preview-test'
    );
  });

  test('should skip adding deploy-preview prefix if buildContext is production', () => {
    expect(sentryEnv({ stage: 'test', buildContext: 'production' })).toBe(
      'test'
    );

    expect(sentryEnv({ stage: 'prod', buildContext: 'production' })).toBe(
      'prod'
    );
  });
});
