import { useQuery } from 'react-query';

import {
  GetBannerAdApiRequestBody,
  GetBannerAdApiSuccessResponse,
  GetBannerAdApiErrorResponse,
} from '../../pages/api/rmp/creative-auction/post';

const QUERY_KEY = 'creative-auction';

type Options = {
  inventoryId: string;
  items?: string[];
  categories?: string[];
  searchQuery?: string;
  enabled?: boolean;
};

export const useBannerAd = (options: Options) => {
  const { inventoryId, items, categories, searchQuery, enabled } = options;

  return useQuery<GetBannerAdApiSuccessResponse, GetBannerAdApiErrorResponse>(
    [QUERY_KEY, inventoryId, items, categories, searchQuery],
    async () => {
      const body: GetBannerAdApiRequestBody = {
        inventory: {
          inventoryId: inventoryId,
          items,
          categories,
          searchQuery,
        },
      };

      const response = await fetch('/api/rmp/creative-auction', {
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

export default useBannerAd;
