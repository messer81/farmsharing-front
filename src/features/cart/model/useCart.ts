// Новый хук для работы с корзиной через Redux
    import { useDispatch, useSelector } from 'react-redux';
    import {
        addToCart, removeFromCart, updateQuantity, clearCart as clearCartAction,
        openCart, closeCart, toggleCart,
        selectCartItems, selectCartIsOpen, selectTotalItems, selectTotalPrice
    } from './cartSlice';
    import type { Product } from '../../../types';

    export const useCart = () => {
        const dispatch = useDispatch();

        // Получаем данные из состояния Redux
        const items = useSelector(selectCartItems);
        const isOpen = useSelector(selectCartIsOpen);
        const totalItems = useSelector(selectTotalItems);
        const totalPrice = useSelector(selectTotalPrice);

        // Методы для работы с корзиной
        const addItem = (product: Product, quantity: number = 1) => {
            dispatch(addToCart({ product, quantity }));
        };

        const removeItem = (productId: number) => {
            dispatch(removeFromCart(productId));
        };

        const updateItemQuantity = (productId: number, quantity: number) => {
            dispatch(updateQuantity({ productId, quantity }));
        };

        const clearCart = () => {
            dispatch(clearCartAction());
        };

        const open = () => {
            dispatch(openCart());
        };

        const close = () => {
            dispatch(closeCart());
        };

        const toggle = () => {
            dispatch(toggleCart());
        };

        return {
            // Данные
            items,
            isOpen,
            totalItems,
            totalPrice,

            // Методы
            addItem,
            removeItem,
            updateItemQuantity,
            clearCart,
            open,
            close,
            toggle,
        };
    };