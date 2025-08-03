// 🔍 Кастомный компонент поисковой строки для хедера
import { Box, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';

interface HeaderSearchBoxProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchClear: () => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

export const HeaderSearchBox = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchClear, 
  onSubmit,
  placeholder = "Search products..."
}: HeaderSearchBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!searchQuery) {
      setIsExpanded(false);
    }
  };

  const handleSearchClear = () => {
    onSearchClear();
    setIsExpanded(false);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        mx: 2,
      }}
    >
      {/* 🔍 Кнопка с лупой */}
      <IconButton
        color="inherit"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
          },
        }}
      >
        <SearchIcon />
      </IconButton>

      {/* 📝 Поисковая строка (разворачивается) */}
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: 1,
          border: '1px solid rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(15px)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:focus-within': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'primary.main',
          },
          width: isExpanded ? { sm: 300, md: 400 } : 0,
          opacity: isExpanded ? 1 : 0,
          overflow: 'hidden',
          ml: 1,
        }}
      >
        <InputBase
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          autoFocus={isExpanded}
          sx={{
            ml: 2,
            flex: 1,
            minWidth: 0,
          }}
        />
        {searchQuery && (
          <IconButton 
            onClick={handleSearchClear}
            size="small"
            sx={{ mr: 1 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}; 