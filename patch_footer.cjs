const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

content = content.replace(
  '<a href="#admin" className="text-white/0 hover:text-white/20 transition-colors" title="Área Restrita">\\n            <Shield size={12} />\\n          </a>',
  '<a href="#admin" className="text-gray-600 hover:text-[#dd711c] transition-colors flex items-center gap-2" title="Área Restrita (Guardião)">\\n            <Shield size={14} />\\n          </a>'
);
fs.writeFileSync('src/components/Footer.tsx', content);
