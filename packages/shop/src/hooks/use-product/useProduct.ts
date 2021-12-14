import { useQuery } from 'react-query';

import {
  GetProductApiSuccessResponse,
  GetProductApiErrorResponse,
} from '../../pages/api/products/[id]/get';

const QUERY_KEY = 'product';

export const useProduct = (productId?: string) => {
  return useQuery<GetProductApiSuccessResponse, GetProductApiErrorResponse>(
    [QUERY_KEY, productId],
    async () => {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    },
    {
      enabled: !!productId,
    }
  );
};

export default useProduct;
