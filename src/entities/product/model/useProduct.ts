// 🛍️ Хук для работы с продуктами, фильтрация, API вызовы, выбор продукта
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
    setLoading,
    setError,
    setSelectedProduct,
    setCategoryFilter,
    setPriceRangeFilter,
    setOrganicFilter,
    resetFilters,
    selectProducts,
    selectSelectedProduct,
    selectProductLoading,
    selectProductError,
    selectProductFilters,
} from './productSlice';
import { useProducts } from '../../../shared/api/useApi';
import type { Product } from '../../../types';

export const useProduct = () => {
    const dispatch = useDispatch();

    // Получаем данные из состояния Redux
    const products = useSelector(selectProducts);
    const selectedProduct = useSelector(selectSelectedProduct);
    const loading = useSelector(selectProductLoading);
    const error = useSelector(selectProductError);
    const filters = useSelector(selectProductFilters);

    // Используем новый API хук
    const productsApi = useProducts();
    const { data: apiProducts, loading: apiLoading, error: apiError, execute: fetchApiProducts } = productsApi.getAll();

    // Загружаем продукты при монтировании компонента
    useEffect(() => {
        fetchApiProducts();
    }, [fetchApiProducts]);

    // Синхронизируем состояние API с Redux
    useEffect(() => {
        if (apiProducts?.data) {
            dispatch(setLoading(false));
            // Здесь можно добавить логику для обновления Redux store
        }
    }, [apiProducts, dispatch]);

    useEffect(() => {
        if (apiLoading) {
            dispatch(setLoading(true));
        }
    }, [apiLoading, dispatch]);

    useEffect(() => {
        if (apiError) {
            dispatch(setError(apiError));
        }
    }, [apiError, dispatch]);

    // Методы для работы с продуктами
    const fetchProducts = async () => {
        try {
            dispatch(setLoading(true));
            await fetchApiProducts();
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch products'));
        }
    };

    const selectProduct = (product: Product | null) => {
        dispatch(setSelectedProduct(product));
    };

    const updateCategoryFilter = (category: string) => {
        dispatch(setCategoryFilter(category));
    };

    const updatePriceRangeFilter = (range: [number, number]) => {
        dispatch(setPriceRangeFilter(range));
    };

    const updateOrganicFilter = (organicOnly: boolean) => {
        dispatch(setOrganicFilter(organicOnly));
    };

    const clearFilters = () => {
        dispatch(resetFilters());
    };

    // Поиск продуктов
    const searchProducts = async (query: string) => {
        try {
            const searchApi = productsApi.search(query);
            await searchApi.execute();
            return searchApi.data;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to search products'));
            return null;
        }
    };

    // Получение продуктов по категории
    const getProductsByCategory = async (category: string) => {
        try {
            const categoryApi = productsApi.getByCategory(category);
            await categoryApi.execute();
            return categoryApi.data;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch products by category'));
            return null;
        }
    };

    // Получение продукта по ID
    const getProductById = async (id: number) => {
        try {
            const productApi = productsApi.getById(id);
            await productApi.execute();
            return productApi.data;
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch product'));
            return null;
        }
    };

    // Фильтрация продуктов
    const filteredProducts = products.filter(product => {
        // Фильтр по категории
        if (filters.category !== 'All' && product.category !== filters.category) {
            return false;
        }

        // Фильтр по цене
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
            return false;
        }

        // Фильтр по органическим продуктам
        if (filters.organicOnly && !product.isOrganic) {
            return false;
        }

        return true;
    });

    return {
        // Данные
        products: filteredProducts,
        selectedProduct,
        loading: loading || apiLoading,
        error: error || apiError,
        filters,

        // API данные
        apiProducts: apiProducts?.data || [],
        apiLoading,
        apiError,

        // Методы
        fetchProducts,
        selectProduct,
        updateCategoryFilter,
        updatePriceRangeFilter,
        updateOrganicFilter,
        clearFilters,
        searchProducts,
        getProductsByCategory,
        getProductById,
    };
}; 