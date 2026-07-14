const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

content = content.replace(
  '<a href="#admin" onClick={() => { setTimeout(() => window.scrollTo({ top: 0, behavior: \'smooth\' }), 100); }}',
  '<a href="#admin" onClick={() => window.scrollTo(0, 0)}'
);

fs.writeFileSync('src/components/Footer.tsx', content);
