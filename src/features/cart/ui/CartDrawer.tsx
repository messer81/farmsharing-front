// 📦 Выдвижная панель корзины с товарами и итоговой суммой
import { Drawer, Box, Typography, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from "../model/useCart.ts"
import {CartItem} from "./CartItem.tsx"; // Пока используем Context

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    // 🛒 Получаем состояние корзины из контекста
    // const { items, totalPrice, clearCart } = useCart();
    // 🎯 Используем хук useCart для получения данных корзины
const { items, totalPrice, clearCart } = useCart();
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                // 🎨 Современный способ стилизации через sx
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: '380px' },
                    maxWidth: '380px',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column'
                }
            }}
        >
            {/* 🎯 Шапка панели корзины */}
            <Box className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-bold">
                    🛒 Your Cart
                </Typography>
                <button
                    onClick={onClose}
                    className="p-1 text-gray-500 hover:text-gray-700"
                >
                    <CloseIcon />
                </button>
            </Box>

            <Divider className="mb-4" />

            {/* 📦 Содержимое корзины */}
            {items.length === 0 ? (
                // 📭 Пустая корзина
                <Box className="flex flex-col items-center justify-center flex-grow py-10">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <ShoppingCartOutlinedIcon fontSize="large" className="text-gray-400" />
                    </div>
                    <Typography className="text-gray-500 mb-2">Your cart is empty</Typography>
                    <Button onClick={onClose} className="text-primary">
                        Continue shopping
                    </Button>
                </Box>
            ) : (
                // 🛍️ Товары в корзине
                <>
                    <Box className="flex-grow overflow-y-auto mb-4 space-y-3">
                        {items.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ))}
                    </Box>

                    <Divider className="mb-4" />

                    {/* 💰 Итоговая сумма */}
                    <Box className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <Typography variant="body1">Total:</Typography>
                            <Typography variant="h6" className="font-bold">
                                ₪{totalPrice.toFixed(2)}
                            </Typography>
                        </div>

                        {/* 🧹 Кнопки действий */}
                        <Box className="flex gap-2">
                            <Button
                                variant="outlined"
                                onClick={clearCart}
                                className="flex-1"
                            >
                                Clear
                            </Button>
                            <Button
                                variant="contained"
                                className="flex-1 bg-gradient-to-r from-yellow-400 to-green-500 text-white font-bold"
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