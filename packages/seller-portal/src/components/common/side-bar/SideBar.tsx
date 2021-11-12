import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'styled-components/macro';
import { useTranslation } from 'next-i18next';

import {
  fontWeight,
  space,
  color,
  radius,
  border,
  fontSize,
  mode,
} from '@rmp-demo-store/ui/theme-utils';
import Stack from '@rmp-demo-store/ui/stack';
import Select from '@rmp-demo-store/ui/select';
import Switch from '@rmp-demo-store/ui/switch';

import { useColorMode } from '../../../contexts/color-mode';
import { persistLanguageSetting } from '../../../common/utils/i18n';

type Props = {
  brand?: React.ReactNode;
  menuItems?: {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
  }[];
  user?: {
    email: string;
  };
  signOutPath: string;
};

const isLinkActive = (currentPath: string, linkPath: string): boolean => {
  if (linkPath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(linkPath);
};

export const SideBar: React.FC<Props> = (props) => {
  const { brand, user, menuItems, signOutPath } = props;

  const { replace, asPath } = useRouter();

  const { t, i18n } = useTranslation('sideBar');
  const { colorMode, onColorModeChange } = useColorMode();

  const handleLanguageSelectChange: React.ChangeEventHandler<HTMLSelectElement> =
    (event) => {
      const { value } = event.target;
      persistLanguageSetting(value);
      replace(asPath, undefined, { locale: value });
    };

  const handleColorModeToggle = () => {
    onColorModeChange(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      css={`
        position: relative;
        display: flex;
        flex-direction: column;
        width: 18rem;
        height: 100%;
        padding: ${space(6)} ${space(4)} ${space(4)};
        background: ${mode(color('blue.600'), color('gray.800'))};
        color: ${color('white')};
        border-right: ${mode(border('none'), border(1))};
        border-color: inherit;
      `}
    >
      <div
        css={`
          margin-bottom: ${space(6)};
        `}
      >
        {brand}
      </div>
      <Stack
        direction="column"
        spacing={2}
        css={`
          flex: 1;
        `}
      >
        {menuItems &&
          menuItems.map((item) => (
            <Link key={item.id} href={item.href} passHref>
              <a
                css={`
                  padding: ${space(2)} ${space(3)};
                  border-radius: ${radius('md')};
                  background-color: ${isLinkActive(asPath, item.href)
                    ? mode(color('blue.700'), color('blue.600'))
                    : 'inherit'};
                `}
              >
                <span
                  css={`
                    margin-right: ${space(2)};
                  `}
                >
                  {item.icon}
                </span>
                {item.label}
              </a>
            </Link>
          ))}
      </Stack>

      {user && (
        <div
          css={`
            border-bottom: ${border(1)};
            border-color: ${color('whiteAlpha.300')};
            padding-bottom: ${space(2)};
          `}
        >
          <div
            css={`
              display: 
              font-weight: ${fontWeight('semiBold')};
            `}
          >
            {user.email}
          </div>
          <div>
            <Link href={signOutPath} passHref>
              <a>{t('signOut')}</a>
            </Link>
          </div>
        </div>
      )}
      <Stack
        align="center"
        justify="space-between"
        css={`
          margin-top: ${space(2)};
        `}
      >
        <div
          css={`
            width: fit-content;
          `}
        >
          <Select
            size="xs"
            variant="unstyled"
            onChange={handleLanguageSelectChange}
          >
            <option value="en" selected={i18n.language.startsWith('en')}>
              English
            </option>
            <option value="ko" selected={i18n.language.startsWith('ko')}>
              한국어
            </option>
          </Select>
        </div>
        <div>
          <span
            css={`
              font-size: ${fontSize('xs')};
            `}
          >
            {t('darkMode')}:{' '}
          </span>
          <Switch
            size="sm"
            colorScheme="whiteAlpha"
            checked={colorMode === 'dark'}
            onChange={handleColorModeToggle}
          />
        </div>
      </Stack>
    </div>
  );
};
