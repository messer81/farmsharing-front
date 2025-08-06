// 🔐 Google OAuth стратегия для Passport.js
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CONFIG } from '../oauth/google';
import { mockUsers } from '../../../server.cjs';
import bcrypt from 'bcryptjs';

export const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CONFIG.clientID,
    clientSecret: GOOGLE_CONFIG.clientSecret,
    callbackURL: GOOGLE_CONFIG.callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Проверяем, существует ли пользователь
      let user = mockUsers.find(u => u.email === profile.emails?.[0]?.value);

      if (!user) {
        // Создаем нового пользователя
        const newUser = {
          id: mockUsers.length + 1,
          name: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          password: await bcrypt.hash(Math.random().toString(36), 10),
          phone: '',
          address: '',
          preferredLanguage: 'ru',
          role: 'user',
          googleId: profile.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        mockUsers.push(newUser);
        user = newUser;
      }

      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
);