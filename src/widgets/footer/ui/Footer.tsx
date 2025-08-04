// 🦶 Футер для главной страницы
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                bgcolor: 'var(--color-gray-800)',
                color: 'var(--color-white)',
                py: { xs: 'var(--space-24)', sm: 'var(--space-32)', md: 'var(--space-40)' },
                mt: { xs: 'var(--space-24)', sm: 'var(--space-32)' },
            }}
        >
            <Container maxWidth={false} sx={{ width: '100%' }}>
                <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
                    {/* 🏪 FarmMarket - Логотип и описание */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ mb: { xs: 'var(--space-16)', sm: 'var(--space-20)' } }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 'var(--font-weight-bold)',
                                    mb: 'var(--space-8)',
                                    color: 'var(--color-primary)',
                                }}
                            >
                                FarmMarket
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    lineHeight: 'var(--line-height-normal)',
                                    mb: 'var(--space-12)',
                                }}
                            >
                                Connecting local farmers with consumers for fresh, sustainable produce. 
                                Supporting local agriculture and community development.
                            </Typography>
                        </Box>
                        
                        {/* 🌐 Социальные сети */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                <Twitter />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* 🛒 For Shoppers */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'var(--font-weight-semibold)',
                                mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' },
                                color: 'var(--color-white)',
                            }}
                        >
                            For Shoppers
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                Browse Products
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                Find Local Farmers
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                Delivery Information
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                Customer Support
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                FAQ
                            </Link>
                        </Box>
                    </Grid>

                    {/* 👨‍🌾 For Farmers */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'var(--font-weight-semibold)',
                                mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' },
                                color: 'var(--color-white)',
                            }}
                        >
                            For Farmers
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                List Your Produce
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                Farmer Dashboard
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                Marketing Tools
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                Analytics & Reports
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: 'var(--color-gray-300)',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'var(--color-primary)',
                                    }
                                }}
                            >
                                Partner Resources
                            </Link>
                        </Box>
                    </Grid>

                    {/* 📞 Contact */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'var(--font-weight-semibold)',
                                mb: { xs: 'var(--space-12)', sm: 'var(--space-16)' },
                                color: 'var(--color-white)',
                            }}
                        >
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Email sx={{ color: 'var(--color-gray-300)', fontSize: '1rem' }} />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'var(--color-gray-300)',
                                    }}
                                >
                                    support@farmmarket.com
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Phone sx={{ color: 'var(--color-gray-300)', fontSize: '1rem' }} />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'var(--color-gray-300)',
                                    }}
                                >
                                    +1 (555) 123-4567
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOn sx={{ color: 'var(--color-gray-300)', fontSize: '1rem' }} />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'var(--color-gray-300)',
                                    }}
                                >
                                    123 Farm Street<br />
                                    Agricultural District<br />
                                    CA 90210
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* 📄 Копирайт */}
                <Box
                    sx={{
                        borderTop: '1px solid var(--color-gray-600)',
                        mt: { xs: 'var(--space-24)', sm: 'var(--space-32)' },
                        pt: { xs: 'var(--space-16)', sm: 'var(--space-20)' },
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'var(--color-gray-400)',
                        }}
                    >
                        © 2024 FarmMarket. All rights reserved. Supporting local farmers and sustainable agriculture.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}; 