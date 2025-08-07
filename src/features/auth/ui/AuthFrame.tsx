// 🔐 Компонент авторизации с вкладками (вход/регистрация/восстановление)
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleLogo from '../../../shared/ui/GoogleLogo';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { clearUser, loginAsGuest } from '../model/userSlice';
import { clearCart } from '../../cart/model/cartSlice';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery, useLoginMutation, useRegisterMutation, useForgotPasswordMutation } from '../../../shared/api';
import { setUserEntity, clearUserEntity } from '../../../entities/user';

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
  const user = useAppSelector(state => state.user.user);
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Подгружаем профиль через RTK Query (если есть токен)
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const { data: profile } = useGetProfileQuery(undefined, { skip: !token });

  // Синхронизируем доменную сущность user
  useEffect(() => {
    if (profile) {
      dispatch(setUserEntity(profile));
    }
  }, [profile, dispatch]);

  // Очищаем локальные успехи при смене вкладки
  useEffect(() => {
    setSuccess('');
  }, [tab]);

  // Обработка успешной авторизации
  const isAuthenticated = Boolean(user && !user.isGuest);
  useEffect(() => {
    if (isAuthenticated) {
      onSuccess?.();
    }
  }, [isAuthenticated, onSuccess]);

  const [loginMutation, { isLoading: loginLoading, error: loginError }] = useLoginMutation();
  const [registerMutation, { isLoading: registerLoading, error: registerError }] = useRegisterMutation();
  const loginErrorMessage = (loginError as any)?.data?.message || (loginError as any)?.error || '';
  const registerErrorMessage = (registerError as any)?.data?.message || (registerError as any)?.error || '';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');

    try {
      const res = await loginMutation({ email: loginEmail, password: loginPassword }).unwrap();
      // Сохраняем токен
      localStorage.setItem('authToken', res.token);
      // Опционально: синхронизируем доменную сущность
      if (res.user) {
        dispatch(setUserEntity(res.user));
      }
      
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
    setSuccess('');

    try {
      const res = await registerMutation({ 
        name: regName, 
        email: regEmail, 
        password: regPassword,
        preferredLanguage: 'ru'
      }).unwrap();
      localStorage.setItem('authToken', res.token);
      if (res.user) {
        dispatch(setUserEntity(res.user));
      }
      
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

  const [forgotPasswordMutation, { isLoading: forgotLoading, error: forgotError }] = useForgotPasswordMutation();
  const forgotErrorMessage = (forgotError as any)?.data?.message || (forgotError as any)?.error || '';

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    
    try {
      const result = await forgotPasswordMutation({ email: resetEmail }).unwrap();
      setSuccess(result.message);
      setResetEmail('');
    } catch (error) {
      // Ошибка обрабатывается в extraReducers
    }
  };

  const handleLogout = async () => {
    dispatch(clearUser());
    dispatch(clearUserEntity());
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
              disabled={loginLoading || registerLoading || forgotLoading}
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
              disabled={loginLoading || registerLoading || forgotLoading}
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
              {loginErrorMessage && <Alert severity="error" sx={{ mt: 1 }}>{loginErrorMessage}</Alert>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loginLoading}
                startIcon={loginLoading ? <CircularProgress size={20} /> : null}
              >
                {loginLoading ? (t('auth.loading') || 'Загрузка...') : (t('auth.login') || 'ВОЙТИ')}
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
              {registerErrorMessage && <Alert severity="error" sx={{ mt: 1 }}>{registerErrorMessage}</Alert>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={registerLoading}
                startIcon={registerLoading ? <CircularProgress size={20} /> : null}
              >
                {registerLoading ? (t('auth.loading') || 'Загрузка...') : (t('auth.register') || 'ЗАРЕГИСТРИРОВАТЬСЯ')}
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
              {forgotErrorMessage && <Alert severity="error" sx={{ mt: 1, mb: 2 }}>{forgotErrorMessage}</Alert>}
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
                disabled={forgotLoading}
                startIcon={forgotLoading ? <CircularProgress size={20} /> : null}
              >
                {forgotLoading ? (t('auth.sending') || 'Отправляем...') : (t('auth.send_reset_link') || 'Отправить ссылку')}
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