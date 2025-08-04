// 👨‍🌾 Профили фермеров для главной страницы
import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Container,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip
} from '@mui/material';
import { useFarmsAll } from '../../../shared/api/useApi';
import type { Farm } from '../../../types/api';

interface FarmProfilesProps {
  farms?: Farm[];
  title?: string;
  subtitle?: string;
  maxFarms?: number;
}

export const FarmProfiles = ({ 
  farms: initialFarms, 
  title = "Meet Our Farmers",
  subtitle = "Get to know the dedicated farmers who grow your food with care and passion.",
  maxFarms = 3 
}: FarmProfilesProps) => {
  const [farms, setFarms] = useState<Farm[]>(initialFarms || []);
  const [loading, setLoading] = useState(!initialFarms);
  const [error, setError] = useState<string | null>(null);

  // Используем стабильный хук для ферм
  const { data, loading: apiLoading, error: apiError, execute: fetchFarms } = useFarmsAll();

  // Обновляем состояние при получении данных
  useEffect(() => {
    if (data?.data) {
      setFarms(data.data.slice(0, maxFarms));
    }
  }, [data, maxFarms]);

  // Обновляем состояние загрузки и ошибок
  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  // Загружаем фермы при монтировании компонента (только если не переданы через пропсы)
  useEffect(() => {
    if (!initialFarms) {
      fetchFarms();
    }
  }, [fetchFarms, initialFarms]);

  // Обновляем фермы при изменении пропсов
  useEffect(() => {
    if (initialFarms) {
      setFarms(initialFarms.slice(0, maxFarms));
      setLoading(false);
    }
  }, [initialFarms, maxFarms]);

  if (loading && farms.length === 0) {
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
        <Button variant="contained" onClick={() => fetchFarms()}>
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

      {/* 👨‍🌾 Карточки фермеров */}
      {farms.length > 0 ? (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {farms.map((farm) => (
            <Grid item xs={12} sm={6} md={4} key={farm.id}>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all var(--duration-normal) var(--ease-standard)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--gradient-card)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 'var(--shadow-card-hover)',
                  }
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: { xs: 'var(--space-16)', sm: 'var(--space-20)', md: 'var(--space-24)' },
                  textAlign: 'center'
                }}>
                  {/* 👤 Аватар фермера */}
                  <Box sx={{ mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' } }}>
                    <CardMedia
                      component="img"
                      src={farm.imageUrl}
                      alt={farm.name}
                      sx={{
                        width: { xs: 80, sm: 100, md: 120 },
                        height: { xs: 80, sm: 100, md: 120 },
                        mx: 'auto',
                        mb: 'var(--space-8)',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid var(--color-primary)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    />
                  </Box>

                  {/* 📝 Информация о фермере */}
                  <Box sx={{ mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' } }}>
                    <Typography 
                      variant="h5" 
                      sx={{
                        mb: 'var(--space-4)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text)',
                        fontSize: { xs: 'var(--font-size-lg)', sm: 'var(--font-size-xl)' },
                      }}
                    >
                      {farm.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 'var(--space-8)',
                        fontSize: { xs: 'var(--font-size-sm)', sm: 'var(--font-size-base)' },
                      }}
                    >
                      📍 {farm.location}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: 'var(--color-text-secondary)',
                        lineHeight: 'var(--line-height-normal)',
                        fontSize: { xs: 'var(--font-size-sm)', sm: 'var(--font-size-base)' },
                        mb: 'var(--space-8)',
                      }}
                    >
                      {farm.description}
                    </Typography>
                  </Box>

                  {/* ⭐ Рейтинг */}
                  <Box sx={{ mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Rating
                      value={parseFloat(farm.rating.toString())}
                      precision={0.5}
                      readOnly
                      sx={{
                        fontSize: '1.25rem',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({farm.rating})
                    </Typography>
                  </Box>

                  {/* 🏷️ Сертификация */}
                  <Box sx={{ mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' } }}>
                    <Chip
                      label="🌱 Organic Certified"
                      size="small"
                      color="success"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>

                  {/* 🔗 Кнопка "Посетить здесь" */}
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      mt: 'auto',
                      px: { xs: 'var(--space-12)', sm: 'var(--space-16)' },
                      py: { xs: 'var(--space-6)', sm: 'var(--space-8)' },
                      fontSize: { xs: 'var(--font-size-sm)', sm: 'var(--font-size-base)' },
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
                    Visit More Here
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No farmers available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check back later to meet our dedicated farmers
          </Typography>
        </Box>
      )}
    </Container>
  );
}; 