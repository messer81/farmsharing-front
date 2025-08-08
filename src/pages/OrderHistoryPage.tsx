import { useEffect, useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/store/store';
import { apiClient } from '../shared/api/api';
import type { Order } from '../entities/order/model/types';

const OrderHistoryPage = () => {
  const { t } = useTranslation();
  const entityUser = useAppSelector((state) => state.user.user);
  const authUser = useAppSelector((state) => state.auth.user);
  const userId = entityUser?.id ?? authUser?.id;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useMemo(() => userId !== undefined && userId !== null, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || userId == null) return;
      try {
        setLoading(true);
        setError(null);
        const res = await apiClient.orders.getByUser(userId as number);
        setOrders(res.data || []);
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, userId]);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">{t('header.login')} — {t('header.orderHistory')}</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress size={48} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        📜 {t('header.orderHistory')}
      </Typography>

      {orders.length === 0 ? (
        <Alert severity="info">{t('orders.empty') || 'Заказы отсутствуют'}</Alert>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('orders.id') || '№'}</TableCell>
                <TableCell>{t('orders.date') || 'Дата'}</TableCell>
                <TableCell>{t('orders.status') || 'Статус'}</TableCell>
                <TableCell>{t('orders.payment') || 'Оплата'}</TableCell>
                <TableCell>{t('orders.items') || 'Продукты'}</TableCell>
                <TableCell align="right">{t('orders.total') || 'Сумма'}</TableCell>
                <TableCell>{t('orders.currency') || 'Валюта'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip size="small" label={order.status} />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={order.paymentMethod} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {order.items.map((it) => (
                        <Typography variant="body2" key={it.product.id}>
                          {((it.product.title as any)?.ru || (it.product.title as any)?.en) ?? it.product.id} × {it.quantity}
                        </Typography>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="right">₪{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default OrderHistoryPage;


