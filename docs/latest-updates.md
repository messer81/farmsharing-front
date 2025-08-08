# 🚀 Последние обновления - FarmSharing Frontend

## 📅 Версия 2.3.1 – Тёмная тема: брендовый зелёный, типографика и размеры кнопок

### ✨ Что изменилось

- Возвращён брендовый зелёный цвет в тёмной теме:
  - `palette.primary` теперь зелёный (как в светлой теме) → все `color="primary"` снова зелёные
  - Добавлен `palette.success` в тёмную тему → Chip “Organic” и success-стили корректно зелёные
  - Градиент у `Typography` варианта `sectionTitle` переведён на зелёный
- Типографика тёмной темы выровнена со светлой:
  - Добавлены `typography` (h1–h6, body1/2, button) и все кастомные варианты (`sectionTitle`, `sectionSubtitle`, `heroTitle`, `heroSubtitle`)
- Логотип в хедере:
  - Стили перенесены на `MuiTypography.styleOverrides.root` для класса `.header-logo` → применяются независимо от `variant`
  - Единый адаптивный размер через `fontSize: clamp(...)`, цвет от `primary.main`
- Размеры кнопок в тёмной теме приведены к светлой:
  - Базовый `minHeight: 48px`, `padding: 12px 24px`, `fontSize: 16px`, а также `sizeSmall`/`sizeLarge` и тени/hover
- Футер и глобальные стили:
  - В `index.css` для тёмной темы заменены CSS‑переменные `--color-primary`, `--color-success`, `--color-focus-ring`, `--color-btn-primary-text` на зелёные значения в соответствии с темой

### 🔧 Изменённые файлы

- `src/shared/styles/theme.ts` — правки `darkTheme`: палитра, типографика, `MuiTypography` и `MuiButton`
- `src/index.css` — выравнивание CSS‑переменных тёмной темы под брендовый зелёный

### ✅ Как проверить

1. Переключите тему на тёмную
2. Убедитесь, что:
   - Кнопки и все элементы с `color="primary"` зелёные
   - Chip “Organic” зелёный (`success`)
   - Заголовки секций имеют зелёный градиент
   - Лого в хедере читаемое, с корректным размером
   - Размеры кнопок идентичны светлой теме

### 📝 Примечание

Если где-либо есть локальные `sx`/CSS с бирюзовыми значениями, замените их на значения из темы (`theme.palette.primary`, `theme.palette.success`) — теперь всё централизовано в теме.

---

## 📅 Версия 2.3.0 – RTK Query, фасад API, FSD-правки и перф

### 🧭 Краткий статус (где мы сейчас)

| Пункт | Статус | Примечание |
|---|---|---|
| Развязка FSD: `entities/product/ui/ProductCard` не зависит от `features/cart` | ✅ Готово | Передача `onAddToCart` сверху; обёртка на уровне фич |
| Сущность `user` (entity) | ✅ Готово | Slice c доменной моделью, селекторы, RTK Query профиль |
| Сущность `order` (entity) | ✅ Готово | Типы, slice, RTK Query: `createOrder`, `getOrdersByUser` |
| Продукты на RTK Query | ✅ Готово | `getProducts`, `getProductsPaginated`; серверные фильтры category/search, префетч |
| Фермы на RTK Query | ✅ Готово | `getFarms`, `getFarmById`; `FarmPage`/`FarmProfiles` мигрированы |
| Авторизация на RTK Query | ✅ Готово | `login/register/forgot` через мутации; профиль через query |
| Упрощение `features/auth/model/userSlice` | ✅ Готово | Убраны async-thunks, оставлены локальные поля |
| Фасад API `shared/api/index.ts` | ✅ Готово | Единая точка импортов хуков |
| MUI: адресные импорты + ESLint запрет баррелей | ✅ Готово/частично | В ключевых файлах заменено; правило добавлено |
| Мемо-селекторы | ✅ Готово | Cart totals, header unread, filtered products/farms |
| Скрипты запуска dev | ✅ Готово | `dev` без kill, `dev:clean` с чисткой |
| Виртуализация длинных списков | ⏳ Запланировано | react-window для N>~60 |
| Checkout: интеграция `order.createOrder` | ⏳ Запланировано | Привязать к корзине |

### ✨ Основные изменения

- Введён базовый RTK Query (`shared/api/rtk.ts`), подключён в store: кэш, статусы, инвалидация тегов.
- Создан фасад API (`shared/api/index.ts`) с реэкспортом хуков: products, user, order, farms.
- Мигрированы страницы и виджеты на RTK Query: `ProductsPage`, `ProductsGrid`, `FeaturedProducts`, `FarmPage`, `FarmProfiles`.
- Серверные фильтры для продуктов: category, search; добавлен префетч следующей страницы.
- Авторизация: `login/register/forgot` через мутации; `AuthFrame` показывает статусы/ошибки мутаций; профиль — через query; автоочистка токена при 401/403.
- FSD-правки: `ProductCard` больше не импортирует cart slice; передача экшенов через пропсы.
- Перф: мемо-селекторы (`cart`, `header`, `product`, `farm`), адресные импорты MUI, правило ESLint на баррель-импорты.
- Dev scripts: `dev` не убивает процессы; чистка вынесена в `dev:clean`.

### 🔧 Изменённые/добавленные файлы (ключевые)

- `src/shared/api/rtk.ts`, `src/shared/api/index.ts`
- `src/entities/*/model/rtkApi.ts` (products, user, order, farms)
- `src/entities/user/model/userSlice.ts`, `src/entities/order/model/orderSlice.ts`
- `src/pages/ProductsPage.tsx`, `src/entities/product/ui/ProductsGrid.tsx`, `src/entities/product/ui/FeaturedProducts.tsx`
- `src/pages/FarmPage.tsx`, `src/entities/farm/ui/FarmProfiles.tsx`
- `src/features/auth/ui/AuthFrame.tsx`
- `src/widgets/header/model/headerSlice.ts` (мемо-селектор)
- `src/features/cart/model/cartSlice.ts` (мемо-селекторы)
- `eslint.config.js` (no-restricted-imports для MUI)
- `package.json` (scripts: `dev`, `dev:clean`)

### ▶️ Запуск (обновлено)

```bash
npm run dev        # запустить клиент (Vite) и сервер (node server.cjs)
npm run dev:clean  # если порты залипли: убить node.exe и запустить заново
```

### 🔜 Что дальше

- Checkout: интегрировать `useCreateOrderMutation` с корзиной.
- Серверные фильтры: цена/теги (при наличии бэкенд-поддержки).
- Виртуализация для длинных списков (react-window) при N>~60.
- Довести адресные импорты MUI по всем файлам.

---

## 📅 Версия 2.2.0 - Миграция на JSON базу данных и исправления

### 🎯 Критические исправления

#### ✅ Исправление ошибки React hooks в ProductsGrid
**Проблема:** `Invalid hook call` и `useContext` ошибки на странице продуктов
**Решение:** Убраны зависимости от `fetchProducts` в `useEffect`

**Файлы:**
- `src/entities/product/ui/ProductsGrid.tsx` - исправлен `useEffect` (строка 70)
- `src/pages/ProductsPage.tsx` - исправлен `useEffect` (строка 25)

#### ✅ Миграция пользователей на JSON базу данных

**Новые файлы:**
- `data/users.json` - хранилище пользователей (5 тестовых пользователей)
- `data/userDatabase.cjs` - API для работы с JSON файлом

**Обновленные файлы:**
- `server.cjs` - полная интеграция с JSON базой данных
- Удален in-memory массив `mockUsers`

**API функции userDatabase.cjs:**
- `loadUsers()` - загрузка из JSON
- `saveUsers()` - сохранение в JSON  
- `findUserByEmail(email)` - поиск по email
- `findUserById(id)` - поиск по ID
- `addUser(userData)` - добавление пользователя
- `updateUser(id, updates)` - обновление пользователя
- `getUserStats()` - статистика пользователей
- `getAllUsers()` - все пользователи

**Интеграция в server.cjs:**
- Google OAuth стратегия → `userDB.findUserByEmail`, `userDB.addUser`
- `/api/auth/login` → `userDB.findUserByEmail`
- `/api/auth/register` → `userDB.findUserByEmail`, `userDB.addUser`
- `/api/auth/profile` (GET/PUT) → `userDB.findUserById`, `userDB.updateUser`
- `/api/auth/forgot-password` → `userDB.findUserByEmail`
- **Новый endpoint:** `/api/admin/users/stats` - статистика JSON базы

#### ✅ Автоматизация процессов

**package.json скрипты:**
```json
{
  "kill-processes": "taskkill /f /im node.exe 2>nul || echo \"No node processes to kill\"",
  "dev": "npm run kill-processes && concurrently \"npm run dev:client\" \"npm run dev:server\"",
  "dev:clean": "npm run kill-processes && npm run dev"
}
```

**Решение проблем с портами:**
- Автоматическое завершение Node.js процессов
- Предотвращение `EADDRINUSE` ошибок
- Команда `npm run kill-processes` для ручной очистки

---

## 📅 Версия 2.1.0 - Интеграция модального окна продукта

### 🎯 Основные изменения

#### ✅ Новая функциональность: Модальное окно детального просмотра продукта

**Местоположение:** `src/entities/product/ui/ProductDetails.tsx`

**Ключевые возможности:**
- 📱 **Адаптивный дизайн** - оптимизирован для мобильных и десктопных устройств
- 🌍 **Многоязычность** - поддержка 4 языков (русский, английский, иврит, арабский)
- 🛒 **Интеграция с корзиной** - добавление товаров с выбранным количеством
- 💰 **Автоматический расчет цены** - пересчет при изменении количества
- 👨‍🌾 **Контакт с фермером** - кнопка для связи с производителем

#### 🔧 Технические детали

**Компоненты:**
- `ProductDetails.tsx` - модальное окно с полной функциональностью
- Обновлен `ProductCard.tsx` - добавлен обработчик клика по карточке
- Обновлен `ProductsGrid.tsx` - добавлено состояние модального окна
- Обновлен `FeaturedProducts.tsx` - добавлена поддержка модального окна

**Архитектура FSD:**
```
src/entities/product/ui/
├── ProductDetails.tsx    # 🆕 Модальное окно
├── ProductCard.tsx       # 🔄 Обновлен
├── ProductsGrid.tsx      # 🔄 Обновлен
└── FeaturedProducts.tsx  # 🔄 Обновлен
```

#### 🌐 Локализация

**Добавленные переводы для всех языков:**
- `product.description` - "Описание" / "Description" / "תיאור" / "الوصف"
- `product.reviews` - "отзывов" / "reviews" / "ביקורות" / "مراجعات"

**Файлы локализации:**
- `src/shared/config/i18n/locales/ru.ts` ✅
- `src/shared/config/i18n/locales/en.ts` ✅
- `src/shared/config/i18n/locales/he.ts` ✅
- `src/shared/config/i18n/locales/ar.ts` ✅

#### 🎨 UI/UX особенности

**Дизайн модального окна:**
- Современный Material-UI дизайн
- Закругленные углы и тени
- Адаптивная сетка (мобильный/десктоп)
- Плавные анимации

**Интерактивные элементы:**
- Кнопки +/- для изменения количества
- Поле ввода количества (только чтение)
- Кнопка "Добавить в корзину" с иконкой
- Кнопка "Связаться с фермером"

#### 🔄 Интеграция с существующей системой

**Корзина:**
- Использует существующий `useCart` хук
- Добавляет товары с выбранным количеством
- Автоматически закрывает модальное окно после добавления

**Локализация:**
- Использует существующий `useTranslation` хук
- Поддерживает все 4 языка
- Автоматическое переключение при смене языка

**Изображения:**
- Использует существующий `getImageUrl` утилиту
- Обработка ошибок загрузки изображений
- Поддержка органических меток

### 🐛 Исправления

1. **Дублирование ключа "available"** в локализации - исправлено
2. **Ошибки линтера** - все исправлены
3. **Проблемы с портами** - решены конфликты

### 📋 Чек-лист тестирования

**Функциональность:**
- [x] Клик по карточке продукта открывает модальное окно
- [x] Клик по кнопке "Добавить в корзину" НЕ открывает модальное окно
- [x] Изменение количества пересчитывает цену
- [x] Кнопки +/- работают корректно
- [x] Добавление в корзину работает
- [x] Закрытие модального окна сбрасывает количество

**Многоязычность:**
- [x] Все тексты переведены на 4 языка
- [x] Переключение языка обновляет модальное окно
- [x] Нет дублирующихся ключей в локализации

**Адаптивность:**
- [x] Модальное окно корректно отображается на мобильных устройствах
- [x] Адаптивная сетка работает
- [x] Кнопки доступны для тач-устройств

### 🚀 Как использовать

1. **Откройте приложение:** http://localhost:5173/
2. **Перейдите на страницу продуктов**
3. **Кликните на любую карточку продукта**
4. **Используйте модальное окно:**
   - Измените количество кнопками +/-
   - Нажмите "Добавить в корзину"
   - Нажмите "Связаться с фермером"

### 📊 Производительность

- ✅ Ленивая загрузка компонентов
- ✅ Мемоизация обработчиков событий
- ✅ Оптимизированные изображения
- ✅ Минимальные ре-рендеры

### 🔮 Планы на будущее

- [ ] Анимации при открытии/закрытии модального окна
- [ ] Галерея изображений продукта
- [ ] Отзывы и рейтинги в модальном окне
- [ ] Рекомендуемые продукты
- [ ] История просмотров

---

### 🧪 Тестирование версии 2.2.0

**Исправленные проблемы:**
- [x] React hooks ошибки на странице продуктов
- [x] `useContext` ошибки в ProductsGrid
- [x] Зависимости `fetchProducts` в useEffect
- [x] Проблемы с портами 3000 (EADDRINUSE)
- [x] Миграция пользователей с in-memory на JSON

**Тестовые пользователи в data/users.json:**
1. **ivan@example.com** / пароль: `password123` (обычный пользователь)
2. **admin@example.com** / пароль: `password123` (администратор)  
3. **test@example.com** / пароль: `password123` (тестовый пользователь)
4. **simple@test.com** / пароль: `password` (простой тест)
5. **alex777@list.ru** / пароль: `password123` (пользователь Алекс)

**Проверенная функциональность:**
- [x] Google OAuth авторизация
- [x] Локальная авторизация (email/пароль)
- [x] Регистрация новых пользователей
- [x] Загрузка страницы продуктов без ошибок React
- [x] Фильтрация и поиск продуктов
- [x] Модальное окно продуктов
- [x] Автоматическое завершение процессов

### 📖 Подробная документация

**Создано новое руководство:** `docs/auth-complete-guide.md`

**Включает:**
- 🔐 Полное описание системы авторизации
- 🗃️ Детали JSON базы данных пользователей  
- 🌐 Настройка Google OAuth 2.0 (пошагово)
- 🛡️ JWT токены и безопасность
- 🌍 Многоязычность в авторизации
- 👤 Тестовые пользователи и данные
- 📊 Все API endpoints
- 🛠️ Отладка и логирование
- 🔒 Рекомендации по безопасности

### 📊 Статистика JSON базы данных

**Endpoint:** `GET /api/admin/users/stats`

**Возвращает:**
```json
{
  "message": "User database statistics",
  "stats": {
    "totalUsers": 5,
    "usersByRole": { "user": 4, "admin": 1 },
    "usersByLanguage": { "ru": 5 }
  },
  "users": [...], // без паролей
  "database": {
    "type": "JSON File",
    "location": "./data/users.json",
    "persistent": true
  }
}
```

### 🛠️ Технические детали миграции

**Удаленные файлы:**
- `data/userDatabase.js` → переименован в `data/userDatabase.cjs`
- `src/pages/ProductsPageSimple.tsx` → временный файл для диагностики
- Удален импорт `ProductsPageSimple` из `src/App.tsx`

**Причина переименования .cjs:**
- Проект использует `"type": "module"` в package.json
- CommonJS требует расширение `.cjs`
- Исправляет `ReferenceError: require is not defined`

**Архитектура JSON базы:**
```
data/
├── users.json         # Хранилище пользователей
└── userDatabase.cjs   # API для работы с JSON
```

**Безопасность:**
- Пароли хешируются bcrypt
- JSON файл не содержит чувствительных данных в открытом виде
- API `/api/admin/users/stats` возвращает пользователей без паролей

---

**Дата обновления:** Январь 2025
**Версия:** 2.2.0
**Статус:** ✅ Завершено и протестировано 