// 🌟 Главный компонент приложения
import './App.css'
import { Routes, Route } from "react-router-dom";
import { Header } from "./widgets/header/ui/Header";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import FarmPage from "./pages/FarmPage";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mockProducts" element={<ProductsPage />} />
                <Route path="/farm/:id" element={<FarmPage />} />
            </Routes>
        </>
    )
}

export default App