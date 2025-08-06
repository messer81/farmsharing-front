import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { cartSlice } from '../../features/cart/model/cartSlice';
import { productSlice } from '../../entities/product/model/productSlice';
import { farmSlice } from '../../entities/farm/model/farmSlice';
import { searchSlice } from '../../features/search/model/searchSlice';
import { headerSlice } from '../../widgets/header/model/headerSlice';
import authReducer from '../../features/auth/model/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    farm: farmSlice.reducer,
    search: searchSlice.reducer,
    header: headerSlice.reducer,
    auth: authReducer,
  },
});

export default store;

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Типизированные хуки для использования в компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;