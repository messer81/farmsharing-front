import { baseApi } from '../../../shared/api/rtk';
import type { Farm } from '../../../types';

export const farmApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFarms: builder.query<Farm[], void>({
      query: () => ({ url: '/farms' }),
      providesTags: [{ type: 'Farms', id: 'LIST' }],
    }),
    getFarmById: builder.query<Farm, number>({
      query: (id) => ({ url: `/farms/${id}` }),
      providesTags: (_res, _err, id) => [{ type: 'Farms', id }],
    }),
    getFarmsByBounds: builder.query<Farm[], { n: number; s: number; e: number; w: number; category?: string; search?: string }>({
      query: ({ n, s, e, w, category, search }) => ({
        url: '/farms',
        params: { north: n, south: s, east: e, west: w, category, search },
      }),
      providesTags: [{ type: 'Farms', id: 'LIST' }],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetFarmsQuery, useGetFarmByIdQuery, useGetFarmsByBoundsQuery } = farmApi;


