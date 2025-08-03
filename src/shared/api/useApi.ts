import { useState, useCallback } from 'react';
import { apiClient, apiUtils, type ApiResponse, type PaginatedResponse } from './api';
import type { Product } from './mockProducts';

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
}

// 🔧 Хук для работы с API
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
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      options.onSuccess?.(data);
      return data;
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      setState({ data: null, loading: false, error: errorMessage });
      options.onError?.(errorMessage);
      throw error;
    }
  }, [apiCall, options.onSuccess, options.onError]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// 🛍️ Хуки для продуктов
export function useProducts() {
  const getAll = useCallback(() => apiClient.products.getAll(), []);
  const getPaginated = useCallback((page: number, limit: number) => 
    apiClient.products.getPaginated(page, limit), []);
  const getById = useCallback((id: number) => apiClient.products.getById(id), []);
  const search = useCallback((query: string) => apiClient.products.search(query), []);
  const getByCategory = useCallback((category: string) => 
    apiClient.products.getByCategory(category), []);

  return {
    getAll: () => useApi(getAll),
    getPaginated: (page: number, limit: number) => useApi(() => getPaginated(page, limit)),
    getById: (id: number) => useApi(() => getById(id)),
    search: (query: string) => useApi(() => search(query)),
    getByCategory: (category: string) => useApi(() => getByCategory(category)),
  };
}

// 🏭 Хуки для ферм
export function useFarms() {
  const getAll = useCallback(() => apiClient.farms.getAll(), []);
  const getById = useCallback((id: number) => apiClient.farms.getById(id), []);
  const getProducts = useCallback((farmId: number) => apiClient.farms.getProducts(farmId), []);

  return {
    getAll: () => useApi(getAll),
    getById: (id: number) => useApi(() => getById(id)),
    getProducts: (farmId: number) => useApi(() => getProducts(farmId)),
  };
}

// 🛒 Хуки для корзины
export function useCart() {
  const getCart = useCallback(() => apiClient.cart.getCart(), []);
  const addToCart = useCallback((productId: number, quantity: number = 1) => 
    apiClient.cart.addToCart(productId, quantity), []);
  const updateCartItem = useCallback((itemId: number, quantity: number) => 
    apiClient.cart.updateCartItem(itemId, quantity), []);
  const removeFromCart = useCallback((itemId: number) => 
    apiClient.cart.removeFromCart(itemId), []);
  const clearCart = useCallback(() => apiClient.cart.clearCart(), []);

  return {
    getCart: () => useApi(getCart),
    addToCart: (productId: number, quantity: number = 1) => 
      useApi(() => addToCart(productId, quantity)),
    updateCartItem: (itemId: number, quantity: number) => 
      useApi(() => updateCartItem(itemId, quantity)),
    removeFromCart: (itemId: number) => useApi(() => removeFromCart(itemId)),
    clearCart: () => useApi(clearCart),
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