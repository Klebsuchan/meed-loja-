import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Tag, ArrowRight } from 'lucide-react';

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenPromo, setHasSeenPromo] = useState(false);

  useEffect(() => {
    // Check if user has already seen the promo in this session
    const seen = localStorage.getItem('seenPromo');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('seenPromo', 'true');
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timer);
    } else {
      setHasSeenPromo(true);
    }
  }, []);

  const closePromo = () => {
    setIsOpen(false);
    localStorage.setItem('seenPromo', 'true');
    setHasSeenPromo(true);
  };

  if (hasSeenPromo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[150] w-auto max-w-sm md:max-w-md bg-[#0a0a0a] border border-[#dd711c]/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(221,113,28,0.2)]"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#dd711c] to-amber-500"></div>
          
          <button 
            onClick={closePromo}
            className="absolute top-3 right-3 text-gray-400 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-1.5 transition-colors z-10"
          >
            <X size={16} />
          </button>

          <div className="flex">
            <div className="hidden sm:flex w-1/3 bg-gradient-to-br from-[#1a1a1a] to-black items-center justify-center p-4 border-r border-white/5 relative overflow-hidden">
               <Tag size={48} className="text-[#dd711c] drop-shadow-xl" strokeWidth={1.5} />
               <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#dd711c] rounded-full blur-2xl opacity-20"></div>
            </div>
            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
              <span className="text-[10px] text-[#dd711c] font-bold uppercase tracking-widest mb-1 animate-pulse">Oferta Exclusiva</span>
              <h3 className="text-white font-black text-lg md:text-xl leading-tight uppercase tracking-tight mb-2">
                10% OFF Na Primeira Compra!
              </h3>
              <p className="text-gray-400 text-xs md:text-sm mb-4 leading-relaxed">
                Utilize o cupom <span className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20">MEED10</span> no carrinho e aproveite.
              </p>
              <button 
                onClick={closePromo}
                className="bg-[#dd711c] hover:bg-[#c26217] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors w-full"
              >
                <span>Aproveitar Agora</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
