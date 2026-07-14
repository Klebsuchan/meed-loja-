const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const target = `<a href="#admin" className="text-white/0 hover:text-white/20 transition-colors" title="Área Restrita">
            <Shield size={12} />
          </a>`;

const replacement = `<a href="#admin" className="text-gray-600 hover:text-[#dd711c] transition-colors flex items-center gap-2" title="Área Restrita (Guardião)">
            <Shield size={14} />
          </a>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/Footer.tsx', content);
