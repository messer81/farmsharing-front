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
  }),
});

export const { useGetFarmsQuery, useGetFarmByIdQuery } = farmApi;


