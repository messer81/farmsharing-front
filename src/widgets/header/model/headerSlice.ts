// 🎯 Redux Toolkit слайс для управления хедером. Управление меню, уведомления, тема, язык
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
    isMobileMenuOpen: boolean;
    isSearchExpanded: boolean;
    isUserMenuOpen: boolean;
    notifications: Array<{
        id: string;
        message: string;
        type: 'info' | 'success' | 'warning' | 'error';
        read: boolean;
    }>;
    theme: 'light' | 'dark';
    language: string;
}

const initialState: HeaderState = {
    isMobileMenuOpen: false,
    isSearchExpanded: false,
    isUserMenuOpen: false,
    notifications: [],
    theme: 'light',
    language: 'en',
};

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        // 📱 Мобильное меню
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
            // Закрываем другие меню при открытии мобильного
            if (state.isMobileMenuOpen) {
                state.isSearchExpanded = false;
                state.isUserMenuOpen = false;
            }
        },

        closeMobileMenu: (state) => {
            state.isMobileMenuOpen = false;
        },

        // 🔍 Поиск
        toggleSearch: (state) => {
            state.isSearchExpanded = !state.isSearchExpanded;
            // Закрываем другие меню при открытии поиска
            if (state.isSearchExpanded) {
                state.isMobileMenuOpen = false;
                state.isUserMenuOpen = false;
            }
        },

        closeSearch: (state) => {
            state.isSearchExpanded = false;
        },

        // 👤 Пользовательское меню
        toggleUserMenu: (state) => {
            state.isUserMenuOpen = !state.isUserMenuOpen;
            // Закрываем другие меню при открытии пользовательского
            if (state.isUserMenuOpen) {
                state.isMobileMenuOpen = false;
                state.isSearchExpanded = false;
            }
        },

        closeUserMenu: (state) => {
            state.isUserMenuOpen = false;
        },

        // 🔔 Уведомления
        addNotification: (state, action: PayloadAction<{
            message: string;
            type: 'info' | 'success' | 'warning' | 'error';
        }>) => {
            const notification = {
                id: Date.now().toString(),
                message: action.payload.message,
                type: action.payload.type,
                read: false,
            };
            state.notifications.unshift(notification);
            // Ограничиваем количество уведомлений
            if (state.notifications.length > 10) {
                state.notifications = state.notifications.slice(0, 10);
            }
        },

        markNotificationAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) {
                notification.read = true;
            }
        },

        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
        },

        clearAllNotifications: (state) => {
            state.notifications = [];
        },

        // 🎨 Тема
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },

        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },

        // 🌐 Язык
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },

        // 🧹 Закрытие всех меню
        closeAllMenus: (state) => {
            state.isMobileMenuOpen = false;
            state.isSearchExpanded = false;
            state.isUserMenuOpen = false;
        },
    },
});

export const {
    toggleMobileMenu,
    closeMobileMenu,
    toggleSearch,
    closeSearch,
    toggleUserMenu,
    closeUserMenu,
    addNotification,
    markNotificationAsRead,
    removeNotification,
    clearAllNotifications,
    toggleTheme,
    setTheme,
    setLanguage,
    closeAllMenus,
} = headerSlice.actions;

// Селекторы
export const selectIsMobileMenuOpen = (state: { header: HeaderState }) => state.header.isMobileMenuOpen;
export const selectIsSearchExpanded = (state: { header: HeaderState }) => state.header.isSearchExpanded;
export const selectIsUserMenuOpen = (state: { header: HeaderState }) => state.header.isUserMenuOpen;
export const selectNotifications = (state: { header: HeaderState }) => state.header.notifications;
export const selectUnreadNotificationsCount = (state: { header: HeaderState }) => 
    state.header.notifications.filter(n => !n.read).length;
export const selectTheme = (state: { header: HeaderState }) => state.header.theme;
export const selectLanguage = (state: { header: HeaderState }) => state.header.language;

export default headerSlice.reducer; 