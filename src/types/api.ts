// 🎯 Типы для API

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

export interface Farm {
  id: number;
  name: string;
  description: string;
  location: string;
  rating: number;
  imageUrl: string;
  products: Product[];
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 