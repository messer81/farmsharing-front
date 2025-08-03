// 🌍 Минималистичный переключатель языков
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
        handleClose();
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <>
            <IconButton
                onClick={handleClick}
                color="inherit"
            >
                <LanguageIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        mt: 1,
                        minWidth: 160,
                    },
                }}
            >
                {languages.map((language) => (
                    <MenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        selected={language.code === currentLanguage.code}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            py: 1.5,
                            px: 2,
                            fontSize: '0.875rem',
                            color: language.code === currentLanguage.code ? 'primary.main' : 'text.primary',
                            '&:hover': {
                                backgroundColor: 'action.hover',
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                },
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: '1rem' }}>
                            {language.flag}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: language.code === currentLanguage.code ? 600 : 400,
                            }}
                        >
                            {language.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};