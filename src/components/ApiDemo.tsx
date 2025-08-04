import React, { useState } from 'react';
import { useProducts, useCart, useMutation } from '../api/useApi';

// 🎯 Демонстрационный компонент для работы с Axios API
export const ApiDemo: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Используем хуки для работы с API
    const productsApi = useProducts();
    const cartApi = useCart();

    // Получаем все продукты
    const { data: allProducts, loading: productsLoading, error: productsError, execute: fetchProducts } = productsApi.getAll();

    // Поиск продуктов
    const { data: searchResults, loading: searchLoading, error: searchError, execute: searchProducts } = productsApi.search(searchQuery);

    // Получение продуктов по категории
    const { data: categoryProducts, loading: categoryLoading, error: categoryError, execute: getCategoryProducts } = productsApi.getByCategory(selectedCategory);

    // Мутация для добавления в корзину
    const addToCartMutation = useMutation(
        (productId: number) => cartApi.addToCart(productId, 1),
        {
            onSuccess: (data) => {
                console.log('✅ Товар добавлен в корзину:', data);
            },
            onError: (error) => {
                console.error('❌ Ошибка добавления в корзину:', error);
            }
        }
    );

    // Обработчики событий
    const handleSearch = () => {
        if (searchQuery.trim()) {
            searchProducts();
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category) {
            getCategoryProducts();
        }
    };

    const handleAddToCart = (productId: number) => {
        addToCartMutation.mutate(productId);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">🚀 Демонстрация Axios API</h2>

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
                        disabled={searchLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        {searchLoading ? 'Поиск...' : 'Найти'}
                    </button>
                </div>
                {searchError && (
                    <p className="text-red-500 mt-2">❌ Ошибка поиска: {searchError}</p>
                )}
            </div>

            {/* Фильтр по категориям */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">🏷️ Фильтр по категориям</h3>
                <div className="flex gap-2 flex-wrap">
                    {['Овощи', 'Фрукты', 'Молочные продукты', 'Мед'].map((category) => (
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
                {categoryError && (
                    <p className="text-red-500 mt-2">❌ Ошибка загрузки категории: {categoryError}</p>
                )}
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

            {/* Результаты поиска */}
            {searchResults?.data && searchResults.data.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">🔍 Результаты поиска</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.data.map((product: any) => (
                            <div key={product.id} className="border rounded-lg p-4">
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-green-600 font-bold">${product.price}</p>
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    disabled={addToCartMutation.loading}
                                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {addToCartMutation.loading ? 'Добавление...' : 'В корзину'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Продукты по категории */}
            {categoryProducts?.data && categoryProducts.data.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">🏷️ Продукты категории "{selectedCategory}"</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryProducts.data.map((product: any) => (
                            <div key={product.id} className="border rounded-lg p-4">
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-green-600 font-bold">${product.price}</p>
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    disabled={addToCartMutation.loading}
                                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {addToCartMutation.loading ? 'Добавление...' : 'В корзину'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Все продукты */}
            {allProducts?.data && allProducts.data.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">📦 Все продукты ({allProducts.data.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allProducts.data.slice(0, 6).map((product: any) => (
                            <div key={product.id} className="border rounded-lg p-4">
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-green-600 font-bold">${product.price}</p>
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    disabled={addToCartMutation.loading}
                                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {addToCartMutation.loading ? 'Добавление...' : 'В корзину'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Статус загрузки */}
            {(productsLoading || searchLoading || categoryLoading) && (
                <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-600">Загрузка данных...</p>
                </div>
            )}

            {/* Ошибки */}
            {(productsError || searchError || categoryError) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <h4 className="text-red-800 font-semibold mb-2">❌ Ошибки API:</h4>
                    {productsError && <p className="text-red-600">Загрузка продуктов: {productsError}</p>}
                    {searchError && <p className="text-red-600">Поиск: {searchError}</p>}
                    {categoryError && <p className="text-red-600">Категория: {categoryError}</p>}
                </div>
            )}
        </div>
    );
}; 