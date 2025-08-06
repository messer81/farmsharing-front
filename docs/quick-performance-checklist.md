# ⚡ Быстрый чек-лист оптимизации производительности

## 🔄 Последние обновления (январь 2025)

### **🌍 Иконки флагов**
```bash
# Установить библиотеку для настоящих иконок флагов
npm install react-country-flag

# Заменить эмодзи на SVG иконки в LanguageSwitcher
```

### **🛠️ MUI обновления**
```typescript
// Заменить устаревший PaperProps на slotProps
<Menu slotProps={{ paper: { sx: { /* стили */ } } }}>
```

### **🦶 Layout исправления**
- ✅ Футер восстановлен на всех страницах
- ✅ Высоты пересчитаны: `calc(100vh - 160px)`

---

## 🎯 Для новых проектов (20 минут)

### **📋 Шаг 1: Измерение (5 мин)**
```bash
# Запустить Lighthouse
# DevTools → Lighthouse → Performance
# Записать текущие метрики LCP, CLS, INP
```

### **📋 Шаг 2: Оптимизация изображений (10 мин)**
```bash
# 1. Установить sharp
npm install --save-dev sharp

# 2. Скопировать скрипты из этого проекта
cp scripts/optimize-*.cjs your-project/scripts/

# 3. Обновить package.json
"optimize-images": "node scripts/optimize-images.cjs"

# 4. Запустить оптимизацию
npm run optimize-images
```

### **📋 Шаг 3: Обновить код (5 мин)**
```typescript
// 1. Заменить импорты изображений на optimized версии
import heroImage from '../assets/optimized/hero-bg-optimized.jpg';

// 2. Убрать CSS фильтры
// ❌ filter: 'blur(8px) brightness(0.7)',
// ❌ transform: 'scale(1.1)',

// 3. Задать размеры изображениям
<img width={300} height={200} style={{objectFit: 'cover'}} />
```

---

## 🔧 Для существующих проектов

### **⚠️ Признаки проблем:**
- LCP > 2.5s
- CLS > 0.1
- Большие изображения (> 100KB)
- CSS фильтры на background images

### **🚀 Быстрые исправления:**

#### **1. Изображения (наибольший эффект)**
```bash
# Найти большие файлы
find src/assets -size +50k

# Оптимизировать используемые
npm run optimize-images
```

#### **2. CSS фильтры (3-4 секунды экономии)**
```css
/* ❌ Убрать */
filter: blur(8px) brightness(0.7);
transform: scale(1.1);

/* ✅ Заменить предобработанными изображениями */
background-image: url(optimized.jpg);
```

#### **3. Layout Shifts**
```typescript
// Добавить размеры
<img width="300" height="200" />
<Box sx={{ minHeight: '200px' }} />
```

---

## 📊 Целевые метрики

| Метрика | Хорошо | Отлично | Цель |
|---------|--------|---------|------|
| **LCP** | < 2.5s | < 1.5s | < 1.0s |
| **CLS** | < 0.1 | < 0.05 | < 0.02 |
| **INP** | < 200ms | < 100ms | < 50ms |

---

## 🛠️ Инструменты

### **Измерение:**
- Chrome DevTools Lighthouse
- WebPageTest.org
- Core Web Vitals extension

### **Оптимизация:**
- Sharp (Node.js)
- ImageOptim (Mac)
- TinyPNG (онлайн)

### **Мониторинг:**
- Google PageSpeed Insights
- Real User Monitoring (RUM)

---

## 📝 Команды для копирования

```bash
# Быстрая установка
npm install --save-dev sharp

# Анализ размеров
ls -la src/assets/ | sort -k5 -nr

# Поиск CSS фильтров
grep -r "filter:" src/

# Поиск больших изображений  
find src/ -name "*.jpg" -o -name "*.png" | xargs ls -la | sort -k5 -nr

# Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --output html --output-path ./report.html
```

---

## ✅ Результат

**После применения чек-листа ожидайте:**
- LCP улучшение в 2-5 раз
- CLS улучшение в 10+ раз  
- Общая производительность: "Good" статус
- Готовность к продакшену ✅