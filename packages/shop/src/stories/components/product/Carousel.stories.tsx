import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import 'styled-components/macro';
import Carousel from '../../../components/product/carousel';

export default {
  title: 'components/product/Carousel',
  component: Carousel,
} as Meta;

const Template: Story<React.ComponentProps<typeof Carousel>> = (args) => (
  <Carousel {...args} />
);

const items: React.ComponentProps<typeof Carousel>['items'] = [
  {
    product: {
      id: '3600',
      title: '내추럴발란스 캣 연어 포뮬라 캔 156g',
      price: {
        currency: 'USD',
        amount: 100,
      },
      salePrice: {
        currency: 'USD',
        amount: 80,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/d/a/d/d/e/9/b/dadde9b071ce1ef287f0b64420a706d3/10000/a3ee33717994deddf89d05b662cee207.jpeg',
    },
  },
  {
    product: {
      id: '3601',
      title: '강아지 저키/트릿 간식 24종 [모음]',
      price: {
        currency: 'USD',
        amount: 2600,
      },
      rating: 4.3,
      reviewCount: 2600,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/0/e/e/6/6/b/7/0ee66b73cfba8caf218b74db8041bd2b/10000/1a3aa4e670cb0739fc08e8774f46a44a.jpeg',
    },
  },
  {
    product: {
      id: '3602',
      title: '고양이 낚시대 BEST 24종 [모음]',
      price: {
        currency: 'USD',
        amount: 12400,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/a/d/3/4/e/3/d/ad34e3d2d2daa836ecbdca1a20028b5d/10000/f0ab7129674d7d4ed6730ccc540e91f6.jpeg',
    },
  },
  {
    product: {
      id: '3603',
      title: '[유통기한임박, 21년12월5일] THE 건강한 형제 촉촉트릿 소간 150gg',
      price: {
        currency: 'USD',
        amount: 17000,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/c/2/f/3/7/5/3/c2f3753b4813e89e8d54ac4316391171/10000/048a7c979fb1ab32f9b43a11cf6fb856.jpeg',
    },
  },
  {
    product: {
      id: '3604',
      title: '견체공학 탱탱운더볼',
      price: {
        currency: 'USD',
        amount: 129,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/f/b/8/3/c/4/e/fb83c4e658576725c1caeee6ed0dde70/10000/7c48bac0903d251e9513c3859cd0ecc5.jpeg',
    },
  },
  {
    product: {
      id: '3605',
      title: '고양이 짜먹는 간식 츄르 24종 [모음]',
      price: {
        currency: 'USD',
        amount: 100,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/5/5/8/5/5/9/3/558559325a96cb407cd56bde97ecabb6/10000/3e6a72e5f196507a5c99bcd10c6c0020.jpeg',
    },
  },
  {
    product: {
      id: '3606',
      title: '닭가슴살外 고양이 통살 간식 23종 [모음]',
      price: {
        currency: 'USD',
        amount: 2600,
      },
      rating: 4.3,
      reviewCount: 2600,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/5/4/6/2/7/9/c/546279c7c5a42561f63ed6f37bd02bc3/10000/0692d8ed0b1a07bb2690f39794375acc.jpeg',
    },
  },
  {
    product: {
      id: '3607',
      title: '중대형견에게 딱! BEST 24종 [모음]',
      price: {
        currency: 'USD',
        amount: 12400,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/1/2/f/b/9/c/b/12fb9cbc5ede1caf55e093d91910ac79/10000/07986226bc27964611777384a5f536f8.jpeg',
    },
  },
  {
    product: {
      id: '3608',
      title: '크리스마스 산타모자 M',
      price: {
        currency: 'USD',
        amount: 17000,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/d/1/3/9/e/a/a/d139eaa07ab48a9a2082c50ad81f2897/10000/f096086c796740ab51e04bc68b2ffbb0.jpeg',
    },
  },
  {
    product: {
      id: '3609',
      title: '강아지 덴탈 꿀템 24종 [모음]',
      price: {
        currency: 'USD',
        amount: 129,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/8/1/1/5/8/4/b/811584ba33e05dfa8b2942312f014d7a/10000/781de5edb46561c627a4e7f49f0b1700.jpeg',
    },
  },
  {
    product: {
      id: '3610',
      title:
        '[해외직구] 센트리 캣 헤어볼 릴리프 포 캣 맥아 맛 4.4oz (무료배송)',
      price: {
        currency: 'USD',
        amount: 100,
      },
      rating: 4.3,
      reviewCount: 9433,
      imageUrl:
        'https://images.pet-friends.co.kr/storage/pet_friends/product/id/0/4/3/8/c/6/7/0438c6701ddd254db5f53684dbbcd0c8/10000/a9f21a083ea74e0d908683ef0e24a6d8.jpeg',
    },
  },
];

export const Basic = Template.bind({});
Basic.args = {
  items,
};

export const TwoRows = Template.bind({});
TwoRows.args = {
  items,
  numOfRows: 2,
};

export const ThreeRows = Template.bind({});
ThreeRows.args = {
  items,
  numOfRows: 3,
};

export const Loading = Template.bind({});
Loading.args = {
  items,
  isLoading: true,
};
