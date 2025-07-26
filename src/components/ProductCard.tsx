// 📁 src/components/ProductCard.tsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from '@mui/material';
import { ShoppingCart, Store, Inventory } from '@mui/icons-material';
import { Offer } from '../types/offer';

interface ProductCardProps {
    offer: Offer;
    onAddToCart: (offer: Offer) => void; // 🛒 Функция добавления в корзину
}

export const ProductCard: React.FC<ProductCardProps> = ({ offer, onAddToCart }) => {
    return (
        <Card
            sx={{
                maxWidth: 345,
                // 🌟 КРАСИВЫЕ ТЕНИ - оставляем как есть!
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                '&:hover': {
                    boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
                    transform: 'translateY(-4px)', // ✨ Подъем при наведении
                },
                transition: 'all 0.3s ease-in-out',
                borderRadius: 2,
            }}
        >
            {/* 🖼️ Картинка товара */}
            <CardMedia
                component="img"
                height="200"
                image={offer.imageUrl || '/placeholder-product.jpg'}
                alt={offer.title}
            />

            <CardContent>
                {/* 🏷️ Категория */}
                <Box sx={{ mb: 1 }}>
                    <Chip
                        label={offer.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                </Box>

                {/* 📝 Название */}
                <Typography gutterBottom variant="h6" component="div">
                    {offer.title}
                </Typography>

                {/* 📄 Описание */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {offer.description}
                </Typography>

                {/* 🚜 Ферма */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Store fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="body2" color="text.secondary">
                        {offer.farm.name} • {offer.farm.location}
                    </Typography>
                </Box>

                {/* 📦 Количество в наличии */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Inventory fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
                    <Typography variant="body2" color="text.secondary">
                        В наличии: {offer.amount} шт.
                    </Typography>
                </Box>

                {/* 💰 Цена и кнопка */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        ₪{offer.price}
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<ShoppingCart />}
                        onClick={() => onAddToCart(offer)}
                        disabled={offer.amount === 0} // 🚫 Блокируем если нет в наличии
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                        }}
                    >
                        В корзину
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};
