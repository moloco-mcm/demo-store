import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Cart } from '../../common/types/cart';
import {
  CheckoutApiSuccessResponse,
  CheckoutApiErrorResponse,
  CheckoutApiRequestBody,
} from '../../pages/api/cart/checkout/post';

import {
  GetCartApiErrorResponse,
  GetCartApiSuccessResponse,
} from '../../pages/api/cart/get';
import {
  DeleteCartItemApiErrorResponse,
  DeleteCartItemApiRequestBody,
  DeleteCartItemApiSuccessResponse,
} from '../../pages/api/cart/items/delete';
import {
  AddCartItemApiErrorResponse,
  AddCartItemApiRequestBody,
  AddCartItemApiSuccessResponse,
} from '../../pages/api/cart/items/post';
import {
  UpdateCartItemApiRequestBody,
  UpdateCartItemErrorApiResponse,
  UpdateCartItemSuccessApiResponse,
} from '../../pages/api/cart/items/put';

const QUERY_KEY = 'cart';

type Options = {
  ignoreNotAuthorizedError?: boolean;
};

export const useCart = (options?: Options) => {
  const { ignoreNotAuthorizedError } = options || {};

  return useQuery<GetCartApiSuccessResponse, GetCartApiErrorResponse>(
    [QUERY_KEY],
    async () => {
      const response = await fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error: GetCartApiErrorResponse = await response.json();

        // ignore not authorized (403) error and return empty cart
        if (ignoreNotAuthorizedError && error.code === 'FORBIDDEN') {
          return { items: [] };
        }

        throw error;
      }

      return response.json();
    },
    {
      // retry only for 500 error
      retry: (_failureCount, error) => {
        return error.code === 'INTERNAL_SERVER_ERROR';
      },
    }
  );
};

export const useAddCartItemMutation = (options?: {
  onError: (error: AddCartItemApiErrorResponse) => void;
}) => {
  const { onError } = options || {};
  const queryClient = useQueryClient();

  return useMutation<
    AddCartItemApiSuccessResponse,
    AddCartItemApiErrorResponse,
    AddCartItemApiRequestBody
  >(
    async (variable) => {
      const response = await fetch('/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variable),
      });

      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(QUERY_KEY, data);
      },
      onError: (error) => onError?.(error),
    }
  );
};

export const useUpdateCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateCartItemSuccessApiResponse,
    UpdateCartItemErrorApiResponse,
    UpdateCartItemApiRequestBody
  >(
    async (variable) => {
      const response = await fetch('/api/cart/items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variable),
      });

      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Cart>(QUERY_KEY, data);
      },
    }
  );
};

export const useDeleteCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteCartItemApiSuccessResponse,
    DeleteCartItemApiErrorResponse,
    DeleteCartItemApiRequestBody
  >(
    async (variable) => {
      const response = await fetch('/api/cart/items', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variable),
      });

      if (!response.ok) {
        throw await response.json();
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Cart>(QUERY_KEY, data);
      },
    }
  );
};

export const useCheckoutCartMutation = (options?: {
  onSuccess: (error: CheckoutApiSuccessResponse) => void;
}) => {
  const { onSuccess } = options || {};
  const queryClient = useQueryClient();

  return useMutation<
    CheckoutApiSuccessResponse,
    CheckoutApiErrorResponse,
    CheckoutApiRequestBody
  >(
    async () => {
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
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
      onSuccess: (data) => {
        onSuccess?.(data);
        // clear items in cart after checking out
        queryClient.setQueryData<Cart>(QUERY_KEY, (cachedData) => {
          return {
            ...cachedData,
            items: [],
          };
        });
      },
    }
  );
};

export default useCart;
