// 🛒 Компонент для отображения товара в корзине
import { Box, Typography, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../model/cartSlice.ts';
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
            <Box sx={{
                width: 70,
                height: 70,
                borderRadius: 1,
                overflow: 'hidden',
                mr: 2,
                flexShrink: 0,
            }}>
                <img
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>

            {/* 📝 Информация о товаре */}
            <Box sx={{ flex: 1 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                        {product.title}
                    </Typography>

                    <IconButton
                        size="small"
                        onClick={handleRemoveItem}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': { color: 'error.main' },
                        }}
                    >
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.farm?.name}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                }}>
                    {/* 💰 Цена */}
                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                        ₪{product.price.toFixed(2)}
                    </Typography>

                    {/* 🔢 Управление количеством */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(quantity - 1)}
                            sx={{
                                bgcolor: 'action.hover',
                                p: '4px',
                                '&:hover': { bgcolor: 'action.selected' },
                            }}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{ mx: 1.5, minWidth: '20px', textAlign: 'center' }}>
                            {quantity}
                        </Typography>

                        <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(quantity + 1)}
                            sx={{
                                bgcolor: 'action.hover',
                                p: '4px',
                                '&:hover': { bgcolor: 'action.selected' },
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;
