import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 🚀 Оптимизация сборки
  build: {
    // Минификация для лучшего сжатия
    minify: 'terser',
    
    // Оптимизация chunks - разделяем код на логические части
    rollupOptions: {
      output: {
        // Разделяем большие библиотеки для лучшего кеширования
        manualChunks: {
          // React ecosystem
          vendor: ['react', 'react-dom'],
          // Material-UI (самая тяжелая библиотека)
          mui: [
            '@mui/material', 
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled'
          ],
          // Роутинг
          router: ['react-router-dom'],
          // Интернационализация  
          i18n: ['react-i18next', 'i18next'],
        },
      },
    },
    
    // Увеличиваем лимит (у нас оптимизированные изображения)
    chunkSizeWarningLimit: 1000,
    
    // Отключаем sourcemaps в продакшене
    sourcemap: false,
    
    // CSS code splitting для параллельной загрузки
    cssCodeSplit: true,
  },
  
  // ⚡ Оптимизация dev сервера
  server: {
    open: true,
    port: 5173,
    
    // HMR настройки - убираем конфликты
    hmr: true,
  },
  
  // 📦 Предварительная обработка зависимостей
  optimizeDeps: {
    // ✅ ПРОСТАЯ конфигурация - убираем проблемные настройки
    include: [
      'react',
      'react-dom', 
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
      'react-i18next',
    ],
  },
  
  // 🔧 Алиасы для удобного импорта
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@entities': '/src/entities',
      '@features': '/src/features',
      '@widgets': '/src/widgets',
    },
  },
  
  // 🎯 CSS оптимизация
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  
  // 🚀 Preview для тестирования продакшн сборки
  preview: {
    port: 3001,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
})
