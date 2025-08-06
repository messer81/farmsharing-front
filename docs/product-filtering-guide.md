# 🔍 Руководство по фильтрации и поиску продуктов

## 📋 Обзор

Система фильтрации продуктов реализована в компонентах `FeaturedProducts` и `ProductsGrid` с использованием единой простой логики.

## 🏗️ Архитектура

### **Принцип работы:**
1. **Источник данных:** `allProducts` - полный список продуктов
2. **Вычисляемое свойство:** `filteredProducts` - результат фильтрации
3. **Состояния фильтров:** `selectedCategory`, `searchQuery`
4. **Мгновенное обновление:** без async операций

## 💡 Реализация

### **1. Базовая структура данных:**
```typescript
const [allProducts, setAllProducts] = useState<Product[]>([]);
const [selectedCategory, setSelectedCategory] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
```

### **2. Логика фильтрации (единая для всех компонентов):**
```typescript
const filteredProducts = (() => {
  let result = allProducts;
  
  // Фильтр по категории
  if (selectedCategory !== 'all') {
    result = result.filter(product => 
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }
  
  // Фильтр по поисковому запросу
  if (searchQuery.trim()) {
    result = result.filter(product =>
      product.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.title.ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.ru.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return result;
})();
```

### **3. Синхронизация данных:**
```typescript
// Данные из API
useEffect(() => {
  if (data?.data) {
    setAllProducts(data.data);
  }
}, [data]);

// Данные из пропсов
useEffect(() => {
  if (initialProducts) {
    setAllProducts(initialProducts); // ⚠️ ВАЖНО: обновляем allProducts!
  }
}, [initialProducts]);
```

## 🎯 Компоненты

### **FeaturedProducts.tsx**
- **Назначение:** Рекомендуемые продукты на главной странице
- **Данные:** Загружает через `useProductsPaginated`
- **Особенности:** Ограничение `maxProducts = 10`

### **ProductsGrid.tsx**
- **Назначение:** Полный каталог продуктов с поиском
- **Данные:** Принимает `initialProducts` или загружает через API
- **Особенности:** Поддержка пагинации и тегов

## 🛠️ Обработчики событий

### **Простые обработчики (без async):**
```typescript
const handleCategoryClick = useCallback((categoryId: string) => {
  setSelectedCategory(categoryId);
}, []);

const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(event.target.value);
}, []);
```

## 🎨 UI компоненты

### **Кнопки категорий:**
```typescript
const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: t('products.all'), icon: '🛒' },
    { id: 'vegetables', name: t('products.vegetables'), icon: '🥬' },
    { id: 'fruits', name: t('products.fruits'), icon: '🍎' },
    // ...
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={`${category.icon} ${category.name}`}
          onClick={() => onCategoryChange(category.id)}
          sx={{
            backgroundColor: selectedCategory === category.id ? '#22c55e' : '#f3f4f6',
            // стили...
          }}
        />
      ))}
    </Box>
  );
};
```

### **Поисковая строка:**
```typescript
<TextField
  fullWidth
  placeholder="Поиск продуктов..."
  value={searchQuery}
  onChange={handleSearchChange}
  InputProps={{
    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      // стили...
    }
  }}
/>
```

## ⚡ Производительность

### **Преимущества текущей реализации:**
- **🚀 Мгновенная реакция** - нет задержек от API вызовов
- **💡 Простота** - логика понятна и легко отлаживается
- **🔄 Переиспользование** - одна логика для всех компонентов
- **📱 Отзывчивость** - работает плавно на всех устройствах

### **Автоматическое вычисление:**
- Фильтрация происходит автоматически при изменении `selectedCategory` или `searchQuery`
- React оптимизирует перерендеринг благодаря вычисляемому свойству
- Нет необходимости в `useCallback` для самой логики фильтрации

## 🐛 Частые ошибки

### **❌ Неправильно:**
```typescript
// Не обновляем allProducts при получении initialProducts
useEffect(() => {
  if (initialProducts) {
    setProducts(initialProducts); // allProducts остается пустым!
  }
}, [initialProducts]);
```

### **✅ Правильно:**
```typescript
// Синхронизируем allProducts с initialProducts
useEffect(() => {
  if (initialProducts) {
    setProducts(initialProducts);
    setAllProducts(initialProducts); // ✅ Фильтрация работает!
  }
}, [initialProducts]);
```

## 🔮 Будущие улучшения

- **Дебаунс для поиска** - уменьшить количество фильтраций при быстром вводе
- **Сохранение фильтров** - запоминать состояние при переходах между страницами
- **Расширенные фильтры** - цена, рейтинг, локация
- **Сортировка** - по цене, популярности, дате добавления

---

**📝 Примечание:** Эта документация отражает состояние после исправления критических ошибок поиска и фильтрации (5 августа 2025).