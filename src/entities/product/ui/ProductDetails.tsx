import { useState } from 'react';
import {
    Dialog, DialogContent, Typography, Box, Button, IconButton,
    Divider, Tabs, Tab
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../features/cart/model/useCart';
import type { Product } from '../../../types/index';

interface ProductDetailsProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}

export const ProductDetails = ({ product, open, onClose }: ProductDetailsProps) => {
    const { t } = useTranslation();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState(0);

    // Обработчики кнопок
    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity);
            onClose();
        }
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    // Если нет продукта, не отображаем диалог
    if (!product) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 2,
                    overflow: 'hidden',
                }
            }}
        >
            {/* Кнопка закрытия */}
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'rgba(0, 0, 0, 0.7)',
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 1,
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ p: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* Изображение продукта */}
                    <Box
                        sx={{
                            flex: '0 0 50%',
                            height: { xs: '300px', md: 'auto' },
                            position: 'relative'
                        }}
                    >
                        <img
                            src={product.imageUrl || '/placeholder-product.jpg'}
                            alt={product.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />

                        {product.isOrganic && (
                            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {t('product.organic')}
                            </div>
                        )}
                    </Box>

                    {/* Информация о продукте */}
                    <Box sx={{ flex: '1', p: 3, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                            {product.title}
                        </Typography>

                        {/* Информация о ферме */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography variant="body1">
                                {t('product.by')} {product.farm.name} • {product.farm.city}
                            </Typography>
                        </Box>

                        {/* Табы с информацией */}
                        <Box sx={{ width: '100%', mb: 3 }}>
                            <Tabs
                                value={activeTab}
                                onChange={(_, newValue) => setActiveTab(newValue)}
                                variant="fullWidth"
                            >
                                <Tab label={t('product.tabs.description')} />
                                <Tab label={t('product.tabs.details')} />
                                <Tab label={t('product.tabs.reviews')} />
                            </Tabs>

                            {/* Контент табов */}
                            <Box sx={{ p: 2, minHeight: '150px' }}>
                                {activeTab === 0 && (
                                    <Typography variant="body1">
                                        {product.description || t('product.noDescription')}
                                    </Typography>
                                )}

                                {activeTab === 1 && (
                                    <Box>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>{t('product.category')}:</strong> {product.category}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <strong>{t('product.available')}:</strong> {product.amount} {product.units}
                                        </Typography>
                                    </Box>
                                )}

                                {activeTab === 2 && (
                                    <Typography variant="body1">
                                        {t('product.noReviews')}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Цена и добавление в корзину */}
                        <Box sx={{ mt: 'auto' }}>
                            <Typography variant="h4" color="primary" fontWeight="bold">
                                ₪{product.price.toFixed(2)}
                                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                    {t('product.per')} {product.units}
                                </Typography>
                            </Typography>

                            {/* Выбор количества */}
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                                <Typography variant="body1" sx={{ mr: 2 }}>
                                    {t('product.quantity')}:
                                </Typography>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>

                                <Typography sx={{ mx: 2 }} variant="body1">
                                    {quantity}
                                </Typography>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                            </Box>

                            {/* Итоговая сумма */}
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
                                {t('product.total')}: ₪{(product.price * quantity).toFixed(2)}
                            </Typography>

                            {/* Кнопка добавления в корзину */}
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={handleAddToCart}
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    bgGradient: 'linear-gradient(45deg, #4b9b4b 30%, #7dcb7d 90%)',
                                }}
                            >
                                {t('product.addToCart')}
                            </Button>

                            {/* Связь с фермером */}
                            <Button
                                variant="outlined"
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 1,
                                    borderRadius: 2,
                                }}
                            >
                                {t('product.contactFarmer')}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetails;