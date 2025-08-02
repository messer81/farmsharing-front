// src/components/ProductsGrid.tsx
import { Box, Grid } from '@mui/material';
import ProductCard from './ProductCard';

interface ProductsGridProps {
    products: Product[];
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};