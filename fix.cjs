const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf-8');
const search = "      ) : activeTab === 'products' ? (";
if (code.includes(search)) {
  code = code.replace(search, 
`      ) : activeTab === 'settings' ? (
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-6">Configurações do Sistema</h2>
            <div className="max-w-md">
              <h3 className="text-md font-bold mb-2 text-white">Senha do Painel de Controle</h3>
              <p className="text-sm text-gray-400 mb-4">Esta senha é compartilhada para acesso ao painel de administrador. Alterar a senha afetará todos os dispositivos.</p>
              <input id="new-pwd-input" type="password" placeholder="Nova Senha" className="w-full bg-black/50 border border-white/10 p-4 rounded-lg text-white outline-none focus:border-[#dd711c] mb-4" />
              <button onClick={async () => {
                const val = (document.getElementById('new-pwd-input') as HTMLInputElement).value;
                if (!val) return alert('Digite uma senha válida.');
                try {
                  await updateDoc(doc(db, 'settings', 'admin'), { password: val });
                  alert('Senha alterada com sucesso! Todos os usuários deverão usar a nova senha no próximo login.');
                  (document.getElementById('new-pwd-input') as HTMLInputElement).value = '';
                } catch (e) {
                  alert('Erro ao atualizar a senha.');
                  console.error(e);
                }
              }} className="bg-[#dd711c] hover:bg-orange-600 transition-colors text-white py-3 px-6 rounded-lg font-bold uppercase tracking-widest">
                Salvar Nova Senha
              </button>
            </div>
          </div>
        </div>
      ) : activeTab === 'products' ? (`
  );
  fs.writeFileSync('src/components/AdminPanel.tsx', code);
  console.log("Replaced!");
}
