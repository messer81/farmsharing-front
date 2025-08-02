// 🌟 Главный баннер - эффектное приветствие на сайте
import { Box, Typography, Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import heroImage from '../../../assets/hero-bg.jpg'; // Нужно добавить картинку

export const HeroSection = () => {
    const { t } = useTranslation();


    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '60vh', md: '80vh' },
                minHeight: { xs: '400px', md: '600px' },
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* Фоновое изображение */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    // backgroundImage: `url(${heroImage})`,
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)',
                    zIndex: -1,
                }}
            />

            {/* Эффект стекла (градиентная накладка) */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient  ( to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                    zIndex: -1,
                }}
            />

            {/* Контент героя */}
            <Container maxWidth="lg">
                <Box
                    sx={{
                        maxWidth: { xs: '100%', md: '60%' },
                        color: 'white',
                        position: 'relative',
                        zIndex: 1,
                    }}
                    className="animate__animated animate__fadeIn"
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            mb: 2,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        }}
                    >
                        <span style={{ color: '#63c6a1' }}>
                            {t('main.titleGreen')}
                        </span>{' '}
                        {t('main.title')}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            maxWidth: '600px',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        }}
                    >
                        {t('main.subtitle')}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <Button
                            component={Link}
                            to="/mockProducts"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                borderRadius: 2,
                                py: 1.5,
                                px: 4,
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                            }}
                        >
                            {t('main.buyButton')}
                        </Button>

                        <Button
                            component={Link}
                            to="/sell"
                            variant="outlined"
                            color="inherit"
                            size="large"
                            sx={{
                                borderRadius: 2,
                                py: 1.5,
                                px: 4,
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                borderColor: 'white',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                },
                            }}
                        >
                            {t('main.sellButton')}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;