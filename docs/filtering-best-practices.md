# 🎯 Best Practices: Фильтрация и поиск данных

## 📚 Основные принципы

### **1. ✅ DO: Используйте вычисляемые свойства**
```typescript
// ✅ Правильно: простое вычисляемое свойство
const filteredData = useMemo(() => {
  return allData.filter(item => /* логика фильтрации */);
}, [allData, searchQuery, selectedCategory]);

// Или еще проще (для небольших данных):
const filteredData = (() => {
  return allData.filter(item => /* логика фильтрации */);
})();
```

### **2. ❌ DON'T: Избегайте сложной async логики для фильтрации**
```typescript
// ❌ Неправильно: async для клиентской фильтрации
const handleSearch = useCallback(async () => {
  setLoading(true);
  const filtered = allData.filter(/* логика */);
  setFilteredData(filtered);
  setLoading(false);
}, []);
```

### **3. ✅ DO: Синхронизируйте источники данных**
```typescript
// ✅ Правильно: обновляйте ВСЕ состояния
useEffect(() => {
  if (initialData) {
    setData(initialData);
    setAllData(initialData); // 🔑 КЛЮЧЕВОЕ: не забывайте!
  }
}, [initialData]);
```

## 🔧 Архитектурные паттерны

### **Паттерн "Единый источник истины"**
```typescript
// ✅ Одно место для хранения всех данных
const [allProducts, setAllProducts] = useState<Product[]>([]);

// ✅ Вычисляемые производные
const filteredProducts = /* фильтрация allProducts */;
const searchResults = /* поиск в allProducts */;
const categorizedProducts = /* группировка allProducts */;
```

### **Паттерн "Переиспользование логики"**
```typescript
// ✅ Вынесите общую логику в хук
const useProductFiltering = (allProducts: Product[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProducts = useMemo(() => {
    let result = allProducts;
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (searchQuery.trim()) {
      result = result.filter(product => /* поиск */);
    }
    
    return result;
  }, [allProducts, searchQuery, selectedCategory]);
  
  return {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  };
};
```

## ⚡ Производительность

### **1. ✅ DO: Используйте useMemo для дорогих вычислений**
```typescript
// ✅ Для больших массивов данных
const filteredProducts = useMemo(() => {
  return allProducts.filter(product => {
    // сложная логика фильтрации
  });
}, [allProducts, filters]);
```

### **2. ✅ DO: Дебаунс для поиска по тексту**
```typescript
// ✅ Оптимизация для поиска
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

const debouncedSearchQuery = useDebounce(searchQuery, 300);
```

### **3. ❌ DON'T: Не фильтруйте уже отфильтрованные данные**
```typescript
// ❌ Неправильно: теряются данные
const handleCategoryFilter = (category) => {
  const filtered = filteredProducts.filter(/* логика */); // ❌ Ошибка!
  setProducts(filtered);
};

// ✅ Правильно: всегда фильтруйте полный набор
const handleCategoryFilter = (category) => {
  setSelectedCategory(category); // Пусть вычисляемое свойство сделает работу
};
```

## 🎨 UX паттерны

### **1. Мгновенная обратная связь**
```typescript
// ✅ Показывайте результаты сразу
const SearchInput = ({ value, onChange }) => (
  <TextField
    value={value}
    onChange={(e) => onChange(e.target.value)} // Мгновенно!
    placeholder="Начните вводить..."
  />
);
```

### **2. Пустые состояния**
```typescript
// ✅ Информативные сообщения
{filteredProducts.length === 0 ? (
  <EmptyState 
    title="Продукты не найдены"
    description={searchQuery 
      ? `Нет результатов для "${searchQuery}"`
      : "Попробуйте изменить критерии поиска"
    }
  />
) : (
  <ProductGrid products={filteredProducts} />
)}
```

### **3. Индикаторы состояния**
```typescript
// ✅ Показывайте количество результатов
<Typography variant="body2" color="text.secondary">
  Найдено {filteredProducts.length} из {allProducts.length} продуктов
</Typography>
```

## 🔒 Типобезопасность

### **✅ DO: Типизируйте фильтры**
```typescript
// ✅ Строгая типизация
interface ProductFilters {
  category: ProductCategory | 'all';
  searchQuery: string;
  priceRange?: [number, number];
  tags?: string[];
}

interface FilterState {
  products: Product[];
  filters: ProductFilters;
  isLoading: boolean;
}
```

## 🧪 Тестирование

### **✅ DO: Тестируйте логику фильтрации**
```typescript
// ✅ Юнит-тесты для чистых функций
describe('filterProducts', () => {
  it('should filter by category', () => {
    const products = mockProducts;
    const result = filterProducts(products, { category: 'fruits' });
    expect(result.every(p => p.category === 'fruits')).toBe(true);
  });
  
  it('should handle search queries', () => {
    const products = mockProducts;
    const result = filterProducts(products, { searchQuery: 'apple' });
    expect(result.length).toBeGreaterThan(0);
  });
});
```

## 📝 Чек-лист для код-ревью

- [ ] ✅ Данные фильтруются от полного набора (`allData`)
- [ ] ✅ Нет async операций для клиентской фильтрации
- [ ] ✅ Состояния синхронизированы при обновлении данных
- [ ] ✅ Используются вычисляемые свойства или `useMemo`
- [ ] ✅ Обработаны пустые состояния
- [ ] ✅ Добавлена типизация для фильтров
- [ ] ✅ Логика переиспользуется между компонентами
- [ ] ✅ Есть индикаторы количества результатов

---

**💡 Главное правило:** Простота > Сложность. Если логика фильтрации работает в одном компоненте, переиспользуйте её, вместо изобретения нового подхода!