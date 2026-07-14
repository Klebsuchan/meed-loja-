const fs = require('fs');
let content = fs.readFileSync('src/components/ProductCatalog.tsx', 'utf8');

content = content.replace(
  'className="relative h-40 md:h-80 bg-[#1a1a1a] overflow-hidden mb-3 md:mb-6 flex items-center justify-center"',
  'className="relative h-44 sm:h-48 md:h-80 bg-[#1a1a1a] overflow-hidden mb-3 md:mb-6 flex items-center justify-center rounded-xl md:rounded-none"'
);

// also let's check ProductCard wrapper
content = content.replace(
  'className="group relative bg-gradient-to-br from-gray-900 to-[#111111] border border-gray-800 hover:border-[#dd711c] transition-colors duration-500 p-2 md:p-4 flex flex-col cursor-pointer"',
  'className="group relative bg-gradient-to-br from-gray-900 to-[#111111] border border-gray-800 hover:border-[#dd711c] transition-colors duration-500 p-3 md:p-4 flex flex-col cursor-pointer rounded-2xl md:rounded-none"'
);

fs.writeFileSync('src/components/ProductCatalog.tsx', content);
