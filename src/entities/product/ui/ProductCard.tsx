// 🛍️ Карточка продукта с адаптивным дизайном
import { Box, Typography, Button, Chip, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { Add as AddIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../features/cart/model/useCart';
import type { Product } from '../../../types';
import { getImageUrl, handleImageError } from '../../../utils/imageUtils';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onToggleFavorite?: (productId: number) => void;
    isFavorite?: boolean;
}

export const ProductCard = ({ 
    product, 
    onAddToCart, 
    onToggleFavorite, 
    isFavorite = false 
}: ProductCardProps) => {
    const { t } = useTranslation();
    const cart = useCart();

    const handleAddToCart = () => {
        if (product.stock === 0) return;
        if (onAddToCart) {
            onAddToCart(product);
        } else {
            cart.addItem(product, 1);
        }
    };

    const handleToggleFavorite = () => {
        onToggleFavorite?.(product.id);
    };

    const isOutOfStock = product.stock === 0;

    return (
        <Card 
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
                    height="180px"
                    image={getImageUrl(product.imageUrl || '')}
                    alt={product.title}
                    onError={handleImageError}
                    sx={{
                        objectFit: 'cover',
                        width: '100%',
                        transition: 'transform 0.3s ease',
                        filter: isOutOfStock ? 'grayscale(30%)' : 'none',
                        '&:hover': {
                            transform: isOutOfStock ? 'none' : 'scale(1.05)',
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
                                '& .MuiChip-label': {
                                    px: 1,
                                }
                            }}
                        />
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                        <Chip
                            label={`-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`}
                            size="small"
                            sx={{
                                backgroundColor: '#ef4444',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                height: '20px',
                                '& .MuiChip-label': {
                                    px: 1,
                                }
                            }}
                        />
                    )}
                    {isOutOfStock && (
                        <Chip
                            label={t('product.outOfStock')}
                            size="small"
                            sx={{
                                backgroundColor: '#6b7280',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                height: '20px',
                                '& .MuiChip-label': {
                                    px: 1,
                                }
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
                        backdropFilter: 'blur(10px)',
                        width: '32px',
                        height: '32px',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon color="error" sx={{ fontSize: '1.1rem' }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: '1.1rem' }} />
                    )}
                </IconButton>
            </Box>

            {/* 📝 Контент карточки */}
            <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                p: '16px',
                gap: '8px'
            }}>
                {/* 🏷️ Название и описание */}
                <Box>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: '1rem',
                            lineHeight: 1.3,
                            color: '#1f2937',
                            mb: '4px',
                        }}
                    >
                        {product.title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#6b7280',
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                        }}
                    >
                        {product.description}
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
                        🏡 {product.farmName}
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
                                                         {t('product.per')} {product.unit}
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