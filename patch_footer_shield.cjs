const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

content = content.replace(
  '<a href="#admin" onClick={(e) => { e.preventDefault(); window.location.hash = \'#admin\'; window.scrollTo({ top: 0, behavior: \'smooth\' }); }}',
  '<a href="#admin" onClick={() => { setTimeout(() => window.scrollTo({ top: 0, behavior: \'smooth\' }), 100); }}'
);

fs.writeFileSync('src/components/Footer.tsx', content);
