// 🌍 Хук для работы с многоязычными данными
import { useTranslation } from 'react-i18next';
import type { Product, Farm } from '../../types/api';

// Тип для многоязычных полей
type LocalizedField = {
    en: string;
    ru: string;
    ar: string;
    he: string;
};

// Функция для получения переведенного значения
const getLocalizedValue = (field: LocalizedField, language: string): string => {
    return field[language as keyof LocalizedField] || field.en || Object.values(field)[0] || '';
};

export const useLocalizedData = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    // Получить переведенное название продукта
    const getProductTitle = (product: Product): string => {
        return getLocalizedValue(product.title, currentLanguage);
    };

    // Получить переведенное описание продукта
    const getProductDescription = (product: Product): string => {
        return getLocalizedValue(product.description, currentLanguage);
    };

    // Получить переведенное название фермы
    const getFarmName = (product: Product): string => {
        return getLocalizedValue(product.farmName, currentLanguage);
    };

    // Получить переведенную единицу измерения
    const getProductUnit = (product: Product): string => {
        return getLocalizedValue(product.unit, currentLanguage);
    };

    // Получить переведенное название фермы (для объекта Farm)
    const getFarmTitle = (farm: Farm): string => {
        return getLocalizedValue(farm.name, currentLanguage);
    };

    // Получить переведенное описание фермы
    const getFarmDescription = (farm: Farm): string => {
        return getLocalizedValue(farm.description, currentLanguage);
    };

    // Получить локализованный продукт (для совместимости со старым API)
    const getLocalizedProduct = (product: Product) => {
        return {
            ...product,
            title: getProductTitle(product),
            description: getProductDescription(product),
            farmName: getFarmName(product),
            unit: getProductUnit(product),
        };
    };

    return {
        getProductTitle,
        getProductDescription,
        getFarmName,
        getProductUnit,
        getFarmTitle,
        getFarmDescription,
        getLocalizedProduct,
        currentLanguage,
    };
}; 