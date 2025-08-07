import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Базовый RTK Query API для всего приложения
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Orders', 'Products', 'Farms'],
  endpoints: () => ({}),
});

export type { fetchBaseQuery as BaseQueryFn };


