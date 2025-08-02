// 🎯 Шапка сайта - навигация и основные действия пользователя

import { AppBar, Toolbar, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { HeaderActions } from './HeaderActions';
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: 'transparent',
                color: 'white',
                boxShadow: 'none',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)', // Fix for Safari
                transition: 'background-color 0.3s ease',
                '&.MuiAppBar-colorPrimary': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
            }}
        >
            <Toolbar className="flex justify-between items-center px-4 py-3">
                {/* Логотип */}
                <Box className="flex items-center">
                    <h1 className="text-2xl font-bold text-primary">
                        🌾 FarmSharing
                    </h1>
                </Box>
                {/* Действия в хедере */}
                <HeaderActions isMobile={isMobile} />
            </Toolbar>
        </AppBar>
    );
};
// import { AppBar, Toolbar, Box, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { HeaderActions } from './HeaderActions';
// import { useTranslation } from 'react-i18next';
//
// export const Header = () => {
//     // 🌍 Поддержка адаптивности
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//
//     // 🌐 Получаем функцию перевода
//     const { t } = useTranslation();
//
//     return (
//         <AppBar
//             position="sticky"
//             className="bg-white shadow-md"
//             sx={{
//                 backgroundColor: 'white',
//                 color: 'black',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//             }}
//         >
//             <Toolbar className="flex justify-between items-center px-4 py-3">
//                 {/* 🏠 Логотип или название сайта */}
//                 <Box className="flex items-center">
//                     <h1 className="text-2xl font-bold text-primary">
//                         🌾 FarmSharing
//                     </h1>
//                 </Box>
//
//                 {/* 🔍 Поиск и действия - адаптивно */}
//                 <HeaderActions isMobile={isMobile} />
//             </Toolbar>
//         </AppBar>
//     );
// };