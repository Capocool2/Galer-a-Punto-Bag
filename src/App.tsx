import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { SectionDivider } from './components/SectionDivider';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { getSupabaseClient } from './utils/supabase/client';
import { categories } from './utils/categories';

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [productsKey, setProductsKey] = useState(0);

  const supabase = getSupabaseClient();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) {
        setAccessToken(data.session.access_token);
        setIsAdmin(true);
      }
    } catch (error) {
      // Silently handle session check error
    }
  };

  const handleLoginSuccess = (token: string) => {
    setAccessToken(token);
    setIsAdmin(true);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAccessToken(null);
      setIsAdmin(false);
      setIsAdminPanelOpen(false);
    } catch (error) {
      // Silently handle logout error
    }
  };

  const handleProductsChange = () => {
    setProductsKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      
      <Header 
        onLoginClick={() => setIsLoginModalOpen(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onAdminClick={() => setIsAdminPanelOpen(true)}
      />
      
      {/* Mostrar Panel de Admin o Contenido Principal */}
      {isAdminPanelOpen && accessToken ? (
        <AdminPanel 
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          accessToken={accessToken}
          onProductsChange={handleProductsChange}
        />
      ) : (
        <>
          <main key={productsKey}>
            <Hero />
            
            {/* Dynamic Product Sections for Each Category */}
            {categories.map((category, index) => (
              <React.Fragment key={category.id}>
                {index === 0 && <SectionDivider />}
                <ProductSection category={category} />
                {index < categories.length - 1 && <SectionDivider />}
              </React.Fragment>
            ))}
          </main>
          
          <Footer />
        </>
      )}

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
