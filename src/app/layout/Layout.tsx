// 🏗️ Глобальный layout с хедером и футером
import type { ReactNode } from 'react';
import { Header } from '../../widgets/header/ui/Header';
import { Footer } from '../../widgets/footer/ui/Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main 
        style={{ 
          margin: 0, 
          padding: 0,
          minHeight: 'calc(100vh - 160px)', // ✅ Учитываем Header (80px) + Footer (80px)
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}; 