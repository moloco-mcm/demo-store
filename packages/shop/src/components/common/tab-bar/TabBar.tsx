import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  faHome,
  faThLarge,
  faUser,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

import { Container, TabItem, TabItemIcon } from './StyledComponents';

const TAB_BAR_ITEMS = [
  {
    id: 'HOME',
    href: '/',
    icon: faHome,
  },
  {
    id: 'CATEGORIES',
    href: '/categories',
    icon: faThLarge,
    disabled: true,
  },
  {
    id: 'FAVORITES',
    href: '/favorites',
    icon: faHeart,
    disabled: true,
  },
  {
    id: 'ACCOUNT',
    href: '/account',
    icon: faUser,
  },
];

export const TabBar: React.FC = () => {
  const router = useRouter();

  const activeItem = TAB_BAR_ITEMS.find((item) => {
    return item.href === router.asPath;
  });

  return (
    <Container>
      {TAB_BAR_ITEMS.map((item) =>
        item.disabled ? (
          <TabItem key={item.id}>
            <TabItemIcon icon={item.icon} />
          </TabItem>
        ) : (
          <Link key={item.id} href={item.href} passHref>
            <TabItem>
              <TabItemIcon
                icon={item.icon}
                $isActive={activeItem?.id === item.id}
              />
            </TabItem>
          </Link>
        )
      )}
    </Container>
  );
};
