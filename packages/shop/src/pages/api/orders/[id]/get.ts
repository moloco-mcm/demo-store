import type { NextApiHandler } from 'next';
import { sessionResolver } from '../../../../common/api-utils';
import { expandCartItems } from '../../../../common/api-utils/cart';
import { apiStandardError } from '../../../../common/api-utils/error';
import { isValidOrderDocData } from '../../../../common/api-utils/order';
import { getFirebaseAdminApp } from '../../../../common/firebase-admin';
import {
  ApiErrorResponse,
  ApiResponse,
  ApiStandardErrorCode,
  ApiSuccessResponse,
} from '../../../../common/types/api-response';
import { Order } from '../../../../common/types/order';
import { asyncTryCatch, isAsyncTryCatchError } from '../../../../common/utils';

export type GetOrderApiSuccessResponse = ApiSuccessResponse<Order>;
export type GetOrderApiErrorResponse = ApiErrorResponse<ApiStandardErrorCode>;
export type GetOrderApiResponse = ApiResponse<Order>;

const getHandler: NextApiHandler<GetOrderApiResponse> = async (req, res) => {
  const { query } = req;

  const { id: orderId } = query;

  if (typeof orderId !== 'string') {
    return res.status(400).json(apiStandardError('BAD_REQUEST'));
  }

  if (!orderId) {
    return res.status(404).json(apiStandardError('NOT_FOUND'));
  }

  const session = await sessionResolver(req);
  if (!session) {
    return res.status(403).json(apiStandardError('FORBIDDEN'));
  }

  const firestore = getFirebaseAdminApp().firestore();
  const orderFetchResult = await asyncTryCatch(() =>
    firestore.collection('orders').doc(orderId).get()
  );

  if (isAsyncTryCatchError(orderFetchResult)) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to fetch order',
      })
    );
  }

  const [orderDocSnapshot] = orderFetchResult;
  const orderDocData = orderDocSnapshot.data();

  if (!orderDocSnapshot.exists || !orderDocData) {
    return res.status(404).json(apiStandardError('NOT_FOUND'));
  }

  if (!isValidOrderDocData(orderDocData)) {
    return res.status(500).json(
      apiStandardError('INTERNAL_SERVER_ERROR', {
        message: 'Invalid data',
      })
    );
  }

  const userId = session.user.id;
  if (orderDocData.userId !== userId) {
    return res.status(403).json(apiStandardError('FORBIDDEN'));
  }

  const expandCartItemsResult = await asyncTryCatch(() =>
    expandCartItems(orderDocData.items)
  );

  if (isAsyncTryCatchError(expandCartItemsResult)) {
    return res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch products',
    });
  }

  const [items] = expandCartItemsResult;

  return res.status(200).json({
    userId: orderDocData.userId,
    createdAt: orderDocData.createdAt,
    items,
  });
};

export default getHandler;
