// 🛒 Кнопка корзины для хедера с индикатором количества товаров
import { useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { CartDrawer } from './CartDrawer';
import { useCart } from '../model/useCart';

export const CartButton = () => {
    // 🎯 Состояние открытия панели корзины
    const [isOpen, setIsOpen] = useState(false);

    // 🛒 Получаем общее количество товаров из контекста
    const { totalItems } = useCart();

    return (
        <>
            {/* 🛒 Кнопка корзины с бейджем количества */}
            <IconButton
                color="secondary"
                onClick={() => setIsOpen(true)}
                className="relative"
            >
                <Badge
                    badgeContent={totalItems}
                    color="secondary"
                    className={totalItems > 0 ? "animate-pulse" : ""}
                >
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>

            {/* 📦 Выдвижная панель корзины */}
            <CartDrawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};