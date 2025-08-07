import { baseApi } from '../../../shared/api/rtk';
import type { CreateOrderRequest, CreateOrderResponse, Order } from './types';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByUser: builder.query<Order[], number>({
      query: (userId) => ({ url: `/orders?userId=${userId}` }),
      providesTags: (result) =>
        result ? [...result.map((o) => ({ type: 'Orders' as const, id: o.id })), { type: 'Orders' as const, id: 'LIST' }] : [{ type: 'Orders' as const, id: 'LIST' }],
    }),
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (body) => ({ url: '/orders', method: 'POST', body }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
  }),
});

export const { useGetOrdersByUserQuery, useCreateOrderMutation } = orderApi;


