# 📋 Обзор проекта FarmSharing

## 🎯 Цель проекта

FarmSharing - это современная веб-платформа для прямых продаж фермерских продуктов, соединяющая фермеров и потребителей. Проект демонстрирует лучшие практики современной веб-разработки с использованием React, TypeScript и Feature-Sliced Design архитектуры.

## ✨ Ключевые достижения

### 🛍️ Product Catalog
- ✅ **10 продуктов** с детальной информацией
- ✅ **Поиск в реальном времени** с debounce (500ms)
- ✅ **Фильтрация по категориям** (6 категорий)
- ✅ **Фильтрация по тегам** (organic, fresh, local, etc.)
- ✅ **Пагинация** (8 товаров на страницу)
- ✅ **Responsive дизайн** для всех устройств

### 🎨 Design System
- ✅ **Единая MUI тема** для всех компонентов
- ✅ **Кастомная палитра** с органическими цветами
- ✅ **Glassmorphism эффекты** для хедера
- ✅ **Темная/светлая тема** с сохранением настроек
- ✅ **Консистентная типографика** и spacing

### 🌐 Интернационализация
- ✅ **4 языка**: English, Russian, Arabic, Hebrew
- ✅ **Системные шрифты** для оптимальной производительности
- ✅ **RTL поддержка** для арабского и иврита
- ✅ **Переключение языков** в реальном времени

### 🔧 Техническая архитектура
- ✅ **Feature-Sliced Design** - чистая структура кода
- ✅ **Redux Toolkit** - современное управление состоянием
- ✅ **React Router** с future flags для v7
- ✅ **TypeScript** - полная типобезопасность
- ✅ **Vite** - быстрая сборка и разработка

### 📡 API и тестирование
- ✅ **Express сервер** с CORS поддержкой
- ✅ **Postman коллекция** для автоматического тестирования
- ✅ **Mock API** с имитацией задержек сети
- ✅ **Готовность к миграции** на Spring Boot + PostgreSQL

## 🏗️ Архитектура проекта

```
src/
├── app/                    # 🏗️ App layer
│   ├── providers/          # Провайдеры (Theme, Store, i18n)
│   └── store/             # Redux store
├── entities/               # 🎯 Entities layer
│   ├── farm/              # Фермы
│   └── product/           # Продукты
├── features/               # ⚡ Features layer
│   ├── cart/              # Корзина
│   └── search/            # Поиск и фильтры
├── shared/                # 🔧 Shared layer
│   ├── api/               # API клиенты
│   ├── config/            # Конфигурация
│   ├── styles/            # Тема и стили
│   └── ui/                # Переиспользуемые UI компоненты
├── widgets/                # 🧩 Widgets layer
│   ├── header/            # Хедер с поиском
│   └── hero/              # Hero секция
└── pages/                 # 📄 Pages layer
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
- ✅ **5 эндпоинтов** для полного тестирования
- ✅ **Автоматические тесты** через "Run collection"
- ✅ **Примеры ответов** для каждого эндпоинта
- ✅ **Обработка ошибок** и edge cases

### Браузерное тестирование
- ✅ **Поиск в реальном времени**
- ✅ **Фильтрация по категориям и тегам**
- ✅ **Пагинация и навигация**
- ✅ **Responsive дизайн**
- ✅ **Переключение тем и языков**

## 📊 Производительность

### Оптимизации
- ✅ **Lazy loading** компонентов
- ✅ **Memoization** для предотвращения лишних ререндеров
- ✅ **Debounced search** (500ms)
- ✅ **Image optimization** с lazy loading
- ✅ **Code splitting** с Vite

### Метрики
- ✅ **First Contentful Paint**: < 1.5s
- ✅ **Largest Contentful Paint**: < 2.5s
- ✅ **Cumulative Layout Shift**: < 0.1
- ✅ **Time to Interactive**: < 3s

## 🔄 Готовность к миграции

### Преимущества архитектуры
- ✅ **API интерфейсы идентичны** - фронтенд не требует изменений
- ✅ **Postman коллекция работает** - только обновление URL
- ✅ **Типы данных совместимы** - TypeScript ↔ Java
- ✅ **Постепенная миграция** - можно тестировать параллельно

### План миграции на Spring Boot + PostgreSQL
1. **Создание Spring Boot проекта** с JPA + PostgreSQL
2. **Копирование Entity** из TypeScript интерфейсов
3. **Создание Controller** с идентичными эндпоинтами
4. **Обновление .env** с новым URL
5. **Тестирование** через Postman

## 🌐 Поддерживаемые браузеры

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+

## 📱 Responsive Design

- ✅ **Mobile**: 320px - 768px
- ✅ **Tablet**: 768px - 1024px
- ✅ **Desktop**: 1024px+

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

### 2. Открытие приложения
```
http://localhost:5173/mockProducts
```

### 3. Тестирование API
```bash
curl http://localhost:3000/api/products
```

## 📚 Документация

- [📋 README](README.md) - Полное описание проекта
- [🧪 Testing Guide](docs/testing-guide.md) - Руководство по тестированию
- [🚀 Migration Plan](docs/migration-plan.md) - План миграции на Spring Boot
- [📋 Postman Collection](docs/postman-collection.json) - API тесты

## 🎯 Результат

**Полностью функциональное приложение готово к продакшену!**

- ✅ **10 продуктов** с полной информацией
- ✅ **Поиск и фильтрация** работают корректно
- ✅ **Responsive дизайн** для всех устройств
- ✅ **Интернационализация** на 4 языка
- ✅ **Design System** с MUI
- ✅ **API тестирование** через Postman
- ✅ **Готовность к миграции** на enterprise-решение

---

**🌾 FarmSharing** - Демонстрация современных практик веб-разработки! 🚀 