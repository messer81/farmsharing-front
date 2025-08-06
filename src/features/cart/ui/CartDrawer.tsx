// 📦 Выдвижная панель корзины с товарами и итоговой суммой
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { 
  toggleCart, 
  updateQuantity, 
  removeFromCart, 
  setShowCheckout, 
  setAuthOpen,
  selectCartItems,
  selectCartIsOpen,
  selectShowCheckout,
  // selectAuthOpen,
  selectTotalPrice
} from '../model/cartSlice';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../../utils/imageUtils';
import { useLocalizedData } from '../../../shared/lib/useLocalizedData';

const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const isOpen = useAppSelector(selectCartIsOpen);
  const showCheckout = useAppSelector(selectShowCheckout);
  // const authOpen = useAppSelector(selectAuthOpen);
  const total = useAppSelector(selectTotalPrice);

  const { t } = useTranslation();
  const { getProductTitle } = useLocalizedData();

  const handleClose = () => {
    dispatch(toggleCart());
    dispatch(setShowCheckout(false));
  };

  // Открыть оформление заказа или авторизацию
  const handleCheckout = () => {
    // TODO: Добавить проверку пользователя
    // if (!user) {
    //   dispatch(setAuthOpen(true)); // Открыть окно авторизации, если не залогинен
    // } else {
    //   dispatch(setShowCheckout(true)); // Открыть оформление заказа
    // }
    dispatch(setShowCheckout(true)); // Временно открываем оформление заказа
  };

  // Закрыть оформление заказа и авторизацию
  const handleCloseCheckout = () => {
    dispatch(setShowCheckout(false));
    dispatch(setAuthOpen(false));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      {/* TODO: Добавить AuthFrame компонент */}
      {/* <AuthFrame
        open={authOpen}
        onClose={() => dispatch(setAuthOpen(false))}
        onSuccess={() => {
          dispatch(setAuthOpen(false));
          dispatch(setShowCheckout(true)); // После логина сразу открываем оформление заказа
        }}
      /> */}
      <Box sx={{ width: showCheckout ? '100%' : 400, height: '100%' }}>
        {showCheckout ? (
          // TODO: Добавить CheckoutPage компонент
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Оформление заказа</Typography>
            <Button onClick={handleCloseCheckout}>Назад к корзине</Button>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            {/* 🛒 Заголовок */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">🛒 {t('cart.title')}</Typography>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* 📦 Товары в корзине */}
            {items.length === 0 ? (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                🛒 {t('cart.empty')}
              </Typography>
            ) : (
              <>
                <List>
                  {items.map((item) => {
                    const product = item.product;
                    const quantity = item.quantity;
                    
                    return (
                      <ListItem key={product.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar 
                            src={getImageUrl(product.imageUrl || '')} 
                            alt={getProductTitle(product)} 
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={getProductTitle(product)}
                          secondary={`₪${product.price} / ${product.unit?.ru || 'кг'}`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleQuantityChange(product.id, quantity - 1)}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            size="small"
                            type="number"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                            sx={{ width: 60 }}
                          />
                          <IconButton 
                            size="small" 
                            onClick={() => handleQuantityChange(product.id, quantity + 1)}
                          >
                            <Add />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => dispatch(removeFromCart(product.id))}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* 💰 Итого */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{t('cart.total')}:</Typography>
                  <Typography variant="h6" color="primary">₪{total.toFixed(2)}</Typography>
                </Box>

                {/* 🚚 Кнопка заказа */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleCheckout}
                  sx={{ backgroundColor: '#4CAF50' }}
                >
                  📦 {t('cart.checkout')}
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;