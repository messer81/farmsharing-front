// 🛒 Redux Toolkit слайс для управления корзиной, добавление/удаление товаров
// Это мы оставляем и улучшаем
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../../types';

interface CartState {
    items: CartItem[];
    isOpen: boolean; // Добавим для контроля видимости корзины
    loading: boolean; // Состояние загрузки
    error: string | null; // Состояние ошибки
}

const initialState: CartState = {
    items: [],
    isOpen: false,
    loading: false,
    error: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 🛒 Добавление товара в корзину
        addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find((item: CartItem) => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ product, quantity });
            }
        },

        // 🗑️ Удаление товара из корзины
        removeFromCart: (state, action: PayloadAction<number>) => { // Изменили на ID продукта
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },

        // 🔄 Обновление количества товара
        updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const { productId, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter(item => item.product.id !== productId);
                return;
            }

            const item = state.items.find(item => item.product.id === productId);
            if (item) {
                item.quantity = quantity;
            }
        },

        // 🧹 Очистка корзины
        clearCart: (state) => {
            state.items = [];
        },

        // 👀 Управление видимостью корзины
        openCart: (state) => {
            state.isOpen = true;
        },

        closeCart: (state) => {
            state.isOpen = false;
        },

        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },

        // 🔄 API Actions
        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        // Сброс ошибки
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    openCart, 
    closeCart, 
    toggleCart,
    setCartItems,
    setLoading,
    setError,
    clearError
} = cartSlice.actions;

// Селекторы для получения данных из состояния
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectCartLoading = (state: { cart: CartState }) => state.cart.loading;
export const selectCartError = (state: { cart: CartState }) => state.cart.error;
export const selectTotalItems = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalPrice = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

export default cartSlice.reducer;