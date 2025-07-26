// src/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store/store'

// Базовый URL вашего бэкенда
const baseUrl = 'https://farm-sharing-java57-davidash.j.aivencloud.com:25439'

// Функция для добавления JWT токена к запросам
const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // Получаем токен из состояния Redux
        const token = (getState() as RootState).auth.token

        // Если токен есть - добавляем его в заголовок Authorization
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        headers.set('content-type', 'application/json')
        return headers
    },
})

// Создаём API слайс для всех запросов
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Offer', 'User', 'Auth'], // Теги для кэширования
    endpoints: (builder) => ({
        // Здесь мы будем добавлять все endpoints
    }),
})
