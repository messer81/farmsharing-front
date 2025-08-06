// 🛍️ Redux Toolkit слайс для управления продуктами
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../../types/api';

// Экспортируем тип Product для использования в компонентах
export type { Product } from '../../../types';

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
    filters: {
        category: string;
        priceRange: [number, number];
        organicOnly: boolean;
    };
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    filters: {
        category: 'All',
        priceRange: [0, 1000],
        organicOnly: false,
    },
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // 📦 Загрузка продуктов
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },

        // 🔄 Начало загрузки
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        // ❌ Ошибка загрузки
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },

        // 🎯 Выбор продукта
        setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
            state.selectedProduct = action.payload;
        },

        // 🔍 Обновление фильтров
        setCategoryFilter: (state, action: PayloadAction<string>) => {
            state.filters.category = action.payload;
        },

        setPriceRangeFilter: (state, action: PayloadAction<[number, number]>) => {
            state.filters.priceRange = action.payload;
        },

        setOrganicFilter: (state, action: PayloadAction<boolean>) => {
            state.filters.organicOnly = action.payload;
        },

        // 🧹 Сброс фильтров
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
});

export const {
    setProducts,
    setLoading,
    setError,
    setSelectedProduct,
    setCategoryFilter,
    setPriceRangeFilter,
    setOrganicFilter,
    resetFilters,
} = productSlice.actions;

// Селекторы
export const selectProducts = (state: { product: ProductState }) => state.product.products;
export const selectSelectedProduct = (state: { product: ProductState }) => state.product.selectedProduct;
export const selectProductLoading = (state: { product: ProductState }) => state.product.loading;
export const selectProductError = (state: { product: ProductState }) => state.product.error;
export const selectProductFilters = (state: { product: ProductState }) => state.product.filters;

export default productSlice.reducer; 