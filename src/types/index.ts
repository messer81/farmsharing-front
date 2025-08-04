//  ЕДИНЫЙ файл типов
    import React from 'react';

    export interface Farm {
        phone: string;
        email: string;
        description: string;   // Описание фермы
        products: Product[];   // 📦 Список продуктов на ферме
        isFavorite?: boolean;  // ❤️ Ферма в избранном
        isVerified: React.ReactNode;
        imageUrl?: string;
        id: number;           // 🆔 ID фермы
        name: string;         // 📝 Название фермы
        location: string;     // 📍 Локация
        city: string;         // 🏙️ Город
        rating: number;       // ⭐ Рейтинг
    }

    export interface Product {
        id: number;           // 🆔 ID товара
        title: string;        // 📝 Название
        description: string;  // 📄 Описание
        price: number;        // 💰 Цена
        originalPrice?: number; // 💸 Оригинальная цена (для скидок)
        imageUrl: string;     // 🖼️ URL картинки
        category: string;     // 🏷️ Категория
        farmName: string;     // 🚜 Название фермы
        rating?: number;      // ⭐ Рейтинг
        isOrganic: boolean;   // 🌱 Органический продукт
        unit: string;         // 📏 Единицы измерения (кг, пучок, литр)
        stock: number;        // 📦 Количество в наличии
        tags: string[];       // 🏷️ Теги
        createdAt: string;    // 📅 Дата создания
        updatedAt: string;    // 📅 Дата обновления
    }

    export interface CartItem { // 🛒 Тип элемента корзины
        product: Product;     // 🛍️ Информация о продукте
        quantity: number;     // 🔢 Количество
    }