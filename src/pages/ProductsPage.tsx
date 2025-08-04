// 🛍️ Страница каталога продуктов с Axios API
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProductsGrid } from '../entities/product/ui/ProductsGrid';
import { useProductsAll } from '../shared/api/useApi';
import type { Product } from '../types/api';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Используем стабильный хук для продуктов
  const { data, loading: apiLoading, error: apiError, execute: fetchProducts } = useProductsAll();

  // Загружаем продукты при монтировании компонента
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchProducts();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки продуктов');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [fetchProducts]);

  // Обновляем состояние при получении данных
  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  // Обновляем состояние загрузки и ошибок
  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Box mt={4}>
          <Alert severity="error">
            <Typography variant="h6">Ошибка загрузки продуктов</Typography>
            <Typography>{error}</Typography>
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box mt={4} mb={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          🛍️ Каталог продуктов
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Найдено продуктов: {products.length}
        </Typography>
      </Box>
      <ProductsGrid products={products} />
    </Container>
  );
};

export default ProductsPage;