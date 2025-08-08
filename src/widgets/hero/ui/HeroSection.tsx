// 🌟 Адаптивный героический баннер
import { Box, Typography, Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// ✅ Используем ОПТИМИЗИРОВАННЫЕ JPEG (НЕ WebP!)
import heroImageLight from '../../../assets/optimized/hero-bg-light-desktop.jpg';
import heroImageDark from '../../../assets/optimized/hero-bg-dark-desktop.jpg';

export const HeroSection = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    // ✅ Выбираем МАЛЕНЬКОЕ оптимизированное изображение по теме
    const heroImage = theme.palette.mode === 'dark' ? heroImageDark : heroImageLight;

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '40vh', sm: '45vh', md: '50vh' },
                minHeight: { xs: '300px', sm: '350px', md: '400px' },
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-hero-bg)',
                marginTop: '-80px', // Распространяем фон на хедер
                paddingTop: '80px', // Компенсируем отступ
            }}
        >
            {/* 🖼️ Оптимизированное фоновое изображение */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-80px', // Распространяем на хедер
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // ✅ МАЛЕНЬКОЕ оптимизированное изображение (~56KB вместо 191KB!)
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // ✅ УБРАЛИ дорогие CSS фильтры!
                    // filter: 'blur(2px) brightness(1.2)', - УДАЛЕНО
                    // transform: 'scale(1.05)', - УДАЛЕНО  
                    zIndex: 0,
                }}
            />

            {/* 🌈 Легкая накладка для лучшей читаемости */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-80px', // Распространяем на хедер
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(31, 33, 33, 0.3)', // Более прозрачная накладка
                    zIndex: 1,
                }}
            />

            {/* 📱 Адаптивный контейнер */}
            <Container 
                maxWidth={false} 
                sx={{ 
                    width: '100%',
                    px: { xs: 'var(--space-8)', sm: 'var(--space-16)', md: 'var(--space-24)' }
                }}
            >
                <Box
                    sx={{
                        maxWidth: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
                        color: 'var(--color-hero-text)',
                        position: 'relative',
                        zIndex: 2,
                        textAlign: 'center',
                        mx: 'auto',
                    }}
                    className="animate__animated animate__fadeIn"
                >
                    {/* 🎯 Главный заголовок */}
                    <Typography
                        variant="h1"
                        sx={{
                            mb: { xs: 'var(--space-8)', sm: 'var(--space-12)' },
                            textShadow: '2px 2px 4px rgba(0,0,0,0.6)', // Менее сильная тень
                        }}
                    >
                        <span style={{ color: 'white' }}>
                            {t('main.title')}
                        </span>
                    </Typography>

                    {/* 📝 Подзаголовок */}
                    <Typography
                        variant="h5"
                        sx={{
                            mb: { xs: 'var(--space-16)', sm: 'var(--space-20)', md: 'var(--space-24)' },
                            maxWidth: { xs: '100%', sm: '500px', md: '600px' },
                            textShadow: '1px 1px 2px rgba(0,0,0,0.6)', // Менее сильная тень
                            color: 'white',
                            mx: 'auto',
                        }}
                    >
                        {t('main.subtitle')}
                    </Typography>

                    {/* 🎯 Кнопки действий */}
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 'var(--space-8)', sm: 'var(--space-12)' },
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            component={Link}
                           to="/products"
                            variant="contained"
                            size="large"
                            sx={{
                                minWidth: { xs: '200px', sm: '220px' },
                            }}
                        >
                            {t('main.buyButton')}
                        </Button>

                        <Button
                            component={Link}
                           to="/products"
                            variant="outlined"
                            size="large"
                            sx={{
                                minWidth: { xs: '180px', sm: '200px' },
                                borderColor: 'white',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderColor: 'white',
                                },
                            }}
                        >
                            {t('main.sellButton')}
                        </Button>
                    </Box>

                    {/* 📱 Мобильные подсказки */}
                    <Box
                        sx={{
                            mt: { xs: 'var(--space-16)', sm: 'var(--space-20)' },
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                textAlign: 'center',
                            }}
                        >
                            💡 {t('main.mobileTip')}
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* 🎨 Декоративные элементы */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: 'linear-gradient(to top, var(--color-background), transparent)',
                    zIndex: 1,
                }}
            />
        </Box>
    );
};

export default HeroSection;