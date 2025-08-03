// 🎨 Минималистичный переключатель тем
import { IconButton } from '@mui/material';
import { LightMode as LightIcon, DarkMode as DarkIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../app/providers/ThemeProvider';

export const ThemeSwitcher = () => {
    const { t } = useTranslation();
    const { isDark, toggleTheme } = useTheme();

    return (
        <IconButton
            onClick={toggleTheme}
            aria-label={t('header.toggleTheme')}
            color="inherit"
            sx={{
                '&:hover': {
                    transform: 'rotate(180deg)',
                },
            }}
        >
            {isDark ? (
                <LightIcon />
            ) : (
                <DarkIcon />
            )}
        </IconButton>
    );
};
