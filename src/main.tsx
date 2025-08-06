// 🚀 Точка входа в приложение - здесь всё начинается
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { I18nProvider } from './app/providers/I18nProvider';
import { MuiThemeWrapper } from './app/providers/MuiThemeProvider';

// 🔧 Future flags для React Router v7 - убираем предупреждения
const routerConfig = {
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
          <MuiThemeWrapper>
            <BrowserRouter {...routerConfig}>
              <App />
            </BrowserRouter>
          </MuiThemeWrapper>
        </I18nProvider>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
)