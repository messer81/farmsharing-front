// ⚙️ Действия в хедере - поиск, корзина, язык, авторизация
    import { Box, IconButton } from '@mui/material';
    import SearchIcon from '@mui/icons-material/Search';
    import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
    import { useState } from 'react';
    import { SearchBar } from '../../../features/search/ui/SearchBar';
    import { CartButton } from '../../../features/cart/ui/CartButton';
    import { LanguageSwitcher } from './LanguageSwitcher';

    interface HeaderActionsProps {
        isMobile: boolean;
    }

    export const HeaderActions = ({ isMobile }: HeaderActionsProps) => {
        // 🔍 Состояние поиска
        const [isSearchOpen, setIsSearchOpen] = useState(false);

        return (
            <Box className="flex items-center space-x-2">
                {/* 🔍 Поиск - адаптивный */}
                {isMobile ? (
                    // 📱 Мобильная версия - иконка поиска
                    <>
                        <IconButton
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-gray-600"
                        >
                            <SearchIcon />
                        </IconButton>

                        {/* 📝 Строка поиска при активации */}
                        {isSearchOpen && (
                            <div className="absolute top-16 left-0 right-0 p-4 bg-white shadow-lg z-50">
                                <SearchBar />
                            </div>
                        )}
                    </>
                ) : (
                    // 💻 Десктопная версия - поле поиска
                    <SearchBar />
                )}

                {/* 🌍 Переключатель языка */}
                <LanguageSwitcher />

                {/* 👤 Вход в систему */}
                <IconButton className="text-gray-600">
                    <PersonOutlineIcon />
                </IconButton>

                {/* 🛒 Корзина */}
                <CartButton />
            </Box>
        );
    };