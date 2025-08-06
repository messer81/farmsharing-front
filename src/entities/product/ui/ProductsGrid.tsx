// 🛍️ Сетка продуктов с фильтрацией и поиском
import { useState, useEffect, useCallback } from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  Chip,
  TextField,
  Pagination,
  Alert,
  Skeleton
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useProductsPaginated } from '../../../shared/api/useApi';
import { useProductFilter } from '../../../shared/lib/useProductFilter';
import { ProductCard } from './ProductCard';
import { ProductDetails } from './ProductDetails';
import { ProductCardSkeleton } from '../../../shared/ui/ProductCardSkeleton';
import { CategoryFilter } from '../../../shared/ui/CategoryFilter';
import type { Product } from '../../../types/api';

interface ProductsGridProps {
  products?: Product[];
}

export const ProductsGrid = ({ products: initialProducts }: ProductsGridProps) => {
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts || []); // Все продукты для фильтрации
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Используем общий хук для фильтрации
  const { 
    filteredProducts, 
    filters,
    updateCategoryFilter,
    updateSearchQuery,
    toggleTag
  } = useProductFilter(allProducts);
  
  // Состояние модального окна
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Используем стабильный хук для продуктов
  const { data, loading: apiLoading, error: apiError, execute: fetchProducts } = useProductsPaginated(page, 8);

  // Обновляем состояние при получении данных
  useEffect(() => {
    if (data?.data) {
      setAllProducts(data.data); // Сохраняем все продукты
      setTotalPages(data.totalPages || 1);
    }
  }, [data]);

  // Обновляем состояние загрузки и ошибок
  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  // Загружаем продукты при изменении страницы (только если не переданы через пропсы)
  useEffect(() => {
    if (!initialProducts) {
      fetchProducts();
    }
  }, [page, initialProducts]); // eslint-disable-line react-hooks/exhaustive-deps

  // Обновляем продукты при изменении пропсов
  useEffect(() => {
    if (initialProducts) {
      setAllProducts(initialProducts); // ✅ ВАЖНО: обновляем allProducts!
      setLoading(false);
    }
  }, [initialProducts]);

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(event.target.value);
  }, [updateSearchQuery]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    updateCategoryFilter(categoryId);
  }, [updateCategoryFilter]);

  const handleTagToggle = useCallback((tag: string) => {
    toggleTag(tag);
  }, [toggleTag]);

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
      <Box>
        {/* 🔍 Поиск skeleton */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8}>
              <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
            </Grid>
          </Grid>
        </Box>
        
        {/* 🦴 Skeleton cards - предотвращают CLS */}
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">
          <Typography variant="h6">Ошибка загрузки продуктов</Typography>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* 🔍 Поиск */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8}>
                         <TextField
               fullWidth
               placeholder="Поиск продуктов..."
               value={filters.searchQuery}
               onChange={handleSearchChange}
               onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
               InputProps={{
                 startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
               }}
               sx={{
                 '& .MuiOutlinedInput-root': {
                   backgroundColor: 'rgba(255, 255, 255, 0.95)', // Увеличили непрозрачность
                   // ✅ УБРАЛИ backdrop-filter для ускорения производительности
                   '&:hover': {
                     backgroundColor: 'rgba(255, 255, 255, 1)',
                   },
                   '&.Mui-focused': {
                     backgroundColor: 'rgba(255, 255, 255, 1)',
                   },
                 },
               }}
             />
          </Grid>
        </Grid>
        
                {/* 🏷️ Кнопки категорий */}
        <CategoryFilter
          selectedCategory={filters.category}
          onCategoryChange={handleCategoryClick}
          variant="dark"
          sx={{ mt: 3 }}
        />

        {/* 🏷️ Теги */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                     {['organic', 'fresh', 'local', 'herbs', 'artisanal', 'natural'].map((tag) => (
             <Chip
               key={tag}
               label={tag}
               onClick={() => handleTagToggle(tag)}
               color={filters.selectedTags.includes(tag) ? 'primary' : 'default'}
               variant={filters.selectedTags.includes(tag) ? 'filled' : 'outlined'}
               size="small"
             />
           ))}
        </Box>
      </Box>

      {/* 🛍️ Сетка продуктов */}
      {filteredProducts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard 
                  product={product}
                  onCardClick={handleProductClick}
                  isFavorite={false}
                />
              </Grid>
            ))}
          </Grid>

          {/* 📄 Пагинация */}
          {!initialProducts && totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Продукты не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Попробуйте изменить критерии поиска
          </Typography>
        </Box>
      )}

      {/* 🛍️ Модальное окно детального просмотра продукта */}
      <ProductDetails
        product={selectedProduct}
        open={isModalOpen}
        onClose={handleModalClose}
      />
    </Box>
  );
};