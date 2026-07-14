const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

content = content.replace(
  'className="text-5xl sm:text-6xl md:text-[100px] font-black leading-[0.9] tracking-tighter uppercase mb-4"',
  'className="text-4xl sm:text-6xl md:text-[80px] lg:text-[100px] font-black leading-[0.9] tracking-tighter uppercase mb-4 max-w-full break-words"'
);

fs.writeFileSync('src/components/ParallaxHero.tsx', content);
