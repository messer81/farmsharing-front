# 🧪 Руководство по тестированию авторизации

## 📋 Обзор системы авторизации

Система авторизации использует **JWT токены** и работает на двух уровнях:
- **Сервер**: Express.js с JWT аутентификацией
- **Клиент**: React с Redux для управления состоянием

## 🔑 Доступные тестовые аккаунты

### 1. Обычный пользователь
```
Email: ivan@example.com
Password: password123
Role: user
```

### 2. Администратор
```
Email: admin@example.com
Password: password123
Role: admin
```

## 🧪 Способы тестирования

### 1. Через веб-интерфейс (Рекомендуется)

1. **Откройте приложение**: `http://localhost:5173`
2. **Найдите кнопку входа**: Обычно в хедере
3. **Тестируйте вход**:
   - Введите `ivan@example.com` и `password123`
   - Проверьте, что вы вошли в систему
4. **Тестируйте регистрацию**:
   - Создайте новый аккаунт
   - Проверьте, что можете войти с новыми данными

### 2. Через Postman/API

#### 🔑 Вход (Login)
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "ivan@example.com",
  "password": "password123"
}
```

**Ожидаемый ответ:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Иван Петров",
    "email": "ivan@example.com",
    "phone": "+7 (999) 123-45-67",
    "address": "ул. Пушкина, д. 10, кв. 5",
    "preferredLanguage": "ru",
    "role": "user",
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-20T15:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 📝 Регистрация (Register)
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "Тестовый Пользователь",
  "email": "test@example.com",
  "password": "testpassword123",
  "phone": "+7 (999) 999-99-99",
  "address": "Тестовый адрес",
  "preferredLanguage": "ru"
}
```

#### 👤 Получить профиль (с токеном)
```http
GET http://localhost:3000/api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

#### 🔄 Обновить профиль
```http
PUT http://localhost:3000/api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Обновленное Имя",
  "phone": "+7 (999) 888-88-88",
  "address": "Новый адрес",
  "preferredLanguage": "en"
}
```

#### 📧 Сброс пароля
```http
POST http://localhost:3000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "ivan@example.com"
}
```

## 🚨 Тестирование ошибок

### 1. Неверные учетные данные
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```
**Ожидаемый ответ:** `400 Bad Request` с сообщением "Invalid credentials"

### 2. Регистрация существующего пользователя
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "Тест",
  "email": "ivan@example.com", // Уже существует
  "password": "password123"
}
```
**Ожидаемый ответ:** `400 Bad Request` с сообщением "User already exists"

### 3. Доступ без токена
```http
GET http://localhost:3000/api/auth/profile
```
**Ожидаемый ответ:** `401 Unauthorized` с сообщением "Access token required"

### 4. Неверный токен
```http
GET http://localhost:3000/api/auth/profile
Authorization: Bearer invalid_token
```
**Ожидаемый ответ:** `403 Forbidden` с сообщением "Invalid or expired token"

## 🔧 Настройка для тестирования

### 1. Запуск сервера
```bash
npm run dev
```
Это запустит и клиент (порт 5173), и сервер (порт 3000).

### 2. Проверка работы сервера
```bash
curl http://localhost:3000/
```
Должен вернуть: `{"message":"Farm Sharing API is running"}`

### 3. Проверка CORS
Сервер настроен для работы с клиентом на `localhost:5173`.

## 📱 Тестирование в браузере

### 1. Откройте DevTools (F12)
### 2. Перейдите на вкладку Network
### 3. Выполните вход/регистрацию
### 4. Проверьте запросы к API

## 🔍 Отладка

### Проверка токена в localStorage
```javascript
// В консоли браузера
localStorage.getItem('authToken')
```

### Проверка состояния Redux
```javascript
// В консоли браузера (если есть Redux DevTools)
store.getState().auth
```

## ⚠️ Важные замечания

1. **Токены истекают через 24 часа**
2. **Пароли хешируются с bcrypt**
3. **Данные хранятся в памяти сервера** (перезапуск очистит новые регистрации)
4. **CORS настроен для localhost:5173**

## 🐛 Известные проблемы

- При перезапуске сервера новые зарегистрированные пользователи исчезают
- Google OAuth пока не реализован (показывает alert)
- Нет валидации email/пароля на клиенте

## 📞 Поддержка

При возникновении проблем:
1. Проверьте, что сервер запущен на порту 3000
2. Проверьте консоль браузера на ошибки
3. Проверьте логи сервера в терминале 