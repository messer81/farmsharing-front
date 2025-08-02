// src/components/ProductModal.tsx
import {Modal, Box, Typography, IconButton, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import type { Product } from '../types';

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    product: Product;
}

export const ProductModal = ({ open, onClose, product }: ProductModalProps) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <CloseIcon />
                </IconButton>
                <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: 'auto' }} />
                <Typography variant="h5" sx={{ mt: 2 }}>
                    {product.title}
                </Typography>
<Typography variant="body1" sx={{ mt: 2 }}>
    ₪ {product.price.toFixed(2)} per {product.units}
</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography>Quantity:</Typography>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input type="number" value={quantity} readOnly style={{ width: 40, textAlign: 'center' }} />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </Box>
                <Typography>Total: ₪{(product.price * quantity).toFixed(2)}</Typography>
                <Button variant="contained" color="success" sx={{ mt: 2 }}>
                    Add to Cart
                </Button>
            </Box>
        </Modal>
    );
};
