import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
  toggleUserMenu,
  closeUserMenu,
  selectIsMobileMenuOpen,
  selectIsSearchExpanded,
  selectIsUserMenuOpen,
  closeAllMenus,
} from './headerSlice';

export const useHeader = () => {
  const dispatch = useDispatch();
  const isMobileMenuOpen = useSelector(selectIsMobileMenuOpen);
  const isSearchExpanded = useSelector(selectIsSearchExpanded);
  const isUserMenuOpen = useSelector(selectIsUserMenuOpen);

  const onToggleMobileMenu = useCallback(() => dispatch(toggleMobileMenu()), [dispatch]);
  const onCloseMobileMenu = useCallback(() => dispatch(closeMobileMenu()), [dispatch]);
  const onToggleSearch = useCallback(() => dispatch(toggleSearch()), [dispatch]);
  const onCloseSearch = useCallback(() => dispatch(closeSearch()), [dispatch]);
  const onToggleUserMenu = useCallback(() => dispatch(toggleUserMenu()), [dispatch]);
  const onCloseUserMenu = useCallback(() => dispatch(closeUserMenu()), [dispatch]);
  const onCloseAll = useCallback(() => dispatch(closeAllMenus()), [dispatch]);

  return {
    isMobileMenuOpen,
    isSearchExpanded,
    isUserMenuOpen,
    onToggleMobileMenu,
    onCloseMobileMenu,
    onToggleSearch,
    onCloseSearch,
    onToggleUserMenu,
    onCloseUserMenu,
    onCloseAll,
  };
};


