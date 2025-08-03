// 🚜 Хук для работы с фермами, фильтрация, API вызовы
import { useDispatch, useSelector } from 'react-redux';
import {
    setLoading,
    setError,
    setSelectedFarm,
    setLocationFilter,
    setRatingFilter,
    setVerifiedFilter,
    resetFilters,
    selectFarms,
    selectSelectedFarm,
    selectFarmLoading,
    selectFarmError,
    selectFarmFilters,
} from './farmSlice';
import type { Farm } from '../../../types';

export const useFarm = () => {
    const dispatch = useDispatch();

    // Получаем данные из состояния Redux
    const farms = useSelector(selectFarms);
    const selectedFarm = useSelector(selectSelectedFarm);
    const loading = useSelector(selectFarmLoading);
    const error = useSelector(selectFarmError);
    const filters = useSelector(selectFarmFilters);

    // Методы для работы с фермами
    const fetchFarms = async () => {
        try {
            dispatch(setLoading(true));
            // Здесь будет API вызов
            // const response = await api.getFarms();
            // dispatch(setFarms(response.data));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch farms'));
        }
    };

    const selectFarm = (farm: Farm | null) => {
        dispatch(setSelectedFarm(farm));
    };

    const updateLocationFilter = (location: string) => {
        dispatch(setLocationFilter(location));
    };

    const updateRatingFilter = (rating: number) => {
        dispatch(setRatingFilter(rating));
    };

    const updateVerifiedFilter = (verifiedOnly: boolean) => {
        dispatch(setVerifiedFilter(verifiedOnly));
    };

    const clearFilters = () => {
        dispatch(resetFilters());
    };

    // Фильтрация ферм
    const filteredFarms = farms.filter(farm => {
        // Фильтр по локации
        if (filters.location !== 'All' && farm.location !== filters.location) {
            return false;
        }

        // Фильтр по рейтингу
        if (filters.rating > 0 && farm.rating < filters.rating) {
            return false;
        }

        // Фильтр по верификации
        if (filters.verifiedOnly && !farm.isVerified) {
            return false;
        }

        return true;
    });

    return {
        // Данные
        farms: filteredFarms,
        selectedFarm,
        loading,
        error,
        filters,

        // Методы
        fetchFarms,
        selectFarm,
        updateLocationFilter,
        updateRatingFilter,
        updateVerifiedFilter,
        clearFilters,
    };
}; 