export const sentryEnv = (args: { stage: string; buildContext: string }) =>
  `${args.buildContext === 'deploy-preview' ? `${args.buildContext}-` : ''}${
    args.stage === 'prod' ? `prod` : 'test'
  }`;
