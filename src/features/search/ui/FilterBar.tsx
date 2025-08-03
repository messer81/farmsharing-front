// src/components/FilterBar.tsx
import {Box, TextField, Button, MenuItem} from '@mui/material';

interface FilterBarProps {
    searchQuery: string;
    onSearch: (query: string) => void;
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export const FilterBar = ({
                              searchQuery,
                              onSearch,
                              categories,
                              selectedCategory,
                              onCategoryChange,
                          }: FilterBarProps) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
                label="Search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                sx={{ flex: 1 }}
            />
            <Button variant="contained">Search</Button>
            <TextField
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value as string)}
            >
                {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};