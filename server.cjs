// 🚀 Express сервер для тестирования API с Postman (CommonJS)
const express = require('express');
const cors = require('cors');

// Mock данные прямо в сервере для простоты
const mockProducts = [
  {
    id: 1,
    title: "Fresh Organic Tomatoes",
    description: "Sweet and juicy tomatoes grown without pesticides. Perfect for salads and cooking.",
    price: 3.99,
    originalPrice: 4.99,
    imageUrl: "/src/assets/tomat.jpg",
    category: "Vegetables",
    farmName: "Green Valley Farm",
    rating: 4.8,
    isOrganic: true,
    unit: "kg",
    stock: 50,
    tags: ["organic", "fresh", "local"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
  },
  {
    id: 2,
    title: "Crisp Cucumbers",
    description: "Fresh cucumbers perfect for salads and pickling. Grown in our greenhouse.",
    price: 2.49,
    imageUrl: "/src/assets/cucumber.jpg",
    category: "Vegetables",
    farmName: "Sunny Fields",
    rating: 4.6,
    isOrganic: false,
    unit: "kg",
    stock: 75,
    tags: ["fresh", "local"],
    createdAt: "2024-01-16T08:00:00Z",
    updatedAt: "2024-01-19T16:45:00Z"
  },
  {
    id: 3,
    title: "Sweet Basil",
    description: "Aromatic basil leaves perfect for Italian dishes and pesto.",
    price: 1.99,
    imageUrl: "/src/assets/basil.jpg",
    category: "Herbs",
    farmName: "Herb Garden Co.",
    rating: 4.9,
    isOrganic: true,
    unit: "bunch",
    stock: 30,
    tags: ["organic", "herbs", "fresh"],
    createdAt: "2024-01-17T09:00:00Z",
    updatedAt: "2024-01-20T12:15:00Z"
  },
  {
    id: 4,
    title: "Fresh Mint",
    description: "Refreshing mint leaves for tea and cocktails.",
    price: 1.49,
    imageUrl: "/src/assets/mint.jpg",
    category: "Herbs",
    farmName: "Herb Garden Co.",
    rating: 4.7,
    isOrganic: true,
    unit: "bunch",
    stock: 40,
    tags: ["organic", "herbs", "fresh"],
    createdAt: "2024-01-18T07:00:00Z",
    updatedAt: "2024-01-20T11:30:00Z"
  },
  {
    id: 5,
    title: "Ripe Avocados",
    description: "Creamy avocados perfect for guacamole and toast.",
    price: 4.99,
    originalPrice: 5.99,
    imageUrl: "/src/assets/avocado.jpg",
    category: "Fruits",
    farmName: "Tropical Paradise",
    rating: 4.5,
    isOrganic: false,
    unit: "piece",
    stock: 25,
    tags: ["fresh", "local"],
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-20T15:20:00Z"
  },
  {
    id: 6,
    title: "Fresh Cheese",
    description: "Artisanal cheese made from local cow's milk.",
    price: 8.99,
    imageUrl: "/src/assets/chease.jpg",
    category: "Dairy",
    farmName: "Dairy Delights",
    rating: 4.8,
    isOrganic: true,
    unit: "200g",
    stock: 20,
    tags: ["organic", "artisanal", "local"],
    createdAt: "2024-01-20T06:00:00Z",
    updatedAt: "2024-01-20T13:45:00Z"
  },
  {
    id: 7,
    title: "Pure Honey",
    description: "Natural honey from our own beehives. No additives.",
    price: 12.99,
    imageUrl: "/src/assets/honey.jpg",
    category: "Pantry",
    farmName: "Bee Happy Farm",
    rating: 4.9,
    isOrganic: true,
    unit: "500g",
    stock: 15,
    tags: ["organic", "natural", "local"],
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z"
  },
  {
    id: 8,
    title: "Fresh Yogurt",
    description: "Creamy yogurt made from organic milk.",
    price: 3.49,
    imageUrl: "/src/assets/yogurt.jpg",
    category: "Dairy",
    farmName: "Dairy Delights",
    rating: 4.7,
    isOrganic: true,
    unit: "400g",
    stock: 35,
    tags: ["organic", "fresh", "local"],
    createdAt: "2024-01-20T05:00:00Z",
    updatedAt: "2024-01-20T14:15:00Z"
  },
  {
    id: 9,
    title: "Juicy Oranges",
    description: "Sweet oranges packed with vitamin C.",
    price: 2.99,
    imageUrl: "/src/assets/orange.jpg",
    category: "Fruits",
    farmName: "Citrus Grove",
    rating: 4.6,
    isOrganic: false,
    unit: "kg",
    stock: 60,
    tags: ["fresh", "vitamin-c"],
    createdAt: "2024-01-18T08:00:00Z",
    updatedAt: "2024-01-20T09:45:00Z"
  },
  {
    id: 10,
    title: "Fresh Roses",
    description: "Beautiful roses perfect for bouquets and decoration.",
    price: 15.99,
    imageUrl: "/src/assets/rose.jpg",
    category: "Flowers",
    farmName: "Rose Garden",
    rating: 4.8,
    isOrganic: true,
    unit: "dozen",
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