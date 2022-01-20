import { useInfiniteQuery } from 'react-query';

import {
  SearchApiRequestBody,
  SearchApiSuccessResponse,
  SearchApiErrorResponse,
} from '../../pages/api/search/post';

const STALE_TIME = 1000 * 60 * 3;
const QUERY_KEY = 'search';

export const useSearch = (searchWord: string) => {
  return useInfiniteQuery<SearchApiSuccessResponse, SearchApiErrorResponse>(
    [QUERY_KEY, searchWord],
    async ({ pageParam = 1 }) => {
      const body: SearchApiRequestBody = {
        searchWord,
        pageIndex: pageParam,
      };

      const response = await fetch(`/api/search`, {
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
      enabled: !!searchWord,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.hasNextPage) {
          return undefined;
        }
        return pages.length + 1;
      },
      staleTime: STALE_TIME,
    }
  );
};

export default useSearch;
