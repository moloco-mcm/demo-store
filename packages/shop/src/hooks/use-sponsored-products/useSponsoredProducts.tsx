import { useQuery } from 'react-query';

import {
  GetSponsoredProductsApiRequestBody,
  GetSponsoredProductsApiSuccessResponse,
  GetSponsoredProductsApiErrorResponse,
} from '../../pages/api/rmp/auction/post';

const QUERY_KEY = 'auction';

type Options = {
  numOfItems: number;
  inventoryId: string;
  items?: string[];
  categories?: string[];
  searchQuery?: string;
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
};

export const useSponsoredProducts = (options: Options) => {
  const {
    inventoryId,
    numOfItems,
    items,
    categories,
    searchQuery,
    enabled,
    cacheTime = 0,
    staleTime,
  } = options;

  return useQuery<
    GetSponsoredProductsApiSuccessResponse,
    GetSponsoredProductsApiErrorResponse
  >(
    [QUERY_KEY, inventoryId, numOfItems, items, categories, searchQuery],
    async () => {
      const body: GetSponsoredProductsApiRequestBody = {
        inventory: {
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
      cacheTime,
      staleTime,
      enabled,
    }
  );
};

export default useSponsoredProducts;
