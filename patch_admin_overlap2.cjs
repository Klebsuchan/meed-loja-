const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Fix delete actions by removing window.confirm
content = content.replace(/if \(window\.confirm\(".*?"\)\) \{([\s\S]*?)\}/g, '$1');
content = content.replace(/if \(!window\.confirm\(".*?"\)\) return;/g, '');

// Fix alert in email sender
content = content.replace(/alert\(`.*?`\);/g, '');
content = content.replace(/alert\(".*?"\);/g, '');

// Fix incorrect password handling
content = content.replace(/else alert\('Senha incorreta'\);/g, "else { const el = document.getElementById('pwd-error'); if(el) el.innerText = 'Senha incorreta'; }");

// Add a tiny error text container in password input area
content = content.replace(
  '<input \n            type="password"',
  '<div id="pwd-error" className="text-red-500 text-xs font-bold uppercase mb-2 h-4"></div>\n          <input \n            type="password"'
);

// Fix overlapping in AdminPanel orders
const oldOrderHTML = `<div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative">
              <button 
                onClick={() => handleDeleteOrder(order.id)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-2"
                title="Deletar pedido"
              >
                <Trash2 size={20}/>
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b border-white/10 pb-4 pr-8 md:pr-12">`;

const newOrderHTML = `<div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">`;

content = content.replace(oldOrderHTML, newOrderHTML);

// Also need to close the div for the grid and the button
const oldGridClose = `                <div className="md:text-right">
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-bold">Endereço de Entrega</p>
                  <p className="text-sm text-gray-300">{order.address}</p>
                  <p className="text-[#dd711c] font-mono font-bold text-xl mt-4">
                    R$ {order.total?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>`;

const newGridClose = `                <div className="md:text-right">
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-bold">Endereço de Entrega</p>
                  <p className="text-sm text-gray-300">{order.address}</p>
                  <p className="text-[#dd711c] font-mono font-bold text-xl mt-4">
                    R$ {order.total?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => handleDeleteOrder(order.id)}
                className="text-red-400 hover:text-red-300 p-2 shrink-0 ml-4"
                title="Deletar pedido"
              >
                <Trash2 size={20}/>
              </button>
            </div>`;

content = content.replace(oldGridClose, newGridClose);

fs.writeFileSync('src/components/AdminPanel.tsx', content);

// Fix overlapping WhatsApp link in Footer by placing it to the left or removing it (since there's a floating one anyway)
let footerContent = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footerContent = footerContent.replace(
  '<a href="#" className="text-gray-500 hover:text-[#dd711c] transition-colors">WhatsApp</a>',
  ''
);
fs.writeFileSync('src/components/Footer.tsx', footerContent);

