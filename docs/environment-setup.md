# 🔧 Настройка окружения

## 📋 Обзор

Этот документ описывает процесс настройки переменных окружения для проекта FarmSharing, включая настройку Google OAuth.

## 🔐 Google OAuth

### 1. Создание проекта в Google Cloud Console

1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект:
   - Нажмите на выпадающее меню проектов вверху страницы
   - Выберите "New Project"
   - Введите имя проекта (например, "FarmSharing")
   - Нажмите "Create"

### 2. Настройка OAuth 2.0

1. В меню слева найдите "APIs & Services" → "Credentials"
2. Нажмите "Create Credentials" → "OAuth client ID"
3. Если это первый OAuth client:
   - Нажмите "Configure Consent Screen"
   - Выберите "External"
   - Заполните обязательные поля:
     - App name: "FarmSharing"
     - User support email
     - Developer contact email
   - Добавьте authorized domains
   - Сохраните и продолжите

4. Создайте OAuth client ID:
   - Application type: "Web application"
   - Name: "FarmSharing Web Client"
   - Authorized JavaScript origins:
     ```
     http://localhost:5173
     http://localhost:3000
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/google/callback
     ```
   - Нажмите "Create"

5. Сохраните появившиеся:
   - Client ID
   - Client Secret

### 3. Настройка переменных окружения

1. Создайте файл `.env` в корне проекта:
   ```bash
   touch .env
   ```

2. Добавьте следующие переменные:
   ```env
   # Google OAuth
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-in-production

   # Server
   PORT=3000
   NODE_ENV=development
   ```

3. Замените `your-client-id` и `your-client-secret` на значения, полученные из Google Cloud Console

### 4. Проверка настройки

1. Запустите сервер:
   ```bash
   node server.cjs
   ```

2. Проверьте логи на наличие ошибок

3. Попробуйте войти через Google:
   - Откройте приложение
   - Нажмите кнопку входа
   - Выберите "Войти через Google"

## 🔒 Безопасность

### Важные замечания:

1. **Никогда не коммитьте файл `.env`**:
   - Добавьте `.env` в `.gitignore`
   - Используйте `.env.example` как шаблон

2. **Защита учетных данных**:
   - Храните Client Secret в безопасном месте
   - Регулярно обновляйте JWT_SECRET
   - В production используйте сервис управления секретами

3. **Ограничения доступа**:
   - Настройте правильные redirect URIs
   - Ограничьте scope до необходимого минимума
   - Регулярно проверяйте доступы в Google Cloud Console

## 🚀 Production

Для production окружения:

1. **Создайте отдельный OAuth client**:
   - Добавьте production домены
   - Настройте production redirect URIs

2. **Обновите переменные окружения**:
   ```env
   NODE_ENV=production
   GOOGLE_CLIENT_ID=production-client-id
   GOOGLE_CLIENT_SECRET=production-client-secret
   JWT_SECRET=strong-random-string
   ```

3. **Настройте HTTPS**:
   - Получите SSL сертификат
   - Обновите redirect URIs на HTTPS

## 🐛 Отладка

### Распространенные проблемы:

1. **"Invalid redirect_uri"**:
   - Проверьте точное соответствие URI в коде и Google Console
   - URI должен включать протокол (http/https)
   - Проверьте порт и путь

2. **"Invalid client"**:
   - Проверьте Client ID и Secret
   - Убедитесь, что они соответствуют окружению

3. **"Access denied"**:
   - Проверьте настройки Consent Screen
   - Убедитесь, что приложение верифицировано (если нужно)

### Проверка конфигурации:

```bash
# Проверка переменных окружения
echo $GOOGLE_CLIENT_ID
echo $GOOGLE_CLIENT_SECRET

# Проверка redirect URI
curl http://localhost:3000/api/auth/google

# Проверка callback endpoint
curl http://localhost:3000/api/auth/google/callback
```

## 📚 Полезные ссылки

1. [Google Cloud Console](https://console.cloud.google.com/)
2. [OAuth 2.0 для веб-приложений](https://developers.google.com/identity/protocols/oauth2/web-server)
3. [Passport.js документация](http://www.passportjs.org/docs/)