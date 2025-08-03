// 🚀 Точка входа в приложение - здесь всё начинается
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { I18nProvider } from './app/providers/I18nProvider';

// 🔧 Future flags для React Router v7
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <I18nProvider>
          <BrowserRouter {...router}>
            <App />
          </BrowserRouter>
        </I18nProvider>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
)