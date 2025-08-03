// 🛍️ Страница каталога продуктов
import { Container } from '@mui/material';
import { ProductsGrid } from '../entities/product/ui/ProductsGrid';

const ProductsPage = () => {
  return (
    <Container maxWidth="xl">
      <ProductsGrid />
    </Container>
  );
};

export default ProductsPage;