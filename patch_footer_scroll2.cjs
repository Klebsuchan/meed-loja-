const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

content = content.replace(
  '<a href="#admin" onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })} className="text-gray-600 hover:text-[#dd711c] transition-colors inline-flex items-center gap-2" title="Área Restrita (Guardião)">',
  '<a href="#admin" onClick={(e) => { e.preventDefault(); window.location.hash = \'#admin\'; window.scrollTo({ top: 0, behavior: \'smooth\' }); }} className="text-gray-600 hover:text-[#dd711c] transition-colors inline-flex items-center gap-2" title="Área Restrita (Guardião)">'
);

fs.writeFileSync('src/components/Footer.tsx', content);
