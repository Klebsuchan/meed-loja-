const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const supportSection = `            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Suporte</h4>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">FAQ</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Garantia</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Contato</a>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Rastreio</a>
            </div>
`;

content = content.replace(supportSection, '');

fs.writeFileSync('src/components/Footer.tsx', content);
