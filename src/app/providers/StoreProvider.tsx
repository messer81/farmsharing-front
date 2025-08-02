// 🛒 Redux Toolkit провайдер для управления глобальным состоянием
import { Provider } from 'react-redux';
import store from '../store/store';
import type { ReactNode } from 'react';

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};