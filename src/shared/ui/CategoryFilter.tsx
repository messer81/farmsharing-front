// 🏷️ Переиспользуемый компонент фильтра категорий
import { Box, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  variant?: 'light' | 'dark';
  sx?: object;
}

export const CategoryFilter = ({ 
  selectedCategory, 
  onCategoryChange, 
  variant = 'light',
  sx = {}
}: CategoryFilterProps) => {
  const { t } = useTranslation();
  
  const categories = [
    { id: 'all', name: t('products.all'), icon: '🛒' },
    { id: 'vegetables', name: t('products.vegetables'), icon: '🥬' },
    { id: 'fruits', name: t('products.fruits'), icon: '🍎' },
    { id: 'herbs', name: t('products.herbs'), icon: '🌿' },
    { id: 'dairy', name: t('products.diary'), icon: '🥛' },
    { id: 'honey', name: t('products.honey'), icon: '🍯' },
    { id: 'flowers', name: t('products.flowers'), icon: '🌹' },
  ];

  const getChipStyles = (isSelected: boolean) => {
    if (variant === 'light') {
      return {
        backgroundColor: isSelected ? '#22c55e' : '#f3f4f6',
        color: isSelected ? 'white' : '#374151',
        '&:hover': {
          backgroundColor: isSelected ? '#16a34a' : '#e5e7eb',
        }
      };
    } else {
      return {
        backgroundColor: isSelected ? '#22c55e' : 'rgba(255, 255, 255, 0.95)',
        color: isSelected ? 'white' : '#374151',
        '&:hover': {
          backgroundColor: isSelected ? '#16a34a' : 'rgba(255, 255, 255, 1)',
        }
      };
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1, 
      flexWrap: 'wrap', 
      justifyContent: 'center',
      ...sx
    }}>
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={`${category.icon} ${category.name}`}
          onClick={() => onCategoryChange(category.id)}
          sx={{
            ...getChipStyles(selectedCategory === category.id),
            fontWeight: 600,
            fontSize: '0.85rem',
            py: 1,
            px: 2,
            cursor: 'pointer',
          }}
        />
      ))}
    </Box>
  );
};