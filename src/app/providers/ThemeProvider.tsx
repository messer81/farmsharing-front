//🎨 MUI темизация
// Провайдер тем MUI с поддержкой светлого/тёмного режима
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';

// 🎨 Цветовая палитра проекта
const theme = createTheme({
    palette: {
        primary: {
            main: '#4b9b4b', // 🌿 Фермерский зелёный
            light: '#7dcb7d',
            dark: '#3d8b3d',
        },
        secondary: {
            main: '#fefdfd', // 🧽 Светлый фон
            light: '#ffffff',
            dark: '#e0e0e0',
        },
        background: {
            default: '#f9f9f9',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h5: {
            fontWeight: 700,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 20px',
                    fontWeight: 'bold',
                    '&:focus': {
                        outline: 'none',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
    },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    );
};