// 🛍️ Страница каталога продуктов с Axios API
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { ProductsGrid } from '../entities/product/ui/ProductsGrid';
import { useGetProductsQuery } from '../shared/api';
import { useAppDispatch } from '../app/store/store';
import { addToCart } from '../features/cart/model/cartSlice';
import type { Product } from '../types/api';
// ✅ Используем ОПТИМИЗИРОВАННЫЕ JPEG (НЕ WebP!)
import heroImageLight from '../assets/optimized/hero-bg-light-desktop.jpg';
import heroImageDark from '../assets/optimized/hero-bg-dark-desktop.jpg';

const ProductsPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // ✅ Выбираем МАЛЕНЬКОЕ оптимизированное изображение по теме
  const heroImage = theme.palette.mode === 'dark' ? heroImageDark : heroImageLight;

  // ✅ RTK Query — единый источник истины по продуктам
  const { data, isLoading, error: queryError } = useGetProductsQuery();

  const handleAddToCart = useCallback((product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (queryError) {
    const errorMessage = (queryError as any)?.data?.message || (queryError as any)?.error || 'Не удалось загрузить продукты';
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">{t('common.error')}</Typography>
          <Typography>{errorMessage}</Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        pt: 0,
        marginTop: '-80px', // Распространяем фон на хедер
        paddingTop: '80px', // Компенсируем отступ
        mb: 4, // Отступ перед футером
        // ✅ Стабилизируем layout
        height: 'auto',
        overflow: 'hidden',
      }}
    >
      {/* 🖼️ Оптимизированное фоновое изображение БЕЗ тяжелых фильтров */}
      <Box
        sx={{
          position: 'absolute',
          top: 0, // ✅ Убираем отрицательный top для предотвращения CLS
          left: 0,
          right: 0,
          height: '100%', // ✅ Стабильная высота
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // ✅ УБРАЛИ ТЯЖЕЛЫЕ CSS ФИЛЬТРЫ для ускорения LCP!
          // filter: - УДАЛЕНО
          // transform: - УДАЛЕНО
          zIndex: 0,
          overflow: 'hidden',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box 
          mt={4} 
          mb={4}
          sx={{
            textAlign: 'center',
            py: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2
            }}
          >
            🛍️ {t('products.title')}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              fontWeight: 500,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            {t('products.found', { count: data?.data?.length || 0 })}
          </Typography>
        </Box>
        <ProductsGrid products={data?.data || []} onAddToCart={handleAddToCart} />
      </Container>
    </Box>
  );
};

export default ProductsPage;