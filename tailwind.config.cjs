/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tw-elements/js/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#63c6a1",
                secondary: "#aff8bb",
            },
            animation: {
                'gradient-shift': 'gradient-shift 3s ease infinite',
                'bounce-gentle': 'bounce-gentle 1s ease-in-out infinite',
            },
            keyframes: {
                'gradient-shift': {
                    '0%, 100%': {backgroundPosition: '0% 50%'},
                    '50%': {backgroundPosition: '100% 50%'},
                },
                'bounce-gentle': {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-5px)'},
                },
                borderRadius: {
                    'xl': '1rem',
                    '2xl': '1.5rem',
                },
            },
        },
        darkMode: "class", // Использовать класс для переключения темной темы
        // Чтобы работать вместе с MUI
        corePlugins: {
            preflight: false,
        },
        important: true,
        plugins: [
            require("tw-elements/plugin.cjs"),
            require('@tailwindcss/forms'),
            require('@tailwindcss/typography')
        ],
    },
}