import { createTheme } from '@mui/material/styles';

// Кастомная тема для FarmSharing
export const theme = createTheme({
  palette: {
    primary: {
      main: '#22c55e', // --color-organic-green
      light: '#dcfce7', // --color-organic-green-light
      dark: '#16a34a', // --color-organic-green-hover
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b', // --color-slate-500
      light: '#94a3b8', // --color-slate-400
      dark: '#475569', // --color-slate-600
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981', // --color-success
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b', // --color-warning
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444', // --color-error
      light: '#f87171',
      dark: '#dc2626',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    text: {
      primary: '#1e293b', // --color-slate-900
      secondary: '#64748b', // --color-slate-500
    },
    background: {
      default: '#fefefe', // --color-cream-50
      paper: '#ffffff', // --color-cream-100
    },
    divider: 'rgba(100, 116, 139, 0.12)', // --color-border
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: '40px',
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '30px',
      fontWeight: 600,
      lineHeight: '36px',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '32px',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '28px',
      letterSpacing: '-0.01em',
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    button: {
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0',
    },
  },
  shape: {
    borderRadius: 8, // --radius-base
  },
  spacing: (factor: number) => `${4 * factor}px`, // --space-4 = 16px
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '16px',
          padding: '12px 24px',
          minHeight: '48px',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        sizeSmall: {
          padding: '8px 16px',
          fontSize: '14px',
          minHeight: '36px',
        },
        sizeLarge: {
          padding: '16px 32px',
          fontSize: '18px',
          minHeight: '56px',
        },
        contained: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
          border: '1px solid rgba(100, 116, 139, 0.12)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#22c55e',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#22c55e',
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(245, 245, 245, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
          zIndex: 1000,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            transform: 'scale(1.05)',
            color: 'primary.main',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'text.primary',
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '14px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
        standardSuccess: {
          backgroundColor: '#ecfdf5',
          color: '#065f46',
          border: '1px solid #10b981',
        },
        standardError: {
          backgroundColor: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #ef4444',
        },
        standardWarning: {
          backgroundColor: '#fffbeb',
          color: '#92400e',
          border: '1px solid #f59e0b',
        },
        standardInfo: {
          backgroundColor: '#eff6ff',
          color: '#1e40af',
          border: '1px solid #3b82f6',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

// Типы для TypeScript
declare module '@mui/material/styles' {
  interface Palette {
    farm?: {
      green: string;
      brown: string;
      cream: string;
    };
  }
  interface PaletteOptions {
    farm?: {
      green: string;
      brown: string;
      cream: string;
    };
  }
}

export default theme; 