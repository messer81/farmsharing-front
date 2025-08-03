// 🛒 Кнопка корзины для хедера с индикатором количества товаров
import { IconButton, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { CartDrawer } from './CartDrawer';
import { useCart } from '../model/useCart';

export const CartButton = () => {
    // 🛒 Получаем данные из Redux
    const { totalItems, isOpen, toggle } = useCart();

    return (
        <>
            {/* 🛒 Кнопка корзины с бейджем количества */}
            <IconButton
                color="secondary"
                onClick={toggle}
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
                onClose={() => toggle()}
            />
        </>
    );
};