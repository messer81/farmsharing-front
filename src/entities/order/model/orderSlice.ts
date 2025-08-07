import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Order } from './types';

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderEntitySlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { setOrders, addOrder, clearOrders } = orderEntitySlice.actions;

// Селекторы
export const selectOrders = (state: { order: OrderState }) => state.order.orders;

export default orderEntitySlice.reducer;


