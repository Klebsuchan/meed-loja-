const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

// The file got messed up at the top. Let's just rewrite the whole top section up to export function ParallaxHero.
const correctTop = `import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Headphones, Watch, Speaker, BatteryCharging, ChevronLeft, ChevronRight } from 'lucide-react';

const heroItems = [
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
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroItems.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length);

  // Deep Parallax calculations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const carouselY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Floating elements multi-speed intense parallax
  const float1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const float2Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const float3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const float4Y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const currentItem = heroItems[currentIndex];
  if (!currentItem) return null;

  return (`;

const splitBy = '  return (';
const parts = content.split(splitBy);

fs.writeFileSync('src/components/ParallaxHero.tsx', correctTop + parts.slice(1).join(splitBy));
