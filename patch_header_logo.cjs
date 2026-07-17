const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(
  /<div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-\[#dd711c\]\/30">/g,
  '<div className="h-10 md:h-12 flex items-center justify-center">'
);

code = code.replace(
  /className="h-full w-full object-cover"/g,
  'className="h-full w-auto object-contain"'
);

fs.writeFileSync('src/components/Header.tsx', code);
