// 📦 Страница товаров с фильтрами и сеткой продуктов
import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../entities/product/ui/ProductCard';
import { ProductDetails } from '../entities/product/ui/ProductDetails';

// 🔄 Импортируем типы продуктов
import type { Product } from '../types';
import {mockProducts} from "../utils/mockProducts.ts";
import {FilterBar} from "../components/FilterBar.tsx";

export const ProductsPage = () => {
    const { t } = useTranslation();

    // 🔍 Состояние поиска и фильтров
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // 📦 Состояние продуктов и модального окна
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    // 🔄 Загрузка продуктов
    useEffect(() => {
        // В будущем здесь будет API-запрос
        setProducts(mockProducts);
    }, []);

    // 🧮 Фильтрация при изменении критериев
    useEffect(() => {
        const filtered = products.filter(product => {
            // Поиск по названию и описанию
            const matchesSearch = searchQuery
                ? (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())))
                : true;

            // Фильтр по категории
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        setFilteredProducts(filtered);
    }, [products, searchQuery, selectedCategory]);

    // 🎯 Обработчики
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleOpenDetails = (product: Product) => {
        setSelectedProduct(product);
        setDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailsOpen(false);
    };

    // 📋 Получаем уникальные категории
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* 🎯 Заголовок страницы */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    sx={{
                        background: 'linear-gradient(45deg, #4b9b4b, #7dcb7d)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                    }}
                >
                    {t('mockProducts.title')}
                </Typography>

                <Typography variant="h6" color="text.secondary">
                    {t('mockProducts.subtitle')}
                </Typography>
            </Box>

            {/* 🔍 Фильтры */}
            <FilterBar
                searchQuery={searchQuery}
                onSearch={handleSearch}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* 📦 Сетка товаров */}
            <Box sx={{ mt: 4 }}>
                {filteredProducts.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product.id}>
                                <ProductCard
                                    product={product}
                                    onOpenDetails={() => handleOpenDetails(product)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{
                        py: 8,
                        textAlign: 'center',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    }}>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            {t('mockProducts.noResults')}
                        </Typography>
                        <Typography color="text.secondary">
                            {t('mockProducts.tryDifferent')}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* 🔍 Модальное окно товара */}
            <ProductDetails
                product={selectedProduct}
                open={detailsOpen}
                onClose={handleCloseDetails}
            />
        </Container>
    );
};

export default ProductsPage;