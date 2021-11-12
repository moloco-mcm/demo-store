import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled, { useTheme } from 'styled-components/macro';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Stat from '@rmp-demo-store/ui/stat';
import {
  space,
  color,
  fontWeight,
  fontSize,
  radius,
  size,
  border,
  mode,
} from '@rmp-demo-store/ui/theme-utils';
import Stack from '@rmp-demo-store/ui/stack';

import nextI18NextConfig from '../../next-i18next.config';
import AppLayout from '../components/home';
import { requireSession, Session } from '../common/utils/requireSession';
import { BarChart } from '../components/common/bar-chart';
import DoughnutChart from '../components/common/doughnut-chart';

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
          ['common', 'home', 'sideBar'],
          nextI18NextConfig
        )),
      },
    };
  }
);

const Tile = {
  Container: styled.div`
    padding: ${space(3)};
    background-color: ${mode(color('white'), color('gray.800'))};

    border-radius: ${radius('md')};
    border: ${border(1)};
    border-color: ${mode(color('blackAlpha.200'), () => 'inherit')};

    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  `,
  Title: styled.div`
    font-weight: ${fontWeight('medium')};
    margin-bottom: ${space(3)};
  `,
  Content: styled.div`
    flex: 1;
  `,
};

const TopSellingProduct = (props: {
  rank: number;
  sellCount: number;
  imageUrl: string;
  title: string;
  price: string;
}) => {
  const { rank, sellCount, imageUrl, title, price } = props;

  const { t } = useTranslation('home');

  return (
    <div
      css={`
        border-bottom: ${border(1)};
        border-bottom-color: inherit;
        padding-bottom: ${space(3)};
      `}
    >
      <div>
        <span
          css={`
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: ${radius('full')};
            background-color: ${color('gray.200')};
            font-weight: ${fontWeight('medium')};
            color: ${color('gray.800')};
            padding: 0 ${space(1)};
            min-width: ${size(6)};
            height: ${size(6)};
            margin-right: ${space(3)};
          `}
        >
          {rank}
        </span>
        <span
          css={`
            font-size: ${fontSize('md')};
          `}
        >
          {t('soldItems', { count: sellCount })}
        </span>
      </div>
      <Stack spacing={3} align="center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="product-image"
          css={`
            width: ${size(16)};
            height: ${size(16)};
          `}
        />
        <div>
          <div
            css={`
              font-size: ${fontSize('lg')};
              font-weight: ${fontWeight('medium')};
            `}
          >
            {title}
          </div>
          <div>{price}</div>
        </div>
      </Stack>
    </div>
  );
};

const Home: NextPage<Props> = (props) => {
  const { session } = props;

  const theme = useTheme();
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>Seller Portal</title>
      </Head>
      <AppLayout user={session.user}>
        <div
          css={`
            height: 100%;
            min-width: ${size('container.lg')};
            padding: ${space(3)};
            background-color: ${mode(color('gray.50'), color('gray.800'))};
          `}
        >
          <Stack direction="column" spacing={3}>
            <h1
              css={`
                font-weight: ${fontWeight('semiBold')};
                font-size: ${fontSize('2xl')};
              `}
            >
              {t('dashboard')}
            </h1>
            <div
              css={`
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-column-gap: ${space(3)};
              `}
            >
              <Tile.Container>
                <Stat>
                  <Stat.Label>{t('monthlyNewOrders')}</Stat.Label>
                  <Stat.Number>1,349</Stat.Number>
                  <Stat.HelpText>
                    <Stat.UpArrow />
                    16%
                  </Stat.HelpText>
                </Stat>
              </Tile.Container>
              <Tile.Container>
                <Stat>
                  <Stat.Label>{t('productVisits')}</Stat.Label>
                  <Stat.Number>49,403</Stat.Number>
                  <Stat.HelpText>
                    <Stat.UpArrow />
                    29%
                  </Stat.HelpText>
                </Stat>
              </Tile.Container>
              <Tile.Container>
                <Stat>
                  <Stat.Label>{t('productSold')}</Stat.Label>
                  <Stat.Number>1,942</Stat.Number>
                  <Stat.HelpText>
                    <Stat.UpArrow />
                    18%
                  </Stat.HelpText>
                </Stat>
              </Tile.Container>
              <Tile.Container>
                <Stat>
                  <Stat.Label>{t('grossEarnings')}</Stat.Label>
                  <Stat.Number>$141,323</Stat.Number>
                  <Stat.HelpText>
                    <Stat.UpArrow />
                    32%
                  </Stat.HelpText>
                </Stat>
              </Tile.Container>
            </div>
            <div
              css={`
                display: grid;
                grid-row-gap: ${space(3)};
                grid-column-gap: ${space(3)};
                grid-template-columns: 1fr 1fr 1fr;
                grid-template-rows: ${size(80)} ${size(80)};
                grid-template-areas:
                  'a b c'
                  'd e c';
              `}
            >
              <Tile.Container
                css={`
                  grid-area: a;
                `}
              >
                <Tile.Title>{t('productSoldChart')}</Tile.Title>
                <Tile.Content>
                  <BarChart
                    labels={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
                    data={[282, 373, 319, 493]}
                  />
                </Tile.Content>
              </Tile.Container>
              <Tile.Container
                css={`
                  grid-area: b;
                `}
              >
                <Tile.Title>{t('earnings')}</Tile.Title>
                <Tile.Content>
                  <BarChart
                    labels={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
                    data={[3281, 3942, 2899, 5082]}
                  />
                </Tile.Content>
              </Tile.Container>
              <Tile.Container
                css={`
                  grid-area: c;
                `}
              >
                <Tile.Title>{t('topSellingProduct')}</Tile.Title>
                <Tile.Content
                  css={`
                    overflow-y: auto;
                  `}
                >
                  <Stack direction="column" spacing={3}>
                    <TopSellingProduct
                      rank={1}
                      sellCount={124}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100000.png"
                      title="Basic Shirt"
                      price="$48.50"
                    />
                    <TopSellingProduct
                      rank={2}
                      sellCount={109}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100001.png"
                      title="Black Hoody"
                      price="$58.99"
                    />
                    <TopSellingProduct
                      rank={3}
                      sellCount={89}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100002.png"
                      title="Blue T-Shirt"
                      price="$39.99"
                    />
                    <TopSellingProduct
                      rank={4}
                      sellCount={71}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100013.png"
                      title="Jacket Brown"
                      price="$60.60"
                    />
                    <TopSellingProduct
                      rank={5}
                      sellCount={56}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100008.png"
                      title="Dress Shoe"
                      price="$27.99"
                    />
                    <TopSellingProduct
                      rank={6}
                      sellCount={52}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100009.png"
                      title="Female Dress Watch"
                      price="$70.70"
                    />
                    <TopSellingProduct
                      rank={7}
                      sellCount={41}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100010.png"
                      title="Girl's Dress"
                      price="$91.90"
                    />
                    <TopSellingProduct
                      rank={8}
                      sellCount={39}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100015.png"
                      title="Jeans Jacket"
                      price="$81.70"
                    />
                    <TopSellingProduct
                      rank={9}
                      sellCount={37}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100020.png"
                      title="Male Standard Hoodie"
                      price="$34.40"
                    />
                    <TopSellingProduct
                      rank={10}
                      sellCount={35}
                      imageUrl="https://storage.googleapis.com/rmp-portal-dev-public/demo-product-imgs/0.25x/100011.png"
                      title="Man Striped Shirt"
                      price="$17.40"
                    />
                  </Stack>
                </Tile.Content>
              </Tile.Container>
              <Tile.Container
                css={`
                  grid-area: d;
                `}
              >
                <Tile.Title>{t('ratings')}</Tile.Title>
                <Tile.Content>
                  <BarChart
                    type="horizontal"
                    labels={['5', '4', '3', '2', '1']}
                    data={[319, 492, 38, 87, 39]}
                  />
                </Tile.Content>
              </Tile.Container>
              <Tile.Container
                css={`
                  grid-area: e;
                `}
              >
                <Tile.Title>{t('shipping')}</Tile.Title>
                <Tile.Content>
                  <DoughnutChart
                    labels={[
                      t('pickedUp'),
                      t('dispatched'),
                      t('delivered'),
                      t('returned'),
                    ]}
                    data={[138, 293, 481, 39]}
                    backgroundColor={[
                      color('yellow.400')({ theme }),
                      color('teal.500')({ theme }),
                      color('blue.500')({ theme }),
                      color('gray.400')({ theme }),
                    ]}
                  />
                </Tile.Content>
              </Tile.Container>
            </div>
          </Stack>
        </div>
      </AppLayout>
    </>
  );
};

export default Home;
