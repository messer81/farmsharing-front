// 🦴 Skeleton loader для карточки продукта - предотвращает CLS
import { Box, Card, CardContent, Skeleton } from '@mui/material';

export const ProductCardSkeleton = () => {
  return (
    <Card 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        background: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Изображение skeleton */}
      <Box sx={{ 
        position: 'relative',
        height: '180px',
        overflow: 'hidden',
      }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="180px"
          animation="wave"
        />
      </Box>

      {/* Контент skeleton */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Заголовок */}
        <Skeleton variant="text" width="80%" height={28} />
        
        {/* Описание */}
        <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
        
        {/* Цена */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Skeleton variant="text" width="40%" height={24} />
        </Box>
        
        {/* Кнопка */}
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={36} 
          sx={{ borderRadius: '8px' }}
        />
      </CardContent>
    </Card>
  );
};