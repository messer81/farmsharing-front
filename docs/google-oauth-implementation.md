# 🔐 Реализация Google OAuth

## 📋 Обзор

Добавлена возможность входа через Google OAuth 2.0 с использованием Passport.js.

## 🛠️ Технический стек

- Passport.js
- passport-google-oauth20
- JWT для авторизации
- React Router для обработки callback

## 🔄 Процесс аутентификации

1. **Инициация входа**:
   ```typescript
   const handleGoogleAuth = () => {
     window.location.href = 'http://localhost:3000/api/auth/google';
   };
   ```

2. **Google OAuth Flow**:
   - Редирект на страницу входа Google
   - Пользователь дает разрешение
   - Google делает callback на наш сервер

3. **Обработка на сервере**:
   ```typescript
   app.get('/api/auth/google/callback',
     passport.authenticate('google', { session: false }),
     (req, res) => {
       const token = jwt.sign({ /* user data */ }, JWT_SECRET);
       res.redirect(`/auth-callback?token=${token}`);
     }
   );
   ```

4. **Обработка в приложении**:
   - Страница `AuthCallbackPage` получает токен
   - Сохраняет токен в Redux
   - Получает данные профиля
   - Редиректит на главную

## 🔧 Конфигурация

### Google OAuth

```typescript
const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/google/callback',
  scope: ['profile', 'email']
};
```

### Passport Strategy

```typescript
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CONFIG.clientID,
  clientSecret: GOOGLE_CONFIG.clientSecret,
  callbackURL: GOOGLE_CONFIG.callbackURL,
}, async (accessToken, refreshToken, profile, done) => {
  // Логика создания/поиска пользователя
}));
```

## 📁 Структура файлов

```
src/
  ├── shared/
  │   └── config/
  │       └── oauth/
  │           └── google.ts       # Конфигурация Google OAuth
  ├── pages/
  │   └── AuthCallbackPage.tsx   # Страница обработки callback
  └── features/
      └── auth/
          └── ui/
              └── AuthFrame.tsx   # Компонент с кнопкой Google
```

## 🔐 Безопасность

1. **Проверка токенов**:
   - Валидация JWT на сервере
   - Безопасное хранение в localStorage

2. **Защита данных**:
   - HTTPS для всех запросов
   - Валидация email
   - Проверка существующих пользователей

## 🎨 UI компоненты

### Google кнопка
```typescript
<Button
  variant="outlined"
  fullWidth
  startIcon={<GoogleLogo />}
  onClick={handleGoogleAuth}
  sx={{
    borderColor: '#4285F4',
    color: '#4285F4',
    '&:hover': {
      backgroundColor: 'rgba(66, 133, 244, 0.04)'
    }
  }}
>
  Войти через Google
</Button>
```

## 🚀 Использование

1. Получите учетные данные Google OAuth:
   - Создайте проект в Google Cloud Console
   - Настройте OAuth 2.0
   - Получите Client ID и Secret

2. Настройте переменные окружения:
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

3. Запустите сервер:
   ```bash
   node server.cjs
   ```

## 🔄 Процесс входа

1. Пользователь нажимает "Войти через Google"
2. Перенаправляется на страницу Google
3. Выбирает аккаунт и дает разрешения
4. Возвращается в приложение
5. Автоматически создается аккаунт (если новый пользователь)
6. Происходит вход в систему

## 🐛 Отладка

### Распространенные проблемы

1. **Invalid redirect_uri**:
   - Проверьте настройки в Google Console
   - Убедитесь, что URI соответствует

2. **Token validation error**:
   - Проверьте JWT_SECRET
   - Проверьте срок действия токена

3. **User not found**:
   - Проверьте логику создания пользователя
   - Проверьте данные профиля от Google

## 🔮 Планы развития

1. **Улучшения UI**:
   - Анимация загрузки
   - Улучшенный дизайн кнопки
   - Индикатор процесса входа

2. **Функциональность**:
   - Связывание аккаунтов
   - Дополнительные данные профиля
   - Обработка ошибок входа

3. **Безопасность**:
   - CSRF токены
   - Rate limiting
   - Проверка состояния сессии