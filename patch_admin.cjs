const fs = require('fs');

let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');

// Update activeTab typing
code = code.replace(
  /const \[activeTab, setActiveTab\] = useState<'products' \| 'orders' \| 'coupons' \| 'marketing' \| 'premium'>\('products'\);/,
  "const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons' | 'marketing' | 'premium' | 'settings'>('products');"
);

// Add getDoc, setDoc to imports if not there
if (!code.includes('getDoc')) {
  code = code.replace(/import { (.*) } from 'firebase\/firestore';/, "import { getDoc, setDoc, $1 } from 'firebase/firestore';");
}

// Replace login logic
const loginLogic = `
            onKeyDown={async e => {
              if (e.key === 'Enter') {
                const settingsRef = doc(db, 'settings', 'admin');
                const snap = await getDoc(settingsRef);
                let expectedPassword = 'meed123online';
                if (snap.exists()) {
                  expectedPassword = snap.data().password || 'meed123online';
                } else {
                  await setDoc(settingsRef, { password: 'meed123online' });
                }
                
                if (password === expectedPassword) setIsAuthenticated(true);
                else { const el = document.getElementById('pwd-error'); if(el) el.innerText = 'Senha incorreta'; }
              }
            }}
`;

code = code.replace(
  /onKeyDown={e => {[\s\S]*?}}/m,
  loginLogic
);

// Add Settings tab button
const settingsTabBtn = `
          <button onClick={() => setActiveTab('settings')} className={\`whitespace-nowrap uppercase tracking-widest text-xs font-bold pb-4 transition-colors \${activeTab === 'settings' ? 'text-[#dd711c] border-b-2 border-[#dd711c]' : 'text-gray-500 hover:text-white'}\`}>Config</button>
        </div>`;

code = code.replace(
  /<\/div>\s*<\/div>\s*<div className="bg-black\/50 p-6 rounded-2xl border border-white\/5">/,
  settingsTabBtn + '\n      </div>\n      <div className="bg-black/50 p-6 rounded-2xl border border-white/5">'
);

// Add Settings Tab Content
const settingsContent = `
          {activeTab === 'settings' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-widest">Configurações do Sistema</h2>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-6">
                <h3 className="text-md font-bold mb-2 text-white">Senha do Painel de Controle</h3>
                <p className="text-sm text-gray-400 mb-4">Esta senha é compartilhada para acesso ao painel de administrador. Alterar a senha afetará todos os dispositivos.</p>
                <input id="new-pwd-input" type="password" placeholder="Nova Senha" className="w-full bg-black/50 border border-white/10 p-4 rounded-lg text-white outline-none focus:border-[#dd711c] mb-4" />
                <button onClick={async () => {
                  const val = document.getElementById('new-pwd-input').value;
                  if (!val) return alert('Digite uma senha válida.');
                  try {
                    await updateDoc(doc(db, 'settings', 'admin'), { password: val });
                    alert('Senha alterada com sucesso! Todos os usuários deverão usar a nova senha.');
                    document.getElementById('new-pwd-input').value = '';
                  } catch (e) {
                    alert('Erro ao atualizar a senha.');
                  }
                }} className="bg-[#dd711c] hover:bg-orange-600 transition-colors text-white py-3 px-6 rounded-lg font-bold uppercase tracking-widest">
                  Salvar Nova Senha
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'products' && (
`;

code = code.replace(
  /{\s*activeTab === 'products' && \(/m,
  settingsContent
);

fs.writeFileSync('src/components/AdminPanel.tsx', code);
console.log('Admin Panel updated.');
