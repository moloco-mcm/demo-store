import { useQuery } from 'react-query';

import {
  SearchApiRequestBody,
  SearchApiSuccessResponse,
  SearchApiErrorResponse,
} from '../../pages/api/search/post';

const QUERY_KEY = 'search';

export const useSearch = (searchWord: string) => {
  return useQuery<SearchApiSuccessResponse, SearchApiErrorResponse>(
    [QUERY_KEY, searchWord],
    async () => {
      const body: SearchApiRequestBody = {
        searchWord,
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
    }
  );
};

export default useSearch;
