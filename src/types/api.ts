// 🛍️ Типы для продуктов с поддержкой многоязычности
export interface Product {
    id: number;
    // Многоязычные поля
    title: {
        en: string;
        ru: string;
        ar: string;
        he: string;
    };
    description: {
        en: string;
        ru: string;
        ar: string;
        he: string;
    };
    farmName: {
        en: string;
        ru: string;
        ar: string;
        he: string;
    };
    unit: {
        en: string;
        ru: string;
        ar: string;
        he: string;
    };
    // Остальные поля
    price: number;
    originalPrice?: number;
    stock: number;
    category: string;
    imageUrl?: string;
    isOrganic: boolean;
    discount?: number;
    createdAt: string;
    updatedAt: string;
}

// 🛒 Типы для корзины
export interface CartItem {
    product: Product;
    quantity: number;
    selectedUnit?: string; // Для продуктов с разными единицами измерения
}

export interface Cart {
    items: CartItem[];
    totalAmount: number;
    totalQuantity: number;
}

// 🏪 Типы для ферм
export interface Farm {
    id: number;
    name: {
        en: string;
        ru: string;
        ar: string;
        he: string;
    };
    description: {
        en: string;
        ru: string;
        ar: string;
        he: string;
    };
    location: string;
    verified: boolean;
    rating: number;
    products: Product[];
    image?: string;
    contact?: {
        email?: string;
        phone?: string;
    };
}

// 📊 API типы
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// 👤 Типы для пользователей и авторизации
export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    preferredLanguage: 'ru' | 'en' | 'he' | 'ar';
    role?: 'user' | 'admin';
    isGuest?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    preferredLanguage?: 'ru' | 'en' | 'he' | 'ar';
}

export interface AuthResponse {
    user: User;
    token: string;
    message: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface UpdateProfileRequest {
    name?: string;
    phone?: string;
    address?: string;
    preferredLanguage?: 'ru' | 'en' | 'he' | 'ar';
} 