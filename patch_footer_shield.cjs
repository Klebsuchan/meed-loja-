const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Remove from the bottom right
content = content.replace(
  '<a href="#admin" className="text-gray-600 hover:text-[#dd711c] transition-colors flex items-center gap-2" title="Área Restrita (Guardião)">\n            <Shield size={14} />\n          </a>',
  ''
);

// Add to the top left
content = content.replace(
  '<p className="text-gray-400 text-sm leading-relaxed border-l-2 border-[#dd711c] pl-4">\n            Acessórios eletrônicos que unem design sofisticado, alta tecnologia e durabilidade para acompanhar o seu estilo de vida.\n          </p>',
  `<p className="text-gray-400 text-sm leading-relaxed border-l-2 border-[#dd711c] pl-4">
            Acessórios eletrônicos que unem design sofisticado, alta tecnologia e durabilidade para acompanhar o seu estilo de vida.
          </p>
          <div className="mt-2">
            <a href="#admin" className="text-gray-600 hover:text-[#dd711c] transition-colors inline-flex items-center gap-2" title="Área Restrita (Guardião)">
              <Shield size={14} />
            </a>
          </div>`
);

fs.writeFileSync('src/components/Footer.tsx', content);
