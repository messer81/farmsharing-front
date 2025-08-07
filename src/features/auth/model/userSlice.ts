// 👤 Redux slice для управления состоянием пользователя
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthState } from '../../../types/api';

// 📡 API URL используется в RTK Query (shared/api/rtk.ts)

// 🔐 RTK Query используется для логина/регистрации/профиля/сброса пароля

// Начальное состояние
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Redux slice
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Установить пользователя
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    // Установить токен
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);
    },

    // Очистить пользователя (выход)
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('rememberedEmail');
    },

    // Войти как гость
    loginAsGuest: (state) => {
      state.user = {
        id: 0,
        name: 'Гость',
        email: 'guest@example.com',
        preferredLanguage: 'ru',
        isGuest: true,
      };
      state.isAuthenticated = true;
      state.error = null;
    },

    // Очистить ошибку
    clearError: (state) => {
      state.error = null;
    },

    // Установить состояние загрузки
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: () => {},
});

// Экспорт действий
export const {
  setUser,
  setToken,
  clearUser,
  loginAsGuest,
  clearError,
  setLoading,
} = userSlice.actions;

// Селекторы
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

// Экспорт reducer
export default userSlice.reducer;