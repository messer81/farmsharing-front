# 🌾 FarmSharing - Платформа для прямых продаж фермерских продуктов

## 📋 Описание проекта

FarmSharing - это современная веб-платформа, соединяющая фермеров и потребителей для прямых продаж свежих, органических продуктов. Проект построен на React + TypeScript с использованием Feature-Sliced Design архитектуры и Material-UI.

## ✨ Основные возможности

### 🛍️ Product Catalog
- **Адаптивная сетка продуктов** с красивыми карточками
- **Поиск в реальном времени** по названию, описанию, категории, ферме
- **Фильтрация по категориям** (Vegetables, Fruits, Herbs, Dairy, Pantry, Flowers)
- **Фильтрация по тегам** (organic, fresh, local, natural, etc.)
- **Пагинация** для удобной навигации
- **Responsive дизайн** для всех устройств

### 🎨 Design System
- **Единая тема MUI** для всех компонентов
- **Кастомная палитра цветов** с поддержкой темной/светлой темы
- **Консистентная типографика** и spacing
- **Hover эффекты** и анимации
- **Glassmorphism эффекты** для хедера

### 🌐 Интернационализация
- **Поддержка 4 языков**: English, Russian, Arabic, Hebrew
- **Системные шрифты** для оптимальной производительности
- **RTL поддержка** для арабского и иврита

### 🔧 Технические возможности
- **Feature-Sliced Design** архитектура
- **Redux Toolkit** для управления состоянием
- **React Router** с future flags для v7
- **Mock API** с Postman-совместимостью
- **Express сервер** для тестирования
- **Готовность к миграции** на Spring Boot + PostgreSQL

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск сервера API
```bash
# Запуск Express сервера
node server.cjs

# Или для разработки с автоматической перезагрузкой
npx nodemon server.cjs
```

### 3. Запуск фронтенда
```bash
npm run dev
```

### 4. Открытие приложения
```
http://localhost:5173/mockProducts
```

## 📁 Структура проекта

```
farmsharing-front/
├── src/
│   ├── app/                    # 🏗️ App layer
│   │   ├── providers/          # Провайдеры (Theme, Store, i18n)
│   │   └── store/             # Redux store
│   ├── entities/               # 🎯 Entities layer
│   │   ├── farm/              # Фермы
│   │   └── product/           # Продукты
│   ├── features/               # ⚡ Features layer
│   │   ├── cart/              # Корзина
│   │   └── search/            # Поиск и фильтры
│   ├── shared/                # 🔧 Shared layer
│   │   ├── api/               # API клиенты
│   │   ├── config/            # Конфигурация
│   │   ├── styles/            # Тема и стили
│   │   └── ui/                # Переиспользуемые UI компоненты
│   ├── widgets/                # 🧩 Widgets layer
│   │   ├── header/            # Хедер с поиском
│   │   └── hero/              # Hero секция
│   └── pages/                 # 📄 Pages layer
├── docs/                       # 📚 Документация
├── server.cjs                  # 🚀 Express API сервер
└── package.json
```

## 🛠️ Технологический стек

### Frontend
- **React 18** с TypeScript
- **Material-UI (MUI)** для компонентов
- **Redux Toolkit** для state management
- **React Router** для навигации
- **React i18next** для интернационализации
- **Vite** для сборки

### Backend (Mock API)
- **Express.js** сервер
- **CORS** для кросс-доменных запросов
- **Postman-совместимые** эндпоинты

### Design System
- **MUI Theme** с кастомной палитрой
- **CSS Variables** для темизации
- **Responsive Design** с breakpoints
- **Glassmorphism** эффекты

## 📡 API Endpoints

### Products API
```
GET /api/products                    # Все продукты с пагинацией
GET /api/products/:id               # Продукт по ID
GET /api/products/search?q=query    # Поиск продуктов
GET /api/products/category/:category # Фильтрация по категории
```

### Примеры запросов
```bash
# Получить все продукты
curl http://localhost:3000/api/products

# Поиск по ключевому слову
curl http://localhost:3000/api/products/search?q=tomato

# Фильтрация по категории
curl http://localhost:3000/api/products/category/Vegetables

# Пагинация
curl http://localhost:3000/api/products?page=1&limit=4
```

## 🧪 Тестирование

### Postman Collection
1. Импортируйте `docs/postman-collection.json`
2. Установите переменную `baseUrl = http://localhost:3000`
3. Запустите тесты через "Run collection"

### Браузерное тестирование
```
http://localhost:3000/              # Health check
http://localhost:3000/api/products  # API тест
http://localhost:5173/mockProducts  # Фронтенд
```

## 🎨 Design System

### Цветовая палитра
```css
/* Primary Colors */
--color-primary: #22c55e;          /* Organic Green */
--color-secondary: #fbbf24;        /* Golden Yellow */
--color-accent: #3b82f6;          /* Blue Accent */

/* Semantic Colors */
--color-success: #22c55e;          /* Success Green */
--color-warning: #f59e0b;          /* Warning Orange */
--color-error: #ef4444;            /* Error Red */
--color-info: #3b82f6;             /* Info Blue */
```

### Типографика
```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Typography Scale */
h1: 2.5rem (40px) - Bold
h2: 2rem (32px) - Bold  
h3: 1.75rem (28px) - Bold
h4: 1.5rem (24px) - Bold
h5: 1.25rem (20px) - Medium
h6: 1rem (16px) - Medium
body: 1rem (16px) - Regular
```

### Spacing System
```css
/* 8px Grid System */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## 🔄 Миграция на Spring Boot + PostgreSQL

Проект специально спроектирован для легкой миграции на enterprise-решение:

### Преимущества архитектуры
- ✅ **API интерфейсы идентичны** - фронтенд не требует изменений
- ✅ **Postman коллекция работает** - только обновление URL
- ✅ **Типы данных совместимы** - TypeScript ↔ Java
- ✅ **Постепенная миграция** - можно тестировать параллельно

### План миграции
1. **Создание Spring Boot проекта** с JPA + PostgreSQL
2. **Копирование Entity** из TypeScript интерфейсов
3. **Создание Controller** с идентичными эндпоинтами
4. **Обновление .env** с новым URL
5. **Тестирование** через Postman

Подробный план в `docs/migration-plan.md`

## 📊 Производительность

### Оптимизации
- **Lazy loading** компонентов
- **Memoization** для предотвращения лишних ререндеров
- **Debounced search** (500ms)
- **Virtual scrolling** для больших списков
- **Image optimization** с lazy loading

### Метрики
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🌐 Поддерживаемые браузеры

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Конфигурация

### Environment Variables
```env
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK_API=false
PORT=3000
```

### Переключение режимов
```env
# Для разработки (Mock API)
VITE_USE_MOCK_API=true

# Для тестирования (Real API)
VITE_USE_MOCK_API=false
VITE_API_URL=http://localhost:3000
```

## 📚 Документация

- [🧪 Testing Guide](docs/testing-guide.md) - Руководство по тестированию
- [🚀 Migration Plan](docs/migration-plan.md) - План миграции на Spring Boot
- [📋 Postman Collection](docs/postman-collection.json) - API тесты

## 🤝 Contributing

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл для деталей

## 🎯 Roadmap

### Phase 1 (Текущая) ✅
- [x] Product Catalog с поиском и фильтрацией
- [x] Design System с MUI
- [x] Mock API с Express
- [x] Интернационализация
- [x] Responsive дизайн

### Phase 2 (Планируется)
- [ ] Spring Boot + PostgreSQL backend
- [ ] Аутентификация и авторизация
- [ ] Система заказов и оплаты
- [ ] Управление фермами
- [ ] Отзывы и рейтинги

### Phase 3 (Будущее)
- [ ] Мобильное приложение
- [ ] Push уведомления
- [ ] Аналитика и дашборды
- [ ] Интеграция с платежными системами
- [ ] AI рекомендации

---

**🌾 FarmSharing** - Соединяем фермеров и потребителей для свежих продуктов! 🚀
