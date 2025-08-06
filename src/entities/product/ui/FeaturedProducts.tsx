// 🌟 Рекомендуемые продукты для главной страницы
import { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Container,
  CircularProgress,
  Alert,
  Button,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProductCard } from './ProductCard';
import { ProductDetails } from './ProductDetails';
import { useProductsPaginated } from '../../../shared/api/useApi';
import { CategoryFilter } from '../../../shared/ui/CategoryFilter';
import type { Product } from '../../../types/api';

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
  maxProducts?: number;
}

// Переиспользуемый компонент кнопок категорий теперь в shared/ui/CategoryFilter.tsx

export const FeaturedProducts = ({ 
  products: initialProducts, 
  title,
  subtitle,
  maxProducts = 10 
}: FeaturedProductsProps) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Состояние модального окна
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Используем стабильный хук для продуктов
  const { data, loading: apiLoading, error: apiError, execute: fetchProducts } = useProductsPaginated(1, maxProducts);

  // Обновляем состояние при получении данных
  useEffect(() => {
    if (data?.data) {
      setProducts(data.data.slice(0, maxProducts));
    }
  }, [data, maxProducts]);

  // Обновляем состояние загрузки и ошибок
  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  // Загружаем продукты при монтировании компонента (только если не переданы через пропсы)
  useEffect(() => {
    if (!initialProducts) {
      fetchProducts();
    }
  }, [initialProducts, fetchProducts]);

  // Обновляем продукты при изменении пропсов
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts.slice(0, maxProducts));
      setLoading(false);
    }
  }, [initialProducts, maxProducts]);

  // Фильтрация продуктов по категории
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === selectedCategory);



  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Обработчики модального окна
  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => fetchProducts()}>
          {t('common.tryAgain')}
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: { xs: 'var(--space-16)', sm: 'var(--space-24)', md: 'var(--space-32)' }, width: '100%' }}>
      {/* 🎯 Заголовок секции */}
      <Box sx={{ textAlign: 'center', mb: { xs: 'var(--space-16)', sm: 'var(--space-24)', md: 'var(--space-32)' } }}>
        <Typography
          variant="h3"
          sx={{
            mb: { xs: 'var(--space-8)', sm: 'var(--space-12)' },
            fontWeight: 'var(--font-weight-bold)',
            fontSize: { xs: 'var(--font-size-2xl)', sm: 'var(--font-size-3xl)', md: 'var(--font-size-4xl)' },
            background: 'var(--gradient-primary)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 'var(--line-height-tight)',
          }}
        >
          {title || t('products.title')}
        </Typography>
        <Typography
          sx={{
            color: 'var(--color-text-secondary)',
            fontSize: { xs: 'var(--font-size-base)', sm: 'var(--font-size-lg)' },
            lineHeight: 'var(--line-height-normal)',
            maxWidth: { xs: '100%', sm: '600px', md: '700px' },
            mx: 'auto',
          }}
        >
          {subtitle || t('products.subtitle')}
        </Typography>
      </Box>

      {/* 🏷️ Фильтр категорий */}
              <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          variant="light"
          sx={{ mb: 4, px: 2 }}
        />

      {/* 🛍️ Сетка продуктов 5x2 */}
      {filteredProducts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={2.4} key={product.id}>
                <ProductCard 
                  product={product}
                  onCardClick={handleProductClick}
                  isFavorite={false}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {t('products.noProducts')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {t('products.noProductsDescription')}
          </Typography>
        </Box>
      )}

      {/* 🛍️ Модальное окно детального просмотра продукта */}
      <ProductDetails
        product={selectedProduct}
        open={isModalOpen}
        onClose={handleModalClose}
      />
    </Container>
  );
}; 