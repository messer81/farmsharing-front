# 🚀 Интеграция Axios в FarmSharing Frontend

## 📋 Обзор

Axios успешно интегрирован в проект FarmSharing для замены нативного fetch API. Это обеспечивает более удобную работу с HTTP запросами, лучшую обработку ошибок и автоматические перехватчики.

## 🏗️ Архитектура

### Структура файлов

```
src/shared/api/
├── axios.ts          # Конфигурация Axios с перехватчиками
├── api.ts            # Основной API слой с Axios
├── useApi.ts         # React хуки для работы с API
└── mockProducts.ts   # Mock данные для разработки
```

## 🔧 Конфигурация Axios

### Основные настройки

```typescript
// src/shared/api/axios.ts
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Перехватчики запросов

- **Автоматическое добавление токена авторизации**
- **Логирование запросов в development режиме**
- **Обработка ошибок с детальными сообщениями**

### Перехватчики ответов

- **Логирование ответов в development режиме**
- **Обработка HTTP ошибок (401, 403, 404, 500)**
- **Автоматическое удаление токена при 401 ошибке**

## 📡 API Слой

### Типы ответов

```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### Доступные API

#### Продукты
```typescript
// Получить все продукты
const response = await apiClient.products.getAll();

// Получить продукты с пагинацией
const response = await apiClient.products.getPaginated(page, limit);

// Поиск продуктов
const response = await apiClient.products.search(query);

// Получить продукт по ID
const response = await apiClient.products.getById(id);

// Фильтрация по категории
const response = await apiClient.products.getByCategory(category);
```

#### Корзина
```typescript
// Получить корзину
const response = await apiClient.cart.getCart();

// Добавить товар в корзину
const response = await apiClient.cart.addToCart(productId, quantity);

// Обновить количество
const response = await apiClient.cart.updateCartItem(itemId, quantity);

// Удалить товар
const response = await apiClient.cart.removeFromCart(itemId);

// Очистить корзину
const response = await apiClient.cart.clearCart();
```

#### Фермы
```typescript
// Получить все фермы
const response = await apiClient.farms.getAll();

// Получить ферму по ID
const response = await apiClient.farms.getById(id);

// Получить продукты фермы
const response = await apiClient.farms.getProducts(farmId);
```

## 🎣 React Хуки

### useProducts()

```typescript
const productsApi = useProducts();
const { data, loading, error, execute } = productsApi.getAll();

// Запуск запроса
await execute();

// Поиск
const searchApi = productsApi.search('яблоко');
await searchApi.execute();
```

### useCart()

```typescript
const cartApi = useCart();
const { data, loading, error, execute } = cartApi.getCart();

// Добавление в корзину
const addToCartApi = cartApi.addToCart(productId, quantity);
await addToCartApi.execute();
```

### useMutation()

```typescript
const mutation = useMutation(
  (data) => apiClient.products.create(data),
  {
    onSuccess: (result) => console.log('Успех:', result),
    onError: (error) => console.error('Ошибка:', error)
  }
);

// Выполнение мутации
await mutation.mutate(productData);
```

## 🔄 Интеграция с Redux

### Синхронизация состояния

```typescript
// В хуках entities
const { data: apiProducts, loading: apiLoading, error: apiError } = productsApi.getAll();

useEffect(() => {
  if (apiProducts?.data) {
    dispatch(setProducts(apiProducts.data));
  }
}, [apiProducts, dispatch]);
```

### Оптимистичные обновления

```typescript
// Мгновенное обновление UI + синхронизация с сервером
const addItem = async (product: Product, quantity: number = 1) => {
  // Оптимистичное обновление
  dispatch(addToCart({ product, quantity }));
  
  try {
    // Синхронизация с сервером
    await cartApi.addToCart(product.id, quantity).execute();
  } catch (error) {
    // Откат при ошибке
    dispatch(removeFromCart(product.id));
  }
};
```

## 🛠️ Утилиты

### apiUtils

```typescript
// Создание URL с параметрами
const url = apiUtils.createUrl('/api/products', { page: 1, limit: 10 });

// Обработка ошибок
const errorMessage = apiUtils.handleError(error);
```

## 🎯 Демонстрация

Компонент `ApiDemo` показывает полную функциональность:

- Поиск продуктов
- Фильтрация по категориям
- Загрузка всех продуктов
- Добавление в корзину
- Обработка ошибок
- Индикаторы загрузки

## 🔧 Переменные окружения

```env
# Базовый URL API
VITE_API_URL=http://localhost:3000

# Переключение между mock и реальным API
VITE_USE_MOCK_API=true
```

## 🚀 Преимущества

1. **Удобство использования** - Простой API для HTTP запросов
2. **Автоматические перехватчики** - Логирование, авторизация, обработка ошибок
3. **TypeScript поддержка** - Полная типизация
4. **React интеграция** - Специальные хуки для компонентов
5. **Обработка ошибок** - Детальные сообщения об ошибках
6. **Оптимистичные обновления** - Быстрый UI с синхронизацией
7. **Логирование** - Отладочная информация в development режиме

## 🔄 Миграция с fetch

### Было (fetch)
```typescript
const response = await fetch('/api/products');
const data = await response.json();
```

### Стало (Axios)
```typescript
const response = await apiClient.products.getAll();
const data = response.data;
```

## 📝 Примеры использования

### В компонентах
```typescript
import { useProducts } from '../shared/api/useApi';

const MyComponent = () => {
  const productsApi = useProducts();
  const { data, loading, error, execute } = productsApi.getAll();

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      {data?.data?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### Мутации
```typescript
import { useMutation } from '../shared/api/useApi';

const AddProductForm = () => {
  const mutation = useMutation(
    (productData) => apiClient.products.create(productData),
    {
      onSuccess: () => {
        toast.success('Продукт добавлен!');
      },
      onError: (error) => {
        toast.error(`Ошибка: ${error}`);
      }
    }
  );

  const handleSubmit = async (data) => {
    await mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* форма */}
      <button disabled={mutation.loading}>
        {mutation.loading ? 'Добавление...' : 'Добавить'}
      </button>
    </form>
  );
};
```

## 🎉 Заключение

Axios успешно интегрирован в проект FarmSharing, обеспечивая:

- ✅ Простоту использования
- ✅ Лучшую обработку ошибок
- ✅ Автоматические перехватчики
- ✅ TypeScript поддержку
- ✅ React интеграцию
- ✅ Оптимистичные обновления

Теперь проект готов для работы с реальным API сервером! 