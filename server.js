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

// 🏭 Farms API
app.get('/api/farms', (req, res) => {
  // Создаем уникальные фермы из продуктов
  const farms = [...new Set(mockProducts.map(p => p.farmName))].map((farmName, index) => ({
    id: index + 1,
    name: farmName,
    description: `Ферма ${farmName} - производитель свежих продуктов`,
    location: `Регион ${index + 1}`,
    rating: (4 + Math.random()).toFixed(1),
    productsCount: mockProducts.filter(p => p.farmName === farmName).length
  }));
  
  res.json({
    data: farms,
    total: farms.length
  });
});

app.get('/api/farms/:id', (req, res) => {
  const { id } = req.params;
  const farms = [...new Set(mockProducts.map(p => p.farmName))].map((farmName, index) => ({
    id: index + 1,
    name: farmName,
    description: `Ферма ${farmName} - производитель свежих продуктов`,
    location: `Регион ${index + 1}`,
    rating: (4 + Math.random()).toFixed(1),
    productsCount: mockProducts.filter(p => p.farmName === farmName).length
  }));
  
  const farm = farms.find(f => f.id === parseInt(id));
  
  if (!farm) {
    return res.status(404).json({ error: 'Farm not found' });
  }
  
  res.json(farm);
});

app.get('/api/farms/:id/products', (req, res) => {
  const { id } = req.params;
  const farms = [...new Set(mockProducts.map(p => p.farmName))].map((farmName, index) => ({
    id: index + 1,
    name: farmName
  }));
  
  const farm = farms.find(f => f.id === parseInt(id));
  
  if (!farm) {
    return res.status(404).json({ error: 'Farm not found' });
  }
  
  const farmProducts = mockProducts.filter(p => p.farmName === farm.name);
  
  res.json({
    data: farmProducts,
    total: farmProducts.length
  });
});

// 🛒 Cart API
let cartItems = [];

app.get('/api/cart', (req, res) => {
  res.json({
    data: cartItems,
    total: cartItems.length,
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const existingItem = cartItems.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      id: Date.now(),
      productId,
      title: product.title,
      price: product.price,
      quantity,
      image: product.image
    });
  }
  
  res.json({
    data: cartItems,
    total: cartItems.length,
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

app.put('/api/cart/:itemId', (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  
  const item = cartItems.find(item => item.id === parseInt(itemId));
  if (!item) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  
  item.quantity = quantity;
  
  res.json({
    data: cartItems,
    total: cartItems.length,
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

app.delete('/api/cart/:itemId', (req, res) => {
  const { itemId } = req.params;
  
  const itemIndex = cartItems.findIndex(item => item.id === parseInt(itemId));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  
  cartItems.splice(itemIndex, 1);
  
  res.json({
    data: cartItems,
    total: cartItems.length,
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

app.delete('/api/cart', (req, res) => {
  cartItems = [];
  
  res.json({
    data: [],
    total: 0,
    totalPrice: 0
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
      'GET /api/products/category/:category',
      'GET /api/farms',
      'GET /api/farms/:id',
      'GET /api/farms/:id/products',
      'GET /api/cart',
      'POST /api/cart/add',
      'PUT /api/cart/:itemId',
      'DELETE /api/cart/:itemId',
      'DELETE /api/cart'
    ]
  });
});

// 🚀 Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/products`);
  console.log(`🔍 Health check at http://localhost:${PORT}/`);
}); 