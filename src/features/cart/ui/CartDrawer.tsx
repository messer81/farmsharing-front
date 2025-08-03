// 📦 Выдвижная панель корзины с товарами и итоговой суммой
import { Drawer, Box, Typography, Button, Divider, IconButton } from '@mui/material';
import { Close as CloseIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon } from '@mui/icons-material';
import { useCart } from "../model/useCart.ts"
import { CartItem } from "./CartItem.tsx";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    const { items, totalPrice, clearCart } = useCart();
    
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: '380px' },
                    maxWidth: '380px',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                }
            }}
        >
            {/* 🎯 Шапка панели корзины */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    🛒 Your Cart
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{ color: 'text.secondary' }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* 📦 Содержимое корзины */}
            {items.length === 0 ? (
                // 📭 Пустая корзина
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexGrow: 1, 
                    py: 10 
                }}>
                    <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                    }}>
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                    </Box>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Your cart is empty
                    </Typography>
                    <Button onClick={onClose} color="primary">
                        Continue shopping
                    </Button>
                </Box>
            ) : (
                // 🛍️ Товары в корзине
                <>
                    <Box sx={{ 
                        flexGrow: 1, 
                        overflowY: 'auto', 
                        mb: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}>
                        {items.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ))}
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* 💰 Итоговая сумма */}
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="body1">Total:</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                ${totalPrice.toFixed(2)}
                            </Typography>
                        </Box>

                        {/* 🧹 Кнопки действий */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={clearCart}
                                sx={{ flex: 1 }}
                            >
                                Clear
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ 
                                    flex: 1,
                                    background: 'linear-gradient(45deg, #fbbf24 30%, #22c55e 90%)',
                                    color: 'white',
                                    fontWeight: 700,
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #f59e0b 30%, #16a34a 90%)',
                                    },
                                }}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Drawer>
    );
};