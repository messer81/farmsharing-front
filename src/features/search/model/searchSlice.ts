// 🔍 Redux Toolkit слайс для управления поиском, история поиска, фильтры, результаты поиска
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    query: string;
    results: any[];
    filters: {
        category: string;
        priceRange: [number, number];
        location: string;
        organicOnly: boolean;
    };
    loading: boolean;
    error: string | null;
    searchHistory: string[];
}

const initialState: SearchState = {
    query: '',
    results: [],
    filters: {
        category: 'All',
        priceRange: [0, 1000],
        location: 'All',
        organicOnly: false,
    },
    loading: false,
    error: null,
    searchHistory: [],
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // 🔍 Установка поискового запроса
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },

        // 📋 Установка результатов поиска
        setResults: (state, action: PayloadAction<any[]>) => {
            state.results = action.payload;
            state.loading = false;
            state.error = null;
        },

        // 🔄 Начало поиска
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        // ❌ Ошибка поиска
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },

        // 🔍 Обновление фильтров поиска
        setCategoryFilter: (state, action: PayloadAction<string>) => {
            state.filters.category = action.payload;
        },

        setPriceRangeFilter: (state, action: PayloadAction<[number, number]>) => {
            state.filters.priceRange = action.payload;
        },

        setLocationFilter: (state, action: PayloadAction<string>) => {
            state.filters.location = action.payload;
        },

        setOrganicFilter: (state, action: PayloadAction<boolean>) => {
            state.filters.organicOnly = action.payload;
        },

        // 🧹 Сброс фильтров
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },

        // 📚 Добавление в историю поиска
        addToHistory: (state, action: PayloadAction<string>) => {
            const query = action.payload.trim();
            if (query && !state.searchHistory.includes(query)) {
                state.searchHistory.unshift(query);
                // Ограничиваем историю 10 последними запросами
                if (state.searchHistory.length > 10) {
                    state.searchHistory = state.searchHistory.slice(0, 10);
                }
            }
        },

        // 🗑️ Очистка истории поиска
        clearHistory: (state) => {
            state.searchHistory = [];
        },

        // 🧹 Очистка результатов
        clearResults: (state) => {
            state.results = [];
            state.query = '';
        },
    },
});

export const {
    setQuery,
    setResults,
    setLoading,
    setError,
    setCategoryFilter,
    setPriceRangeFilter,
    setLocationFilter,
    setOrganicFilter,
    resetFilters,
    addToHistory,
    clearHistory,
    clearResults,
} = searchSlice.actions;

// Селекторы
export const selectSearchQuery = (state: { search: SearchState }) => state.search.query;
export const selectSearchResults = (state: { search: SearchState }) => state.search.results;
export const selectSearchLoading = (state: { search: SearchState }) => state.search.loading;
export const selectSearchError = (state: { search: SearchState }) => state.search.error;
export const selectSearchFilters = (state: { search: SearchState }) => state.search.filters;
export const selectSearchHistory = (state: { search: SearchState }) => state.search.searchHistory;

export default searchSlice.reducer; 