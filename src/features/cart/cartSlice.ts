// 📁 src/store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';

interface CartItem {
    offer: Offer;      // 🛒 Товар
    quantity: number;  // 📊 Количество в корзине
}

interface CartState {
    items: CartItem[];           // 📦 Товары в корзине
    totalAmount: number;         // 💰 Общая сумма
    totalQuantity: number;       // 📊 Общее количество товаров
}

const initialState: CartState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // ➕ Добавить товар в корзину
        addToCart: (state, action: PayloadAction<Offer>) => {
            const offer = action.payload;
            const existingItem = state.items.find(item => item.offer.id === offer.id);

            if (existingItem) {
                // 📈 Увеличиваем количество если товар уже есть
                existingItem.quantity++;
            } else {
                // 🆕 Добавляем новый товар
                state.items.push({ offer, quantity: 1 });
            }

            // 🔄 Пересчитываем итоги
            cartSlice.caseReducers.calculateTotals(state);
        },

        // ➖ Убрать товар из корзины
        removeFromCart: (state, action: PayloadAction<number>) => {
            const offerId = action.payload;
            state.items = state.items.filter(item => item.offer.id !== offerId);
            cartSlice.caseReducers.calculateTotals(state);
        },

        // 🔄 Пересчитать итоги
        calculateTotals: (state) => {
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + (item.offer.price * item.quantity), 0);
        },

        // 🗑️ Очистить корзину
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});

export const { addToCart, removeFromCart, calculateTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
