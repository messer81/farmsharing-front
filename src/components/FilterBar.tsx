// src/components/FilterBar.tsx
import {Box, TextField, Button, MenuItem} from '@mui/material';

interface FilterBarProps {
    searchRequest: string;
    setSearchRequest: (value: string) => void;
    chosenCategory: string;
    setChosenCategory: (value: string) => void;
}

export const FilterBar = ({
                              searchRequest,
                              setSearchRequest,
                              chosenCategory,
                              setChosenCategory,
                          }: FilterBarProps) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
                label="Search"
                value={searchRequest}
                onChange={(e) => setSearchRequest(e.target.value)}
                sx={{ flex: 1 }}
            />
            <Button variant="contained">Search</Button>
            <TextField
                select
                label="Category"
                value={chosenCategory}
                onChange={(e) => setChosenCategory(e.target.value as string)}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Fruits">Fruits</MenuItem>
                <MenuItem value="Vegetables">Vegetables</MenuItem>
                <MenuItem value="Diary">Diary</MenuItem>
                <MenuItem value="Pantry">Pantry</MenuItem>
                <MenuItem value="Verbs">Verbs</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
            </TextField>
        </Box>
    );
};