// 🔐 Страница для обработки OAuth callback
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../app/store/store';
import { setToken, getProfile } from '../features/auth/model/userSlice';
import { Box, CircularProgress, Typography } from '@mui/material';

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
        
        try {
          // Получаем данные профиля
          await dispatch(getProfile()).unwrap();
          
          // Перенаправляем на главную
          navigate('/');
        } catch (error) {
          console.error('Failed to get profile:', error);
          navigate('/');
        }
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