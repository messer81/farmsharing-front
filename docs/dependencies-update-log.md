# 📦 Журнал обновлений зависимостей

## Январь 2025

### ✅ Добавлено: Stripe для оплаты (client + server)
– Установлены пакеты:
- `@stripe/stripe-js` (frontend SDK)
- `@stripe/react-stripe-js` (React Elements)
- `stripe` (server SDK)

– Проблема при установке (и решение):
- Ошибка `ETARGET/ERESOLVE` из‑за несовместимых/отсутствующих версий `@stripe/stripe-js` и конфликтов peer deps
- Решение:
  1) Зафиксировать совместимые версии в `package.json`:
     - `@stripe/stripe-js`: ^4.0.0
     - `@stripe/react-stripe-js`: ^2.9.0
  2) Выполнить установку с ослаблением проверки peer deps:
     ```bash
     npm i --legacy-peer-deps
     ```
  3) Альтернатива без `--legacy-peer-deps`: обновить `@types/node` до `^20.19.0` (требование `vite@7`), затем `npm i`.

– Конфигурация окружения (.env):
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx   # фронтенд (Vite)
STRIPE_SECRET_KEY=sk_test_xxx             # бекенд (server.cjs)
# STRIPE_WEBHOOK_SECRET=whsec_xxx         # опционально, если используем вебхуки
```

– Серверный эндпоинт:
```
POST /api/payments/create-intent
body: { amount: number, currency?: string = 'ils' }
resp: { clientSecret: string }
```

– Клиентское использование: Stripe Elements → подтверждение платежа → создание заказа.

### ✅ **Добавлено: `react-country-flag@3.1.0`**
**Цель:** Замена эмодзи флагов на настоящие SVG иконки

**Причина добавления:**
- Эмодзи флаги не отображались в Windows
- Нужны профессиональные иконки флагов для переключателя языков

**Использование:**
```typescript
import CountryFlag from 'react-country-flag';

<CountryFlag 
    countryCode="US" 
    svg 
    style={{ width: '20px', height: '15px' }}
/>
```

**Размер библиотеки:** ~100KB (включает все флаги мира)
**Формат:** SVG векторные иконки
**Совместимость:** Все браузеры

---

## Предыдущие основные зависимости

### 🏗️ **Основа проекта**
- `react@18.2.0` - UI библиотека
- `typescript@5.2.2` - Типизация
- `vite@7.0.6` - Сборщик проекта

### 🎨 **UI компоненты**
- `@mui/material@5.15.0` - Material Design компоненты
- `@mui/icons-material@5.15.0` - Иконки Material Design
- `@emotion/react@11.11.1` - CSS-in-JS для MUI

### 🌐 **Интернационализация**
- `react-i18next@13.5.0` - Локализация
- `i18next@23.7.6` - Ядро для переводов

### ⚙️ **Состояние приложения**
- `@reduxjs/toolkit@2.0.1` - Управление состоянием
- `react-redux@9.0.4` - React интеграция для Redux

### 🌐 **Маршрутизация**
- `react-router-dom@6.20.1` - Клиентская маршрутизация

### 📡 **HTTP запросы**
- `axios@1.6.2` - HTTP клиент для API

### 🎯 **Утилиты**
- `clsx@2.0.0` - Условные CSS классы
- `tailwind-merge@2.2.0` - Слияние Tailwind классов

### 🖼️ **Обработка изображений (dev)**
- `sharp@0.34.3` - Оптимизация изображений

---

## 🚨 Рекомендации

### **Мониторить размер bundle:**
```bash
npm run build
# Проверить размер файлов в dist/
```

### **Регулярно обновлять:**
- MUI (каждые 2-3 месяца)
- React Router (по мажорным версиям)
- TypeScript (каждые 3-6 месяцев)

### **Не обновлять без тестирования:**
- Redux Toolkit (ломающие изменения)
- Vite (изменения в конфигурации)