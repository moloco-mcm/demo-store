import React from 'react';
import Link from 'next/link';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';

import Button from '@rmp-demo-store/ui/button';
import Stack from '@rmp-demo-store/ui/stack';
import {
  color,
  space,
  fontSize,
  fontWeight,
} from '@rmp-demo-store/ui/theme-utils';

type Props = {};

export const CheckoutComplete = (_props: Props) => {
  const { t } = useTranslation('checkoutComplete');

  return (
    <Stack
      direction="column"
      align="center"
      justify="center"
      spacing={10}
      css={`
        min-height: ${space(72)};
      `}
    >
      <Stack direction="column" align="center" spacing={3}>
        <FontAwesomeIcon
          icon={faCheckCircle}
          size="3x"
          css={`
            color: ${color('green.600')};
          `}
        />
        <Stack direction="column" align="center">
          <h1
            css={`
              font-size: ${fontSize('xl')};
              font-weight: ${fontWeight('medium')};
            `}
          >
            {t('thankYou')}
          </h1>
          <p
            css={`
              font-size: ${fontSize('lg')};
            `}
          >
            {t('yourOrderHasBeenPlaced')}
          </p>
        </Stack>
      </Stack>
      <Link href="/" passHref replace>
        <Button colorScheme="purple">{t('continueShopping')}</Button>
      </Link>
    </Stack>
  );
};
