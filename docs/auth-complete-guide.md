# 🔐 Полное руководство по авторизации - FarmSharing

## 📋 Обзор системы авторизации

### 🎯 Типы авторизации
1. **Локальная авторизация** (email + пароль)
2. **Google OAuth 2.0** (через Google аккаунт)
3. **JWT токены** для поддержания сессий

### 🏗️ Архитектура

```
📁 Backend (server.cjs)
├── 🔑 Passport.js стратегии
│   ├── LocalStrategy (email/пароль)
│   └── GoogleStrategy (OAuth 2.0)
├── 🗃️ JSON база данных (data/users.json)
├── 🛡️ JWT токены
└── 🌐 API endpoints (/api/auth/*)

📁 Frontend (React)
├── 🎨 UI компоненты (AuthFrame.tsx)
├── 🔄 Redux состояние (userSlice.ts)
├── 🌍 Интернационализация
└── 🎯 Обработка redirects
```

---

## 🗃️ База данных пользователей

### 📄 Файл: `data/users.json`

**Структура пользователя:**
```json
{
  "id": 1,
  "name": "Иван Петров",
  "email": "ivan@example.com",
  "password": "$2b$10$sZiz6G0p6oGTu2Pn2W.VfOtzMqUQuUu0K9bzJ4NbXuijP96iYiRZq",
  "phone": "+7 (999) 123-45-67",
  "address": "ул. Пушкина, д. 10, кв. 5",
  "preferredLanguage": "ru",
  "role": "user",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-20T15:30:00Z",
  "googleId": "optional_google_id" // только для Google пользователей
}
```

### 🔧 API модуль: `data/userDatabase.cjs`

**Основные функции:**
```javascript
// Базовые операции
loadUsers()                    // Загрузка из JSON файла
saveUsers()                    // Сохранение в JSON файл

// Поиск пользователей
findUserByEmail(email)         // Поиск по email
findUserById(id)              // Поиск по ID

// Управление пользователями
addUser(userData)             // Добавление нового пользователя
updateUser(id, updates)       // Обновление данных пользователя

// Статистика
getUserStats()                // Статистика пользователей
getAllUsers()                 // Все пользователи (без паролей)
```

**Безопасность:**
- ✅ Пароли хешируются с помощью `bcrypt` (salt rounds: 10)
- ✅ Автоматическая генерация уникальных ID
- ✅ Валидация email перед сохранением
- ✅ API не возвращает пароли в открытом виде

---

## 🔑 Локальная авторизация

### 📝 Регистрация (`POST /api/auth/register`)

**Запрос:**
```json
{
  "name": "Имя Пользователя",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+7 (999) 123-45-67",
  "address": "Адрес пользователя",
  "preferredLanguage": "ru"
}
```

**Ответ (успех):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 6,
    "name": "Имя Пользователя",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Процесс:**
1. Проверка существования email
2. Хеширование пароля с bcrypt
3. Сохранение в JSON базу
4. Генерация JWT токена
5. Возврат пользователя и токена

### 🔓 Вход (`POST /api/auth/login`)

**Запрос:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ (успех):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Имя Пользователя",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Процесс:**
1. Поиск пользователя по email
2. Сравнение пароля с bcrypt.compare()
3. Генерация JWT токена
4. Возврат пользователя и токена

---

## 🌐 Google OAuth 2.0

### ⚙️ Настройка Google Cloud Console

**1. Создание проекта:**
- Перейти в [Google Cloud Console](https://console.cloud.google.com/)
- Создать новый проект или выбрать существующий

**2. Настройка OAuth consent screen:**
```
Тип приложения: External
Название: FarmSharing
Email поддержки: ваш-email@gmail.com
Домены: localhost
Scope: email, profile, openid
```

**3. Создание OAuth 2.0 credentials:**
```
Тип: Web application
Название: FarmSharing Web Client
Authorized redirect URIs: 
  - http://localhost:3000/api/auth/google/callback
```

**4. Получение credentials:**
- Client ID: `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com`
- Client Secret: `GOCSPX-YOUR_GOOGLE_CLIENT_SECRET`

### 🔧 Конфигурация сервера

> ⚠️ **ВАЖНО:** Никогда не коммитьте реальные Client ID и Client Secret в репозиторий!  
> Используйте файл `.env` и добавьте его в `.gitignore`.

**Файл: `.env`**
```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret
JWT_SECRET=your-secure-jwt-secret-key-here
PORT=3000
NODE_ENV=development
```

**Passport GoogleStrategy:**
```javascript
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Поиск существующего пользователя
      let user = userDB.findUserByEmail(profile.emails?.[0]?.value);

      if (!user) {
        // Создание нового пользователя
        const userData = {
          name: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          password: await bcrypt.hash(Math.random().toString(36), 10),
          phone: '',
          address: '',
          preferredLanguage: 'ru',
          role: 'user',
          googleId: profile.id
        };
        user = userDB.addUser(userData);
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));
```

### 🛣️ OAuth маршруты

**1. Инициация авторизации:**
```
GET /api/auth/google
↓
Redirect to Google OAuth
```

**2. Callback обработка:**
```
GET /api/auth/google/callback
↓
Обработка ответа от Google
↓
Создание/поиск пользователя
↓
Генерация JWT токена
↓
Redirect на frontend с токеном
```

**3. Frontend redirect:**
```
http://localhost:5173/auth-callback?token=JWT_TOKEN
```

### 🎨 Frontend интеграция

**Кнопка Google авторизации:**
```typescript
const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:3000/api/auth/google';
};

<Button
  variant="outlined"
  fullWidth
  onClick={handleGoogleLogin}
  startIcon={<GoogleLogo />}
  sx={{ mb: 2 }}
>
  {t('auth.continueWithGoogle')}
</Button>
```

**Обработка callback:**
```typescript
// AuthCallbackPage.tsx
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    // Сохранение токена
    localStorage.setItem('authToken', token);
    
    // Обновление Redux состояния
    dispatch(setAuth({ token, user: decodedUser }));
    
    // Redirect на главную
    navigate('/');
  }
}, []);
```

---

## 🛡️ JWT токены

### 🔧 Структура токена

**Header:**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload:**
```json
{
  "userId": 1,
  "email": "user@example.com",
  "role": "user",
  "iat": 1640995200,
  "exp": 1640998800
}
```

**Подпись:**
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  JWT_SECRET
)
```

### 🔄 Использование токенов

**Генерация:**
```javascript
const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};
```

**Верификация:**
```javascript
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

**Frontend хранение:**
```javascript
// Сохранение
localStorage.setItem('authToken', token);

// Использование в API запросах
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  'Content-Type': 'application/json'
};
```

---

## 🌍 Многоязычность в авторизации

### 📄 Ключи локализации

**Файл: `src/shared/config/i18n/locales/ru.ts`**
```typescript
auth: {
  signIn: 'Войти',
  signUp: 'Регистрация',
  email: 'Email',
  password: 'Пароль',
  name: 'Имя',
  phone: 'Телефон',
  address: 'Адрес',
  continueWithGoogle: 'Продолжить с Google',
  alreadyHaveAccount: 'Уже есть аккаунт?',
  dontHaveAccount: 'Нет аккаунта?',
  forgotPassword: 'Забыли пароль?',
  loginSuccess: 'Успешный вход',
  registerSuccess: 'Успешная регистрация',
  invalidCredentials: 'Неверные данные',
  emailAlreadyExists: 'Email уже существует'
}
```

### 🔄 Использование в компонентах

```typescript
const { t } = useTranslation();

<TextField
  label={t('auth.email')}
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## 🧪 Тестовые данные

### 👤 Тестовые пользователи

| Email | Пароль | Роль | Описание |
|-------|--------|------|----------|
| `ivan@example.com` | `password123` | user | Основной тестовый пользователь |
| `admin@example.com` | `password123` | admin | Администратор |
| `test@example.com` | `password123` | user | Дополнительный тест |
| `simple@test.com` | `password` | user | Простой пароль |
| `alex777@list.ru` | `password123` | user | Кириллический домен |

### 🔍 Тестирование Google OAuth

**Тестовые Google аккаунты:**
- Используйте ваш собственный Google аккаунт
- В Google Cloud Console добавьте тестовых пользователей
- Убедитесь, что OAuth consent screen настроен

---

## 📊 API Endpoints

### 🔐 Авторизация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/google` - Инициация Google OAuth
- `GET /api/auth/google/callback` - Callback Google OAuth
- `POST /api/auth/logout` - Выход
- `POST /api/auth/forgot-password` - Восстановление пароля

### 👤 Профиль пользователя
- `GET /api/auth/profile` - Получение профиля
- `PUT /api/auth/profile` - Обновление профиля

### 📈 Администрирование
- `GET /api/admin/users/stats` - Статистика пользователей

---

## 🛠️ Отладка и логирование

### 📝 Логи сервера

**Успешная загрузка:**
```
🔍 Environment variables:
GOOGLE_CLIENT_ID: ✅ Loaded
GOOGLE_CLIENT_SECRET: ✅ Loaded
JWT_SECRET: ✅ Loaded
🚀 Server running on http://localhost:3000
```

**Google OAuth процесс:**
```
🔍 Google OAuth: Looking for user with email: user@gmail.com
🔍 Google OAuth: User not found, creating new user
✅ Users saved to JSON file
```

**Ошибки авторизации:**
```
❌ Login failed: Invalid password for user@example.com
❌ Registration failed: Email already exists
❌ Google OAuth error: Failed to create user in database
```

### 🔍 Отладка проблем

**1. Google OAuth не работает:**
- Проверьте переменные окружения в `.env`
- Убедитесь в правильности redirect URI
- Проверьте статус OAuth consent screen

**2. JWT токены недействительны:**
- Проверьте `JWT_SECRET` в `.env`
- Убедитесь в корректности времени жизни токена
- Проверьте заголовки Authorization

**3. Пользователи не сохраняются:**
- Проверьте права доступа к файлу `data/users.json`
- Убедитесь в корректности JSON структуры
- Проверьте логи в консоли сервера

---

## 🔒 Безопасность

### ✅ Реализованные меры

1. **Хеширование паролей** с bcrypt (salt rounds: 10)
2. **JWT токены** с ограниченным временем жизни
3. **Валидация входных данных** на стороне сервера
4. **CORS политики** для API безопасности
5. **Переменные окружения** для конфиденциальных данных

### 🚨 Рекомендации для продакшена

1. **HTTPS обязательно** для OAuth callbacks
2. **Безопасный JWT_SECRET** (минимум 32 символа)
3. **Rate limiting** для API endpoints
4. **Валидация CSRF токенов**
5. **Логирование попыток авторизации**
6. **Двухфакторная аутентификация** (2FA)

---

**Дата создания:** Январь 2025  
**Версия:** 1.0  
**Статус:** ✅ Полная документация