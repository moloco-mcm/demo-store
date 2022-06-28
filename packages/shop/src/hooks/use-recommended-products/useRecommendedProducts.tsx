import { useQuery } from 'react-query';

import {
  GetRecommendationApiRequestBody,
  GetRecommendationApiSuccessResponse,
  GetRecommendationApiErrorResponse,
} from '../../pages/api/rmp/recommendation/post';

const QUERY_KEY = 'recommendation';

type Options = {
  numOfItems: number;
  inventoryId: string;
  items?: string[];
  categories?: string[];
  searchQuery?: string;
  enabled?: boolean;
};

export const useRecommendedProducts = (options: Options) => {
  const { inventoryId, numOfItems, items, categories, searchQuery, enabled } =
    options;

  return useQuery<
    GetRecommendationApiSuccessResponse,
    GetRecommendationApiErrorResponse
  >(
    [QUERY_KEY, inventoryId, numOfItems, items, categories, searchQuery],
    async () => {
      const body: GetRecommendationApiRequestBody = {
        inventory: {
          inventoryId: inventoryId,
          numItems: numOfItems,
          items,
          categories,
          searchQuery,
        },
      };

      const response = await fetch('/api/rmp/recommendation', {
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

export default useRecommendedProducts;
