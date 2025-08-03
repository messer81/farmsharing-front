// 🌟 Главный компонент приложения
import './App.css'
import { Routes, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Header } from "./widgets/header/ui/Header";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import FarmPage from "./pages/FarmPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import theme from "./shared/styles/theme";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/mockProducts" element={<ProductsPage />} />
                    <Route path="/farm/:id" element={<FarmPage />} />
                    <Route path="/design-system" element={<DesignSystemPage />} />
                </Routes>
            </ThemeProvider>
        </MuiThemeProvider>
    )
}

export default App