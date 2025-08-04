// 🎯 Главный хедер приложения
import { useState, useCallback } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Box, 
    Collapse,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Search as SearchIcon, ShoppingCart as CartIcon, Person as UserIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderSearchBox } from '../../../shared/ui/HeaderSearchBox';
import { CartBadge } from '../../../shared/ui/CartBadge';
import { useCart } from '../../../features/cart/model/useCart';

export const Header = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { totalItems } = useCart();
    
    // Состояние поиска
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    // Мемоизированные обработчики
    const handleSearchToggle = useCallback(() => {
        setSearchOpen(prev => !prev);
    }, []);

    const handleSearchSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        // Логика поиска
        console.log('Search submitted:', searchQuery);
    }, [searchQuery]);

    const handleSearchClear = useCallback(() => {
        setSearchQuery('');
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
    }, []);

    return (
        <AppBar 
            position="sticky" 
            elevation={0}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                {/* 🏠 Логотип и заголовок */}
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Link 
                        to="/" 
                        style={{ 
                            textDecoration: 'none', 
                            color: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing(2),
                        }}
                    >
                        <Typography
                            variant="h6"
                            className="header-logo"
                        >
                            🌾 FarmSharing
                        </Typography>
                    </Link>
                </Box>

                {/* 🔍 Поиск (десктоп) */}
                {!isMobile && (
                    <HeaderSearchBox
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSearchClear={handleSearchClear}
                        onSubmit={handleSearchSubmit}
                        placeholder={t('header.searchPlaceholder')}
                    />
                )}

                {/* 🎯 Навигационные иконки */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* 🔍 Поиск (мобильный) */}
                    {isMobile && (
                        <IconButton
                            onClick={handleSearchToggle}
                            color="inherit"
                            aria-label={t('header.search')}
                        >
                            <SearchIcon />
                        </IconButton>
                    )}

                    {/* 🛒 Корзина */}
                    <Box sx={{ position: 'relative' }}>
                        <IconButton
                            color="inherit"
                            aria-label={t('header.cart')}
                            component={Link}
                            to="/cart"
                        >
                            <CartIcon />
                            <CartBadge count={totalItems} />
                        </IconButton>
                    </Box>

                    {/* 👤 Пользователь */}
                    <IconButton
                        color="inherit"
                        aria-label={t('header.profile')}
                        component={Link}
                        to="/profile"
                    >
                        <UserIcon />
                    </IconButton>

                    {/* 🌐 Переключатель языка */}
                    <LanguageSwitcher />

                    {/* 🌙 Переключатель темы */}
                    <ThemeSwitcher />
                </Box>
            </Toolbar>

            {/* 🔍 Мобильный поиск */}
            {isMobile && (
                <Collapse in={searchOpen}>
                    <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
                        <HeaderSearchBox
                            searchQuery={searchQuery}
                            onSearchChange={handleSearchChange}
                            onSearchClear={handleSearchClear}
                            onSubmit={handleSearchSubmit}
                            placeholder={t('header.searchPlaceholder')}
                        />
                    </Box>
                </Collapse>
            )}
        </AppBar>
    );
};