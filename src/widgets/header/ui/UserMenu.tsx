// 👤 Компонент меню пользователя
import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Avatar
} from '@mui/material';
import {
  Person as UserIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { clearUser } from '../../../features/auth/model/userSlice';
import { clearCart } from '../../../features/cart/model/cartSlice';
import { clearUserEntity } from '../../../entities/user';
import { useTranslation } from 'react-i18next';

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const user = useAppSelector((state) => state.user.user);
  const isAuthenticated = Boolean(user);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearUserEntity());
    dispatch(clearCart());
    handleMenuClose();
  };

  const handleOrderHistory = () => {
    // TODO: Переход к истории заказов
    console.log('Переход к истории заказов');
    handleMenuClose();
  };

  const handleSettings = () => {
    // TODO: Переход к настройкам профиля
    console.log('Переход к настройкам профиля');
    handleMenuClose();
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label={t('header.profile') || 'Профиль'}
        onClick={handleMenuOpen}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <UserIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: 2,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* 👤 Информация о пользователе */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {user.name?.trim() || user.email || 'User'}
          </Typography>
          {user.email && (
            <Typography variant="caption" color="text.disabled">
              {user.email}
            </Typography>
          )}
        </Box>

        {/* 📋 История заказов */}
        <MenuItem onClick={handleOrderHistory}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {t('header.orderHistory') || 'История заказов'}
          </ListItemText>
        </MenuItem>

        {/* ⚙️ Настройки */}
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {t('header.settings') || 'Настройки'}
          </ListItemText>
        </MenuItem>

        <Divider />

        {/* 🚪 Выход */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {t('header.logout') || 'Выйти'}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}; 