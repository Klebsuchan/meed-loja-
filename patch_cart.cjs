const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b border-white/10 pb-4">',
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b border-white/10 pb-4 pr-8 md:pr-12">'
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);

let footerContent = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footerContent = footerContent.replace(
  '<div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest items-center">',
  '<div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest items-center pr-12 md:pr-20">'
);
fs.writeFileSync('src/components/Footer.tsx', footerContent);

