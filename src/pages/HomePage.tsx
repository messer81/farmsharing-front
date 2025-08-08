// 🏠 Адаптивная главная страница
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '../widgets/hero/ui/HeroSection';
import { FeaturedProducts } from '../entities/product/ui/FeaturedProducts';
import { FarmProfiles } from '../entities/farm/ui/FarmProfiles';
import { FarmMap } from '../widgets/map/ui/FarmMap';
import { useCart } from '../features/cart/model/useCart';
import type { Product } from '../types/api';

export const HomePage = () => {
    const { t } = useTranslation();
    const cart = useCart();

    const handleAddToCart = (product: Product) => {
        cart.addItem(product, 1);
    };

    return (
        <Box>
            {/* 🌟 Героический баннер */}
            <HeroSection />

            {/* 🛍️ Рекомендуемые продукты */}
            <FeaturedProducts onAddToCart={handleAddToCart} />

            {/* 👨‍🌾 Профили фермеров */}
            <FarmProfiles />

            {/* 🗺️ Карта ферм */}
            <FarmMap />

            {/* 🌿 Преимущества */}
            <Container maxWidth={false} sx={{ py: { xs: 'var(--space-16)', sm: 'var(--space-24)', md: 'var(--space-32)' }, width: '100%' }}>
                <Typography
                    variant="h3"
                    textAlign="center"
                    sx={{
                        mb: { xs: 'var(--space-16)', sm: 'var(--space-24)', md: 'var(--space-32)' },
                        fontWeight: 'var(--font-weight-bold)',
                        fontSize: { xs: 'var(--font-size-2xl)', sm: 'var(--font-size-3xl)', md: 'var(--font-size-4xl)' },
                        background: 'var(--gradient-primary)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 'var(--line-height-tight)',
                    }}
                >
                    {t('home.whyUs')}
                </Typography>

                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {/* 🥦 Блок "Свежие продукты" */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 'var(--space-16)', sm: 'var(--space-20)', md: 'var(--space-24)' },
                                height: '100%',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all var(--duration-normal) var(--ease-standard)',
                                background: 'var(--gradient-card)',
                                border: '1px solid var(--color-card-border)',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 'var(--shadow-card-hover)',
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                    mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' },
                                    color: 'var(--color-primary)',
                                }}
                            >
                                🥦
                            </Box>
                            <Typography 
                                variant="h5" 
                                sx={{
                                    fontWeight: 'var(--font-weight-semibold)',
                                    mb: 'var(--space-8)',
                                    color: 'var(--color-text)',
                                    fontSize: { xs: 'var(--font-size-lg)', sm: 'var(--font-size-xl)' },
                                }}
                            >
                                {t('home.freshProducts')}
                            </Typography>
                            <Typography 
                                sx={{
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 'var(--line-height-normal)',
                                    fontSize: { xs: 'var(--font-size-sm)', sm: 'var(--font-size-base)' },
                                }}
                            >
                                {t('home.freshProductsText')}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* 👨‍🌾 Блок "Прямая связь с фермерами" */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 'var(--space-16)', sm: 'var(--space-20)', md: 'var(--space-24)' },
                                height: '100%',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all var(--duration-normal) var(--ease-standard)',
                                background: 'var(--gradient-card)',
                                border: '1px solid var(--color-card-border)',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 'var(--shadow-card-hover)',
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                    mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' },
                                    color: 'var(--color-primary)',
                                }}
                            >
                                👨‍🌾
                            </Box>
                            <Typography 
                                variant="h5" 
                                sx={{
                                    fontWeight: 'var(--font-weight-semibold)',
                                    mb: 'var(--space-8)',
                                    color: 'var(--color-text)',
                                    fontSize: { xs: 'var(--font-size-lg)', sm: 'var(--font-size-xl)' },
                                }}
                            >
                                {t('home.directConnection')}
                            </Typography>
                            <Typography 
                                sx={{
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 'var(--line-height-normal)',
                                    fontSize: { xs: 'var(--font-size-sm)', sm: 'var(--font-size-base)' },
                                }}
                            >
                                {t('home.directConnectionText')}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* 🚚 Блок "Локальная доставка" */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 'var(--space-16)', sm: 'var(--space-20)', md: 'var(--space-24)' },
                                height: '100%',
                                borderRadius: 'var(--radius-lg)',
                                textAlign: 'center',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all var(--duration-normal) var(--ease-standard)',
                                background: 'var(--gradient-card)',
                                border: '1px solid var(--color-card-border)',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 'var(--shadow-card-hover)',
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                    mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' },
                                    color: 'var(--color-primary)',
                                }}
                            >
                                🚚
                            </Box>
                            <Typography 
                                variant="h5" 
                                sx={{
                                    fontWeight: 'var(--font-weight-semibold)',
                                    mb: 'var(--space-8)',
                                    color: 'var(--color-text)',
                                    fontSize: { xs: 'var(--font-size-lg)', sm: 'var(--font-size-xl)' },
                                }}
                            >
                                {t('home.localDelivery')}
                            </Typography>
                            <Typography 
                                sx={{
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 'var(--line-height-normal)',
                                    fontSize: { xs: 'var(--font-size-sm)', sm: 'var(--font-size-base)' },
                                }}
                            >
                                {t('home.localDeliveryText')}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* 💬 Призыв к действию */}
            <Box
                sx={{
                    bgcolor: 'var(--color-primary)',
                    py: { xs: 'var(--space-24)', sm: 'var(--space-32)', md: 'var(--space-40)' },
                    color: 'var(--color-white)',
                    mt: { xs: 'var(--space-24)', sm: 'var(--space-32)' },
                }}
            >
                <Container maxWidth={false} sx={{ width: '100%' }}>
                    <Typography 
                        variant="h4" 
                        textAlign="center" 
                        sx={{
                            fontWeight: 'var(--font-weight-bold)',
                            mb: 'var(--space-12)',
                            fontSize: { xs: 'var(--font-size-xl)', sm: 'var(--font-size-2xl)', md: 'var(--font-size-3xl)' },
                            lineHeight: 'var(--line-height-tight)',
                        }}
                    >
                        {t('home.readyToStart')}
                    </Typography>
                    <Typography 
                        textAlign="center" 
                        sx={{ 
                            maxWidth: { xs: '100%', sm: '600px', md: '700px' }, 
                            mx: 'auto', 
                            mb: 'var(--space-16)',
                            fontSize: { xs: 'var(--font-size-base)', sm: 'var(--font-size-lg)' },
                            lineHeight: 'var(--line-height-normal)',
                            opacity: 0.95,
                        }}
                    >
                        {t('home.readyToStartText')}
                    </Typography>
                </Container>
            </Box>

            {/* 🦶 Футер */}
            {/* The Footer component is now global, so it's removed from here. */}
        </Box>
    );
};

export default HomePage;