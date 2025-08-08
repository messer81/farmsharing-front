// 🌐 API слой с Axios для работы с Express сервером
import type { Product, ApiResponse, PaginatedResponse } from '../../types/api';
import type { Order, CreateOrderRequest } from '../../entities/order/model/types';
import axiosInstance, { apiUtils } from './axios';

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

// 🛍️ API для продуктов с Express сервером
export const productsApi = {
  // Получить все продукты
  getAll: async (): Promise<PaginatedResponse<Product>> => {
    return apiRequest<PaginatedResponse<Product>>('/api/products');
  },

  // Получить продукты с пагинацией
  getPaginated: async (page: number = 1, limit: number = 8): Promise<PaginatedResponse<Product>> => {
    return apiRequest<PaginatedResponse<Product>>('/api/products', {
      params: { page, limit }
    });
  },

  // Получить продукт по ID
  getById: async (id: number): Promise<Product> => {
    return apiRequest<Product>(`/api/products/${id}`);
  },

  // Поиск продуктов
  search: async (query: string): Promise<{ data: Product[]; total: number }> => {
    return apiRequest<{ data: Product[]; total: number }>('/api/products/search', {
      params: { q: query }
    });
  },

  // Фильтрация по категории
  getByCategory: async (category: string): Promise<{ data: Product[]; total: number }> => {
    return apiRequest<{ data: Product[]; total: number }>(`/api/products/category/${encodeURIComponent(category)}`);
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
    return apiRequest<ApiResponse<any>>('/api/cart/add', {
      method: 'POST',
      data: { productId, quantity }
    });
  },

  // Обновить количество товара в корзине
  updateCartItem: async (itemId: number, quantity: number): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/api/cart/${itemId}`, {
      method: 'PUT',
      data: { quantity }
    });
  },

  // Удалить товар из корзины
  removeFromCart: async (itemId: number): Promise<ApiResponse<void>> => {
    return apiRequest<ApiResponse<void>>(`/api/cart/${itemId}`, {
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

// 🧾 API для заказов
export const ordersApi = {
  // Создать заказ
  create: async (orderData: CreateOrderRequest): Promise<ApiResponse<Order>> => {
    return apiRequest<ApiResponse<Order>>('/api/orders', {
      method: 'POST',
      data: orderData,
    });
  },

  // Получить заказы пользователя
  getByUser: async (userId: number): Promise<ApiResponse<Order[]>> => {
    return apiRequest<ApiResponse<Order[]>>('/api/orders', {
      params: { userId },
    });
  },
};

// 💳 Платежи (Stripe)
export const paymentsApi = {
  createPaymentIntent: async (amount: number, currency: string = 'ils'): Promise<{ clientSecret: string }> => {
    return apiRequest<{ clientSecret: string }>('/api/payments/create-intent', {
      method: 'POST',
      data: { amount, currency },
    });
  },
};



// 🎯 Универсальный API клиент
export const apiClient = {
  products: productsApi, // Всегда используем Axios API
  farms: farmsApi,
  cart: cartApi,
  orders: ordersApi,
  payments: paymentsApi,
};

// 🔧 Экспорт утилит и экземпляра Axios
export { axiosInstance, apiUtils };
export type { ApiResponse, PaginatedResponse };