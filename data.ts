import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Clock, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { products } from '../data';

export function SearchModal({ isOpen, onClose, onProductSelect }: { isOpen: boolean, onClose: () => void, onProductSelect: (product: any) => void }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    }
  }, [isOpen]);

  const handleProductSelect = (product: any) => {
    if (query.trim() !== '') {
      const newRecent = [query.trim(), ...recentSearches.filter(s => s !== query.trim())].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }
    onProductSelect(product);
    onClose();
  };

  const removeRecentSearch = (e: MouseEvent, searchToRemove: string) => {
    e.stopPropagation();
    const newRecent = recentSearches.filter(s => s !== searchToRemove);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const filteredProducts = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex flex-col items-center pt-24 px-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative flex items-center w-full group">
              <Search className="absolute left-6 text-[#dd711c]" size={24} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Busque por produtos, categorias..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/20 rounded-full py-5 pl-16 pr-14 text-white text-lg focus:outline-none focus:border-[#dd711c] transition-colors shadow-2xl"
              />
              <button 
                onClick={onClose}
                className="absolute right-4 p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-[#dd711c]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Results / Recent Searches */}
            <AnimatePresence>
              {query.trim() !== '' ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto"
                >
                  {filteredProducts.length > 0 ? (
                    <div className="flex flex-col">
                      {filteredProducts.map((product) => (
                        <div 
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group/item"
                        >
                          <div className="w-16 h-16 bg-[#1a1a1a] rounded-md overflow-hidden shrink-0 border border-white/5">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-luminosity group-hover/item:mix-blend-normal transition-all" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="text-[10px] text-[#dd711c] font-bold uppercase tracking-widest mb-1">{product.category}</span>
                            <span className="text-white font-bold group-hover/item:text-[#dd711c] transition-colors">{product.name}</span>
                          </div>
                          <span className="text-white font-mono font-bold">{product.price}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center text-gray-500 font-bold uppercase tracking-widest text-sm flex flex-col items-center justify-center space-y-4">
                      <Search size={48} className="opacity-20" />
                      <span>Nenhum produto encontrado para "{query}"</span>
                    </div>
                  )}
                </motion.div>
              ) : recentSearches.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto"
                >
                  <div className="p-4 border-b border-white/5">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Últimos itens pesquisados</span>
                  </div>
                  <div className="flex flex-col">
                    {recentSearches.map((search, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setQuery(search);
                          setTimeout(() => inputRef.current?.focus(), 50);
                        }}
                        className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group/item"
                      >
                        <Clock size={16} className="text-gray-500 group-hover/item:text-[#dd711c] transition-colors" />
                        <span className="text-gray-300 font-medium flex-1 group-hover/item:text-white transition-colors">{search}</span>
                        <button 
                          onClick={(e) => removeRecentSearch(e, search)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover/item:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
