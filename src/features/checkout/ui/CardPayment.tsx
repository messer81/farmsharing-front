import { useEffect, useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { apiClient } from '../../../shared/api/api';

interface InnerProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentId: string) => void;
}

const CardPaymentForm = ({ amount, currency = 'ils', onSuccess }: InnerProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const res = await apiClient.payments.createPaymentIntent(amount, currency);
        setClientSecret(res.clientSecret);
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || 'Failed to create payment');
      }
    })();
  }, [amount, currency]);

  const handlePay = async () => {
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);
    setError(null);
    try {
      const card = elements.getElement(CardElement);
      if (!card) throw new Error('Card element not found');

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
        return;
      }
      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        onSuccess(result.paymentIntent.id);
      } else {
        setError('Payment not completed');
      }
    } catch (e: any) {
      setError(e?.message || 'Payment error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 1, mb: 2 }}>
        <CardElement options={{ hidePostalCode: true }} />
      </Box>
      <Button variant="contained" onClick={handlePay} disabled={!stripe || loading}>
        {loading ? <CircularProgress size={20} /> : 'Pay'}
      </Button>
    </Box>
  );
};

export const CardPayment = ({ amount, currency = 'ils', onSuccess }: InnerProps) => {
  const stripePromise = useMemo(() => {
    const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;
    return loadStripe(pk);
  }, []);

  return (
    <Elements stripe={stripePromise} options={{}}>
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>Stripe Test Card: 4242 4242 4242 4242</Typography>
        <CardPaymentForm amount={amount} currency={currency} onSuccess={onSuccess} />
      </Box>
    </Elements>
  );
};

export default CardPayment;


