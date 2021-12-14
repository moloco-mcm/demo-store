import { useQuery } from 'react-query';

import {
  GetSponsoredProductsApiRequestBody,
  GetSponsoredProductsApiSuccessResponse,
  GetSponsoredProductsApiErrorResponse,
} from '../../pages/api/rmp/auction/post';

const QUERY_KEY = 'auction';

type Options = {
  numOfItems: number;
  inventoryType: string;
  inventoryId: string;
  items?: string[];
  categories?: string[];
  searchQuery?: string;
  enabled?: boolean;
};

export const useSponsoredProducts = (options: Options) => {
  const {
    inventoryType,
    inventoryId,
    numOfItems,
    items,
    categories,
    searchQuery,
    enabled,
  } = options;

  return useQuery<
    GetSponsoredProductsApiSuccessResponse,
    GetSponsoredProductsApiErrorResponse
  >(
    [
      QUERY_KEY,
      inventoryType,
      inventoryId,
      numOfItems,
      items,
      categories,
      searchQuery,
    ],
    async () => {
      const body: GetSponsoredProductsApiRequestBody = {
        inventory: {
          type: inventoryType,
          inventoryId: inventoryId,
          numItems: numOfItems,
          items,
          categories,
          searchQuery,
        },
      };

      const response = await fetch('/api/rmp/auction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    },
    {
      // disable auto re-fetching
      refetchOnWindowFocus: false,
      // disable caching
      cacheTime: 0,
      enabled,
    }
  );
};

export default useSponsoredProducts;
