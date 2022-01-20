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
    id: '3600',
    title: 'Bath Buddy Thermometer',
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
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1000_1080.png',
  },
  {
    id: '3601',
    title: 'Hairdressing Scissors Hair Grooming Set',
    price: {
      currency: 'USD',
      amount: 2600,
    },
    rating: 4.3,
    reviewCount: 2600,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1001_1080.png',
  },
  {
    id: '3602',
    title: 'Baby Soothing Body Wash',
    price: {
      currency: 'USD',
      amount: 12400,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1002_1080.png',
  },
  {
    id: '3603',
    title: 'Birthday party paper shavings',
    price: {
      currency: 'USD',
      amount: 17000,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1003_1080.png',
  },
  {
    id: '3604',
    title: 'Baby Shea Butter Oil Rub w/ Argan Oil',
    price: {
      currency: 'USD',
      amount: 129,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1004_1080.png',
  },
  {
    id: '3605',
    title: 'Baby Shampoo Cap',
    price: {
      currency: 'USD',
      amount: 100,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1005_1080.png',
  },
  {
    id: '3606',
    title: 'Silicone Skin Cream',
    price: {
      currency: 'USD',
      amount: 2600,
    },
    rating: 4.3,
    reviewCount: 2600,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1006_1080.png',
  },
  {
    id: '3607',
    title: 'Diaper Rash Cream',
    price: {
      currency: 'USD',
      amount: 12400,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1007_1080.png',
  },
  {
    id: '3608',
    title: 'Ezcema Care Moisturizing Cream',
    price: {
      currency: 'USD',
      amount: 17000,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1008_1080.png',
  },
  {
    id: '3609',
    title: 'Baby  Powder',
    price: {
      currency: 'USD',
      amount: 129,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1009_1080.png',
  },
  {
    id: '3610',
    title: 'Baby Food Container ',
    price: {
      currency: 'USD',
      amount: 100,
    },
    rating: 4.3,
    reviewCount: 9433,
    imageUrl:
      'https://storage.googleapis.com/rmp-cdn-prod/moloco-feed/images/w1080/1010_1080.png',
  },
];

const postHandler: NextApiHandler<SearchApiResponse> = async (req, res) => {
  const { body } = req;
  const isRequestBodyValid = isValidSearchRequestBody(body);

  if (!isRequestBodyValid) {
    return res.status(400).json(apiStandardError('BAD_REQUEST'));
  }

  const { searchWord, pageIndex } = body;

  // TODO: implement search (@sjhan-moloco)
  // return mock response
  const hasNextPage = pageIndex !== 3;

  return res.status(200).json({
    products: MOCK_PRODUCTS,
    hasNextPage: hasNextPage,
  });
};

export default postHandler;
