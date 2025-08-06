// 🛒 Кнопка корзины для хедера с индикатором количества товаров
import { IconButton, Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { toggleCart, selectTotalItems } from '../model/cartSlice';
import CartDrawer from './CartDrawer';

export const CartButton = () => {
    const dispatch = useAppDispatch();
    const totalItems = useAppSelector(selectTotalItems);
    // const isOpen = useAppSelector(selectCartIsOpen);

    const handleToggle = () => {
        dispatch(toggleCart());
    };

    return (
        <>
            {/* 🛒 Кнопка корзины с бейджем количества */}
            <IconButton
                color="secondary"
                onClick={handleToggle}
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
            <CartDrawer />
        </>
    );
};