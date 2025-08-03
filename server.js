// 🚀 Express сервер для тестирования API с Postman
import express from 'express';
import cors from 'cors';
import { mockProducts } from './src/shared/api/mockProducts.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 📡 API Routes
app.get('/api/products', (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  
  const paginatedProducts = mockProducts.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedProducts,
    total: mockProducts.length,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(mockProducts.length / limit)
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = mockProducts.find(p => p.id === parseInt(id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json({ data: mockProducts, total: mockProducts.length });
  }
  
  const filteredProducts = mockProducts.filter(product =>
    product.title.toLowerCase().includes(q.toLowerCase()) ||
    product.description.toLowerCase().includes(q.toLowerCase()) ||
    product.category.toLowerCase().includes(q.toLowerCase()) ||
    product.farmName.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    data: filteredProducts,
    total: filteredProducts.length
  });
});

app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  
  const filteredProducts = mockProducts.filter(product =>
    product.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    data: filteredProducts,
    total: filteredProducts.length
  });
});

// 🏠 Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'FarmSharing API Server',
    version: '1.0.0',
    endpoints: [
      'GET /api/products',
      'GET /api/products/:id',
      'GET /api/products/search?q=query',
      'GET /api/products/category/:category'
    ]
  });
});

// 🚀 Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/products`);
  console.log(`🔍 Health check at http://localhost:${PORT}/`);
}); 