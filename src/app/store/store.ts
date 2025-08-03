import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from '../../features/cart/model/cartSlice';
import { productSlice } from '../../entities/product/model/productSlice';
import { farmSlice } from '../../entities/farm/model/farmSlice';
import { searchSlice } from '../../features/search/model/searchSlice';
import { headerSlice } from '../../widgets/header/model/headerSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    farm: farmSlice.reducer,
    search: searchSlice.reducer,
    header: headerSlice.reducer,
  },
});

export default store;

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;