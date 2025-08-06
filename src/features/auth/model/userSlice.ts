// 👤 Redux slice для управления состоянием пользователя
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { 
  User, 
  AuthState, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  ForgotPasswordRequest,
  UpdateProfileRequest 
} from '../../../types/api';

// 📡 API URL для авторизации
const API_BASE_URL = 'http://localhost:3000/api/auth';

// 🔐 Async thunks для API calls

// Логин
export const loginUser = createAsyncThunk<AuthResponse, LoginRequest>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка входа');
      }

      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', data.token);
      
      return data;
    } catch (error) {
      return rejectWithValue('Ошибка сети. Проверьте подключение.');
    }
  }
);

// Регистрация
export const registerUser = createAsyncThunk<AuthResponse, RegisterRequest>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка регистрации');
      }

      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', data.token);
      
      return data;
    } catch (error) {
      return rejectWithValue('Ошибка сети. Проверьте подключение.');
    }
  }
);

// Получение профиля
export const getProfile = createAsyncThunk<User>(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('Токен не найден');
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка получения профиля');
      }

      return data.user;
    } catch (error) {
      return rejectWithValue('Ошибка сети. Проверьте подключение.');
    }
  }
);

// Обновление профиля
export const updateProfile = createAsyncThunk<User, UpdateProfileRequest>(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return rejectWithValue('Токен не найден');
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка обновления профиля');
      }

      return data.user;
    } catch (error) {
      return rejectWithValue('Ошибка сети. Проверьте подключение.');
    }
  }
);

// Сброс пароля
export const forgotPassword = createAsyncThunk<string, ForgotPasswordRequest>(
  'auth/forgotPassword',
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Ошибка сброса пароля');
      }

      return data.message;
    } catch (error) {
      return rejectWithValue('Ошибка сети. Проверьте подключение.');
    }
  }
);

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
  extraReducers: (builder) => {
    // Логин
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

    // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

    // Получение профиля
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // Если токен недействителен, очищаем данные
        if (action.payload === 'Токен не найден' || action.payload?.includes('Invalid')) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem('authToken');
        }
      })

    // Обновление профиля
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Сброс пароля
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
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