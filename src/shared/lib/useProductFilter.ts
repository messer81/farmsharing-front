// 🔍 Общий хук для фильтрации продуктов
import { useState, useCallback, useMemo } from 'react';
import type { Product } from '../../types/api';

interface FilterState {
    category: string;
    searchQuery: string;
    selectedTags: string[];
    priceRange: [number, number];
    organicOnly: boolean;
}

export const useProductFilter = (products: Product[]) => {
    const [filters, setFilters] = useState<FilterState>({
        category: 'all',
        searchQuery: '',
        selectedTags: [],
        priceRange: [0, 1000],
        organicOnly: false
    });

    // Фильтрация продуктов
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Фильтр по категории
            if (filters.category !== 'all' && 
                product.category.toLowerCase() !== filters.category.toLowerCase()) {
                return false;
            }

            // Фильтр по поисковому запросу
            if (filters.searchQuery.trim()) {
                const query = filters.searchQuery.toLowerCase();
                const matchesSearch = 
                    product.title.en.toLowerCase().includes(query) ||
                    product.title.ru.toLowerCase().includes(query) ||
                    product.description.en.toLowerCase().includes(query) ||
                    product.description.ru.toLowerCase().includes(query);
                
                if (!matchesSearch) return false;
            }

            // Фильтр по цене
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
                return false;
            }

            // Фильтр по органическим продуктам
            if (filters.organicOnly && !product.isOrganic) {
                return false;
            }

            // Фильтр по тегам
            if (filters.selectedTags.length > 0) {
                const productTags = [
                    product.isOrganic ? 'organic' : '',
                    'fresh',
                    'local',
                    product.category,
                    'natural'
                ].filter(Boolean);
                
                const hasMatchingTag = filters.selectedTags.some(tag => 
                    productTags.includes(tag)
                );
                
                if (!hasMatchingTag) return false;
            }

            return true;
        });
    }, [products, filters]);

    // Обработчики фильтров
    const updateCategoryFilter = useCallback((category: string) => {
        setFilters(prev => ({ ...prev, category }));
    }, []);

    const updateSearchQuery = useCallback((query: string) => {
        setFilters(prev => ({ ...prev, searchQuery: query }));
    }, []);

    const toggleTag = useCallback((tag: string) => {
        setFilters(prev => ({
            ...prev,
            selectedTags: prev.selectedTags.includes(tag)
                ? prev.selectedTags.filter(t => t !== tag)
                : [...prev.selectedTags, tag]
        }));
    }, []);

    const updatePriceRange = useCallback((range: [number, number]) => {
        setFilters(prev => ({ ...prev, priceRange: range }));
    }, []);

    const updateOrganicFilter = useCallback((organicOnly: boolean) => {
        setFilters(prev => ({ ...prev, organicOnly }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            category: 'all',
            searchQuery: '',
            selectedTags: [],
            priceRange: [0, 1000],
            organicOnly: false
        });
    }, []);

    return {
        // Данные
        filteredProducts,
        filters,
        
        // Методы
        updateCategoryFilter,
        updateSearchQuery,
        toggleTag,
        updatePriceRange,
        updateOrganicFilter,
        clearFilters
    };
}; 