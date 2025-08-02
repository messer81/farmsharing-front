// 🌐 Настройка API-клиента на базе Axios
import axios from 'axios';

// Создаем экземпляр axios с базовыми настройками
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, // Тайм-аут 5 секунд
});

// Перехватчик запросов - например, для добавления токена аутентификации
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Перехватчик ответов - например, для обработки ошибок
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Обработка ошибок сервера
        if (error.response?.status === 401) {
            // Неавторизованный доступ - перенаправляем на логин
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);