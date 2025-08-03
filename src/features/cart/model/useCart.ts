// 🛒 Хук для работы с корзиной через Redux и API
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
    addToCart, removeFromCart, updateQuantity, clearCart as clearCartAction,
    openCart, closeCart, toggleCart, setCartItems, setLoading, setError,
    selectCartItems, selectCartIsOpen, selectTotalItems, selectTotalPrice,
    selectCartLoading, selectCartError
} from './cartSlice';
import { useCart as useCartApi } from '../../../shared/api/useApi';
import type { Product } from '../../../types';

export const useCart = () => {
    const dispatch = useDispatch();

    // Получаем данные из состояния Redux
    const items = useSelector(selectCartItems);
    const isOpen = useSelector(selectCartIsOpen);
    const totalItems = useSelector(selectTotalItems);
    const totalPrice = useSelector(selectTotalPrice);
    const loading = useSelector(selectCartLoading);
    const error = useSelector(selectCartError);

    // Используем новый API хук для корзины
    const cartApi = useCartApi();
    const { data: apiCart, loading: apiLoading, error: apiError, execute: fetchCart } = cartApi.getCart();

    // Загружаем корзину при монтировании компонента
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // Синхронизируем состояние API с Redux
    useEffect(() => {
        if (apiCart?.data) {
            dispatch(setCartItems(apiCart.data.items || []));
            dispatch(setLoading(false));
        }
    }, [apiCart, dispatch]);

    useEffect(() => {
        if (apiLoading) {
            dispatch(setLoading(true));
        }
    }, [apiLoading, dispatch]);

    useEffect(() => {
        if (apiError) {
            dispatch(setError(apiError));
        }
    }, [apiError, dispatch]);

    // Методы для работы с корзиной
    const addItem = async (product: Product, quantity: number = 1) => {
        try {
            dispatch(setLoading(true));
            
            // Добавляем в Redux для мгновенного UI
            dispatch(addToCart({ product, quantity }));
            
            // Синхронизируем с сервером
            const addToCartApi = cartApi.addToCart(product.id, quantity);
            await addToCartApi.execute();
            
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to add item to cart'));
            // Откатываем изменения в Redux при ошибке
            dispatch(removeFromCart(product.id));
        }
    };

    const removeItem = async (productId: number) => {
        try {
            dispatch(setLoading(true));
            
            // Удаляем из Redux для мгновенного UI
            dispatch(removeFromCart(productId));
            
            // Синхронизируем с сервером
            const removeFromCartApi = cartApi.removeFromCart(productId);
            await removeFromCartApi.execute();
            
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to remove item from cart'));
            // При ошибке перезагружаем корзину с сервера
            fetchCart();
        }
    };

    const updateItemQuantity = async (productId: number, quantity: number) => {
        try {
            dispatch(setLoading(true));
            
            // Обновляем в Redux для мгновенного UI
            dispatch(updateQuantity({ productId, quantity }));
            
            // Синхронизируем с сервером
            const updateCartItemApi = cartApi.updateCartItem(productId, quantity);
            await updateCartItemApi.execute();
            
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to update item quantity'));
            // При ошибке перезагружаем корзину с сервера
            fetchCart();
        }
    };

    const clearCart = async () => {
        try {
            dispatch(setLoading(true));
            
            // Очищаем в Redux для мгновенного UI
            dispatch(clearCartAction());
            
            // Синхронизируем с сервером
            const clearCartApi = cartApi.clearCart();
            await clearCartApi.execute();
            
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to clear cart'));
            // При ошибке перезагружаем корзину с сервера
            fetchCart();
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

    // Обновить корзину с сервера
    const refreshCart = async () => {
        try {
            await fetchCart();
        } catch (err) {
            dispatch(setError(err instanceof Error ? err.message : 'Failed to refresh cart'));
        }
    };

    return {
        // Данные
        items,
        isOpen,
        totalItems,
        totalPrice,
        loading: loading || apiLoading,
        error: error || apiError,

        // API данные
        apiCart: apiCart?.data,
        apiLoading,
        apiError,

        // Методы
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        open,
        close,
        toggle,
        refreshCart,
    };
};