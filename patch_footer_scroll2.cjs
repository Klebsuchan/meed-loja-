const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const newColumn = `<div className="flex flex-col gap-4">
            <h4 className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Políticas</h4>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Termos de Uso</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Privacidade</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Cookies</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-[#dd711c] transition-colors">Trocas</a>
          </div>
        </div>`;

content = content.replace('</div>\n        </div>\n      </div>', newColumn + '\n      </div>');

// Ensure we didn't mess up the nesting
fs.writeFileSync('src/components/Footer.tsx', content);
