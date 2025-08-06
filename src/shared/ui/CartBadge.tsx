// 🛒 Кастомный компонент бейджа корзины
import { Box } from '@mui/material';

interface CartBadgeProps {
  count: number;
}

export const CartBadge = ({ count }: CartBadgeProps) => {
  if (count === 0) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: 'error.main',
        color: 'white',
        borderRadius: '50%',
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 600,
      }}
    >
      {count}
    </Box>
  );
}; 