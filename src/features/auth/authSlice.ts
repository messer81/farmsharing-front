// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Типы для пользователя и состояния авторизации
interface User {
    id: number
    nickname: string
    email: string
}

interface AuthState {
    user: User | null
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean
}

// Загружаем токен из localStorage при инициализации
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Действие при успешном логине
        loginSuccess: (state, action: PayloadAction<{
            user: User
            accessToken: string
            refreshToken: string
        }>) => {
            const { user, accessToken, refreshToken } = action.payload

            state.user = user
            state.token = accessToken
            state.refreshToken = refreshToken
            state.isAuthenticated = true

            // Сохраняем токены в localStorage
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
        },

        // Действие при выходе из системы
        logout: (state) => {
            state.user = null
            state.token = null
            state.refreshToken = null
            state.isAuthenticated = false

            // Удаляем токены из localStorage
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },

        // Действие при обновлении токена
        tokenRefreshed: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            localStorage.setItem('accessToken', action.payload)
        },
    },
})

export const { loginSuccess, logout, tokenRefreshed } = authSlice.actions
export default authSlice.reducer
