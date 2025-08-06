// 🔐 Google OAuth конфигурация
export const GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
  callbackURL: 'http://localhost:3000/api/auth/google/callback',
  scope: ['profile', 'email']
};