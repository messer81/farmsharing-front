// 🛒 Хук для работы с корзиной через Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    addToCart, removeFromCart, updateQuantity, clearCart as clearCartAction,
    openCart, closeCart, toggleCart, setLoading, setError,
    selectCartItems, selectCartIsOpen, selectTotalItems, selectTotalPrice,
    selectCartLoading, selectCartError
} from './cartSlice';
import type { Product } from '../../../types/api';

export const useCart = () => {
    const dispatch = useDispatch();

    // Получаем данные из состояния Redux
    const items = useSelector(selectCartItems);
    const isOpen = useSelector(selectCartIsOpen);
    const totalItems = useSelector(selectTotalItems);
    const totalPrice = useSelector(selectTotalPrice);
    const loading = useSelector(selectCartLoading);
    const error = useSelector(selectCartError);

    // Методы для работы с корзиной
    const addItem = (product: Product, quantity: number = 1) => {
        try {
            dispatch(setLoading(true));
            
            // Добавляем в Redux
            dispatch(addToCart({ product, quantity }));
            
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to add item to cart'));
        }
    };

    const removeItem = (productId: number) => {
        try {
            dispatch(setLoading(true));
            
            // Удаляем из Redux
            dispatch(removeFromCart(productId));
            
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to remove item from cart'));
        }
    };

    const updateItemQuantity = (productId: number, quantity: number) => {
        try {
            dispatch(setLoading(true));
            
            // Обновляем в Redux
            dispatch(updateQuantity({ id: productId, quantity }));
            
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to update item quantity'));
        }
    };

    const clearCart = () => {
        try {
            dispatch(setLoading(true));
            
            // Очищаем в Redux
            dispatch(clearCartAction());
            
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to clear cart'));
        }
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
        loading,
        error,

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