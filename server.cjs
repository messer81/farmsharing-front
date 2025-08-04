// 🚀 Express сервер для тестирования API с Postman (CommonJS)
const express = require('express');
const cors = require('cors');

// Mock данные прямо в сервере для простоты
const mockProducts = [
  {
    id: 1,
    title: "Свежие помидоры",
    description: "Свежие органические помидоры с фермы",
    price: 15.99,
    originalPrice: 18.99,
    imageUrl: "/src/assets/tomat.jpg",
    category: "vegetables",
    farmName: "Galil Farm",
    rating: 4.8,
    isOrganic: true,
    unit: "кг",
    stock: 50,
    tags: ["organic", "fresh", "local"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
  },
  {
    id: 2,
    title: "Сыр халуми",
    description: "Традиционный кипрский сыр",
    price: 35.00,
    imageUrl: "/src/assets/chease.jpg",
    category: "dairy",
    farmName: "Galil Chees",
    rating: 4.6,
    isOrganic: false,
    unit: "кг",
    stock: 75,
    tags: ["fresh", "local"],
    createdAt: "2024-01-16T08:00:00Z",
    updatedAt: "2024-01-19T16:45:00Z"
  },
  {
    id: 3,
    title: "Сладкие апельсины",
    description: "Свежие апельсины с цитрусовой рощи",
    price: 12.50,
    originalPrice: 14.99,
    imageUrl: "/src/assets/orange.jpg",
    category: "fruits",
    farmName: "Цитрусовая роща",
    rating: 4.9,
    isOrganic: true,
    unit: "кг",
    stock: 30,
    tags: ["organic", "herbs", "fresh"],
    createdAt: "2024-01-17T09:00:00Z",
    updatedAt: "2024-01-20T12:15:00Z"
  },
  {
    id: 4,
    title: "Свежий базилик",
    description: "Ароматный базилик для итальянских блюд",
    price: 8.99,
    originalPrice: 10.59,
    imageUrl: "/src/assets/basil.jpg",
    category: "herbs",
    farmName: "Травяная ферма",
    rating: 4.7,
    isOrganic: true,
    unit: "пучок",
    stock: 40,
    tags: ["organic", "herbs", "fresh"],
    createdAt: "2024-01-18T07:00:00Z",
    updatedAt: "2024-01-20T11:30:00Z"
  },
  {
    id: 5,
    title: "Домашний йогурт",
    description: "Натуральный домашний йогурт",
    price: 18.50,
    originalPrice: 21.76,
    imageUrl: "/src/assets/yogurt.jpg",
    category: "dairy",
    farmName: "Молочная ферма",
    rating: 4.5,
    isOrganic: true,
    unit: "литр",
    stock: 25,
    tags: ["fresh", "local"],
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-20T15:20:00Z"
  },
  {
    id: 6,
    title: "Мед из эвкалипта",
    description: "Натуральный мед из эвкалиптовых цветов",
    price: 45.00,
    originalPrice: 52.94,
    imageUrl: "/src/assets/honey.jpg",
    category: "honey",
    farmName: "Пасека Шарон",
    rating: 4.8,
    isOrganic: true,
    unit: "банка 500г",
    stock: 20,
    tags: ["organic", "artisanal", "local"],
    createdAt: "2024-01-20T06:00:00Z",
    updatedAt: "2024-01-20T13:45:00Z"
  },
  {
    id: 7,
    title: "Розы",
    description: "Свежие розы разных цветов",
    price: 25.00,
    originalPrice: 29.41,
    imageUrl: "/src/assets/rose.jpg",
    category: "flowers",
    farmName: "Цветочная ферма",
    rating: 4.9,
    isOrganic: true,
    unit: "букет",
    stock: 15,
    tags: ["organic", "natural", "local"],
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z"
  },
  {
    id: 8,
    title: "Огурцы",
    description: "Свежие хрустящие огурцы",
    price: 9.99,
    originalPrice: 11.75,
    imageUrl: "/src/assets/cucumber.jpg",
    category: "vegetables",
    farmName: "Овощная ферма",
    rating: 4.7,
    isOrganic: true,
    unit: "кг",
    stock: 35,
    tags: ["organic", "fresh", "local"],
    createdAt: "2024-01-20T05:00:00Z",
    updatedAt: "2024-01-20T14:15:00Z"
  },
  {
    id: 9,
    title: "Авокадо",
    description: "Спелые авокадо Хасс",
    price: 22.50,
    imageUrl: "/src/assets/avocado.jpg",
    category: "fruits",
    farmName: "Тропическая ферма",
    rating: 4.6,
    isOrganic: true,
    unit: "кг",
    stock: 0,
    tags: ["fresh", "vitamin-c"],
    createdAt: "2024-01-18T08:00:00Z",
    updatedAt: "2024-01-20T09:45:00Z"
  },
  {
    id: 10,
    title: "Мята",
    description: "Свежая мята для чая",
    price: 6.50,
    originalPrice: 7.65,
    imageUrl: "/src/assets/mint.jpg",
    category: "herbs",
    farmName: "Травяная ферма",
    rating: 4.8,
    isOrganic: true,
    unit: "пучок",
    stock: 10,
    tags: ["organic", "beautiful", "fresh"],
    createdAt: "2024-01-19T07:00:00Z",
    updatedAt: "2024-01-20T16:00:00Z"
  }
];

const app = express();
const PORT = process.env.PORT || 3000;

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 📁 Статические файлы (изображения)
app.use('/src/assets', express.static('src/assets'));

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

// 🏭 Farms API endpoints
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

// 🛒 Cart API endpoints
let mockCart = [];

app.get('/api/cart', (req, res) => {
  res.json({
    data: mockCart,
    total: mockCart.length,
    totalPrice: mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  });
});

app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const existingItem = mockCart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    mockCart.push({
      id: Date.now(),
      productId,
      quantity,
      product
    });
  }
  
  res.json({
    data: mockCart,
    total: mockCart.length,
    totalPrice: mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  });
});

app.put('/api/cart/:itemId', (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  
  const item = mockCart.find(item => item.id === parseInt(itemId));
  if (!item) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  
  item.quantity = quantity;
  
  res.json({
    data: mockCart,
    total: mockCart.length,
    totalPrice: mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  });
});

app.delete('/api/cart/:itemId', (req, res) => {
  const { itemId } = req.params;
  
  const itemIndex = mockCart.findIndex(item => item.id === parseInt(itemId));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  
  mockCart.splice(itemIndex, 1);
  
  res.json({
    data: mockCart,
    total: mockCart.length,
    totalPrice: mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  });
});

app.delete('/api/cart', (req, res) => {
  mockCart = [];
  
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