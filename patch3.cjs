const fs = require('fs');
let content = fs.readFileSync('src/components/PromoPopup.tsx', 'utf8');

content = content.replace(/sessionStorage/g, 'localStorage');

content = content.replace(
  'setIsOpen(true);',
  "setIsOpen(true);\n        localStorage.setItem('seenPromo', 'true');"
);

fs.writeFileSync('src/components/PromoPopup.tsx', content);
