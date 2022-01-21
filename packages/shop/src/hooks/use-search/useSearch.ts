import { useInfiniteQuery } from 'react-query';

import {
  SearchApiRequestBody,
  SearchApiSuccessResponse,
  SearchApiErrorResponse,
} from '../../pages/api/search/post';

const QUERY_KEY = 'search';

type Options = {
  searchWord: string;
  staleTime?: number;
};

export const useSearch = (options: Options) => {
  const { searchWord, staleTime } = options;

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
      staleTime,
    }
  );
};

export default useSearch;
