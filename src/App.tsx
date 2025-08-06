// 🌟 Главный компонент приложения
import './App.css'
import { Routes, Route } from "react-router-dom";
// ✅ Lazy loading для ускорения первоначальной загрузки
import { lazy, Suspense } from 'react';
import HomePage from "./pages/HomePage"; // Оставляем главную страницу для быстрого LCP

const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const TestProductsPage = lazy(() => import("./pages/TestProductsPage"));
const FarmPage = lazy(() => import("./pages/FarmPage"));
const DesignSystemPage = lazy(() => import("./pages/DesignSystemPage"));
const ApiDemo = lazy(() => import("./widgets/api-demo/ui/ApiDemo").then(module => ({ default: module.ApiDemo })));
const AuthCallbackPage = lazy(() => import("./pages/AuthCallbackPage").then(module => ({ default: module.AuthCallbackPage })));
import { Layout } from "./app/layout/Layout";

function App() {
    return (
        <Layout>
            <Suspense fallback={
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '50vh' 
                }}>
                    Загрузка...
                </div>
            }>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/mockProducts" element={<ProductsPage />} />
                    <Route path="/test-products" element={<TestProductsPage />} />
                    <Route path="/farm/:id" element={<FarmPage />} />
                    <Route path="/design-system" element={<DesignSystemPage />} />
                    <Route path="/axios-demo" element={<ApiDemo />} />
                    <Route path="/auth-callback" element={<AuthCallbackPage />} />
                </Routes>
            </Suspense>
        </Layout>
    );
}

export default App