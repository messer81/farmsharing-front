// 🎨 MUI Theme Provider, который интегрируется с нашей темой
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../../shared/styles/theme';
import { useTheme } from './ThemeProvider';
import type { ReactNode } from 'react';

interface MuiThemeWrapperProps {
    children: ReactNode;
}

export const MuiThemeWrapper = ({ children }: MuiThemeWrapperProps) => {
    const { isDark } = useTheme();
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};