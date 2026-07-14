const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

content = content.replace(
  '<motion.div style={{ y: textY }} className="flex flex-col items-center',
  '<motion.div className="flex flex-col items-center'
);

content = content.replace(
  '<motion.div style={{ y: carouselY }} className="w-full md:w-1/2 flex flex-col',
  '<motion.div className="w-full md:w-1/2 flex flex-col'
);

fs.writeFileSync('src/components/ParallaxHero.tsx', content);
