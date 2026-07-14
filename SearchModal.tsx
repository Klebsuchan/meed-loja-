import { motion, useScroll, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { TopBar } from './TopBar';

export function Header({ onSearchClick }: { onSearchClick: () => void }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const { user, isAdmin, login, logout } = useAuth();
  
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 transition-transform duration-500">
        <div className={`transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0' : 'h-auto'}`}>
          <TopBar />
        </div>
        <motion.header
          className={`transition-all duration-500 w-full ${
            isScrolled ? "py-4 bg-[#050505] border-b border-white/10" : "py-4 md:py-8 bg-gradient-to-b from-[#050505] to-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-[#dd711c]/30">
              <img
                src="/logomeed.png"
                alt="Meed Loja Online Logo"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden text-xs font-bold text-[#dd711c]">M</div>
            </div>
            <span className="text-lg md:text-xl font-bold tracking-widest uppercase text-white group-hover:text-[#dd711c] transition-colors">Meed Loja Online</span>
          </a>

          <nav className="hidden md:flex items-center space-x-6 text-[10px] lg:text-xs font-bold text-gray-300 uppercase tracking-widest">
            <a href="#" className="hover:text-[#dd711c] transition-colors">Início</a>
            <a href="#catalogo" className="hover:text-[#dd711c] transition-colors">Catálogo</a>
            <a href="#sobre" className="hover:text-[#dd711c] transition-colors">Sobre Nós</a>
            <a href="#depoimentos" className="hover:text-[#dd711c] transition-colors">Depoimentos</a>
            <a href="#faq" className="hover:text-[#dd711c] transition-colors">Dúvidas</a>
            {user && !isAdmin && <a href="#orders" className="hover:text-[#dd711c] transition-colors">Meus Pedidos</a>}
          </nav>

          <div className="flex items-center space-x-4 bg-[#1a1a1a] px-4 py-2 rounded-full border border-white/10">
            <button onClick={onSearchClick} className="text-gray-300 hover:text-[#dd711c] transition-colors">
              <Search size={20} strokeWidth={2.5} />
            </button>
            
            <div className="w-px h-4 bg-white/20"></div>
            
            {user ? (
              <button onClick={logout} className="text-gray-300 hover:text-[#dd711c] transition-colors" title="Sair">
                <LogOut size={20} strokeWidth={2.5} />
              </button>
            ) : (
              <button onClick={login} className="text-gray-300 hover:text-[#dd711c] transition-colors" title="Entrar">
                <User size={20} strokeWidth={2.5} />
              </button>
            )}

            <div className="w-px h-4 bg-white/20"></div>

            <button className="text-gray-300 hover:text-[#dd711c] transition-colors relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} strokeWidth={2.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 h-4 w-4 bg-[#dd711c] text-white rounded-full text-[10px] flex items-center justify-center font-bold shadow-[0_0_10px_rgba(221,113,28,0.5)]"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-300 hover:text-[#dd711c] transition-colors ml-2 border-l border-white/20 pl-4">
              <Menu size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between p-4 px-4 border-b border-white/10 mt-8">
              <span className="text-lg font-bold tracking-widest uppercase text-white">Meed Loja Online</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-[#dd711c] p-2">
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
            <nav className="flex flex-col flex-1 p-6 space-y-6 text-xl font-bold uppercase tracking-widest text-white mt-4">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#dd711c] transition-colors border-l-2 border-transparent hover:border-[#dd711c] pl-4">Início</a>
              <a href="#catalogo" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#dd711c] transition-colors border-l-2 border-transparent hover:border-[#dd711c] pl-4">Catálogo</a>
              <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#dd711c] transition-colors border-l-2 border-transparent hover:border-[#dd711c] pl-4">Sobre Nós</a>
              <a href="#depoimentos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#dd711c] transition-colors border-l-2 border-transparent hover:border-[#dd711c] pl-4">Depoimentos</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#dd711c] transition-colors border-l-2 border-transparent hover:border-[#dd711c] pl-4">Dúvidas</a>
              {user && !isAdmin && <a href="#orders" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#dd711c] transition-colors border-l-2 border-transparent hover:border-[#dd711c] pl-4">Meus Pedidos</a>}
              {user ? (
                 <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#dd711c] transition-colors border-l-2 border-transparent hover:border-[#dd711c] pl-4">Sair</button>
              ) : (
                 <button onClick={() => { login(); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#dd711c] transition-colors border-l-2 border-transparent hover:border-[#dd711c] pl-4">Entrar com Google</button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
