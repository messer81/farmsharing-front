// 🛍️ Карточка продукта с адаптивным дизайном
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Add as AddIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocalizedData } from '../../../shared/lib/useLocalizedData';
import type { Product } from '../../../types/api';
import { getImageUrl, handleImageError } from '../../../utils/imageUtils';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onToggleFavorite?: (productId: number) => void;
    onCardClick?: (product: Product) => void;
    isFavorite?: boolean;
}

export const ProductCard = ({ 
    product, 
    onAddToCart, 
    onToggleFavorite, 
    onCardClick,
    isFavorite = false 
}: ProductCardProps) => {
    const { t } = useTranslation();
    const { getProductTitle, getProductDescription, getFarmName, getProductUnit } = useLocalizedData();

    const handleAddToCart = () => {
        if (product.stock === 0) return;
        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    const handleToggleFavorite = () => {
        onToggleFavorite?.(product.id);
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // Не открываем модальное окно если клик был по кнопке добавления в корзину
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        onCardClick?.(product);
    };

    const isOutOfStock = product.stock === 0;

    return (
        <Card 
            onClick={handleCardClick}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                background: 'white',
                overflow: 'hidden',
                opacity: isOutOfStock ? 0.7 : 1,
                cursor: onCardClick ? 'pointer' : 'default',
                '&:hover': {
                    transform: isOutOfStock ? 'none' : 'translateY(-4px)',
                    boxShadow: isOutOfStock ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 8px 25px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            {/* 🖼️ Изображение продукта */}
            <Box sx={{ 
                position: 'relative',
                height: '180px',
                overflow: 'hidden',
            }}>
                <CardMedia
                    component="img"
                    height="180"
                    width="100%"
                    image={getImageUrl(product.imageUrl || '')}
                    alt={getProductTitle(product)}
                    onError={handleImageError}
                    loading="lazy"
                    sx={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '180px',
                        transition: 'transform 0.3s ease',
                        filter: isOutOfStock ? 'grayscale(30%)' : 'none',
                        // ✅ Оптимизированный hover эффект
                        '&:hover': {
                            transform: isOutOfStock ? 'none' : 'scale(1.02)', // Уменьшили масштаб для производительности
                        },
                    }}
                />
                
                {/* 🏷️ Бейджи */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    }}
                >
                    {product.isOrganic && (
                        <Chip
                            label={t('product.organic')}
                            size="small"
                            sx={{
                                backgroundColor: '#22c55e',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                height: '20px',
                            }}
                        />
                    )}
                    {product.discount && (
                        <Chip
                            label={`-${product.discount}%`}
                            size="small"
                            sx={{
                                backgroundColor: '#ef4444',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                height: '20px',
                            }}
                        />
                    )}
                </Box>

                {/* ❤️ Кнопка избранного */}
                <IconButton
                    onClick={handleToggleFavorite}
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: isFavorite ? '#ef4444' : '#6b7280',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                        },
                    }}
                >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>

            {/* 📝 Контент карточки */}
            <CardContent sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                p: '16px',
            }}>
                {/* 📝 Название и описание */}
                <Box sx={{ flex: 1 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 600,
                            mb: '4px',
                        }}
                    >
                        {getProductTitle(product)}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#6b7280',
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                        }}
                    >
                        {getProductDescription(product)}
                    </Typography>
                </Box>

                {/* 📍 Ферма */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#6b7280',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        🏡 {getFarmName(product)}
                    </Typography>
                </Box>

                {/* 💰 Цена */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    gap: '8px',
                    mt: 'auto',
                    mb: '12px',
                }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 700,
                            color: '#22c55e',
                            fontSize: '1.1rem',
                        }}
                    >
                        ₪{product.price.toFixed(2)}
                    </Typography>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                textDecoration: 'line-through',
                                color: '#9ca3af',
                                fontSize: '0.8rem',
                            }}
                        >
                            ₪{product.originalPrice.toFixed(2)}
                        </Typography>
                    )}
                    {product.unit && (
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.8rem' }}>
                            {t('product.per')} {getProductUnit(product)}
                        </Typography>
                    )}
                </Box>

                {/* 🛒 Кнопка добавления в корзину */}
                <Button
                    variant="contained"
                    startIcon={isOutOfStock ? undefined : <AddIcon />}
                    onClick={handleAddToCart}
                    fullWidth
                    disabled={isOutOfStock}
                    sx={{
                        backgroundColor: isOutOfStock ? '#6b7280' : '#22c55e',
                        color: 'white',
                        py: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: isOutOfStock ? '#6b7280' : '#16a34a',
                        },
                        '&:disabled': {
                            backgroundColor: '#6b7280',
                            color: 'white',
                        }
                    }}
                >
                    {isOutOfStock ? t('product.outOfStock') : t('product.addToCart')}
                </Button>
            </CardContent>
        </Card>
    );
};