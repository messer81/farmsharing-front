// 🚜 Redux Toolkit слайс для управления ферм, фильтрация, выбор фермы
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Farm } from '../../../types';

interface FarmState {
    farms: Farm[];
    selectedFarm: Farm | null;
    loading: boolean;
    error: string | null;
    filters: {
        location: string;
        rating: number;
        verifiedOnly: boolean;
    };
}

const initialState: FarmState = {
    farms: [],
    selectedFarm: null,
    loading: false,
    error: null,
    filters: {
        location: 'All',
        rating: 0,
        verifiedOnly: false,
    },
};

export const farmSlice = createSlice({
    name: 'farm',
    initialState,
    reducers: {
        // 🚜 Загрузка ферм
        setFarms: (state, action: PayloadAction<Farm[]>) => {
            state.farms = action.payload;
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

        // 🎯 Выбор фермы
        setSelectedFarm: (state, action: PayloadAction<Farm | null>) => {
            state.selectedFarm = action.payload;
        },

        // 🔍 Обновление фильтров
        setLocationFilter: (state, action: PayloadAction<string>) => {
            state.filters.location = action.payload;
        },

        setRatingFilter: (state, action: PayloadAction<number>) => {
            state.filters.rating = action.payload;
        },

        setVerifiedFilter: (state, action: PayloadAction<boolean>) => {
            state.filters.verifiedOnly = action.payload;
        },

        // 🧹 Сброс фильтров
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
});

export const {
    setFarms,
    setLoading,
    setError,
    setSelectedFarm,
    setLocationFilter,
    setRatingFilter,
    setVerifiedFilter,
    resetFilters,
} = farmSlice.actions;

// Селекторы
export const selectFarms = (state: { farm: FarmState }) => state.farm.farms;
export const selectSelectedFarm = (state: { farm: FarmState }) => state.farm.selectedFarm;
export const selectFarmLoading = (state: { farm: FarmState }) => state.farm.loading;
export const selectFarmError = (state: { farm: FarmState }) => state.farm.error;
export const selectFarmFilters = (state: { farm: FarmState }) => state.farm.filters;

export default farmSlice.reducer; 