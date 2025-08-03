// 🔍 Хук для работы с поиском, управвление историей (поиска), API вызовы
import { useDispatch, useSelector } from 'react-redux';
import {
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
    selectSearchQuery,
    selectSearchResults,
    selectSearchLoading,
    selectSearchError,
    selectSearchFilters,
    selectSearchHistory,
} from './searchSlice';

export const useSearch = () => {
    const dispatch = useDispatch();

    // Получаем данные из состояния Redux
    const query = useSelector(selectSearchQuery);
    const results = useSelector(selectSearchResults);
    const loading = useSelector(selectSearchLoading);
    const error = useSelector(selectSearchError);
    const filters = useSelector(selectSearchFilters);
    const searchHistory = useSelector(selectSearchHistory);

    // Методы для работы с поиском
    const search = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            dispatch(clearResults());
            return;
        }

        try {
            dispatch(setQuery(searchQuery));
            dispatch(setLoading(true));
            dispatch(addToHistory(searchQuery));

            // Здесь будет API вызов для поиска
            // const response = await api.search({
            //     query: searchQuery,
            //     filters
            // });
            // dispatch(setResults(response.data));

            // Временная заглушка
            setTimeout(() => {
                dispatch(setResults([]));
            }, 1000);

        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Search failed'));
        }
    };

    const updateQuery = (newQuery: string) => {
        dispatch(setQuery(newQuery));
    };

    const updateCategoryFilter = (category: string) => {
        dispatch(setCategoryFilter(category));
    };

    const updatePriceRangeFilter = (range: [number, number]) => {
        dispatch(setPriceRangeFilter(range));
    };

    const updateLocationFilter = (location: string) => {
        dispatch(setLocationFilter(location));
    };

    const updateOrganicFilter = (organicOnly: boolean) => {
        dispatch(setOrganicFilter(organicOnly));
    };

    const clearSearchFilters = () => {
        dispatch(resetFilters());
    };

    const clearSearchHistory = () => {
        dispatch(clearHistory());
    };

    const clearSearchResults = () => {
        dispatch(clearResults());
    };

    // Фильтрация результатов поиска
    const filteredResults = results.filter((item: any) => {
        // Применяем фильтры к результатам поиска
        if (filters.category !== 'All' && item.category !== filters.category) {
            return false;
        }

        if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
            return false;
        }

        if (filters.location !== 'All' && item.location !== filters.location) {
            return false;
        }

        if (filters.organicOnly && !item.isOrganic) {
            return false;
        }

        return true;
    });

    return {
        // Данные
        query,
        results: filteredResults,
        loading,
        error,
        filters,
        searchHistory,

        // Методы
        search,
        updateQuery,
        updateCategoryFilter,
        updatePriceRangeFilter,
        updateLocationFilter,
        updateOrganicFilter,
        clearSearchFilters,
        clearSearchHistory,
        clearSearchResults,
    };
}; 