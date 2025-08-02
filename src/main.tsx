// 🚀 Точка входа в приложение - здесь всё начинается
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { I18nProvider } from './app/providers/I18nProvider';

// 🎨 Создаём корневой элемент и подключаем провайдеры
createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <ThemeProvider>
            <I18nProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </I18nProvider>
        </ThemeProvider>
    </StoreProvider>,
)