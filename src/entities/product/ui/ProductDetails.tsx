// 🛍️ Модальное окно детального просмотра продукта
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  Box, 
  Button, 
  TextField,
  Divider
} from '@mui/material';
import { 
  AccountCircle,
  LocationOn, 
  Star 
} from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../features/cart/model/useCart';
import { useLocalizedData } from '../../../shared/lib/useLocalizedData';
import { getImageUrl, handleImageError } from '../../../utils/imageUtils';
import type { Product } from '../../../types/api';

interface ProductDetailsProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export const ProductDetails = ({ product, open, onClose }: ProductDetailsProps) => {
  const { t } = useTranslation();
  const { getProductTitle, getProductDescription, getFarmName, getProductUnit } = useLocalizedData();
  const cart = useCart();
  
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  }, [product?.stock]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      cart.addItem(product, quantity);
      onClose();
      setQuantity(1); // Сбрасываем количество
    }
  }, [product, quantity, cart, onClose]);

  const handleContactFarmer = useCallback(() => {
    // TODO: Реализовать контакт с фермером
    console.log('Contact farmer:', product?.id);
  }, [product?.id]);

  const handleClose = useCallback(() => {
    setQuantity(1); // Сбрасываем количество при закрытии
    onClose();
  }, [onClose]);

  if (!product) return null;

  const isOutOfStock = product.stock === 0;
  const totalPrice = product.price * quantity;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: '#f7f7f7', // светло-серый фон
          boxShadow: 8,
          width: { xs: '99vw', sm: 680 },
          maxWidth: 680,
          minHeight: 520,
          maxHeight: '90vh',
          p: { xs: 1, sm: 4 },
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0,0,0,0.6)' },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ width: '100%' }}>
          {/* Название */}
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              color: '#2C2521', 
              fontSize: 18, 
              fontFamily: 'ui-sans-serif, system-ui, sans-serif', 
              mb: 1 
            }}
          >
            {getProductTitle(product)}
          </Typography>
          
          {/* Контент: картинка + инфо */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              alignItems: { xs: 'center', sm: 'flex-start' },
              px: { xs: 1, sm: 3 },
              pb: 3,
            }}
          >
            {/* Картинка */}
            <Box sx={{ flex: '0 0 260px', mb: { xs: 2, sm: 0 } }}>
              <Box
                sx={{
                  width: 260,
                  height: 220,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 2,
                  position: 'relative',
                }}
              >
                <img
                  src={getImageUrl(product.imageUrl || '')}
                  alt={getProductTitle(product)}
                  onError={handleImageError}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 16,
                    filter: isOutOfStock ? 'grayscale(30%)' : 'none',
                  }}
                />
                {product.isOrganic && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      bgcolor: 'success.main',
                      color: '#fff',
                      px: 1.2,
                      py: 0.5,
                      borderRadius: 1.5,
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: 'Inter, Arial, sans-serif',
                    }}
                  >
                    Organic
                  </Box>
                )}
              </Box>
            </Box>
            
            {/* Информация */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Фермер, регион, рейтинг */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountCircle sx={{ color: '#888', fontSize: 22, mr: 0.5 }} />
                  <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#222' }}>
                    {getFarmName(product)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ color: '#888', fontSize: 20, mr: 0.5 }} />
                  <Typography sx={{ color: '#888', fontSize: 15 }}>
                    Galil, Israel
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <Star sx={{ color: '#FFD600', fontSize: 20, mr: 0.5 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#222' }}>
                    4.9
                  </Typography>
                  <Typography sx={{ color: '#888', fontSize: 15, ml: 0.5 }}>
                    (24 {t('product.reviews')})
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 1.5 }} />
              
              {/* Описание */}
              <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 0.5, color: '#222', fontFamily: 'Inter, Arial, sans-serif' }}>
                {t('product.description')}
              </Typography>
              <Typography variant="body2" color="#444" mb={2} sx={{ fontSize: 15, fontFamily: 'Inter, Arial, sans-serif' }}>
                {getProductDescription(product)}
              </Typography>
              
              {/* Цена */}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 32,
                  color: '#3cb46e',
                  mb: 1,
                  fontFamily: 'Inter, Arial, sans-serif',
                }}
              >
                ₪{product.price.toFixed(2)}{' '}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 400,
                    color: '#888',
                    fontSize: 20,
                    ml: 1,
                    fontFamily: 'Inter, Arial, sans-serif',
                  }}
                >
                  {t('product.per')} {getProductUnit(product)}
                </Typography>
              </Typography>
              
              {/* Quantity */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 17, mr: 1, color: '#222', fontFamily: 'Inter, Arial, sans-serif' }}>
                  {t('product.quantity')}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 36, px: 0, fontWeight: 700, fontSize: 20, borderRadius: 2, borderColor: '#bbb', color: '#222' }}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  –
                </Button>
                <TextField
                  value={quantity}
                  size="small"
                  sx={{ width: 48, mx: 1, '& .MuiInputBase-input': { textAlign: 'center', fontWeight: 700, fontSize: 18, fontFamily: 'Inter, Arial, sans-serif' } }}
                  inputProps={{ style: { textAlign: 'center' }, readOnly: true }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 36, px: 0, fontWeight: 700, fontSize: 20, borderRadius: 2, borderColor: '#bbb', color: '#222' }}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= (product.stock || 1)}
                >
                  +
                </Button>
              </Box>
              
              {/* Итоговая цена */}
              <Typography sx={{ color: '#888', mb: 2, fontSize: 16, fontFamily: 'Inter, Arial, sans-serif' }}>
                {t('product.total')}: <b style={{ color: '#3cb46e', fontWeight: 700 }}>₪{totalPrice.toFixed(2)}</b>
              </Typography>
              
              {/* Кнопки */}
              <Button
                variant="contained"
                color="success"
                fullWidth
                disabled={isOutOfStock}
                sx={{
                  mb: 1,
                  py: 1.2,
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 2.5,
                  background: 'linear-gradient(90deg, #6fdc8c 0%, #3cb46e 100%)',
                  boxShadow: '0 2px 8px rgba(60,180,110,0.10)',
                  textTransform: 'none',
                  letterSpacing: 0.2,
                  fontFamily: 'Inter, Arial, sans-serif',
                  '&:disabled': {
                    background: '#ccc',
                  }
                }}
                startIcon={<span style={{ display: 'flex', alignItems: 'center', fontSize: 22, marginRight: 4 }}>🛒</span>}
                onClick={handleAddToCart}
              >
                {isOutOfStock ? t('product.outOfStock') : t('product.addToCart')}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleContactFarmer}
                sx={{
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: 18,
                  borderRadius: 2.5,
                  borderColor: '#ddd',
                  color: '#222',
                  background: '#fff',
                  textTransform: 'none',
                  fontFamily: 'Inter, Arial, sans-serif',
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