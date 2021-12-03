import { useQuery } from 'react-query';
import {
  GetOrderApiErrorResponse,
  GetOrderApiSuccessResponse,
} from '../../pages/api/orders/[id]/get';

const QUERY_KEY = 'orders';

export const useOrder = (orderId?: string) => {
  return useQuery<GetOrderApiSuccessResponse, GetOrderApiErrorResponse>(
    [QUERY_KEY, orderId],
    async () => {
      const response = await fetch(`/api/orders/${orderId}`, {
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
      enabled: !!orderId,
    }
  );
};
