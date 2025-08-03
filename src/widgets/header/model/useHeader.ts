// 🎯 Хук для работы с хедером, управление (состоянием) меню, уведомления, тема, язык
import { useDispatch, useSelector } from 'react-redux';
import {
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
    selectIsMobileMenuOpen,
    selectIsSearchExpanded,
    selectIsUserMenuOpen,
    selectNotifications,
    selectUnreadNotificationsCount,
    selectTheme,
    selectLanguage,
} from './headerSlice';

export const useHeader = () => {
    const dispatch = useDispatch();

    // Получаем данные из состояния Redux
    const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);
    const isSearchExpanded = useSelector(selectIsSearchExpanded);
    const isUserMenuOpen = useSelector(selectIsUserMenuOpen);
    const notifications = useSelector(selectNotifications);
    const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount);
    const theme = useSelector(selectTheme);
    const language = useSelector(selectLanguage);

    // Методы для работы с мобильным меню
    const handleToggleMobileMenu = () => {
        dispatch(toggleMobileMenu());
    };

    const handleCloseMobileMenu = () => {
        dispatch(closeMobileMenu());
    };

    // Методы для работы с поиском
    const handleToggleSearch = () => {
        dispatch(toggleSearch());
    };

    const handleCloseSearch = () => {
        dispatch(closeSearch());
    };

    // Методы для работы с пользовательским меню
    const handleToggleUserMenu = () => {
        dispatch(toggleUserMenu());
    };

    const handleCloseUserMenu = () => {
        dispatch(closeUserMenu());
    };

    // Методы для работы с уведомлениями
    const handleAddNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
        dispatch(addNotification({ message, type }));
    };

    const handleMarkNotificationAsRead = (notificationId: string) => {
        dispatch(markNotificationAsRead(notificationId));
    };

    const handleRemoveNotification = (notificationId: string) => {
        dispatch(removeNotification(notificationId));
    };

    const handleClearAllNotifications = () => {
        dispatch(clearAllNotifications());
    };

    // Методы для работы с темой
    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const handleSetTheme = (newTheme: 'light' | 'dark') => {
        dispatch(setTheme(newTheme));
    };

    // Методы для работы с языком
    const handleSetLanguage = (newLanguage: string) => {
        dispatch(setLanguage(newLanguage));
    };

    // Метод для закрытия всех меню
    const handleCloseAllMenus = () => {
        dispatch(closeAllMenus());
    };

    return {
        // Состояние
        isMobileMenuOpen,
        isSearchExpanded,
        isUserMenuOpen,
        notifications,
        unreadNotificationsCount,
        theme,
        language,

        // Методы для мобильного меню
        toggleMobileMenu: handleToggleMobileMenu,
        closeMobileMenu: handleCloseMobileMenu,

        // Методы для поиска
        toggleSearch: handleToggleSearch,
        closeSearch: handleCloseSearch,

        // Методы для пользовательского меню
        toggleUserMenu: handleToggleUserMenu,
        closeUserMenu: handleCloseUserMenu,

        // Методы для уведомлений
        addNotification: handleAddNotification,
        markNotificationAsRead: handleMarkNotificationAsRead,
        removeNotification: handleRemoveNotification,
        clearAllNotifications: handleClearAllNotifications,

        // Методы для темы
        toggleTheme: handleToggleTheme,
        setTheme: handleSetTheme,

        // Методы для языка
        setLanguage: handleSetLanguage,

        // Общие методы
        closeAllMenus: handleCloseAllMenus,
    };
}; 