// src/features/auth/authApiSlice.ts
import { apiSlice } from '../../api/apiSlice'
import { loginSuccess } from './authSlice'

// Типы для запросов авторизации
interface LoginRequest {
    nickname: string
    password: string
}

interface RegisterRequest {
    nickname: string
    email: string
    password: string
}

interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: {
        id: number
        nickname: string
        email: string
    }
}

// Расширяем apiSlice endpoints для авторизации
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Endpoint для логина
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: credentials,
            }),
            // При успешном логине обновляем состояние Redux
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(loginSuccess(data))
                } catch (error) {
                    console.error('Login failed:', error)
                }
            },
        }),

        // Endpoint для регистрации
        register: builder.mutation<boolean, RegisterRequest>({
            query: (userData) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: userData,
            }),
        }),

        // Endpoint для обновления токена
        refreshToken: builder.mutation<AuthResponse, { refreshToken: string }>({
            query: (tokenData) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: tokenData,
            }),
        }),
    }),
})

// Экспортируем хуки для использования в компонентах
export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
} = authApiSlice
