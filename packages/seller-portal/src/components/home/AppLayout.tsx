import React from 'react';
import 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd, faStore, faHome } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';

import { fontSize, fontWeight, space } from '@rmp-demo-store/ui//theme-utils';

import MainLayout from '../common/main-layout';
import SideBar from '../common/side-bar';

type Props = {
  user: {
    id: string;
    email: string;
  };
};

export const AppLayout: React.FC<Props> = (props) => {
  const { user, children } = props;

  const { t } = useTranslation('sideBar');

  return (
    <MainLayout
      side={
        <SideBar
          brand={
            <h1
              css={`
                font-size: ${fontSize('xl')};
                font-weight: ${fontWeight('semiBold')};
              `}
            >
              <FontAwesomeIcon
                icon={faStore}
                fixedWidth
                css={`
                  margin-right: ${space(3)};
                `}
              />
              Demo Seller Portal
            </h1>
          }
          menuItems={[
            {
              id: 'home',
              label: t('home'),
              href: '/',
              icon: <FontAwesomeIcon icon={faHome} fixedWidth />,
            },
            {
              id: 'campaignManager',
              label: t('campaignManager'),
              href: '/cm',
              icon: <FontAwesomeIcon icon={faAd} fixedWidth />,
            },
          ]}
          user={user}
          signOutPath="/signout"
        />
      }
      content={children}
    />
  );
};
