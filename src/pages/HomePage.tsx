// 🏠 Главная страница с героическим баннером
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '../widgets/hero/ui/HeroSection';

export const HomePage = () => {
    const { t } = useTranslation();

    return (
        <Box>
            {/* 🌟 Героический баннер */}
            <HeroSection />

            {/* 🌿 Преимущества */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h3"
                    textAlign="center"
                    fontWeight="bold"
                    sx={{
                        mb: 6,
                        background: 'linear-gradient(45deg, #4b9b4b, #7dcb7d)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {t('home.whyUs')}
                </Typography>

                <Grid container spacing={4}>
                    {/* 🥦 Блок "Свежие продукты" */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                height: '100%',
                                borderRadius: 3,
                                textAlign: 'center',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: '3rem',
                                    mb: 2,
                                    color: 'primary.main',
                                }}
                            >
                                🥦
                            </Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {t('home.freshProducts')}
                            </Typography>
                            <Typography color="text.secondary">
                                {t('home.freshProductsText')}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* 👨‍🌾 Блок "Прямая связь с фермерами" */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                height: '100%',
                                borderRadius: 3,
                                textAlign: 'center',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: '3rem',
                                    mb: 2,
                                    color: 'primary.main',
                                }}
                            >
                                👨‍🌾
                            </Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {t('home.directConnection')}
                            </Typography>
                            <Typography color="text.secondary">
                                {t('home.directConnectionText')}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* 🚚 Блок "Локальная доставка" */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                height: '100%',
                                borderRadius: 3,
                                textAlign: 'center',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: '3rem',
                                    mb: 2,
                                    color: 'primary.main',
                                }}
                            >
                                🚚
                            </Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {t('home.localDelivery')}
                            </Typography>
                            <Typography color="text.secondary">
                                {t('home.localDeliveryText')}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* 💬 Призыв к действию */}
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    py: 8,
                    color: 'white',
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                        {t('home.readyToStart')}
                    </Typography>
                    <Typography textAlign="center" sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}>
                        {t('home.readyToStartText')}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;