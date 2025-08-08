# 📡 API Documentation - FarmSharing Backend

## 🚀 Обзор

FarmSharing API построен на Express.js и предоставляет полный набор endpoints для работы с продуктами, фермами и корзиной покупок. Все данные поддерживают многоязычность (EN, RU, AR, HE).

## 🔧 Конфигурация сервера

### Запуск
```bash
# Запуск сервера
node server.cjs

# Или через npm
npm run dev:server
```

### Настройки
- **Порт**: 3000
- **CORS**: Включен для всех origins
- **Статические файлы**: `/src/assets` (изображения)
- **Формат данных**: JSON

## 📊 Структура данных

### Product (Продукт)
```typescript
interface Product {
  id: number;
  title: {
    en: string;    // English
    ru: string;    // Русский
    ar: string;    // العربية
    he: string;    // עברית
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
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  rating: number;
  isOrganic: boolean;
  stock: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Farm (Ферма)
```typescript
interface Farm {
  id: number;
  name: {
    en: string;
    ru: string;
    ar: string;
    he: string;
  };
  description: string;
  location: string;
  rating: number;
  productsCount: number;
}
```

### Cart Item (Элемент корзины)
```typescript
interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}
```

## 🛍️ Products API

### GET /api/products
Получение списка продуктов с пагинацией.

**Параметры запроса:**
- `page` (number, optional): Номер страницы (по умолчанию: 1)
- `limit` (number, optional): Количество продуктов на странице (по умолчанию: 10)

**Пример запроса:**
```bash
curl "http://localhost:3000/api/products?page=1&limit=10"
```

**Ответ:**
```json
{
  "data": [
    {
      "id": 1,
      "title": {
        "en": "Fresh Tomatoes",
        "ru": "Свежие помидоры",
        "ar": "طماطم طازجة",
        "he": "עגבניות טריות"
      },
      "description": {
        "en": "Fresh organic tomatoes from the farm",
        "ru": "Свежие органические помидоры с фермы",
        "ar": "طماطم عضوية طازجة من المزرعة",
        "he": "עגבניות אורגניות טריות מהחווה"
      },
      "farmName": {
        "en": "Galil Farm",
        "ru": "Ферма Галиль",
        "ar": "مزرعة الجليل",
        "he": "חוות הגליל"
      },
      "unit": {
        "en": "kg",
        "ru": "кг",
        "ar": "كجم",
        "he": "ק\"ג"
      },
      "price": 15.99,
      "originalPrice": 18.99,
      "imageUrl": "/src/assets/tomat.jpg",
      "category": "vegetables",
      "rating": 4.8,
      "isOrganic": true,
      "stock": 50,
      "tags": ["organic", "fresh", "local"],
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-20T14:30:00Z"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### GET /api/products/:id
Получение детальной информации о продукте.

**Параметры пути:**
- `id` (number): ID продукта

**Пример запроса:**
```bash
curl "http://localhost:3000/api/products/1"
```

**Ответ:**
```json
{
  "id": 1,
  "title": { /* многоязычные поля */ },
  "description": { /* многоязычные поля */ },
  "farmName": { /* многоязычные поля */ },
  "unit": { /* многоязычные поля */ },
  "price": 15.99,
  "originalPrice": 18.99,
  "imageUrl": "/src/assets/tomat.jpg",
  "category": "vegetables",
  "rating": 4.8,
  "isOrganic": true,
  "stock": 50,
  "tags": ["organic", "fresh", "local"],
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-20T14:30:00Z"
}
```

### GET /api/products/search
Поиск продуктов по ключевым словам.

**Параметры запроса:**
- `q` (string, optional): Поисковый запрос

**Пример запроса:**
```bash
curl "http://localhost:3000/api/products/search?q=tomato"
```

**Ответ:**
```json
{
  "data": [/* найденные продукты */],
  "total": 1
}
```

### GET /api/products/category/:category
Фильтрация продуктов по категории.

**Параметры пути:**
- `category` (string): Название категории

**Пример запроса:**
```bash
curl "http://localhost:3000/api/products/category/vegetables"
```

**Ответ:**
```json
{
  "data": [/* продукты категории */],
  "total": 2
}
```

## 🏭 Farms API

### GET /api/farms
Получение списка ферм из `data/farms.json`.

Поддерживаемые параметры:
- `north,south,east,west` — фильтрация по границам карты (bounds)
- `search` — строка поиска по названию/локации

**Пример запроса:**
```bash
curl "http://localhost:3000/api/farms?north=33.5&south=31.0&east=35.8&west=34.3"
```

**Ответ (пример):**
```json
{
  "data": [
    {
      "id": 2,
      "name": { "en": "Merkaz Farm", "ru": "Мерказ Фарм" },
      "location": "Tel Aviv",
      "latitude": 32.0853,
      "longitude": 34.7818,
      "rating": 4.6,
      "image": "/src/assets/Markaz-Farm.png"
    }
  ],
  "total": 1
}
```

### GET /api/farms/:id
Получение детальной информации о ферме.

**Параметры пути:**
- `id` (number): ID фермы

**Пример запроса:**
```bash
curl "http://localhost:3000/api/farms/1"
```

**Ответ:**
```json
{
  "id": 1,
  "name": { /* многоязычные поля */ },
  "description": "Ферма Ферма Галиль - производитель свежих продуктов",
  "location": "Регион 1",
  "rating": 4.8,
  "productsCount": 2
}
```

### GET /api/farms/:id/products
Получение продуктов конкретной фермы.

**Параметры пути:**
- `id` (number): ID фермы

**Пример запроса:**
```bash
curl "http://localhost:3000/api/farms/1/products"
```

**Ответ:**
```json
{
  "data": [/* продукты фермы */],
  "total": 2
}
```

## 🛒 Cart API

### GET /api/cart
Получение содержимого корзины.

**Пример запроса:**
```bash
curl "http://localhost:3000/api/cart"
```

**Ответ:**
```json
{
  "data": [
    {
      "id": 1234567890,
      "productId": 1,
      "quantity": 2,
      "product": { /* полная информация о продукте */ }
    }
  ],
  "total": 1,
  "totalPrice": 31.98
}
```

### POST /api/cart/add
Добавление продукта в корзину.

**Тело запроса:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Пример запроса:**
```bash
curl -X POST "http://localhost:3000/api/cart/add" \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

**Ответ:**
```json
{
  "data": [/* обновленная корзина */],
  "total": 1,
  "totalPrice": 31.98
}
```

### PUT /api/cart/:itemId
Обновление количества товара в корзине.

**Параметры пути:**
- `itemId` (number): ID элемента корзины

**Тело запроса:**
```json
{
  "quantity": 3
}
```

**Пример запроса:**
```bash
curl -X PUT "http://localhost:3000/api/cart/1234567890" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'
```

**Ответ:**
```json
{
  "data": [/* обновленная корзина */],
  "total": 1,
  "totalPrice": 47.97
}
```

### DELETE /api/cart/:itemId
Удаление товара из корзины.

**Параметры пути:**
- `itemId` (number): ID элемента корзины

**Пример запроса:**
```bash
curl -X DELETE "http://localhost:3000/api/cart/1234567890"
```

**Ответ:**
```json
{
  "data": [/* обновленная корзина */],
  "total": 0,
  "totalPrice": 0
}
```

### DELETE /api/cart
Очистка всей корзины.

**Пример запроса:**
```bash
curl -X DELETE "http://localhost:3000/api/cart"
```

**Ответ:**
```json
{
  "data": [],
  "total": 0,
  "totalPrice": 0
}
```

## 🏠 Health Check

### GET /
Проверка состояния сервера.

**Пример запроса:**
```bash
curl "http://localhost:3000/"
```

**Ответ:**
```json
{
  "message": "FarmSharing API Server",
  "version": "1.0.0",
  "endpoints": [
    "GET /api/products",
    "GET /api/products/:id",
    "GET /api/products/search?q=query",
    "GET /api/products/category/:category",
    "GET /api/farms",
    "GET /api/farms/:id",
    "GET /api/farms/:id/products",
    "GET /api/cart",
    "POST /api/cart/add",
    "PUT /api/cart/:itemId",
    "DELETE /api/cart/:itemId",
    "DELETE /api/cart"
  ]
}
```

## 📁 Статические файлы

### Изображения
Все изображения доступны по пути `/src/assets/`:

**Примеры:**
- `http://localhost:3000/src/assets/tomat.jpg`
- `http://localhost:3000/src/assets/chease.jpg`
- `http://localhost:3000/src/assets/orange.jpg`

## 🌍 Локализация

### Поддерживаемые языки
- **EN** - English (английский)
- **RU** - Русский
- **AR** - العربية (арабский)
- **HE** - עברית (иврит)

### Использование в коде
```typescript
// Получение локализованного текста
const getLocalizedText = (obj: LocalizedText, language: string) => {
  return obj[language] || obj.en || '';
};

// Пример использования
const title = getLocalizedText(product.title, 'ru'); // "Свежие помидоры"
```

## 🔍 Обработка ошибок

### Стандартные HTTP коды
- `200` - Успешный запрос
- `400` - Неверный запрос
- `404` - Ресурс не найден
- `500` - Внутренняя ошибка сервера

### Формат ошибки
```json
{
  "error": "Product not found"
}
```

## 📊 Каталог продуктов

### Доступные продукты (10 товаров)
1. **Fresh Tomatoes** - Свежие помидоры (vegetables)
2. **Halloumi Cheese** - Сыр халуми (dairy)
3. **Sweet Oranges** - Сладкие апельсины (fruits)
4. **Fresh Basil** - Свежий базилик (herbs)
5. **Homemade Yogurt** - Домашний йогурт (dairy)
6. **Eucalyptus Honey** - Мед из эвкалипта (honey)
7. **Roses** - Розы (flowers)
8. **Cucumbers** - Огурцы (vegetables)
9. **Avocado** - Авокадо (fruits)
10. **Mint** - Мята (herbs)

### Категории
- **vegetables** - Овощи
- **fruits** - Фрукты
- **herbs** - Травы
- **dairy** - Молочные продукты
- **honey** - Мед
- **flowers** - Цветы

---

**Версия API**: 1.0.0  
**Последнее обновление**: 4 августа 2025  
**Статус**: ✅ Активно 