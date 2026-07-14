import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Trash2, Plus, Edit2, Image as ImageIcon, Package } from 'lucide-react';
import { useAuth } from '../AuthContext';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons' | 'marketing'>('products');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Fones',
    image: '',
    badge: ''
  });
  const [couponData, setCouponData] = useState({
    code: '',
    discountPercentage: ''
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    let unsubscribe: () => void;

    if (activeTab === 'products') {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });
    } else if (activeTab === 'orders') {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), date: doc.data().createdAt?.toDate().toLocaleDateString('pt-BR') })));
        setLoading(false);
      });
    } else if (activeTab === 'coupons') {
      const q = query(collection(db, 'coupons'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        setCoupons(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });
    } else if (activeTab === 'marketing') {
      const q = query(collection(db, 'carts'), orderBy('updatedAt', 'desc'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        setCarts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), date: doc.data().updatedAt?.toDate().toLocaleDateString('pt-BR') })));
        setLoading(false);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [activeTab, isAuthenticated]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const priceNumber = parseFloat(formData.price.toString().replace(',', '.'));
      const productData = {
        name: formData.name,
        description: formData.description,
        price: priceNumber,
        category: formData.category,
        image: formData.image,
        badge: formData.badge,
      };

      if (editingProductId) {
        await updateDoc(doc(db, 'products', editingProductId), productData);
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingProductId(null);
      setFormData({ name: '', description: '', price: '', category: 'Fones', image: '', badge: '' });
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleEditProduct = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price?.toString().replace('.', ',') || '',
      category: product.category,
      image: product.image,
      badge: product.badge || ''
    });
    setEditingProductId(product.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = async (id: string) => {
    
      await deleteDoc(doc(db, 'products', id));
    
  };

  const handleDeleteOrder = async (id: string) => {
    
      await deleteDoc(doc(db, 'orders', id));
    
  };

  const handleAddCoupon = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'coupons'), {
        code: couponData.code.toUpperCase(),
        discountPercentage: Number(couponData.discountPercentage),
        active: true,
        createdAt: serverTimestamp()
      });
      setIsAdding(false);
      setCouponData({ code: '', discountPercentage: '' });
    } catch (error) {
      console.error("Error adding coupon", error);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    
      await deleteDoc(doc(db, 'coupons', id));
    
  };

  const toggleCouponStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'coupons', id), { active: !currentStatus });
    } catch (error) {
      console.error("Error toggling coupon status", error);
    }
  };

  const triggerAbandonedCartEmails = async () => {
    
    
    try {
      const { getDocs } = await import('firebase/firestore');
      const q = query(collection(db, 'carts'));
      const snapshot = await getDocs(q);
      
      let sentCount = 0;
      const now = new Date();
      
      for (const cartDoc of snapshot.docs) {
        const cartData = cartDoc.data();
        if (!cartData.items || cartData.items.length === 0 || !cartData.email) continue;
        
        const updatedAt = cartData.updatedAt?.toDate();
        const lastEmailSentAt = cartData.lastEmailSentAt?.toDate();
        
        if (!updatedAt) continue;
        
        const daysSinceUpdate = (now.getTime() - updatedAt.getTime()) / (1000 * 3600 * 24);
        
        // If cart is older than 7 days, and we haven't sent an email in the last 7 days
        let shouldSend = false;
        if (daysSinceUpdate >= 7) {
          if (!lastEmailSentAt) {
            shouldSend = true;
          } else {
            const daysSinceLastEmail = (now.getTime() - lastEmailSentAt.getTime()) / (1000 * 3600 * 24);
            if (daysSinceLastEmail >= 7) {
              shouldSend = true;
            }
          }
        }
        
        if (shouldSend) {
          // Add to mail collection for Firebase Trigger Email extension
          await addDoc(collection(db, 'mail'), {
            to: cartData.email,
            message: {
              subject: "Você estava vendo isso... O preço abaixou! - Meed Loja Online",
              html: `
                <div style="font-family: sans-serif; padding: 20px; text-align: center;">
                  <h2>Olá! Notamos que você deixou alguns itens no carrinho.</h2>
                  <p>Você estava vendo isso e não finalizou a compra. Compre agora!</p>
                  <p><strong>O preço disso pode ter abaixado!</strong></p>
                  <div style="margin: 20px 0;">
                    ${cartData.items.map((item: any) => `
                      <div style="margin-bottom: 10px;">
                        <img src="${item.image}" width="100" style="border-radius: 8px;" />
                        <p>${item.quantity}x ${item.name} - ${item.price}</p>
                      </div>
                    `).join('')}
                  </div>
                  <a href="${window.location.origin}" style="background: #dd711c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Voltar para a Loja
                  </a>
                </div>
              `,
              from: "Meedlojaonlinecarrinho <noreply@meedlojaonline.com>"
            }
          });
          
          // Update lastEmailSentAt
          const { updateDoc } = await import('firebase/firestore');
          await updateDoc(doc(db, 'carts', cartDoc.id), {
            lastEmailSentAt: serverTimestamp(),
            notified: true
          });
          
          sentCount++;
        }
      }
      
      
    } catch (error) {
      console.error("Error triggering emails", error);
      
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-32 relative z-20 flex flex-col items-center">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-sm flex flex-col gap-6 backdrop-blur-md text-center">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Acesso Restrito</h2>
            <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Painel Administrativo</p>
          </div>
          <div id="pwd-error" className="text-red-500 text-xs font-bold uppercase mb-2 h-4"></div>
          <input 
            type="password" 
            placeholder="Digite a senha" 
            className="bg-black/50 border border-white/10 p-4 rounded-lg text-white text-center tracking-widest focus:outline-none focus:border-[#dd711c] transition-colors"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (password === 'meed123online') setIsAuthenticated(true);
                else { const el = document.getElementById('pwd-error'); if(el) el.innerText = 'Senha incorreta'; }
              }
            }}
          />
          <button 
            onClick={() => {
              if (password === 'meed123online') setIsAuthenticated(true);
              else { const el = document.getElementById('pwd-error'); if(el) el.innerText = 'Senha incorreta'; }
            }}
            className="w-full bg-[#dd711c] hover:bg-[#c26217] text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-colors"
          >
            Acessar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-[160px] md:pt-[200px] pb-8 relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Painel Admin</h1>
        <div className="flex bg-white/5 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('products')} 
            className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'products' ? 'bg-[#dd711c] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Produtos
          </button>
          <button 
            onClick={() => { setActiveTab('orders'); setIsAdding(false); }} 
            className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${activeTab === 'orders' ? 'bg-[#dd711c] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Package size={14} /> Pedidos
          </button>
          <button 
            onClick={() => { setActiveTab('coupons'); setIsAdding(false); }} 
            className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'coupons' ? 'bg-[#dd711c] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Cupons
          </button>
          <button 
            onClick={() => { setActiveTab('marketing'); setIsAdding(false); }} 
            className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'marketing' ? 'bg-[#dd711c] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Marketing
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">Carregando dados...</div>
      ) : activeTab === 'products' ? (
        <>
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="bg-[#dd711c] text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#c26217] transition-colors"
            >
              {isAdding ? 'Cancelar' : <><Plus size={16}/> Adicionar Produto</>}
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleAddProduct} className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Nome do Produto" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required placeholder="Preço (ex: 299,90)" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                <select className="bg-[#111111] border border-white/10 p-3 rounded-lg text-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="Fones">Fones</option>
                  <option value="Carregadores">Carregadores</option>
                  <option value="Periféricos">Periféricos</option>
                  <option value="Áudio">Áudio</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Eletroportáteis">Eletroportáteis</option>
                </select>
                <input placeholder="Badge Opcional (ex: Lançamento)" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white" value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} />
              </div>
              <textarea required placeholder="Descrição" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white h-24 resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-bold flex items-center gap-2">
                  <ImageIcon size={16}/> Foto do Produto
                </label>
                <input type="file" accept="image/*" required={!editingProductId} onChange={handleImageChange} className="text-white text-sm" />
                {formData.image && <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-white/20 mt-2" />}
              </div>

              <button type="submit" className="bg-[#dd711c] text-white py-3 rounded-lg font-bold uppercase tracking-widest mt-4">Salvar Produto</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-black shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm leading-tight truncate">{product.name}</h3>
                  <p className="text-[#dd711c] font-mono font-bold text-sm mt-1">R$ {product.price?.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs text-gray-400 mt-1">{product.category}</p>
                </div>
                <div className="flex gap-2 shrink-0 h-fit">
                  <button onClick={() => handleEditProduct(product)} className="text-blue-400 hover:text-blue-300 p-2"><Edit2 size={20}/></button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={20}/></button>
                </div>
              </div>
            ))}
            {products.length === 0 && <p className="text-gray-400 col-span-3">Nenhum produto cadastrado no banco de dados.</p>}
          </div>
        </>
      ) : activeTab === 'orders' ? (
        <div className="flex flex-col gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-widest mb-1">Pedido #{order.id.substring(0, 8)}</p>
                  <p className="text-xs text-gray-400">{order.date}</p>
                  <p className="text-sm text-gray-300 mt-2 font-bold">{order.customerName}</p>
                  <p className="text-xs text-gray-400">CPF: {order.cpf}</p>
                  <p className="text-xs text-gray-400">{order.userEmail}</p>
                </div>
                <div className="md:text-right">
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
            </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Itens do Pedido</p>
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-sm text-gray-300 bg-black/20 p-2 rounded">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-mono">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {orders.length === 0 && <p className="text-gray-400">Nenhum pedido encontrado.</p>}
        </div>
      ) : activeTab === 'coupons' ? (
        <>
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="bg-[#dd711c] text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#c26217] transition-colors"
            >
              {isAdding ? 'Cancelar' : <><Plus size={16}/> Adicionar Cupom</>}
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleAddCoupon} className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 flex flex-col gap-4 max-w-lg">
              <div className="flex flex-col gap-4">
                <input required placeholder="Código (ex: PRIMEIRA10)" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white uppercase" value={couponData.code} onChange={e => setCouponData({...couponData, code: e.target.value.toUpperCase()})} />
                <input required type="number" min="1" max="100" placeholder="Desconto em % (ex: 10)" className="bg-white/5 border border-white/10 p-3 rounded-lg text-white" value={couponData.discountPercentage} onChange={e => setCouponData({...couponData, discountPercentage: e.target.value})} />
              </div>
              <button type="submit" className="bg-[#dd711c] text-white py-3 rounded-lg font-bold uppercase tracking-widest mt-2">Salvar Cupom</button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coupons.map(coupon => (
              <div key={coupon.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col relative">
                <button onClick={() => handleDeleteCoupon(coupon.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
                <h3 className="font-bold text-white text-xl tracking-widest">{coupon.code}</h3>
                <p className="text-[#dd711c] font-mono text-2xl my-2 font-bold">{coupon.discountPercentage}% OFF</p>
                <div className="mt-auto flex items-center gap-2 pt-4">
                  <button 
                    onClick={() => toggleCouponStatus(coupon.id, coupon.active)}
                    className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-widest transition-colors ${coupon.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {coupon.active ? 'Ativo' : 'Inativo'}
                  </button>
                </div>
              </div>
            ))}
            {coupons.length === 0 && <p className="text-gray-400 col-span-3">Nenhum cupom cadastrado.</p>}
          </div>
        </>
      ) : activeTab === 'marketing' ? (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div>
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">Carrinhos Abandonados</h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Verifica carrinhos inativos por mais de 7 dias e envia e-mail de recuperação.</p>
            </div>
            <button 
              onClick={triggerAbandonedCartEmails}
              className="bg-[#dd711c] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-[#c26217] transition-colors"
            >
              Disparar E-mails (7+ dias)
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {carts.map(cart => {
              const updatedAt = cart.updatedAt?.toDate();
              const daysSince = updatedAt ? Math.floor((new Date().getTime() - updatedAt.getTime()) / (1000 * 3600 * 24)) : 0;
              
              return (
                <div key={cart.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <p className="text-sm font-bold text-white">{cart.email}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Última alteração: {cart.date} ({daysSince} dias atrás)</p>
                    {cart.lastEmailSentAt && (
                      <p className="text-xs text-emerald-400 uppercase tracking-widest mt-1">E-mail enviado em: {cart.lastEmailSentAt.toDate().toLocaleDateString('pt-BR')}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Itens no carrinho</p>
                    {cart.items?.map((item: any, idx: number) => (
                      <p key={idx} className="text-xs text-gray-300 font-mono">{item.quantity}x {item.name}</p>
                    ))}
                  </div>
                </div>
              );
            })}
            {carts.length === 0 && <p className="text-gray-400">Nenhum carrinho registrado.</p>}
          </div>
        </div>
      ) : null}
    </div>
  );
}
