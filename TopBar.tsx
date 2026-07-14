import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShieldCheck, ChevronLeft, ChevronRight, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../CartContext';

export function ProductModal({ product, onClose }: { product: any, onClose: () => void }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const { addToCart, setIsCartOpen } = useCart();

  const images = product.images || [product.image];

  const nextImg = () => setCurrentImageIdx((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-[#dd711c] border border-white/10 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-[85vh] md:h-[600px]">
          {/* Image Gallery */}
          <div className="relative w-full md:w-1/2 h-[40%] md:h-full bg-black flex flex-col overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${product.color || 'from-orange-500 to-amber-500'} opacity-20 mix-blend-overlay z-0`}></div>
            
            <div className="relative flex-1 w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={images[currentImageIdx]}
                  alt={product.name || product.title}
                  className="w-full h-full object-cover absolute inset-0 z-10"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <div className="absolute inset-x-0 flex justify-between px-4 z-20">
                  <button onClick={prevImg} className="w-10 h-10 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#dd711c] transition-colors shadow-xl">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextImg} className="w-10 h-10 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#dd711c] transition-colors shadow-xl">
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
            
            {/* Thumbnails Gallery */}
            {images.length > 1 && (
              <div className="w-full p-4 bg-[#050505]/80 backdrop-blur-md border-t border-white/10 z-20 flex items-center gap-3 overflow-x-auto shrink-0 scrollbar-hide">
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${idx === currentImageIdx ? 'border-[#dd711c] scale-105 shadow-lg shadow-[#dd711c]/20' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto">
            <span className="text-[10px] text-[#dd711c] font-bold uppercase tracking-widest mb-2">
              {product.category || product.subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">
              {product.name || product.title}
            </h2>
            
            <div className="text-3xl font-mono font-black text-[#dd711c] mb-6">
              {product.price}
            </div>

            <div className="w-full h-px bg-white/10 mb-6"></div>

            <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
              {product.description || "Inovação e design em um só produto. Feito com materiais premium para garantir durabilidade e performance incomparável no seu dia a dia."}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3 text-sm text-gray-300">
                <CreditCard size={18} className="text-[#dd711c] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-white">Formas de Pagamento</p>
                  <p className="text-gray-500">Em até 12x sem juros no cartão de crédito ou 10% de desconto no Pix.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-300">
                <ShieldCheck size={18} className="text-[#dd711c] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-white">Compra Segura & Garantia</p>
                  <p className="text-gray-500">Garantia de fábrica de 2 meses. Devolução grátis em até 7 dias.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto shrink-0">
              <button 
                onClick={() => { addToCart(product); onClose(); setIsCartOpen(true); }}
                className="w-full bg-[#dd711c] text-white py-4 rounded-lg font-black uppercase text-xs md:text-sm tracking-widest hover:bg-[#c26217] transition-colors flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(221,113,28,0.3)]"
              >
                <ShoppingBag size={18} />
                <span>Finalizar Pedido</span>
              </button>
              
              <button 
                onClick={() => { addToCart(product); onClose(); }}
                className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-lg font-black uppercase text-xs md:text-sm tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus size={18} />
                <span>Continuar Comprando</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
