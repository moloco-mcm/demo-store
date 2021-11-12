import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components/macro';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Spinner from '@rmp-demo-store/ui/spinner';
import ErrorDisplay from '@rmp-demo-store/ui/error-display';

import nextI18NextConfig from '../../next-i18next.config';
import AppLayout from '../components/home';
import { requireSession, Session } from '../common/utils/requireSession';
import { useColorMode } from '../contexts/color-mode';

type Props = {
  session: Session;
};

export const getServerSideProps = requireSession<Props>(
  async ({ locale = 'en' }, session) => {
    return {
      props: {
        session,
        ...(await serverSideTranslations(
          locale,
          ['common', 'sideBar'],
          nextI18NextConfig
        )),
      },
    };
  }
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const normalizeLang = (language: string) => {
  if (language.startsWith('ko')) return 'ko';
  // fallback to English
  return 'en';
};

const CampaignManager: NextPage<Props> = (props) => {
  const { session } = props;

  const { t, i18n } = useTranslation('common');
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [signedUrl, setSignedUrl] = React.useState<string | undefined>(
    undefined
  );

  const language = normalizeLang(i18n.language);

  React.useEffect(() => {
    const fetchSignedUrl = async () => {
      setIsLoading(true);

      const response = await fetch('/api/rmp/signed-rmp-portal-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          colorMode,
          language,
        }),
      });

      if (!response.ok) {
        // set error
        setError(new Error('Failed to fetch signed URL'));
        setSignedUrl(undefined);
        setIsLoading(false);
        return;
      }

      const { signedUrl } = await response.json();

      setSignedUrl(signedUrl);
      setIsLoading(false);
    };

    fetchSignedUrl();
  }, [colorMode, language]);

  return (
    <>
      <Head>
        <title>Campaign Manager - Seller Portal</title>
      </Head>
      <AppLayout user={session.user}>
        {(() => {
          if (error) {
            return (
              <Container>
                <ErrorDisplay>
                  <ErrorDisplay.Title>{t('error.label')}</ErrorDisplay.Title>
                  <ErrorDisplay.Message>
                    {t('error.message')}
                  </ErrorDisplay.Message>
                </ErrorDisplay>
              </Container>
            );
          }

          if (isLoading) {
            return (
              <Container>
                <Spinner />
              </Container>
            );
          }

          return (
            <iframe
              src={signedUrl}
              css={`
                width: 100%;
                height: 100%;
              `}
            />
          );
        })()}
      </AppLayout>
    </>
  );
};

export default CampaignManager;
