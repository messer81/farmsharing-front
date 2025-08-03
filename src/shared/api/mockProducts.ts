// 🛍️ Mock API для продуктов (Postman-совместимый)
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  farmName: string;
  rating?: number;
  isOrganic: boolean;
  unit: string;
  stock: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 📊 Расширенные данные продуктов
export const mockProducts: Product[] = [
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

// 🌐 API функции для Postman-совместимости
export const productsAPI = {
  // Получить все продукты
  getAll: async (): Promise<{ data: Product[]; total: number }> => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: mockProducts,
      total: mockProducts.length
    };
  },

  // Получить продукты с пагинацией
  getPaginated: async (page: number = 1, limit: number = 8): Promise<{ 
    data: Product[]; 
    total: number; 
    page: number; 
    limit: number; 
    totalPages: number;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = mockProducts.slice(startIndex, endIndex);
    
    return {
      data: paginatedProducts,
      total: mockProducts.length,
      page,
      limit,
      totalPages: Math.ceil(mockProducts.length / limit)
    };
  },

  // Получить продукт по ID
  getById: async (id: number): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const product = mockProducts.find(p => p.id === id);
    return product || null;
  },

  // Поиск продуктов
  search: async (query: string): Promise<{ data: Product[]; total: number }> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const filteredProducts = mockProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.farmName.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      data: filteredProducts,
      total: filteredProducts.length
    };
  },

  // Фильтрация по категории
  getByCategory: async (category: string): Promise<{ data: Product[]; total: number }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const filteredProducts = mockProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    
    return {
      data: filteredProducts,
      total: filteredProducts.length
    };
  }
};