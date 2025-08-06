// 🛍️ Типы для продуктов с поддержкой многоязычности
import type { Product, Farm, CartItem } from './api';

// Реэкспортируем типы из api.ts для обратной совместимости
export type { Product, Farm, CartItem };

// Дополнительные типы для UI
export interface UIState {
    theme: 'light' | 'dark';
    language: 'en' | 'ru' | 'ar' | 'he';
    sidebarOpen: boolean;
}

export interface SearchState {
    query: string;
    filters: {
        category: string;
        priceRange: [number, number];
        organic: boolean;
    };
    results: Product[];
    loading: boolean;
}

export interface UserState {
    id?: number;
    name?: string;
    email?: string;
    isAuthenticated: boolean;
    loading: boolean;
    error?: string;
}