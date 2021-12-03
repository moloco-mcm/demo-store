import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '@rmp-demo-store/ui/button';
import Stack from '@rmp-demo-store/ui/stack';
import { color, fontSize, space } from '@rmp-demo-store/ui/theme-utils';

import AppLayout from '../../containers/app-layout';
import ProductsInCart from '../../components/cart/products-in-cart';
import CartSummary from '../../components/cart/cart-summary';
import useCart, {
  useCheckoutCartMutation,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from '../../hooks/use-cart';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { session: sessionCookie } = req.cookies;

  if (!sessionCookie) {
    return {
      redirect: {
        destination: '/signin?redirectTo=/cart',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

const CartPage: NextPage<{}> = () => {
  const { t } = useTranslation('cart');
  const router = useRouter();

  const { data, isLoading, isError } = useCart();
  const { mutate: updateFn, isLoading: isUpdating } =
    useUpdateCartItemMutation();
  const { mutate: deleteFn, isLoading: isDeleting } =
    useDeleteCartItemMutation();
  const {
    mutate: checkoutFn,
    isLoading: isCheckingOut,
    isIdle: isCheckoutMutationIdle,
  } = useCheckoutCartMutation({
    onSuccess: ({ orderId }) => {
      router.push(`/cart/checkout-complete?orderId=${orderId}`);
    },
  });

  const items = data?.items;

  const isEmptyCart = items === undefined || items.length === 0;

  const showEmptyScreen = !isLoading && isCheckoutMutationIdle && isEmptyCart;

  const handleUpdateQuantityOfItem = (productId: string, quantity: number) => {
    updateFn({ item: { productId, quantity } });
  };

  const handleDeleteItem = (productId: string) => {
    deleteFn({ productId });
  };

  const handleCheckoutButtonClick = () => {
    checkoutFn();
  };

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <AppLayout title={t('title')} showBackButton showHomeButton>
        {showEmptyScreen ? (
          <Stack
            direction="column"
            align="center"
            justify="center"
            spacing={3}
            css={`
              color: ${color('gray.600')};
              min-height: ${space(56)};
            `}
          >
            <FontAwesomeIcon icon={faShoppingCart} size="3x" />
            <h1
              css={`
                font-size: ${fontSize('lg')};
              `}
            >
              {t('cartIsEmpty')}
            </h1>
            <Link href="/" passHref>
              <Button colorScheme="purple">{t('continueShopping')}</Button>
            </Link>
          </Stack>
        ) : (
          <Stack
            spacing={3}
            direction="column"
            css={`
              padding: ${space(3)};
            `}
          >
            <ProductsInCart
              isLoading={isLoading}
              isError={isError}
              isUpdating={isUpdating || isDeleting}
              items={items}
              onUpdateQuantityOfItem={handleUpdateQuantityOfItem}
              onDeleteItem={handleDeleteItem}
            />
            {!isEmptyCart && (
              <>
                {!isError && (
                  <CartSummary isLoading={isLoading} items={items} />
                )}
                <Button
                  colorScheme="purple"
                  disabled={isError || isLoading || isUpdating || isDeleting}
                  isLoading={isCheckingOut}
                  onClick={handleCheckoutButtonClick}
                >
                  {t('checkout')}
                </Button>
              </>
            )}
          </Stack>
        )}
      </AppLayout>
    </>
  );
};

export default CartPage;
