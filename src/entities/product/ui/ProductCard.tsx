import React, { useState } from 'react';
        import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
        import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
        import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
        import FavoriteIcon from '@mui/icons-material/Favorite';
        import GradeIcon from '@mui/icons-material/Grade';
        import { useTranslation } from 'react-i18next';
        import { useCart } from '../../../features/cart/model/useCart';
        import type { Product } from '../../../types';

        // 🌟 Улучшенная карточка товара с анимациями, оптимизирована для мобильных устройств
        interface ProductCardProps {
            product: Product;
            onOpenDetails?: (product: Product) => void; // Функция для открытия детальной информации
        }

        export const ProductCard = ({ product, onOpenDetails }: ProductCardProps) => {
            const { t } = useTranslation();
            const { addItem } = useCart();
            const [isFavorite, setIsFavorite] = useState(false);

            // 🥰 Добавление в избранное
            const toggleFavorite = (e: React.MouseEvent) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
            };

            // 🛒 Добавление в корзину
            const handleAddToCart = (e: React.MouseEvent) => {
                e.stopPropagation();
                addItem(product, 1);
            };

            // 🔍 Открытие детальной информации
            const handleCardClick = () => {
                onOpenDetails?.(product);
            };

            return (
                <Card
                    onClick={handleCardClick}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                        }
                    }}
                >
                    {/* Значок органического продукта, если применимо */}
                    {product.farm.isOrganic && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '8px',
                                left: '8px',
                                bgcolor: 'green.500',
                                color: 'white',
                                px: 2,
                                py: 1,
                                borderRadius: '16px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}
                        >
                            {t('product.organic')}
                        </Box>
                    )}

                    {/* Кнопка Избранное */}
                    <IconButton
                        onClick={toggleFavorite}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(255,255,255,0.7)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                            opacity: 0.7,
                            '&:hover': { opacity: 1 }
                        }}
                    >
                        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>

                    {/* Изображение продукта */}
                    <CardMedia
                        component="img"
                        height={160}
                        image={product.imageUrl || '/placeholder-product.jpg'}
                        alt={product.title}
                        sx={{ objectFit: 'cover' }}
                    />

                    {/* Информация о продукте */}
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                            {product.title}
                        </Typography>

                        {/* Информация о ферме и рейтинг */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                {t('product.by')} {product.farm.name}
                            </Typography>
                            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                                <GradeIcon sx={{ color: '#f9ca09', fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {product.farm.rating}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Распорка, чтобы цена была внизу */}
                        <Box sx={{ flexGrow: 1 }} />

                        {/* Цена и кнопка добавления в корзину */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 2
                        }}>
                            <Box>
                                <Typography variant="h5" component="div" fontWeight="bold" color="primary">
                                    ₪{product.price.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t('product.per')} {product.units}
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddToCart}
                                startIcon={<ShoppingCartOutlinedIcon />}
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                }}
                            >
                                {t('product.addToCart')}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            );
        };

        export default ProductCard;