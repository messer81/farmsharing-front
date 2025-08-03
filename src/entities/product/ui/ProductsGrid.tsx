// 🛍️ Сетка продуктов с фильтрацией и поиском
import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Pagination,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { ProductCard } from './ProductCard';
import { apiClient, type Product } from '../../../shared/api/api';

interface ProductsGridProps {
  onProductClick?: (product: Product) => void;
}

export const ProductsGrid = ({ onProductClick }: ProductsGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Фильтрация и поиск
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Пагинация
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Получение данных
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.products.getPaginated(page, 8);
      setProducts(response.data);
      setTotalPages(response.totalPages);
      setTotalProducts(response.total);
    } catch (err) {
      setError('Ошибка загрузки продуктов');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Поиск продуктов
  const searchProducts = async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.products.search(searchQuery);
      setProducts(response.data);
      setTotalPages(1);
      setTotalProducts(response.total);
    } catch (err) {
      setError('Ошибка поиска');
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация по категории
  const filterByCategory = async (category: string) => {
    if (category === 'all') {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.products.getByCategory(category);
      setProducts(response.data);
      setTotalPages(1);
      setTotalProducts(response.total);
    } catch (err) {
      setError('Ошибка фильтрации');
    } finally {
      setLoading(false);
    }
  };

  // Эффекты
  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchProducts();
      } else {
        fetchProducts();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (selectedCategory !== 'all') {
      filterByCategory(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  // Уникальные категории
  const categories = ['all', 'Vegetables', 'Fruits', 'Herbs', 'Dairy', 'Pantry', 'Flowers'];

  // Уникальные теги
  const allTags = Array.from(new Set(products.flatMap(p => p.tags)));

  // Фильтрация по тегам
  const filteredProducts = selectedTags.length > 0 
    ? products.filter(product => 
        selectedTags.some(tag => product.tags.includes(tag))
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
        <Button variant="contained" onClick={fetchProducts}>
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
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
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
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onClick={() => {
                    setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
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