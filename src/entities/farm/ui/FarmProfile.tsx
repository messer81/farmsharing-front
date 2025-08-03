// src/entities/farm/ui/FarmProfile.tsx
                     import { useEffect, useState } from 'react';
                     import { Container, Box, Typography, Avatar, Paper, Rating, Button, Tabs, Tab } from '@mui/material';
                     import Grid from '@mui/material/Grid';
                     import LocationOnIcon from '@mui/icons-material/LocationOn';
                     import EmailIcon from '@mui/icons-material/Email';
                     import PhoneIcon from '@mui/icons-material/Phone';
                     import VerifiedIcon from '@mui/icons-material/Verified';
                     import { useTranslation } from 'react-i18next';
                     import { ProductCard } from '../../product/ui/ProductCard';
                     import type { Farm, Product } from '../../../types';
                     import { mockProducts } from '../../../shared/api/mockProducts';

                     interface FarmProfileProps {
                         farm: Farm;
                     }

                     export const FarmProfile = ({ farm }: FarmProfileProps) => {
                         const { t } = useTranslation();
                         const [activeTab, setActiveTab] = useState(0);
                         const [farmProducts, setFarmProducts] = useState<Product[]>([]);

                         useEffect(() => {
                             const productsOfCurrentFarm = mockProducts.filter(
                                 (product) => product.farm.id === farm.id
                             );
                             setFarmProducts(productsOfCurrentFarm);
                         }, [farm.id]);

                         return (
                             <Container maxWidth={false} sx={{ py: 4, width: '100%' }}>
                                 <Paper
                                     elevation={0}
                                     sx={{
                                         p: 3,
                                         borderRadius: 3,
                                         mb: 4,
                                         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                                         backgroundImage: 'linear-gradient (to right, rgba(75,155,75,0.05), rgba(75,155,75,0.15))',
                                     }}
                                 >
                                     <Grid container spacing={3} alignItems="center">
                                         {/* ИСПРАВЛЕНО: Удалено свойство 'item' */}
                                         <Grid xs={12} md={3}>
                                             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                 <Avatar
                                                     sx={{
                                                         width: 120,
                                                         height: 120,
                                                         mb: 2,
                                                         border: '4px solid white',
                                                         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                     }}
                                                     alt={farm.name}
                                                     src={farm.imageUrl || '/placeholder-farm.jpg'}
                                                 />
                                                 <Typography variant="h5" fontWeight="bold" gutterBottom>
                                                     {farm.name}
                                                 </Typography>
                                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                     <Rating value={farm.rating} precision={0.1} readOnly />
                                                     <Typography variant="body2" sx={{ ml: 1 }}>
                                                         ({farm.rating})
                                                     </Typography>

                                                     {farm.isVerified && (
                                                         <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: 'primary.main' }}>
                                                             <VerifiedIcon fontSize="small" sx={{ mr: 0.5 }} />
                                                             <Typography variant="body2">
                                                                 {t('farm.verified')}
                                                             </Typography>
                                                         </Box>
                                                     )}
                                                 </Box>
                                             </Box>
                                         </Grid>

                                         {/* ИСПРАВЛЕНО: Удалено свойство 'item' */}
                                         <Grid xs={12} md={9}>
                                             <Typography variant="body1" paragraph>
                                                 {farm.description || t('farm.noDescription')}
                                             </Typography>

                                             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                 <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                                                 <Typography variant="body1">
                                                     {farm.location || farm.city}
                                                 </Typography>
                                             </Box>

                                             {farm.email && (
                                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                     <EmailIcon color="primary" sx={{ mr: 1 }} />
                                                     <Typography variant="body1">
                                                         {farm.email}
                                                     </Typography>
                                                 </Box>
                                             )}

                                             {farm.phone && (
                                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                     <PhoneIcon color="primary" sx={{ mr: 1 }} />
                                                     <Typography variant="body1">
                                                         {farm.phone}
                                                     </Typography>
                                                 </Box>
                                             )}

                                             <Button
                                                 variant="contained"
                                                 color="primary"
                                                 sx={{ borderRadius: 2, mt: 1 }}
                                             >
                                                 {t('farm.contact')}
                                             </Button>
                                         </Grid>
                                     </Grid>
                                 </Paper>

                                 <Box sx={{ mb: 3 }}>
                                     <Tabs
                                         value={activeTab}
                                         onChange={(_, newValue) => setActiveTab(newValue)}
                                         variant="scrollable"
                                         scrollButtons="auto"
                                         allowScrollButtonsMobile
                                     >
                                         <Tab label={t('farm.tabs.mockProducts')} />
                                         <Tab label={t('farm.tabs.about')} />
                                         <Tab label={t('farm.tabs.reviews')} />
                                     </Tabs>
                                 </Box>

                                 <Box>
                                     {activeTab === 0 && (
                                         <>
                                             <Typography variant="h5" sx={{ mb: 3 }}>
                                                 {t('farm.mockProducts')}
                                             </Typography>

                                             {farmProducts.length > 0 ? (
                                                 <Grid container spacing={3}>
                                                     {farmProducts.map((product) => (
                                                         // ИСПРАВЛЕНО: Удалено свойство 'item'
                                                         <Grid xs={12} sm={6} md={4} lg={3} key={product.id}>
                                                             <ProductCard product={product} />
                                                         </Grid>
                                                     ))}
                                                 </Grid>
                                             ) : (
                                                 <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                                                     {t('farm.noProducts')}
                                                 </Typography>
                                             )}
                                         </>
                                     )}

                                     {activeTab === 1 && (
                                         <Box sx={{ p: 2 }}>
                                             <Typography variant="h5" sx={{ mb: 3 }}>
                                                 {t('farm.aboutUs')}
                                             </Typography>

                                             <Typography paragraph>
                                                 {farm.description || t('farm.noDescription')}
                                             </Typography>
                                         </Box>
                                     )}

                                     {activeTab === 2 && (
                                         <Box sx={{ p: 2 }}>
                                             <Typography variant="h5" sx={{ mb: 3 }}>
                                                 {t('farm.reviews')}
                                             </Typography>

                                             <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                                                 {t('farm.noReviews')}
                                             </Typography>
                                         </Box>
                                     )}
                                 </Box>
                             </Container>
                         );
                     };

                     export default FarmProfile;