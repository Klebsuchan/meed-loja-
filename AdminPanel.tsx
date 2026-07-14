import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ParallaxHero } from './components/ParallaxHero';
import { ProductCatalog } from './components/ProductCatalog';
import { FAQ } from './components/FAQ';
import { TopBar } from './components/TopBar';
import { AboutUs } from './components/AboutUs';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { AnimatePresence } from 'motion/react';
import { CartProvider } from './CartContext';
import { CartSidebar } from './components/CartSidebar';
import { SearchModal } from './components/SearchModal';
import { GlobalParallaxBackground } from './components/GlobalParallaxBackground';
import { ToastContainer } from './components/ToastContainer';
import { CookieBanner } from './components/CookieBanner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminPanel } from './components/AdminPanel';
import { UserOrders } from './components/UserOrders';
import { useAuth } from './AuthContext';
import { PromoPopup } from './components/PromoPopup';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hash, setHash] = useState(window.location.hash);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (window.location.hash === '#admin' || window.location.hash === '#orders') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setHash('');
    }
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#050505] text-[#F0F0F0] selection:bg-[#dd711c] selection:text-white flex flex-col font-sans relative overflow-x-hidden">
        <GlobalParallaxBackground />
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <main className="flex-1 relative z-10 pt-0">
          {hash === '#admin' ? (
            <AdminPanel />
          ) : hash === '#orders' && user && !isAdmin ? (
            <UserOrders />
          ) : (
            <>
              <ParallaxHero onProductSelect={setSelectedProduct} />
              <ProductCatalog onProductSelect={setSelectedProduct} />
              <AboutUs />
              <Testimonials />
              <FAQ />
            </>
          )}
        </main>
        <Footer />
        
        <AnimatePresence>
          {selectedProduct && (
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          )}
        </AnimatePresence>
        
        <CartSidebar />
        
        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
          onProductSelect={setSelectedProduct} 
        />
        
        <ToastContainer />
        <CookieBanner />
        <FloatingWhatsApp />
        <PromoPopup />
      </div>
    </CartProvider>
  );
}
