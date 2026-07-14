const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const tabHtml = `          <button 
            onClick={() => { setActiveTab('premium'); setIsAdding(false); }} 
            className={\`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors \${activeTab === 'premium' ? 'bg-[#dd711c] text-white' : 'text-gray-400 hover:text-white'}\`}
          >
            Coleção Premium
          </button>
`;

code = code.replace(/<button[^>]+>\s*Marketing\s*<\/button>/, match => match + '\n' + tabHtml);
fs.writeFileSync('src/components/AdminPanel.tsx', code);
