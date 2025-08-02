import { useState } from 'react';
import { InputBase, IconButton, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
    onSearch?: (query: string) => void;
    expanded?: boolean;
    onToggle?: () => void;
    placeholder?: string;
}

export const SearchBar = ({
                              onSearch,
                              expanded = true,
                              onToggle,
                              placeholder
                          }: SearchBarProps) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');

    // Обработчик изменения поля
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch?.(newQuery);
    };

    // Обработчик нажатия Enter
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch?.(query);
        }
    };

    // Обработчик очистки поля
    const handleClear = () => {
        setQuery('');
        onSearch?.('');
    };

    // Если поиск свернут, показываем только иконку
    if (!expanded) {
        return (
            <IconButton onClick={onToggle}>
                <SearchIcon />
            </IconButton>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: { xs: '100%', sm: '300px' },
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <IconButton sx={{ p: '10px' }}>
                <SearchIcon />
            </IconButton>

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder || t('header.search')}
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />

            {query && (
                <IconButton sx={{ p: '10px' }} onClick={handleClear}>
                    <CloseIcon />
                </IconButton>
            )}
        </Paper>
    );
};

export default SearchBar;
