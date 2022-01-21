import type { NextApiHandler } from 'next';
import { apiStandardError } from '../../../common/api-utils/error';

import {
  ApiErrorResponse,
  ApiResponse,
  ApiStandardErrorCode,
  ApiSuccessResponse,
} from '../../../common/types/api-response';
import { yup } from '../../../common/utils';
import { Product } from '../../../common/types/product';

export type SearchApiRequestBody = {
  searchWord: string;
  pageIndex?: number;
};

type ResponseBody = {
  products: Product[];
  hasNextPage: boolean;
};

export type SearchApiSuccessResponse = ApiSuccessResponse<ResponseBody>;
export type SearchApiErrorResponse = ApiErrorResponse<ApiStandardErrorCode>;
export type SearchApiResponse = ApiResponse<ResponseBody>;

const REQUEST_BODY_SCHEMA = yup.object().shape({
  searchWord: yup.string().required(),
});

export const isValidSearchRequestBody = (
  data: any
): data is SearchApiRequestBody =>
  REQUEST_BODY_SCHEMA.isValidSync(data, {
    strict: true,
    abortEarly: true,
  });

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1625',
    title: 'Stainless Steel kettle for Drinking Coffee ',
    price: {
      currency: 'USD',
      amount: 16.93,
    },
    salePrice: {
      amount: 10.16,
      currency: 'USD',
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1625_1080.png',
    reviewCount: 0,
    rating: 0,
  },
  {
    id: '1661',
    title: 'Girl Drinking Milk wallpaper',
    price: {
      currency: 'USD',
      amount: 69.11,
    },
    salePrice: {
      amount: 62.2,
      currency: 'USD',
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1661_1080.png',
    reviewCount: 0,
    rating: 0,
  },
  {
    id: '1511',
    title: "Women's Tank Top, violet",
    price: {
      currency: 'USD',
      amount: 13.99,
    },
    salePrice: {
      currency: 'USD',
      amount: 11.19,
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1511_1080.png',
    reviewCount: 66,
    rating: 4.9,
  },
  {
    id: '1269',
    title: 'Energy Beauty Tool Facial Beauty Care ',
    price: {
      amount: 20.6,
      currency: 'USD',
    },
    salePrice: {
      currency: 'USD',
      amount: 16.48,
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1269_1080.png',
    reviewCount: 0,
    rating: 0,
  },
  {
    id: '1287',
    title: 'Daily Face Sunscreen Lotion',
    price: {
      amount: 13.37,
      currency: 'USD',
    },
    salePrice: {
      amount: 10.7,
      currency: 'USD',
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1287_1080.png',
    reviewCount: 57,
    rating: 4.8,
  },
  {
    id: '1512',
    title: 'Tailgator Glove with Drink Holder',
    price: {
      currency: 'USD',
      amount: 28,
    },
    salePrice: {
      amount: 19.6,
      currency: 'USD',
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1512_1080.png',
    reviewCount: 2,
    rating: 4.5,
  },
  {
    id: '1821',
    title: 'Airplane Plasma wall decor',
    price: {
      currency: 'USD',
      amount: 95.26,
    },
    salePrice: {
      currency: 'USD',
      amount: 57.16,
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1821_1080.png',
    reviewCount: 10,
    rating: 2.7,
  },
  {
    id: '2026',
    title: 'Ethnic Girlish Flared Skirt, green',
    price: {
      currency: 'USD',
      amount: 45.99,
    },
    salePrice: {
      amount: 27.59,
      currency: 'USD',
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/2026_1080.png',
    reviewCount: 24,
    rating: 4.3,
  },
  {
    id: '1772',
    title: "Men's black hoodie, XL",
    price: {
      currency: 'USD',
      amount: 25.99,
    },
    salePrice: {
      amount: 15.59,
      currency: 'USD',
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1772_1080.png',
    reviewCount: 24,
    rating: 4.3,
  },
  {
    id: '1773',
    title: "Men's hoodie, pink",
    price: {
      currency: 'USD',
      amount: 45.7,
    },
    salePrice: {
      currency: 'USD',
      amount: 45.7,
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1773_1080.png',
    reviewCount: 110,
    rating: 4.3,
  },
  {
    id: '1222',
    title: 'Deep Pore Medicated Acne Pads',
    price: {
      amount: 7.47,
      currency: 'USD',
    },
    salePrice: {
      amount: 5.23,
      currency: 'USD',
    },
    imageUrl:
      'https://rmp-cdn.moloco.com/moloco-feed/images/w1080/1222_1080.png',
    reviewCount: 19,
    rating: 4.4,
  },
];

const postHandler: NextApiHandler<SearchApiResponse> = async (req, res) => {
  const { body } = req;
  const isRequestBodyValid = isValidSearchRequestBody(body);

  if (!isRequestBodyValid) {
    return res.status(400).json(apiStandardError('BAD_REQUEST'));
  }

  const { pageIndex } = body;

  // TODO: implement search (@sjhan-moloco)
  // return mock response
  const hasNextPage = pageIndex !== 3;

  return res.status(200).json({
    products: MOCK_PRODUCTS,
    hasNextPage: hasNextPage,
  });
};

export default postHandler;
