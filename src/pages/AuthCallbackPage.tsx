// 🔐 Страница для обработки OAuth callback
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../app/store/store';
import { setToken } from '../features/auth/model/userSlice';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
// Профиль подтянется автоматически при первом рендере других экранов с useGetProfileQuery

export const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        console.error('Authentication failed:', error);
        navigate('/');
        return;
      }

      if (token) {
        // Сохраняем токен
        dispatch(setToken(token));
        
        // Перенаправляем на главную — профиль подтянется на целевом экране
        navigate('/');
      } else {
        navigate('/');
      }
    };

    handleCallback();
  }, [searchParams, dispatch, navigate]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2
      }}
    >
      <CircularProgress size={48} />
      <Typography variant="h6" color="text.secondary">
        Завершаем вход...
      </Typography>
    </Box>
  );
};