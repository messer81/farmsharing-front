// 🚀 Хуки для работы с API
import { useState, useCallback } from 'react';
import type { Product, Farm, ApiResponse, PaginatedResponse } from '../../types/api';



// Хук для получения всех продуктов
export const useProductsAll = () => {
    const [data, setData] = useState<ApiResponse<Product[]> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Используем реальный API
            const response = await fetch('http://localhost:3000/api/products');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const apiData = await response.json();
            
            const responseData: ApiResponse<Product[]> = {
                data: apiData.data,
                message: 'Products loaded successfully',
                success: true
            };
            
            setData(responseData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load products');
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, execute };
};

// Хук для получения продуктов с пагинацией
export const useProductsPaginated = (page: number = 1, limit: number = 10) => {
    const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Используем реальный API
            const response = await fetch(`http://localhost:3000/api/products?page=${page}&limit=${limit}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const apiData = await response.json();
            
            const responseData: PaginatedResponse<Product> = {
                data: apiData.data,
                total: apiData.total,
                page: apiData.page,
                limit: apiData.limit,
                totalPages: apiData.totalPages
            };
            
            setData(responseData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load products');
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    return { data, loading, error, execute };
};

// Хук для получения ферм
export const useFarmsAll = () => {
    const [data, setData] = useState<ApiResponse<Farm[]> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Используем реальный API
            const response = await fetch('http://localhost:3000/api/farms');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const apiData = await response.json();
            
            const responseData: ApiResponse<Farm[]> = {
                data: apiData.data,
                message: 'Farms loaded successfully',
                success: true
            };
            
            setData(responseData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load farms');
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, execute };
};

// Хук для получения продукта по ID
export const useProductById = (id: number) => {
    const [data, setData] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Используем реальный API
            const response = await fetch(`http://localhost:3000/api/products/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const product = await response.json();
            setData(product);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load product');
        } finally {
            setLoading(false);
        }
    }, [id]);

    return { data, loading, error, execute };
};

// Хук для получения фермы по ID
export const useFarmById = (id: number) => {
    const [data, setData] = useState<Farm | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Используем реальный API
            const response = await fetch(`http://localhost:3000/api/farms/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const farm = await response.json();
            setData(farm);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load farm');
        } finally {
            setLoading(false);
        }
    }, [id]);

    return { data, loading, error, execute };
}; 