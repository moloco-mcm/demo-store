import React from 'react';
import Link from 'next/link';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { fontSize, fontWeight, space } from '@rmp-demo-store/ui/theme-utils';
import Button from '@rmp-demo-store/ui/button';
import Stack from '@rmp-demo-store/ui/stack';

type Props = {
  email: string;
};

export const AccountInfo = (props: Props) => {
  const { email } = props;

  const { t } = useTranslation('account');

  return (
    <Stack
      direction="column"
      spacing={6}
      css={`
        padding: ${space(3)};
      `}
    >
      <div>
        <div
          css={`
            font-size: ${fontSize('xl')};
            font-weight: ${fontWeight('medium')};
          `}
        >
          {t('welcome')}
        </div>
        <div>{email}</div>
      </div>
      <Link href="/signout" passHref>
        <Button variant="outline" colorScheme="gray">
          Logout
        </Button>
      </Link>
    </Stack>
  );
};

export default AccountInfo;
