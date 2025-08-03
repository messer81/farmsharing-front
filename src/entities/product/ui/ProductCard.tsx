// 🛍️ Карточка продукта с адаптивным дизайном
import { Box, Typography, Button, Chip, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { Add as AddIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../features/cart/model/useCart';
import type { Product } from '../model/productSlice';

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
    const { addItem } = useCart();

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product);
        } else {
            addItem(product, 1);
        }
    };

    const handleToggleFavorite = () => {
        onToggleFavorite?.(product.id);
    };

    return (
        <Card 
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            {/* 🖼️ Изображение продукта */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height={{ xs: 200, sm: 220, md: 240 }}
                    image={product.imageUrl}
                    alt={product.title}
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                />
                
                {/* 🏷️ Бейджи */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 2,
                        left: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    {product.isOrganic && (
                        <Chip
                            label="🌱 Organic"
                            size="small"
                            color="success"
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.75rem',
                            }}
                        />
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                        <Chip
                            label={`-${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`}
                            size="small"
                            sx={{
                                backgroundColor: 'error.main',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                            }}
                        />
                    )}
                </Box>

                {/* ❤️ Кнопка избранного */}
                <IconButton
                    onClick={handleToggleFavorite}
                    sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            transform: 'scale(1.1)',
                        },
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon color="error" />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
            </Box>

            {/* 📝 Контент карточки */}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* 🏷️ Название и категория */}
                <Box sx={{ mb: 2 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mb: 1,
                            fontWeight: 600,
                            lineHeight: 1.2,
                        }}
                    >
                        {product.title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 1 }}
                    >
                        {product.category}
                    </Typography>
                </Box>

                {/* 📍 Ферма */}
                <Box sx={{ mb: 2 }}>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        🏡 {product.farmName}
                    </Typography>
                </Box>

                {/* ⭐ Рейтинг */}
                {product.rating && (
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {[...Array(5)].map((_, index) => (
                                <Typography
                                    key={index}
                                    component="span"
                                    sx={{
                                        color: index < Math.floor(product.rating!) ? 'warning.main' : 'grey.300',
                                        fontSize: '1rem',
                                    }}
                                >
                                    ★
                                </Typography>
                            ))}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            ({product.rating})
                        </Typography>
                    </Box>
                )}

                {/* 💰 Цена */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 2,
                    mt: 'auto',
                }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 700,
                            color: 'primary.main',
                        }}
                    >
                        ${product.price.toFixed(2)}
                    </Typography>
                    {product.originalPrice && product.originalPrice > product.price && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                textDecoration: 'line-through',
                                color: 'text.secondary',
                            }}
                        >
                            ${product.originalPrice.toFixed(2)}
                        </Typography>
                    )}
                    {product.unit && (
                        <Typography variant="body2" color="text.secondary">
                            /{product.unit}
                        </Typography>
                    )}
                </Box>

                {/* 🛒 Кнопка добавления в корзину */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddToCart}
                    fullWidth
                    sx={{
                        mt: 'auto',
                    }}
                >
                    {t('product.addToCart')}
                </Button>
            </CardContent>
        </Card>
    );
};