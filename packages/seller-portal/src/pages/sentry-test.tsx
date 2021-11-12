import React from 'react';
import { NextPage } from 'next';
import 'styled-components/macro';

import Button from '@rmp-demo-store/ui/button';
import { space } from '@rmp-demo-store/ui/theme-utils';

const SentryTest: NextPage = () => {
  return (
    <div
      css={`
        padding: ${space(4)};
      `}
    >
      <Button
        onClick={() => {
          throw new Error('Sentry Frontend Error');
        }}
      >
        Throw Error
      </Button>
    </div>
  );
};

export default SentryTest;
