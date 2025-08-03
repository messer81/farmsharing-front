// 🎯 Современный хедер с поиском и навигацией
import { AppBar, Toolbar, Box, useMediaQuery, IconButton, Typography, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
    Search as SearchIcon,
    ShoppingCart as CartIcon,
    Person as UserIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCart } from '../../../features/cart/model/useCart';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderSearchBox } from '../../../shared/ui/HeaderSearchBox';
import { CartBadge } from '../../../shared/ui/CartBadge';

export const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();
    const { totalItems } = useCart();
    
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchToggle = () => {
        setSearchOpen(!searchOpen);
        if (searchOpen) {
            setSearchQuery('');
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search:', searchQuery);
    };

    const handleSearchClear = () => {
        setSearchQuery('');
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
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
                            sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            🌾 FarmSharing
                        </Typography>
                    </Link>
                </Box>

                {/* 🔍 Поиск (десктоп) */}
                {!isMobile && (
                    <HeaderSearchBox
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onSearchClear={handleSearchClear}
                        onSubmit={handleSearchSubmit}
                        placeholder={t('main.searchPlaceholder')}
                    />
                )}

                {/* 🎯 Навигационные иконки */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* 🔍 Поиск (мобильный) */}
                    {isMobile && (
                        <IconButton
                            onClick={handleSearchToggle}
                            color="inherit"
                            aria-label={t('main.search')}
                        >
                            <SearchIcon />
                        </IconButton>
                    )}

                    {/* 🛒 Корзина */}
                    <Box sx={{ position: 'relative' }}>
                        <IconButton
                            component={Link}
                            to="/cart"
                            color="inherit"
                            aria-label={t('main.cart')}
                        >
                            <CartIcon />
                            <CartBadge count={totalItems} />
                        </IconButton>
                    </Box>

                    {/* 👤 Пользователь */}
                    <IconButton
                        component={Link}
                        to="/profile"
                        color="inherit"
                        aria-label={t('main.profile')}
                    >
                        <UserIcon />
                    </IconButton>

                    {/* 🌐 Язык */}
                    <LanguageSwitcher />

                    {/* 🌙 Тема */}
                    <ThemeSwitcher />
                </Box>
            </Toolbar>

            {/* 🔍 Поиск (мобильный, развернутый) */}
            <Collapse in={isMobile && searchOpen} timeout={300}>
                <Box
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                        backdropFilter: 'blur(15px)',
                        px: 2,
                        py: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HeaderSearchBox
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onSearchClear={handleSearchClear}
                            onSubmit={handleSearchSubmit}
                            placeholder={t('main.searchPlaceholder')}
                        />
                    </Box>
                </Box>
            </Collapse>
        </AppBar>
    );
};