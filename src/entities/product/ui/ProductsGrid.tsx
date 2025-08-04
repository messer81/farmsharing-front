// 🛍️ Сетка продуктов с фильтрацией и поиском
import { useState, useEffect, useCallback } from 'react';
import { 
  Grid, 
  Typography, 
  Button, 
  Box,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useProductsPaginated, useProductsSearch, useProductsByCategory } from '../../../shared/api/useApi';
import { ProductCard } from './ProductCard';
import type { Product } from '../../../types/api';

interface ProductsGridProps {
  products?: Product[];
}

export const ProductsGrid = ({ products: initialProducts }: ProductsGridProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Используем стабильные хуки
  const { data, loading: apiLoading, error: apiError, execute: fetchProducts } = useProductsPaginated(page, 8);
  const { execute: searchProducts } = useProductsSearch(searchQuery);
  const { execute: filterByCategory } = useProductsByCategory(selectedCategory);

  // Обновляем состояние при получении данных
  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
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
  }, [page, fetchProducts, initialProducts]);

  // Обновляем продукты при изменении пропсов
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setLoading(false);
    }
  }, [initialProducts]);

  // Мемоизируем обработчики
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      await searchProducts();
    } catch (err) {
      setError('Ошибка поиска');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, fetchProducts, searchProducts]);

  const handleCategoryFilter = useCallback(async (category: string) => {
    if (category === 'all') {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      await filterByCategory();
    } catch (err) {
      setError('Ошибка фильтрации');
    } finally {
      setLoading(false);
    }
  }, [fetchProducts, filterByCategory]);

  // Эффекты для поиска и фильтрации
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        fetchProducts();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch, fetchProducts]);

  useEffect(() => {
    if (selectedCategory !== 'all') {
      handleCategoryFilter(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory, handleCategoryFilter, fetchProducts]);

  // Уникальные категории
  const categories = ['all', 'vegetables', 'fruits', 'herbs', 'dairy', 'honey', 'flowers'];

  // Уникальные теги
  const allTags = Array.from(new Set(products.flatMap(p => p.tags || [])));

  // Фильтрация по тегам
  const filteredProducts = selectedTags.length > 0 
    ? products.filter(product => 
        selectedTags.some(tag => product.tags?.includes(tag))
      )
    : products;

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
    <Box sx={{ py: 4 }}>
      {/* 🎯 Заголовок */}
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Product Catalog
      </Typography>

      {/* 🔍 Фильтры и поиск */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Поиск */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>

          {/* Категория */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Теги */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ mr: 1, alignSelf: 'center' }}>
                Tags:
              </Typography>
              {allTags.map((tag: string) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onClick={() => {
                    setSelectedTags((prev: string[]) => 
                      prev.includes(tag) 
                        ? prev.filter((t: string) => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                  color={selectedTags.includes(tag) ? 'primary' : 'default'}
                  variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 📊 Информация о результатах */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Found {filteredProducts.length} products
        </Typography>
        
        {(searchQuery || selectedCategory !== 'all' || selectedTags.length > 0) && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedTags([]);
            }}
          >
            Clear filters
          </Button>
        )}
      </Box>

      {/* 🛍️ Сетка продуктов */}
      {filteredProducts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard 
                  product={product}
                  onAddToCart={() => console.log('Add to cart:', product.id)}
                  onToggleFavorite={() => console.log('Toggle favorite:', product.id)}
                  isFavorite={false}
                />
              </Grid>
            ))}
          </Grid>

          {/* 📄 Пагинация */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}
    </Box>
  );
};