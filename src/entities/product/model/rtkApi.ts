import { baseApi } from '../../../shared/api/rtk';
import type { Product, ApiResponse, PaginatedResponse } from '../../../types/api';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => ({ url: '/products' }),
      providesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getProductsPaginated: builder.query<PaginatedResponse<Product>, { page: number; limit: number; filters?: { category?: string; search?: string } }>({
      query: ({ page, limit, filters }) => ({ url: '/products', params: { page, limit, ...(filters || {}) } }),
      providesTags: [{ type: 'Products', id: 'LIST' }],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsPaginatedQuery } = productApi;


