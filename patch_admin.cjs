const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// replace the imports
content = content.replace(
  "import { Trash2, Plus, Image as ImageIcon, Package } from 'lucide-react';",
  "import { Trash2, Plus, Image as ImageIcon, Package } from 'lucide-react';\nimport { useAuth } from '../AuthContext';"
);

// replace isAuthenticated logic with useAuth
content = content.replace(
  "  const [couponData, setCouponData] = useState({\n    code: '',\n    discountPercentage: ''\n  });\n  const [isAuthenticated, setIsAuthenticated] = useState(false);\n  const [password, setPassword] = useState('');",
  "  const [couponData, setCouponData] = useState({\n    code: '',\n    discountPercentage: ''\n  });\n  const { user, isAdmin, login } = useAuth();\n  const isAuthenticated = isAdmin;"
);

// replace the password UI with google login UI
content = content.replace(
  /if \(!isAuthenticated\) \{\s*return \(\s*<div className="max-w-md mx-auto px-4 py-32 relative z-20 flex flex-col items-center">[\s\S]*?<\/div>\s*\);\s*\}/,
  `if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 relative z-20 flex flex-col items-center">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-sm flex flex-col gap-6 backdrop-blur-md text-center">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Acesso Restrito</h2>
            <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Painel Administrativo</p>
          </div>
          <button 
            onClick={login}
            className="w-full bg-[#dd711c] hover:bg-[#c26217] text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-colors"
          >
            Fazer Login com Google
          </button>
        </div>
      </div>
    );
  }`
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
