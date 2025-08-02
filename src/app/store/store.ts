import { configureStore } from '@reduxjs/toolkit';
// Импортируйте редьюсеры по необходимости
// import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    // cart: cartReducer,
    // другие редьюсеры...
  },
});

export default store;

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;