const fs = require('fs');
const file = 'src/components/ParallaxHero.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `<div className="shrink-0 flex items-center justify-start md:justify-end">
                  <span className="text-lg md:text-xl font-mono font-black text-[#dd711c] whitespace-nowrap">{currentItem.price}</span>
                </div>`;

const replacement = `<div className="shrink-0 flex items-center justify-start md:justify-end mt-2 md:mt-0 bg-black/40 px-4 py-2 rounded-xl border border-[#dd711c]/30 backdrop-blur-md">
                  <span className="text-base md:text-xl font-mono font-black text-[#dd711c] whitespace-nowrap tracking-tighter">{currentItem.price}</span>
                </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync(file, code);
  console.log('Patched');
} else {
  console.log('Target not found');
}
