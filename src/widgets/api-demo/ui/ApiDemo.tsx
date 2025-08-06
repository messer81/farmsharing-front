import React, { useState } from 'react';
import { useProductsAll } from '../../../shared/api/useApi';
import { useCart } from '../../../features/cart/model/useCart';
import { useLocalizedData } from '../../../shared/lib/useLocalizedData';
import { Header } from '../../header/ui/Header';

// 🎯 Демонстрационный компонент для работы с API
export const ApiDemo: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Используем хуки для работы с API
    const { data: allProducts, loading: productsLoading, error: productsError, execute: fetchProducts } = useProductsAll();
    const { addItem } = useCart();
    const { getProductTitle, getProductDescription } = useLocalizedData();

    // Обработчики событий
    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Логика поиска
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleAddToCart = (product: any) => {
        addItem(product, 1);
    };

    return (
        <>
            <Header />
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">🚀 Демонстрация API</h2>

            {/* Поиск продуктов */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">🔍 Поиск продуктов</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Введите название продукта..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={productsLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        {productsLoading ? 'Поиск...' : 'Найти'}
                    </button>
                </div>
                {productsError && (
                    <p className="text-red-500 mt-2">❌ Ошибка поиска: {productsError}</p>
                )}
            </div>

            {/* Фильтр по категориям */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">🏷️ Фильтр по категориям</h3>
                <div className="flex gap-2 flex-wrap">
                    {['vegetables', 'fruits', 'dairy', 'honey'].map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-3 py-1 rounded-md ${
                                selectedCategory === category
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Загрузка всех продуктов */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">📦 Все продукты</h3>
                <button
                    onClick={fetchProducts}
                    disabled={productsLoading}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 mb-3"
                >
                    {productsLoading ? 'Загрузка...' : 'Загрузить все продукты'}
                </button>
                {productsError && (
                    <p className="text-red-500 mb-3">❌ Ошибка загрузки: {productsError}</p>
                )}
            </div>

            {/* Все продукты */}
            {allProducts?.data && allProducts.data.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">📦 Все продукты ({allProducts.data.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allProducts.data.slice(0, 6).map((product: any) => (
                            <div key={product.id} className="border rounded-lg p-4">
                                <h4 className="font-semibold">{getProductTitle(product)}</h4>
                                <p className="text-gray-600">{getProductDescription(product)}</p>
                                <p className="text-green-600 font-bold">₪{product.price}</p>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    В корзину
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Статус загрузки */}
            {productsLoading && (
                <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600">Загрузка данных...</p>
                </div>
            )}

            {/* Ошибки */}
            {productsError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <h4 className="text-red-800 font-semibold mb-2">❌ Ошибки API:</h4>
                    <p className="text-red-600">Загрузка продуктов: {productsError}</p>
                </div>
            )}
        </div>
        </>
    );
}; 