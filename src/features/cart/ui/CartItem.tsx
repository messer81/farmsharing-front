// 🛒 Компонент для отображения товара в корзине
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../model/cartSlice.ts';
import { getImageUrl } from '../../../utils/imageUtils';
import type { CartItem as CartItemType } from '../../../types';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
    const dispatch = useDispatch();
    const { product, quantity } = item;

    // 🔄 Обработчики изменения количества и удаления
    const handleUpdateQuantity = (newQuantity: number) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({
                productId: product.id,
                quantity: newQuantity
            }));
        } else {
            handleRemoveItem();
        }
    };

    const handleRemoveItem = () => {
        dispatch(removeFromCart(product.id));
    };

    return (
        <Box sx={{
            display: 'flex',
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&:last-child': {
                borderBottom: 'none',
            }
        }}>
            {/* 🖼️ Изображение товара */}
            <Avatar
                src={getImageUrl(product.imageUrl) || '/placeholder-product.jpg'}
                alt={product.title}
                variant="rounded"
                sx={{
                    width: 70,
                    height: 70,
                    mr: 2,
                    flexShrink: 0,
                }}
            />

            {/* 📝 Информация о товаре */}
            <Box sx={{ flex: 1 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {product.title}
                    </Typography>

                    <IconButton
                        size="small"
                        onClick={handleRemoveItem}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': { 
                                color: 'error.main',
                                backgroundColor: 'error.light',
                            },
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.farmName}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                }}>
                    {/* 💰 Цена */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        ${product.price.toFixed(2)}
                    </Typography>

                    {/* 🔢 Счетчик количества */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(quantity - 1)}
                            sx={{
                                backgroundColor: 'grey.100',
                                '&:hover': {
                                    backgroundColor: 'grey.200',
                                },
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography variant="body1" sx={{ minWidth: 30, textAlign: 'center' }}>
                            {quantity}
                        </Typography>

                        <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(quantity + 1)}
                            sx={{
                                backgroundColor: 'grey.100',
                                '&:hover': {
                                    backgroundColor: 'grey.200',
                                },
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                {/* 💰 Общая стоимость товара */}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Total: ${(product.price * quantity).toFixed(2)}
                </Typography>
            </Box>
        </Box>
    );
};

export default CartItem;
