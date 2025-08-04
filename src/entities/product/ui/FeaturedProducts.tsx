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
import { ProductCard } from './ProductCard';
import { useProductsPaginated } from '../../../shared/api/useApi';
import type { Product } from '../../../types/api';

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
  maxProducts?: number;
}

// Компонент кнопок категорий
const CategoryFilter = ({ selectedCategory, onCategoryChange }: { 
  selectedCategory: string; 
  onCategoryChange: (category: string) => void;
}) => {
  const categories = [
    { id: 'all', name: 'Все категории', icon: '🛒' },
    { id: 'vegetables', name: 'Овощи', icon: '🥬' },
    { id: 'fruits', name: 'Фрукты', icon: '🍎' },
    { id: 'herbs', name: 'Травы', icon: '🌿' },
    { id: 'dairy', name: 'Молочные продукты', icon: '🥛' },
    { id: 'honey', name: 'Мед', icon: '🍯' },
    { id: 'flowers', name: 'Цветы', icon: '🌹' },
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1, 
      flexWrap: 'wrap', 
      justifyContent: 'center',
      mb: 4,
      px: 2
    }}>
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={`${category.icon} ${category.name}`}
          onClick={() => onCategoryChange(category.id)}
          sx={{
            backgroundColor: selectedCategory === category.id ? '#22c55e' : '#f3f4f6',
            color: selectedCategory === category.id ? 'white' : '#374151',
            fontWeight: 600,
            fontSize: '0.85rem',
            py: 1,
            px: 2,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: selectedCategory === category.id ? '#16a34a' : '#e5e7eb',
            }
          }}
        />
      ))}
    </Box>
  );
};

export const FeaturedProducts = ({ 
  products: initialProducts, 
  title = "Featured Fresh Produce",
  subtitle = "Discover the freshest, highest-quality produce from local farmers in your area.",
  maxProducts = 6 
}: FeaturedProductsProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Используем стабильный хук для продуктов
  const { data, loading: apiLoading, error: apiError, execute: fetchProducts } = useProductsPaginated(1, maxProducts);

  // Обновляем состояние при получении данных
  useEffect(() => {
    if (data?.data) {
      console.log('FeaturedProducts: Получены данные:', data.data);
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
    console.log('FeaturedProducts: Компонент смонтирован');
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

  console.log('FeaturedProducts: Состояние:', { loading, error, productsCount: products.length });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading && products.length === 0) {
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
          Попробовать снова
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
          {title}
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
          {subtitle}
        </Typography>
      </Box>

      {/* 🏷️ Фильтр категорий */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* 🛍️ Сетка продуктов 5x2 */}
      {filteredProducts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={2.4} key={product.id}>
                <ProductCard 
                  product={product}
                  onAddToCart={() => console.log('Add to cart:', product.id)}
                  onToggleFavorite={() => console.log('Toggle favorite:', product.id)}
                  isFavorite={false}
                />
              </Grid>
            ))}
          </Grid>

          {/* 🔗 Кнопка "Посмотреть все продукты" */}
          <Box sx={{ textAlign: 'center', mt: { xs: 'var(--space-16)', sm: 'var(--space-24)', md: 'var(--space-32)' } }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: { xs: 'var(--space-16)', sm: 'var(--space-20)', md: 'var(--space-24)' },
                py: { xs: 'var(--space-8)', sm: 'var(--space-12)' },
                fontSize: { xs: 'var(--font-size-base)', sm: 'var(--font-size-lg)' },
                fontWeight: 'var(--font-weight-semibold)',
                borderRadius: 'var(--radius-lg)',
                textTransform: 'none',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--duration-normal) var(--ease-standard)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 'var(--shadow-card-hover)',
                }
              }}
            >
              View All Products
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No featured products available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check back later for fresh produce from local farmers
          </Typography>
        </Box>
      )}
    </Container>
  );
}; 