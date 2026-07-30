import { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { ParallaxHero } from './components/ParallaxHero';
import { ProductCatalog } from './components/ProductCatalog';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { AnimatePresence } from 'motion/react';
import { CartProvider } from './CartContext';
import { ToastContainer } from './components/ToastContainer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { useAuth } from './AuthContext';

// Lazy load non-critical components to optimize for ultra-fast loading
const AdminPanel = lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));
const UserOrders = lazy(() => import('./components/UserOrders').then(m => ({ default: m.UserOrders })));
const ProductModal = lazy(() => import('./components/ProductModal').then(m => ({ default: m.ProductModal })));
const SearchModal = lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const CartSidebar = lazy(() => import('./components/CartSidebar').then(m => ({ default: m.CartSidebar })));
const GlobalParallaxBackground = lazy(() => import('./components/GlobalParallaxBackground').then(m => ({ default: m.GlobalParallaxBackground })));
const CookieBanner = lazy(() => import('./components/CookieBanner').then(m => ({ default: m.CookieBanner })));
const PromoPopup = lazy(() => import('./components/PromoPopup').then(m => ({ default: m.PromoPopup })));
const AboutUs = lazy(() => import('./components/AboutUs').then(m => ({ default: m.AboutUs })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));

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
        <Suspense fallback={null}>
          <GlobalParallaxBackground />
        </Suspense>
        
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        
        <main className="flex-1 relative z-10 pt-0">
          <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#dd711c]"></div></div>}>
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
          </Suspense>
        </main>
        
        <Footer />
        
        <Suspense fallback={null}>
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
          <CookieBanner />
          <PromoPopup />
        </Suspense>
        
        <ToastContainer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
