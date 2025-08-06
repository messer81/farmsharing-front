// 🔐 Компонент авторизации с вкладками (вход/регистрация/восстановление)
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Typography, 
  Dialog, 
  DialogContent,
  Divider,
  Alert,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleLogo from '../../../shared/ui/GoogleLogo';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { 
  loginUser, 
  registerUser, 
  forgotPassword, 
  clearUser, 
  clearError,
  loginAsGuest,
  selectUser,
  selectIsLoading,
  selectError,
  selectIsAuthenticated
} from '../model/userSlice';
import { clearCart } from '../../cart/model/cartSlice';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface AuthFrameProps {
  open?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  initialTab?: number;
}

const AuthFrame: React.FC<AuthFrameProps> = ({ 
  open, 
  onClose, 
  onSuccess, 
  initialTab = 0 
}) => {
  const [tab, setTab] = useState(initialTab);

  // Синхронизируем tab с initialTab при изменении
  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  // Локальное состояние форм
  const [loginEmail, setLoginEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redux состояние
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Очищаем ошибки при смене вкладки
  useEffect(() => {
    dispatch(clearError());
    setSuccess('');
  }, [tab, dispatch]);

  // Обработка успешной авторизации
  useEffect(() => {
    if (isAuthenticated && user && !user.isGuest) {
      onSuccess?.();
    }
  }, [isAuthenticated, user, onSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    setSuccess('');

    try {
      await dispatch(loginUser({ email: loginEmail, password: loginPassword })).unwrap();
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', loginEmail);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    } catch (error) {
      // Ошибка обрабатывается в extraReducers
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    setSuccess('');

    try {
      await dispatch(registerUser({ 
        name: regName, 
        email: regEmail, 
        password: regPassword,
        preferredLanguage: 'ru'
      })).unwrap();
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', regEmail);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    } catch (error) {
      // Ошибка обрабатывается в extraReducers
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    setSuccess('');
    
    try {
      const result = await dispatch(forgotPassword({ email: resetEmail })).unwrap();
      setSuccess(result);
      setResetEmail('');
    } catch (error) {
      // Ошибка обрабатывается в extraReducers
    }
  };

  const handleLogout = async () => {
    dispatch(clearUser());
    dispatch(clearCart()); // Очищаем корзину
  };

  const handleGuestLogin = () => {
    dispatch(loginAsGuest());
    onSuccess?.();
  };

  const content = (
    <Box sx={{ width: 450, p: 3 }}>
      <Tabs 
        value={tab} 
        onChange={(_, v) => setTab(v)} 
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            color: '#666',
            fontSize: '0.85rem',
            fontWeight: 500,
            textTransform: 'none',
            minHeight: 48,
            minWidth: 'auto',
            padding: '6px 12px',
            '&.Mui-selected': {
              color: '#4CAF50',
              fontWeight: 600
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#4CAF50',
            height: 3
          },
          '& .MuiTabs-scrollButtons': {
            color: '#666',
            '&.Mui-disabled': {
              opacity: 0.3
            }
          }
        }}
      >
        <Tab label={t('auth.login_short') || 'Вход'} />
        <Tab label={t('auth.register_short') || 'Регистрация'} />
        <Tab label={t('auth.forgot_password_short') || 'Забыли пароль?'} />
      </Tabs>

      {user && !user.isGuest ? (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="h6">{t('auth.hello') || 'Привет'}, {user.name}!</Typography>
          <Typography variant="body2" color="text.secondary">{user.email}</Typography>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleLogout}>
            {t('auth.logout') || 'Выйти'}
          </Button>
        </Box>
      ) : (
        <>
          {/* Google кнопка */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleLogo />}
              onClick={handleGoogleAuth}
              disabled={isLoading}
              sx={{
                borderColor: '#4285F4',
                color: '#4285F4',
                fontWeight: 500,
                fontSize: '0.95rem',
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(66, 133, 244, 0.1)',
                '&:hover': {
                  borderColor: '#3367D6',
                  backgroundColor: 'rgba(66, 133, 244, 0.08)',
                  boxShadow: '0 4px 8px rgba(66, 133, 244, 0.2)',
                  transform: 'translateY(-1px)'
                },
                '&:disabled': {
                  borderColor: '#ccc',
                  color: '#999',
                  backgroundColor: '#f5f5f5'
                },
                py: 1.5,
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {t('auth.google_auth') || 'ПРОДОЛЖИТЬ С GOOGLE'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('auth.or') || 'или'}
            </Typography>
          </Divider>

          {/* Кнопка "Войти как гость" */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="text"
              fullWidth
              onClick={handleGuestLogin}
              disabled={isLoading}
              sx={{
                color: '#666',
                fontSize: '0.875rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(102, 102, 102, 0.08)',
                }
              }}
            >
              {t('auth.continue_as_guest') || 'Продолжить как гость'}
            </Button>
          </Box>

          {tab === 0 && (
            <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
              <TextField
                label={t('auth.email') || 'Email'}
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label={t('auth.password') || 'Пароль'}
                type={showPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 1 }}>
                <FormControlLabel
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                  label={t('auth.remember_me') || 'Запомнить меня'}
                  sx={{ flex: 1 }}
                />
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setTab(2)}
                  sx={{ 
                    color: '#4CAF50',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    minWidth: 'auto',
                    padding: '4px 8px',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.08)',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {t('auth.forgot_password') || 'Забыли пароль?'}
                </Button>
              </Box>
              {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? (t('auth.loading') || 'Загрузка...') : (t('auth.login') || 'ВОЙТИ')}
              </Button>
            </form>
          )}

          {tab === 1 && (
            <form onSubmit={handleRegister} style={{ marginTop: 16 }}>
              <TextField
                label={t('auth.name') || 'Имя'}
                value={regName}
                onChange={e => setRegName(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label={t('auth.email') || 'Email'}
                type="email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label={t('auth.password') || 'Пароль'}
                type={showPassword ? 'text' : 'password'}
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? (t('auth.loading') || 'Загрузка...') : (t('auth.register') || 'ЗАРЕГИСТРИРОВАТЬСЯ')}
              </Button>
            </form>
          )}

          {tab === 2 && (
            <form onSubmit={handlePasswordReset} style={{ marginTop: 16 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {t('auth.reset_password') || 'Сброс пароля'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('auth.reset_password_description') || 'Введите email для восстановления пароля'}
                </Typography>
              </Box>
              <TextField
                label={t('auth.email') || 'Email'}
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
                sx={{ mb: 2 }}
              />
              {error && <Alert severity="error" sx={{ mt: 1, mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mt: 1, mb: 2 }}>{success}</Alert>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ 
                  mt: 2, 
                  mb: 2,
                  py: 1.5,
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#2E7D32' }
                }}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? (t('auth.sending') || 'Отправляем...') : (t('auth.send_reset_link') || 'Отправить ссылку')}
              </Button>
              <Button
                variant="text"
                fullWidth
                onClick={() => setTab(0)}
                sx={{ 
                  color: '#666',
                  '&:hover': { 
                    backgroundColor: 'rgba(102, 102, 102, 0.08)',
                    textDecoration: 'underline'
                  }
                }}
              >
                {t('auth.back_to_login') || 'Вернуться к входу'}
              </Button>
            </form>
          )}
        </>
      )}
    </Box>
  );

  // Greeting-контент для залогиненного пользователя
  const greeting = (
    <Box sx={{ width: 450, p: 3, textAlign: 'center' }}>
      <Typography variant="h6">{t('auth.hello') || 'Привет'}, {user?.name || ''}!</Typography>
      <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={() => {
          handleLogout();
          setShowLoginForm(true);
        }}>
          {t('auth.change_user') || 'Сменить пользователя'}
        </Button>
        <Button variant="contained" color="primary" onClick={() => { 
          if (onClose) onClose(); 
          navigate('/mockProducts'); 
        }}>
          {t('auth.to_shop') || 'В магазин'}
        </Button>
      </Box>
    </Box>
  );

  // Если используется как модалка
  if (open !== undefined) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent>
          {(user && !user.isGuest && !showLoginForm) ? greeting : content}
        </DialogContent>
      </Dialog>
    );
  }

  // Если не модалка — просто рендерим content
  return content;
};

export default AuthFrame;