// 🌐 API слой с Axios для тестирования с Postman
import { productsAPI, type Product } from './mockProducts';
import axiosInstance, { type ApiResponse, type PaginatedResponse, apiUtils } from './axios';

// 🔧 Конфигурация API
const API_CONFIG = {
  timeout: 10000, // 10 секунд
};

// 📡 Универсальная функция для API запросов с Axios
async function apiRequest<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
  } = {}
): Promise<T> {
  const { method = 'GET', data, params, headers } = options;
  
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data,
      params,
      headers,
      timeout: API_CONFIG.timeout,
    });
    
    return response.data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// 🛍️ API для продуктов с Axios
export const productsApi = {
  // Получить все продукты
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    return apiRequest<ApiResponse<Product[]>>('/api/products');
  },

  // Получить продукты с пагинацией
  getPaginated: async (page: number = 1, limit: number = 8): Promise<PaginatedResponse<Product>> => {
    return apiRequest<PaginatedResponse<Product>>('/api/products', {
      params: { page, limit }
    });
  },

  // Получить продукт по ID
  getById: async (id: number): Promise<ApiResponse<Product>> => {
    return apiRequest<ApiResponse<Product>>(`/api/products/${id}`);
  },

  // Поиск продуктов
  search: async (query: string): Promise<ApiResponse<Product[]>> => {
    return apiRequest<ApiResponse<Product[]>>('/api/products/search', {
      params: { q: query }
    });
  },

  // Фильтрация по категории
  getByCategory: async (category: string): Promise<ApiResponse<Product[]>> => {
    return apiRequest<ApiResponse<Product[]>>(`/api/products/category/${encodeURIComponent(category)}`);
  },

  // Создать новый продукт
  create: async (productData: Omit<Product, 'id'>): Promise<ApiResponse<Product>> => {
    return apiRequest<ApiResponse<Product>>('/api/products', {
      method: 'POST',
      data: productData
    });
  },

  // Обновить продукт
  update: async (id: number, productData: Partial<Product>): Promise<ApiResponse<Product>> => {
    return apiRequest<ApiResponse<Product>>(`/api/products/${id}`, {
      method: 'PUT',
      data: productData
    });
  },

  // Удалить продукт
  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiRequest<ApiResponse<void>>(`/api/products/${id}`, {
      method: 'DELETE'
    });
  },
};

// 🏭 API для ферм
export const farmsApi = {
  // Получить все фермы
  getAll: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>('/api/farms');
  },

  // Получить ферму по ID
  getById: async (id: number): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/api/farms/${id}`);
  },

  // Получить продукты фермы
  getProducts: async (farmId: number): Promise<ApiResponse<Product[]>> => {
    return apiRequest<ApiResponse<Product[]>>(`/api/farms/${farmId}/products`);
  },
};

// 🛒 API для корзины
export const cartApi = {
  // Получить корзину пользователя
  getCart: async (): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/api/cart');
  },

  // Добавить товар в корзину
  addToCart: async (productId: number, quantity: number = 1): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/api/cart/items', {
      method: 'POST',
      data: { productId, quantity }
    });
  },

  // Обновить количество товара в корзине
  updateCartItem: async (itemId: number, quantity: number): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/api/cart/items/${itemId}`, {
      method: 'PUT',
      data: { quantity }
    });
  },

  // Удалить товар из корзины
  removeFromCart: async (itemId: number): Promise<ApiResponse<void>> => {
    return apiRequest<ApiResponse<void>>(`/api/cart/items/${itemId}`, {
      method: 'DELETE'
    });
  },

  // Очистить корзину
  clearCart: async (): Promise<ApiResponse<void>> => {
    return apiRequest<ApiResponse<void>>('/api/cart', {
      method: 'DELETE'
    });
  },
};

// 🔄 Функция для переключения между mock и реальным API
export const useMockAPI = () => {
  // По умолчанию используем mock для быстрого старта
  return import.meta.env.VITE_USE_MOCK_API !== 'false';
};

// 🎯 Универсальный API клиент
export const apiClient = {
  products: useMockAPI() ? productsAPI : productsApi,
  farms: farmsApi,
  cart: cartApi,
};

// 🔧 Экспорт утилит и экземпляра Axios
export { axiosInstance, apiUtils };
export type { ApiResponse, PaginatedResponse };