// 🌍 Конфигурация i18next с поддержкой 4 языков
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ru from './locales/ru';
import he from './locales/he';
import ar from './locales/ar';

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            en: { translation: en },
            ru: { translation: ru },
            he: { translation: he },
            ar: { translation: ar },
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

// Функция для изменения направления текста
export const setTextDirection = (language: string) => {
    const rtlLanguages = ['ar', 'he'];
    const direction = rtlLanguages.includes(language) ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
};

// Инициализация направления для текущего языка
setTextDirection(i18n.language);

// Слушатель изменения языка
i18n.on('languageChanged', (language) => {
    setTextDirection(language);
});

export default i18n;