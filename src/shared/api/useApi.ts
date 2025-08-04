import { useState, useCallback } from 'react';
import { apiClient, apiUtils } from './api';
import type { ApiResponse, PaginatedResponse } from '../../types/api';

// 🗄️ Простое кэширование
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

function getFromCache(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

function clearCache(pattern?: string): void {
  if (pattern) {
    // Очищаем кэш по паттерну
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    // Очищаем весь кэш
    cache.clear();
  }
}

// 🎯 Типы для состояний запросов
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface ApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  immediate?: boolean;
  cacheKey?: string; // Добавляем возможность указать ключ кэша
}

// 🔧 Хук для работы с API с кэшированием
export function useApi<T>(
  apiCall: () => Promise<T>,
  options: ApiOptions = {}
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Используем переданный ключ кэша или генерируем новый
      const cacheKey = options.cacheKey || `api_call_${Date.now()}`;
      const cachedData = getFromCache(cacheKey);
      
      if (cachedData) {
        console.log('📦 Using cached data for:', cacheKey);
        setState({ data: cachedData, loading: false, error: null });
        options.onSuccess?.(cachedData);
        return cachedData;
      }
      
      console.log('🔄 Fetching fresh data for:', cacheKey);
      const data = await apiCall();
      
      // Кэшируем результат
      setCache(cacheKey, data);
      
      setState({ data, loading: false, error: null });
      options.onSuccess?.(data);
      return data;
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      setState({ data: null, loading: false, error: errorMessage });
      options.onError?.(errorMessage);
      throw error;
    }
  }, [options.onSuccess, options.onError, options.cacheKey]); // Убрал apiCall из зависимостей

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// 🛍️ Стабильные хуки для продуктов
export function useProductsPaginated(page: number, limit: number) {
  return useApi(() => apiClient.products.getPaginated(page, limit), { 
    cacheKey: `products_paginated_${page}_${limit}` 
  });
}

export function useProductsAll() {
  return useApi(() => apiClient.products.getAll(), { 
    cacheKey: 'products_all' 
  });
}

export function useProductsById(id: number) {
  return useApi(() => apiClient.products.getById(id), { 
    cacheKey: `products_by_id_${id}` 
  });
}

export function useProductsSearch(query: string) {
  return useApi(() => apiClient.products.search(query), { 
    cacheKey: `products_search_${query}` 
  });
}

export function useProductsByCategory(category: string) {
  return useApi(() => apiClient.products.getByCategory(category), { 
    cacheKey: `products_category_${category}` 
  });
}

// 🏭 Стабильные хуки для ферм
export function useFarmsAll() {
  return useApi(() => apiClient.farms.getAll(), { 
    cacheKey: 'farms_all' 
  });
}

export function useFarmsById(id: number) {
  return useApi(() => apiClient.farms.getById(id), { 
    cacheKey: `farms_by_id_${id}` 
  });
}

export function useFarmsProducts(farmId: number) {
  return useApi(() => apiClient.farms.getProducts(farmId), { 
    cacheKey: `farms_products_${farmId}` 
  });
}

// 🛒 Стабильные хуки для корзины
export function useCartGet() {
  return useApi(() => apiClient.cart.getCart(), { 
    cacheKey: 'cart_get' 
  });
}

export function useCartAdd() {
  return useMutation(({ productId, quantity }: { productId: number; quantity: number }) => 
    apiClient.cart.addToCart(productId, quantity), { 
    cacheKey: 'cart_add' 
  });
}

export function useCartUpdate() {
  return useMutation(({ itemId, quantity }: { itemId: number; quantity: number }) => 
    apiClient.cart.updateCartItem(itemId, quantity), { 
    cacheKey: 'cart_update' 
  });
}

export function useCartRemove() {
  return useMutation((itemId: number) => 
    apiClient.cart.removeFromCart(itemId), { 
    cacheKey: 'cart_remove' 
  });
}

export function useCartClear() {
  return useMutation(() => apiClient.cart.clearCart(), { 
    cacheKey: 'cart_clear' 
  });
}

// 🛍️ Хуки для продуктов (для обратной совместимости)
export function useProducts() {
  return {
    getAll: () => useApi(() => apiClient.products.getAll(), { cacheKey: 'products_all' }),
    getPaginated: (page: number, limit: number) => 
      useApi(() => apiClient.products.getPaginated(page, limit), { cacheKey: `products_paginated_${page}_${limit}` }),
    getById: (id: number) => 
      useApi(() => apiClient.products.getById(id), { cacheKey: `products_by_id_${id}` }),
    search: (query: string) => 
      useApi(() => apiClient.products.search(query), { cacheKey: `products_search_${query}` }),
    getByCategory: (category: string) => 
      useApi(() => apiClient.products.getByCategory(category), { cacheKey: `products_category_${category}` }),
  };
}

// 🏭 Хуки для ферм (для обратной совместимости)
export function useFarms() {
  return {
    getAll: () => useApi(() => apiClient.farms.getAll(), { cacheKey: 'farms_all' }),
    getById: (id: number) => 
      useApi(() => apiClient.farms.getById(id), { cacheKey: `farms_by_id_${id}` }),
    getProducts: (farmId: number) => 
      useApi(() => apiClient.farms.getProducts(farmId), { cacheKey: `farms_products_${farmId}` }),
  };
}

// 🛒 Хуки для корзины (для обратной совместимости)
export function useCart() {
  return {
    getCart: () => useApi(() => apiClient.cart.getCart(), { cacheKey: 'cart_get' }),
    addToCart: (productId: number, quantity: number = 1) => 
      useApi(() => apiClient.cart.addToCart(productId, quantity), { cacheKey: `cart_add_${productId}_${quantity}` }),
    updateCartItem: (itemId: number, quantity: number) => 
      useApi(() => apiClient.cart.updateCartItem(itemId, quantity), { cacheKey: `cart_update_${itemId}_${quantity}` }),
    removeFromCart: (itemId: number) => 
      useApi(() => apiClient.cart.removeFromCart(itemId), { cacheKey: `cart_remove_${itemId}` }),
    clearCart: () => useApi(() => apiClient.cart.clearCart(), { cacheKey: 'cart_clear' }),
  };
}

// 🔧 Хук для мутаций (POST, PUT, DELETE)
export function useMutation<T, R>(
  mutationFn: (data: T) => Promise<R>,
  options: ApiOptions = {}
) {
  const [state, setState] = useState<ApiState<R>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(async (data: T) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await mutationFn(data);
      setState({ data: result, loading: false, error: null });
      options.onSuccess?.(result);
      return result;
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      setState({ data: null, loading: false, error: errorMessage });
      options.onError?.(errorMessage);
      throw error;
    }
  }, [mutationFn, options.onSuccess, options.onError]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}

// 🎯 Экспорт типов
export type { ApiResponse, PaginatedResponse };

// Экспортируем функцию очистки кэша
export { clearCache }; 