const fs = require('fs');
const content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

const heroItemsStr = `const heroItems = [
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

export function ParallaxHero`;

const replaced = content.replace('export function ParallaxHero', heroItemsStr);
fs.writeFileSync('src/components/ParallaxHero.tsx', replaced);
