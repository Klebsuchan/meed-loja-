const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  "  const { user, isAdmin, login } = useAuth();\n  const isAuthenticated = isAdmin;",
  "  const [isAuthenticated, setIsAuthenticated] = useState(false);\n  const [password, setPassword] = useState('');"
);

content = content.replace(
  `  if (!isAuthenticated) {
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
  }`,
  `  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 relative z-20 flex flex-col items-center">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-sm flex flex-col gap-6 backdrop-blur-md text-center">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Acesso Restrito</h2>
            <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Painel Administrativo</p>
          </div>
          <input 
            type="password" 
            placeholder="Digite a senha" 
            className="bg-black/50 border border-white/10 p-4 rounded-lg text-white text-center tracking-widest focus:outline-none focus:border-[#dd711c] transition-colors"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (password === 'meed123online') setIsAuthenticated(true);
                else alert('Senha incorreta');
              }
            }}
          />
          <button 
            onClick={() => {
              if (password === 'meed123online') setIsAuthenticated(true);
              else alert('Senha incorreta');
            }}
            className="w-full bg-[#dd711c] hover:bg-[#c26217] text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-colors"
          >
            Acessar
          </button>
        </div>
      </div>
    );
  }`
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
