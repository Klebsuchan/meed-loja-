import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../CartContext';
import { ShoppingBag, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useCart();

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[200] flex flex-col space-y-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="bg-[#1a1a1a] border border-[#dd711c]/30 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-2xl flex items-center space-x-3 pointer-events-auto backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-[#dd711c]/20 flex items-center justify-center shrink-0">
              <ShoppingBag size={14} className="text-[#dd711c]" />
            </div>
            <div className="flex flex-col pr-6">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Adicionado ao carrinho</span>
              <span className="text-sm font-bold truncate max-w-[150px] md:max-w-[200px]">{toast.productName}</span>
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
