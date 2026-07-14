import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Headphones, Watch, Speaker, BatteryCharging, ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';

const fallbackHeroItems = [
  {
    id: 1,
    title: "Quantum X-90",
    subtitle: "Headphones Pro",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
    price: "R$ 499,00",
    color: "from-orange-600 to-amber-600",
    glow: "shadow-[0_0_80px_rgba(221,113,28,0.4)]"
  },
  {
    id: 2,
    title: "Meed Watch Series",
    subtitle: "Conectividade Total",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
    price: "R$ 799,00",
    color: "from-orange-600 to-red-600",
    glow: "shadow-[0_0_80px_rgba(221,113,28,0.4)]"
  },
  {
    id: 3,
    title: "Sound360 Ultra",
    subtitle: "Som Imersivo",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=1200",
    price: "R$ 299,00",
    color: "from-blue-600 to-cyan-600",
    glow: "shadow-[0_0_80px_rgba(221,113,28,0.4)]"
  }
];

export function ParallaxHero({ onProductSelect }: { onProductSelect: (product: any) => void }) {
  const ref = useRef(null);
  const [heroItems, setHeroItems] = useState<any[]>(fallbackHeroItems);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const prods = querySnapshot.docs.map(doc => {
        const data = doc.data();
        let rawTitle = data.name || data.title || "Produto";
        
        // Encurtando nomes
        if (rawTitle.toLowerCase().includes('carregamento')) {
          rawTitle = "Base Dupla";
        } else if (rawTitle.length > 16) {
          const words = rawTitle.split(' ');
          if (words.length > 2) {
             rawTitle = words.slice(0, 2).join(' ');
          } else {
             rawTitle = rawTitle.substring(0, 16);
          }
        }
        
        return {
          id: doc.id,
          ...data,
          title: rawTitle,
          subtitle: data.category || "Destaque",
          price: `R$ ${Number(data.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          color: "from-orange-600 to-amber-600",
          glow: "shadow-[0_0_80px_rgba(221,113,28,0.4)]"
        };
      });
      
      if (prods.length > 0) {
        setHeroItems(prods.slice(0, 3));
      }
    });
    return () => unsubscribe();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroItems.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroItems.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);

  // Deep Parallax calculations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const carouselY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Floating elements multi-speed intense parallax
  const float1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const float2Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const float3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const float4Y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const currentItem = heroItems[currentIndex] || heroItems[0];
  if (!currentItem) return null;

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#050505] pt-32 pb-24 md:pt-32 md:pb-12">
      {/* Animated Background Text Watermarks */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden flex flex-col justify-between">
        <div className="text-[120px] md:text-[450px] font-black tracking-tighter leading-none -ml-4 md:-ml-10 -mt-10 md:-mt-20">MEED</div>
        <div className="text-[120px] md:text-[450px] font-black tracking-tighter leading-none text-right -mr-4 md:-mr-20">2026</div>
      </motion.div>

      {/* Floating Parallax Icons (Representing Electronics) */}
      <motion.div style={{ y: float1Y }} className="absolute top-[15%] left-[5%] md:left-[10%] text-white/5 drop-shadow-2xl hidden md:block">
        <Headphones size={180} strokeWidth={0.5} />
      </motion.div>
      <motion.div style={{ y: float3Y }} className="absolute top-[75%] left-[2%] md:left-[8%] text-white/5 drop-shadow-2xl">
        <BatteryCharging size={80} className="md:w-[140px] md:h-[140px]" strokeWidth={0.5} />
      </motion.div>
      <motion.div style={{ y: float2Y }} className="absolute top-[20%] right-[5%] md:right-[10%] text-white/5 drop-shadow-2xl">
        <Watch size={100} className="md:w-[160px] md:h-[160px]" strokeWidth={0.5} />
      </motion.div>
      <motion.div style={{ y: float4Y }} className="absolute top-[80%] right-[10%] md:right-[15%] text-white/5 drop-shadow-2xl hidden md:block">
        <Speaker size={130} strokeWidth={0.5} />
      </motion.div>

      {/* Background Accent Glow */}
      <div className="absolute right-0 top-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#dd711c] rounded-full blur-[150px] md:blur-[250px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 w-full max-w-7xl h-full gap-8 md:gap-0 mt-8 md:mt-0">
        
        {/* Left Content */}
        <motion.div className="flex flex-col items-center text-center md:items-start md:text-left w-full md:w-1/2 pt-16 md:pt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[#dd711c] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4"
          >
            Coleção Premium
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentIndex}`}
              initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -30, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-[80px] lg:text-[100px] font-black leading-[0.9] tracking-tighter uppercase mb-4 max-w-full break-words"
            >
              {currentItem.title.split(' ')[0]}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dd711c] to-[#dd711c]">
                {currentItem.title.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm md:text-lg text-gray-400 max-w-md mb-8 md:mb-10 leading-relaxed border-l-2 border-transparent md:border-[#dd711c] pl-0 md:pl-6"
            >
              Tecnologia de ponta e design focado no seu estilo. {currentItem.subtitle} disponível agora.
            </motion.p>
          </AnimatePresence>
          

        </motion.div>

        {/* Right Carousel Image */}
        <motion.div className="w-full md:w-1/2 flex flex-col justify-center md:justify-end items-center md:items-end relative mt-12 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center md:items-end w-full md:w-auto md:min-w-[450px]"
            >
              <div 
                className={`relative w-full max-w-[280px] sm:max-w-[320px] h-[340px] sm:h-[380px] md:max-w-none md:w-[450px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 mb-6 cursor-pointer hover:border-[#dd711c] transition-colors ${currentItem.glow}`}
                onClick={() => onProductSelect(currentItem)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${currentItem.color} mix-blend-overlay opacity-40 z-10`}></div>
                <img src={currentItem.image} alt={currentItem.title} className="w-full h-full object-cover object-center scale-110" />
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-none md:w-full px-2 md:px-4 border-t border-white/10 pt-4 pb-6 md:pb-4 gap-2 md:gap-0">
                <div className="flex flex-col text-left">
                  <span className="text-lg md:text-2xl font-black uppercase tracking-tight text-white leading-tight">{currentItem.title}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">{currentItem.subtitle}</span>
                </div>
                <span className="text-lg md:text-xl font-mono font-black text-[#dd711c]">{currentItem.price}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="relative flex mt-6 md:mt-8 space-x-4 z-40 md:self-end md:pr-4">
            <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-none">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#dd711c] hover:border-[#dd711c] transition-all text-white group shadow-lg rounded-none">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="absolute hidden md:flex md:right-[480px] top-1/2 -translate-y-1/2 flex-col space-y-4 z-40">
            {heroItems.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`w-1 transition-all duration-300 ${idx === currentIndex ? 'h-12 bg-[#dd711c]' : 'h-4 bg-white/20 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none" />
    </section>
  );
}
