// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import authSlice from '../features/auth/authSlice'
import cartSlice from '../features/cart/cartSlice'

export const store = configureStore({
    reducer: {
        // API слайс для всех запросов к бэкенду
        api: apiSlice.reducer,

        // Слайс для авторизации (JWT токены)
        auth: authSlice,

        // Слайс для корзины покупок
        cart: cartSlice,
    },
    // Middleware для RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
