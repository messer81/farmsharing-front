// 🔐 Пример конфигурации окружения
export const ENV = {
  // Google OAuth
  GOOGLE_CLIENT_ID: 'your-client-id',
  GOOGLE_CLIENT_SECRET: 'your-client-secret',

  // JWT
  JWT_SECRET: 'your-super-secret-jwt-key-change-in-production',

  // Server
  PORT: 3000,
  NODE_ENV: 'development'
} as const;

// Инструкция по настройке:
/*
1. Создайте проект в Google Cloud Console (https://console.cloud.google.com/)
2. Перейдите в раздел "APIs & Services" → "Credentials"
3. Нажмите "Create Credentials" → "OAuth client ID"
4. Выберите тип "Web application"
5. Заполните данные:
   - Name: "FarmSharing"
   - Authorized JavaScript origins:
     http://localhost:5173
     http://localhost:3000
   - Authorized redirect URIs:
     http://localhost:3000/api/auth/google/callback
6. Нажмите "Create"
7. Скопируйте Client ID и Client Secret
8. Создайте файл .env в корне проекта
9. Добавьте переменные:
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
*/