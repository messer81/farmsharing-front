import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 📡 Базовый URL для API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// 🔧 Создание экземпляра Axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔄 Перехватчик запросов
axiosInstance.interceptors.request.use(
  (config) => {
    // Добавляем токен авторизации если есть
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Логирование запросов в development режиме
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 🔄 Перехватчик ответов
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Логирование ответов в development режиме
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    // Обработка различных типов ошибок
    if (error.response) {
      // Сервер ответил с ошибкой
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Неавторизованный доступ
          localStorage.removeItem('authToken');
          console.error('🔐 Unauthorized access');
          break;
        case 403:
          console.error('🚫 Access forbidden');
          break;
        case 404:
          console.error('🔍 Resource not found');
          break;
        case 500:
          console.error('💥 Server error');
          break;
        default:
          console.error(`❌ HTTP Error ${status}:`, data);
      }
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен
      console.error('🌐 Network error - no response received');
    } else {
      // Ошибка при настройке запроса
      console.error('⚙️ Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// 🎯 Типы для API ответов
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 🔧 Утилиты для работы с API
export const apiUtils = {
  // Создание URL с параметрами
  createUrl: (endpoint: string, params?: Record<string, any>): string => {
    if (!params) return endpoint;
    
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  },
  
  // Обработка ошибок
  handleError: (error: any): string => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'Произошла неизвестная ошибка';
  },
};

export default axiosInstance; 