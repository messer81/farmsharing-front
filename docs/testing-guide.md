# 🧪 Руководство по тестированию FarmSharing

## 📋 Содержание
1. [Быстрый старт](#быстрый-старт)
2. [Тестирование API](#тестирование-api)
3. [Тестирование фронтенда](#тестирование-фронтенда)
4. [Postman коллекция](#postman-коллекция)
5. [Отладка](#отладка)
6. [Производительность](#производительность)

## 🚀 Быстрый старт

### 1. Установка и запуск
```bash
# Установка зависимостей
npm install

# Запуск API сервера
node server.cjs

# В отдельном терминале - запуск фронтенда
npm run dev
```

### 2. Проверка работоспособности
```bash
# Проверка API
curl http://localhost:3000/

# Проверка продуктов
curl http://localhost:3000/api/products

# Открытие фронтенда
http://localhost:5173/mockProducts
```

## 📡 Тестирование API

### Health Check
```bash
curl http://localhost:3000/
```
**Ожидаемый ответ:**
```json
{
  "message": "FarmSharing API Server",
  "version": "1.0.0",
  "endpoints": [
    "GET /api/products",
    "GET /api/products/:id",
    "GET /api/products/search?q=query",
    "GET /api/products/category/:category"
  ]
}
```

### Получение всех продуктов
```bash
curl http://localhost:3000/api/products
```
**Ожидаемый ответ:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Fresh Organic Tomatoes",
      "description": "Sweet and juicy tomatoes grown without pesticides.",
      "price": 3.99,
      "originalPrice": 4.99,
      "imageUrl": "/src/assets/tomat.jpg",
      "category": "Vegetables",
      "farmName": "Green Valley Farm",
      "rating": 4.8,
      "isOrganic": true,
      "unit": "kg",
      "stock": 50,
      "tags": ["organic", "fresh", "local"]
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 8,
  "totalPages": 2
}
```

### Поиск продуктов
```bash
curl "http://localhost:3000/api/products/search?q=tomato"
curl "http://localhost:3000/api/products/search?q=organic"
curl "http://localhost:3000/api/products/search?q=fresh"
```

### Фильтрация по категории
```bash
curl http://localhost:3000/api/products/category/Vegetables
curl http://localhost:3000/api/products/category/Fruits
curl http://localhost:3000/api/products/category/Herbs
```

### Пагинация
```bash
curl "http://localhost:3000/api/products?page=1&limit=4"
curl "http://localhost:3000/api/products?page=2&limit=4"
```

### Получение продукта по ID
```bash
curl http://localhost:3000/api/products/1
curl http://localhost:3000/api/products/5
```

## 🌐 Тестирование фронтенда

### Основные страницы
```
http://localhost:5173/              # Главная страница
http://localhost:5173/mockProducts  # Каталог продуктов
http://localhost:5173/farm/1        # Страница фермы
```

### Функциональность каталога

#### 1. Поиск
- Введите "tomato" в поле поиска
- Введите "organic" для органических продуктов
- Введите "fresh" для свежих продуктов
- Проверьте debounce (500ms задержка)

#### 2. Фильтрация по категориям
- Выберите "Vegetables" - покажет только овощи
- Выберите "Fruits" - покажет только фрукты
- Выберите "Herbs" - покажет только травы
- Выберите "All Categories" - покажет все

#### 3. Фильтрация по тегам
- Кликните на "organic" - покажет органические продукты
- Кликните на "fresh" - покажет свежие продукты
- Кликните на "local" - покажет локальные продукты
- Проверьте множественный выбор тегов

#### 4. Пагинация
- Проверьте навигацию между страницами
- Убедитесь, что на каждой странице 8 продуктов
- Проверьте кнопки "Previous" и "Next"

#### 5. Responsive дизайн
- Измените размер окна браузера
- Проверьте на мобильных устройствах
- Убедитесь, что сетка адаптируется

### Функциональность хедера

#### 1. Поиск в хедере
- Кликните на лупу в хедере
- Проверьте разворачивание поисковой строки
- Проверьте сворачивание при потере фокуса

#### 2. Переключение темы
- Кликните на иконку солнца/луны
- Проверьте переключение между темной и светлой темой
- Убедитесь, что настройка сохраняется

#### 3. Переключение языка
- Кликните на иконку языка
- Выберите другой язык
- Проверьте перевод интерфейса

#### 4. Корзина
- Кликните на иконку корзины
- Проверьте открытие drawer
- Проверьте счетчик товаров

## 📋 Postman коллекция

### Импорт коллекции
1. Откройте Postman
2. Нажмите "Import"
3. Выберите файл `docs/postman-collection.json`

### Настройка переменных
1. Откройте коллекцию "FarmSharing Products API"
2. Перейдите в "Variables"
3. Установите `baseUrl = http://localhost:3000`

### Запуск тестов
1. Выберите коллекцию
2. Нажмите "Run collection"
3. Выберите все запросы
4. Нажмите "Run"

### Тестовые сценарии

#### Сценарий 1: Получение продуктов
1. `GET {{baseUrl}}/api/products` - получить все продукты
2. `GET {{baseUrl}}/api/products?page=1&limit=4` - пагинация
3. `GET {{baseUrl}}/api/products/1` - продукт по ID

#### Сценарий 2: Поиск и фильтрация
1. `GET {{baseUrl}}/api/products/search?q=tomato` - поиск
2. `GET {{baseUrl}}/api/products/category/Vegetables` - категория
3. `GET {{baseUrl}}/api/products/search?q=organic` - органические

#### Сценарий 3: Обработка ошибок
1. `GET {{baseUrl}}/api/products/999` - несуществующий ID
2. `GET {{baseUrl}}/api/products/category/Invalid` - несуществующая категория

## 🐛 Отладка

### Проверка статуса сервера
```bash
# Проверка порта
netstat -an | findstr :3000

# Проверка процесса
tasklist | findstr node

# Убить процесс если нужно
taskkill /F /IM node.exe
```

### Логи сервера
```bash
# Запуск с логированием
node server.cjs

# Ожидаемые логи:
# 🚀 Server running on http://localhost:3000
# 📡 API available at http://localhost:3000/api/products
# 🔍 Health check at http://localhost:3000/
```

### Логи фронтенда
```bash
# В браузере DevTools Console
# Проверьте отсутствие ошибок
# Проверьте React Router предупреждения
```

### CORS ошибки
```bash
# Проверьте настройки CORS в server.cjs
app.use(cors());

# Проверьте заголовки в Network tab
Access-Control-Allow-Origin: *
```

### Проблемы с изображениями
```bash
# Проверьте пути к изображениям
/src/assets/tomat.jpg
/src/assets/cucumber.jpg
# и т.д.

# Убедитесь, что файлы существуют в public/assets/
```

## 📊 Производительность

### Метрики Core Web Vitals
```bash
# Используйте Chrome DevTools Lighthouse
# Ожидаемые результаты:
# First Contentful Paint: < 1.5s
# Largest Contentful Paint: < 2.5s
# Cumulative Layout Shift: < 0.1
# Time to Interactive: < 3s
```

### Оптимизация изображений
```bash
# Проверьте размеры изображений
# Рекомендуемые размеры:
# Product cards: 300x200px
# Hero images: 1200x600px
# Icons: 24x24px
```

### Мониторинг памяти
```bash
# В Chrome DevTools Memory tab
# Проверьте отсутствие утечек памяти
# Проверьте размер heap
```

## ✅ Чек-лист тестирования

### API тесты
- [ ] Health check работает
- [ ] Получение всех продуктов работает
- [ ] Пагинация работает
- [ ] Поиск работает
- [ ] Фильтрация по категории работает
- [ ] Получение продукта по ID работает
- [ ] CORS настроен правильно
- [ ] Обработка ошибок работает

### Фронтенд тесты
- [ ] Страницы загружаются без ошибок
- [ ] Поиск работает в реальном времени
- [ ] Фильтры работают корректно
- [ ] Пагинация работает
- [ ] Responsive дизайн работает
- [ ] Темная/светлая тема работает
- [ ] Переключение языков работает
- [ ] Корзина работает

### Производительность
- [ ] Время загрузки < 3 секунд
- [ ] Нет ошибок в консоли
- [ ] Изображения загружаются
- [ ] Анимации плавные
- [ ] Нет утечек памяти

### Браузерная совместимость
- [ ] Chrome 90+ работает
- [ ] Firefox 88+ работает
- [ ] Safari 14+ работает
- [ ] Edge 90+ работает

## 🚨 Устранение неполадок

### Проблема: Сервер не запускается
```bash
# Решение:
npm install
node server.cjs
```

### Проблема: Фронтенд не подключается к API
```bash
# Проверьте .env файл
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK_API=false

# Перезапустите фронтенд
npm run dev
```

### Проблема: CORS ошибки
```bash
# Убедитесь, что сервер запущен
node server.cjs

# Проверьте настройки CORS
app.use(cors());
```

### Проблема: Изображения не загружаются
```bash
# Проверьте пути в mockProducts.ts
imageUrl: "/src/assets/tomat.jpg"

# Убедитесь, что файлы существуют
ls src/assets/
```

## 📈 Мониторинг

### Chrome DevTools
1. Откройте DevTools (F12)
2. Перейдите в Network tab
3. Фильтруйте по "Fetch/XHR"
4. Отправляйте запросы и анализируйте

### Postman Console
1. Откройте Postman Console (View → Show Postman Console)
2. Отправляйте запросы
3. Анализируйте логи

### Логи сервера
```bash
# В терминале с сервером
node server.cjs

# Ожидаемые логи:
# GET /api/products 200 15.123 ms
# GET /api/products/search?q=tomato 200 8.456 ms
```

---

**🎯 Результат:** Полностью протестированное приложение готово к продакшену! 🚀 