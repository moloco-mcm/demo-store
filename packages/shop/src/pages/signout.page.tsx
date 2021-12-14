import React from 'react';
import type { NextPage } from 'next';
import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import Spinner from '@rmp-demo-store/ui/spinner';
import ErrorDisplay from '@rmp-demo-store/ui/error-display';

import AppLayout from '../containers/app-layout';

const SignOut: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { t } = useTranslation('common');

  const { mutate: logout, isError } = useMutation(
    async () => {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
    },
    {
      onSuccess: () => {
        // clear cache after logout
        queryClient.clear();
        router.replace('/');
      },
    }
  );

  // call logout api
  React.useEffect(() => {
    logout();
  }, [logout]);

  return (
    <AppLayout>
      <div
        css={`
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {isError ? (
          <ErrorDisplay>
            <ErrorDisplay.Title>{t('error.title')}</ErrorDisplay.Title>
          </ErrorDisplay>
        ) : (
          <Spinner />
        )}
      </div>
    </AppLayout>
  );
};

export default SignOut;
