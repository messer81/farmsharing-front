import { baseApi } from '../../../shared/api/rtk';
import type { User } from './types';
import type { AuthResponse, LoginRequest, RegisterRequest, ForgotPasswordRequest } from '../../../types/api';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({ url: '/auth/profile' }),
      providesTags: ['User'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: any) {
          const status = err?.error?.status;
          if (status === 401 || status === 403) {
            localStorage.removeItem('authToken');
          }
        }
      },
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: '/auth/profile', method: 'PUT', body }),
      invalidatesTags: ['User'],
    }),
    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useLoginMutation, useRegisterMutation, useForgotPasswordMutation } = userApi;


