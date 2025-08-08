import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { selectCartItems, selectTotalPrice, clearCart, toggleCart } from '../../cart/model/cartSlice';
import type { DeliveryAddress } from '../model/types';
import { PaymentMethod } from '../../../entities/order/model/types';
import { apiClient } from '../../../shared/api/api';
import CardPayment from './CardPayment';
import { CreditCardLogo, PayPalLogo } from '../../../shared/ui/PaymentLogos';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// Берем пользователя из доменной сущности user (единый источник истины для UI)

// 0 - корзина, 1 - доставка, 2 - оплата, 3 - подтверждение
const steps = [0, 1, 2, 3] as const;

export const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectTotalPrice);
  const entityUser = useAppSelector((state) => state.user.user);
  const authUser = useAppSelector((state) => state.auth.user);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const stepLabels = useMemo(
    () => [t('cart.title'), t('delivery_address'), t('payment_method'), t('order_confirmed')],
    [t]
  );

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const isCartEmpty = useMemo(() => items.length === 0, [items.length]);

  const handleNext = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const handleDeliveryChange = (field: keyof DeliveryAddress, value: string) => {
    setDeliveryAddress((prev) => ({ ...prev, [field]: value }));
  };

  const placeOrder = async () => {
    setLoading(true);
    setError('');
    try {
      // Валидация
      if (!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address || !deliveryAddress.city || !deliveryAddress.zipCode) {
        setError(t('common.error'));
        return;
      }
      if (isCartEmpty || total <= 0) {
        setError(t('cart.empty'));
        return;
      }
      // Подготовка полезной нагрузки
      const payload = {
        userId: entityUser?.id ?? authUser?.id ?? 0,
        items: items.map((it) => ({ productId: it.product.id, quantity: it.quantity })),
        deliveryAddress,
        paymentMethod,
        paymentId: null,
        totalAmount: total,
        currency: 'ILS',
      };

      await apiClient.orders.create(payload as any);

      // Очистка корзины
      dispatch(clearCart());

      // Показать подтверждение и тост
      setActiveStep(3);
      setSnackbar({ open: true, message: paymentMethod === PaymentMethod.CASH ? t('order_placed_success') || 'Заказ успешно размещен' : t('order_paid_success') || 'Заказ успешно оплачен', severity: 'success' });

    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    setSnackbar((s) => ({ ...s, open: false }));
    dispatch(toggleCart());
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {t('cart.title')}
            </Typography>
            {items.map((ci) => (
              <Card key={ci.product.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="subtitle1">{ci.product.title?.ru || ci.product.title?.en}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₪{ci.product.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">x{ci.quantity}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">{t('cart.total')}:</Typography>
              <Typography variant="h6" color="primary">₪{total.toFixed(2)}</Typography>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              🚚 {t('delivery_address') || 'Адрес доставки'}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label={t('deliveryForm.name')} value={deliveryAddress.name} onChange={(e) => handleDeliveryChange('name', e.target.value)} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label={t('deliveryForm.phone')} value={deliveryAddress.phone} onChange={(e) => handleDeliveryChange('phone', e.target.value)} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label={t('deliveryForm.address')} value={deliveryAddress.address} onChange={(e) => handleDeliveryChange('address', e.target.value)} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label={t('deliveryForm.city')} value={deliveryAddress.city} onChange={(e) => handleDeliveryChange('city', e.target.value)} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label={t('deliveryForm.zip')} value={deliveryAddress.zipCode} onChange={(e) => handleDeliveryChange('zipCode', e.target.value)} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label={t('deliveryForm.notes')} value={deliveryAddress.notes} onChange={(e) => handleDeliveryChange('notes', e.target.value)} multiline rows={3} />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              💳 {t('payment_method')}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant={paymentMethod === PaymentMethod.CASH ? 'contained' : 'outlined'} onClick={() => setPaymentMethod(PaymentMethod.CASH)} sx={{ mr: 1, minHeight: 40, px: 2 }}>
                  {t('cash_on_delivery')}
                </Button>
                <Button
                  variant={paymentMethod === PaymentMethod.CARD ? 'contained' : 'outlined'}
                  onClick={() => setPaymentMethod(PaymentMethod.CARD)}
                  sx={{ mr: 1, minHeight: 40, px: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Box sx={{ width: '100%' }}>
                    <CreditCardLogo />
                  </Box>
                </Button>
                <Button
                  variant={paymentMethod === PaymentMethod.PAYPAL ? 'contained' : 'outlined'}
                  onClick={() => setPaymentMethod(PaymentMethod.PAYPAL)}
                  sx={{ minHeight: 40, px: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Box sx={{ width: '100%' }}>
                    <PayPalLogo />
                  </Box>
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                📋 {t('order_summary')}
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body2" gutterBottom>
                    {t('delivery_address')}: {deliveryAddress.address}, {deliveryAddress.city}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {t('payment_method')}: {
                      paymentMethod === PaymentMethod.CASH ? t('cash_on_delivery') :
                      paymentMethod === PaymentMethod.CARD ? t('credit_card') : t('paypal')
                    }
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6" color="primary">
                    {t('cart.total')}: ₪{total.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            {paymentMethod === PaymentMethod.CARD && (
              <Box sx={{ mt: 3 }}>
                <CardPayment
                  amount={total}
                  onSuccess={() => {
                    // При успешной оплате сразу создаём заказ
                    placeOrder();
                  }}
                />
              </Box>
            )}
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" gutterBottom>
              ✅ {t('order_confirmed') || 'Заказ подтверждён'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t('order_confirmed_message') || 'Спасибо за заказ!'}
            </Typography>
            <Button variant="contained" onClick={() => dispatch(toggleCart())}>
              {t('common.close')}
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  if (isCartEmpty && activeStep === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">{t('cart.empty')}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => dispatch(toggleCart())}>
          {t('common.back')}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        🛒 {t('checkout') || 'Оформление заказа'}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
        {stepLabels.map((label, idx) => (
          <Step key={idx}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>{renderStepContent(activeStep)}</Paper>

      {activeStep < steps.length - 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={activeStep === 0} onClick={handleBack} startIcon={<ArrowBack />}
          >
            {t('common.back')}
          </Button>
          {activeStep === 2 ? (
            <Button variant="contained" onClick={placeOrder} disabled={loading || paymentMethod !== PaymentMethod.CASH} endIcon={<ArrowForward />}>
              {loading ? t('common.loading') : t('place_order')}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext} endIcon={<ArrowForward />}>
              {t('common.next')}
            </Button>
          )}
        </Box>
      )}
      <Snackbar open={snackbar.open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}
          action={
            <Button color="inherit" size="small" onClick={handleFinish}>
              Finish
            </Button>
          }
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default CheckoutPage;


