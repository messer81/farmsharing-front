import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from './types';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userEntitySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEntity: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUserEntity: (state) => {
      state.user = null;
    },
  },
});

export const { setUserEntity, clearUserEntity } = userEntitySlice.actions;
export default userEntitySlice.reducer;


