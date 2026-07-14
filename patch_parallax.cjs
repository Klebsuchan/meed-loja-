const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

content = content.replace(
  'className={`relative w-[320px] h-[380px] md:w-[450px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 mb-6 cursor-pointer hover:border-[#dd711c] transition-colors ${currentItem.glow}`}',
  'className={`relative w-full max-w-[280px] sm:max-w-[320px] h-[340px] sm:h-[380px] md:max-w-none md:w-[450px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 mb-6 cursor-pointer hover:border-[#dd711c] transition-colors ${currentItem.glow}`}'
);

content = content.replace(
  'className="flex flex-col items-center md:items-end w-full md:w-[450px]"',
  'className="flex flex-col items-center md:items-end w-full md:w-auto md:min-w-[450px]"'
);

content = content.replace(
  'className="flex flex-col md:flex-row justify-between items-start md:items-center w-[320px] md:w-full px-2 md:px-4 border-t border-white/10 pt-4 pb-6 md:pb-4 gap-2 md:gap-0"',
  'className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-none md:w-full px-2 md:px-4 border-t border-white/10 pt-4 pb-6 md:pb-4 gap-2 md:gap-0"'
);

fs.writeFileSync('src/components/ParallaxHero.tsx', content);
