import { Sun, DarkMode } from '@mui/icons-material';
//                 <Button

const ThemeSwitcher = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <button onClick={toggleTheme} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded">
            {prefersDarkMode ? <Sun /> : <DarkMode />}
        </button>
    );
};

export default ThemeSwitcher;
