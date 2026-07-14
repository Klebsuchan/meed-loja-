import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show the banner after a short delay for a better entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:bottom-8 md:right-auto md:max-w-md z-[250] bg-[#1a1a1a]/95 backdrop-blur-xl border border-[#dd711c]/30 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-[#dd711c]/20 flex items-center justify-center shrink-0">
                <Cookie className="text-[#dd711c]" size={20} />
              </div>
              <h3 className="font-bold text-lg">Privacidade & Cookies</h3>
            </div>
            <button 
              onClick={declineCookies} 
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Nós utilizamos cookies para personalizar conteúdo, anúncios e melhorar a sua experiência em nossa loja. Ao continuar navegando, você concorda com a nossa Política de Privacidade.
          </p>
          <div className="flex gap-3">
            <button
              onClick={acceptCookies}
              className="flex-1 bg-[#dd711c] hover:bg-[#c26217] text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-[#dd711c]/20"
            >
              Aceitar Tudo
            </button>
            <button
              onClick={declineCookies}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              Recusar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
