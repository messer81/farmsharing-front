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
        isOrganic?: boolean;   // 🌱 Органический продукт (исправлено с any на boolean)
        id: number;           // 🆔 ID товара
        title: string;        // 📝 Название
        description: string;  // 📄 Описание
        category: string;     // 🏷️ Категория
        price: number;        // 💰 Цена
        originalPrice?: number; // 💸 Оригинальная цена (для скидок)
        amount: number;       // 📦 Количество в наличии
        units: string;        // 📏 Единицы измерения (kg, lb, dozen)
        farm: Farm;           // 🚜 Информация о ферме
        imageUrl?: string;    // 🖼️ URL картинки
    }

    export interface CartItem { // 🛒 Тип элемента корзины
        product: Product;     // 🛍️ Информация о продукте
        quantity: number;     // 🔢 Количество
    }