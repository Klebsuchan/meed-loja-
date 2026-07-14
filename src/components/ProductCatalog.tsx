import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { Plus } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';

export function ProductCatalog({ onProductSelect }: { onProductSelect: (product: any) => void }) {
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const prods = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          price: `R$ ${Number(data.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        };
      });
      setProducts(prods);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products in real-time:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const categories = ['Todos', 'Fones', 'Carregadores', 'Periféricos', 'Áudio', 'Acessórios', 'Eletroportáteis'];
  const filteredProducts = selectedCategory === 'Todos' ? products : products.filter(p => p.category === selectedCategory);

  // Background text parallax
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["-50%", "150%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);

  return (
    <section ref={containerRef} id="catalogo" className="relative py-20 md:py-32 px-4 md:px-12 w-full z-30 bg-[#050505] overflow-hidden">
      {/* Intense Background Parallax Text */}
      <motion.div style={{ y: bgTextY }} className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none flex flex-col justify-center overflow-hidden z-0">
        <div className="text-[150px] md:text-[300px] font-black tracking-tighter leading-none whitespace-nowrap transform -rotate-12 translate-y-1/4">
          CATÁLOGO EXCLUSIVO
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div style={{ y: headingY }} className="flex flex-col mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black mb-2 uppercase tracking-tighter"
          >
            Produtos em <span className="text-[#dd711c]">Destaque</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-32 bg-[#dd711c] origin-left" 
          />
        </motion.div>

        <div className="flex overflow-x-auto pb-4 mb-8 md:mb-12 gap-2 md:gap-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 py-2 md:px-6 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors border rounded-full md:rounded-none flex-shrink-0 ${
                selectedCategory === category 
                  ? 'border-[#dd711c] bg-[#dd711c]/10 text-[#dd711c]' 
                  : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold tracking-widest uppercase">Carregando catálogo...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 gap-y-8 md:gap-y-20">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} onClick={() => onProductSelect(product)} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">Nenhum produto cadastrado.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, index, onClick }: { product: any; index: number; onClick: () => void; key?: React.Key }) {
  const cardRef = useRef(null);
  const { addToCart } = useCart();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Staggered parallax speeds based on index
  const speed = index % 3 === 0 ? 50 : index % 3 === 1 ? 0 : 100;
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  // Image internal parallax
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      onClick={onClick}
      className="group relative bg-gradient-to-br from-gray-900 to-[#111111] border border-gray-800 hover:border-[#dd711c] transition-colors duration-500 p-3 md:p-4 flex flex-col cursor-pointer rounded-2xl md:rounded-none"
    >
      <div className="relative h-44 sm:h-48 md:h-80 bg-[#1a1a1a] overflow-hidden mb-3 md:mb-6 flex items-center justify-center rounded-xl md:rounded-none">
        <motion.img
          style={{ y: imgY }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={product.image}
          alt={product.name}
          className="w-full h-[130%] object-cover opacity-80 group-hover:opacity-100 transition-opacity mix-blend-luminosity hover:mix-blend-normal"
        />
        <div className="absolute top-2 left-2 md:top-4 md:left-4 border border-[#dd711c] text-[#dd711c] px-2 py-0.5 md:px-4 md:py-1 text-[8px] md:text-[10px] font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md">
          {product.category}
        </div>
        {product.badge && (
          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#dd711c] text-white px-2 py-0.5 md:px-4 md:py-1 text-[8px] md:text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(221,113,28,0.6)] animate-pulse">
            {product.badge}
          </div>
        )}
      </div>

      <h3 className="text-[11px] md:text-2xl font-black uppercase tracking-tight mb-2 text-white group-hover:text-[#dd711c] transition-colors leading-tight line-clamp-2">
        {product.name}
      </h3>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mt-auto pt-2 md:pt-6 relative overflow-hidden gap-2 md:gap-0">
        <div className="flex flex-col relative z-10">
          <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5 md:mb-1">A partir de</span>
          <span className="text-sm md:text-3xl font-mono font-black text-white leading-none">
            {product.price}
          </span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="h-8 w-8 md:h-12 md:w-12 bg-[#dd711c] md:bg-gray-800 text-white flex items-center justify-center hover:bg-[#dd711c] hover:text-white transition-colors relative z-10 rounded-full md:rounded-none self-end md:self-auto shrink-0"
        >
          <Plus size={20} className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </motion.div>
  );
}
