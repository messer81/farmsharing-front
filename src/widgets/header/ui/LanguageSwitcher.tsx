// 🌍 Переключатель языка с поддержкой 4 языков
import { IconButton, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// 🌐 Поддерживаемые языки
const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export const LanguageSwitcher = () => {
    // 🌐 Состояние меню языков
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // 🌍 Функции для работы с переводом
    const { i18n } = useTranslation();

    // 🎯 Открытие меню
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // 🚪 Закрытие меню
    const handleClose = () => {
        setAnchorEl(null);
    };

    // 🔄 Смена языка
    const handleLanguageChange = (code: string) => {
        i18n.changeLanguage(code);
        handleClose();
    };

    return (
        <>
            {/* 🌍 Кнопка переключения языка */}
            <IconButton
                onClick={handleClick}
                className="text-gray-600"
            >
                <LanguageIcon />
            </IconButton>

            {/* 📋 Меню выбора языка */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '12px',
                        mt: 1,
                    }
                }}
            >
                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className="flex items-center space-x-2 px-4 py-2"
                        selected={i18n.language === lang.code}
                    >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};