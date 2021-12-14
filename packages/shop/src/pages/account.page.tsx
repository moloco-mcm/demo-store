import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Button from '@rmp-demo-store/ui/button';

import { Session, sessionResolver } from '../common/api-utils';
import TabBar from '../components/common/tab-bar';
import AppLayout from '../containers/app-layout';
import AccountInfo from '../components/account/account-info';

type Props = {
  session: Session;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { req } = context;

  const session = await sessionResolver(req);

  if (!session) {
    return {
      redirect: {
        destination: '/signin?redirectTo=/account',
        permanent: true,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const AccountPage: NextPage<Props> = (props) => {
  const { session } = props;
  const { t } = useTranslation('account');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <AppLayout title={t('title')} showTabBar>
        <AccountInfo email={session.user.email || ''} />
      </AppLayout>
    </>
  );
};

export default AccountPage;
