const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const premiumRender = `      ) : activeTab === 'premium' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">Coleção Premium</h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Itens que aparecem no destaque principal (Hero).</p>
            </div>
            <button 
              onClick={() => {
                setIsAdding(!isAdding);
                if (!isAdding) {
                  setPremiumFormData({ title: '', subtitle: '', price: '', image: '' });
                  setEditingProductId(null);
                }
              }}
              className="bg-[#dd711c] text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#c26217] transition-colors"
            >
              {isAdding ? 'Cancelar' : <><Plus size={16}/> Adicionar Destaque</>}
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleAddPremiumItem} className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input required placeholder="Título Curto (ex: Quantum X-90)" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white" value={premiumFormData.title} onChange={e => setPremiumFormData({...premiumFormData, title: e.target.value})} />
                <input required placeholder="Subtítulo (ex: Headphones Pro)" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white" value={premiumFormData.subtitle} onChange={e => setPremiumFormData({...premiumFormData, subtitle: e.target.value})} />
                <input required placeholder="Preço (ex: R$ 499,00)" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white" value={premiumFormData.price} onChange={e => setPremiumFormData({...premiumFormData, price: e.target.value})} />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                  <ImageIcon size={16}/> Imagem do Destaque (Fundo Transparente Recomendado)
                </label>
                <input type="file" accept="image/*" required={!editingProductId} onChange={handlePremiumImageChange} className="text-white text-sm" />
                {premiumFormData.image && <img src={premiumFormData.image} alt="Preview" className="w-32 h-32 object-contain bg-black/50 rounded-lg border border-white/20 mt-2" />}
              </div>

              <button type="submit" className="bg-[#dd711c] text-white py-3 rounded-lg font-bold uppercase tracking-widest mt-4">Salvar Destaque</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumItems.map(item => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-32 h-32 bg-black/50 rounded-xl overflow-hidden shrink-0 border border-white/5">
                  {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-contain" /> : <div className="w-full h-full flex items-center justify-center text-gray-500"><ImageIcon size={32}/></div>}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-white uppercase">{item.title}</h3>
                  <p className="text-sm text-[#dd711c] font-bold uppercase tracking-widest mb-2">{item.subtitle}</p>
                  <p className="text-lg font-mono text-gray-300 mb-4">{item.price}</p>
                </div>
                <div className="flex sm:flex-col gap-2 shrink-0 justify-end sm:justify-start">
                  <button onClick={() => handleEditPremiumItem(item)} className="text-blue-400 hover:text-blue-300 p-3 bg-white/5 rounded-lg transition-colors"><Edit2 size={20}/></button>
                  <button onClick={() => handleDeletePremiumItem(item.id)} className="text-red-400 hover:text-red-300 p-3 bg-white/5 rounded-lg transition-colors"><Trash2 size={20}/></button>
                </div>
              </div>
            ))}
            {premiumItems.length === 0 && <p className="text-gray-400 col-span-2">Nenhum item na coleção premium cadastrado.</p>}
          </div>
        </>
`;

code = code.replace(/      \) \: activeTab === 'marketing' \? \(/, match => premiumRender + match);
fs.writeFileSync('src/components/AdminPanel.tsx', code);
