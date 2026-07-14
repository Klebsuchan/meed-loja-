import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', cpf: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string, discountPercentage: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  const { user } = useAuth();
  const deliveryFee = 15.00;
  
  const discountAmount = appliedCoupon ? (cartTotal * (appliedCoupon.discountPercentage / 100)) : 0;
  const finalTotal = cartTotal - discountAmount + deliveryFee;

  const handleApplyCoupon = async () => {
    setCouponError('');
    if (!couponCode) return;
    
    try {
      const { query, where, getDocs } = await import('firebase/firestore');
      const q = query(collection(db, 'coupons'), where('code', '==', couponCode.toUpperCase()), where('active', '==', true));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        setCouponError('Cupom inválido ou expirado.');
        setAppliedCoupon(null);
      } else {
        const couponData = snapshot.docs[0].data();
        setAppliedCoupon({ code: couponData.code, discountPercentage: couponData.discountPercentage });
        setCouponCode('');
      }
    } catch (error) {
      console.error('Error applying coupon', error);
      setCouponError('Erro ao aplicar cupom.');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.cpf || !formData.address) return;

    setIsSubmitting(true);

    try {
      if (user) {
        await addDoc(collection(db, 'orders'), {
          userId: user.uid,
          userEmail: user.email,
          customerName: formData.name,
          cpf: formData.cpf,
          address: formData.address,
          items: cart,
          total: finalTotal,
          subtotal: cartTotal,
          discount: discountAmount,
          couponCode: appliedCoupon?.code || null,
          createdAt: serverTimestamp()
        });
      }
      
      let itemsText = cart.map(item => `${item.quantity}x ${item.name} (${item.price})`).join('\n');
      
      const deliveryText = `Entrega via Motoboy\nEndereço: ${formData.address}\nTaxa de Entrega: R$ 15,00`;
      
      const couponText = appliedCoupon ? `\n\n*Cupom de Desconto:*\n${appliedCoupon.code} (-${appliedCoupon.discountPercentage}% / -R$ ${discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})` : '';

      const message = `*Novo Pedido - Meed Loja*\n\n*Cliente:*\nNome: ${formData.name}\nCPF: ${formData.cpf}\n\n*Forma de Entrega:*\n${deliveryText}\n\n*Itens:*\n${itemsText}${couponText}\n\n*Total:* R$ ${finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5511964486759?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      clearCart();
      setIsCartOpen(false);
      setIsCheckoutMode(false);
      setFormData({ name: '', cpf: '', address: '' });
    } catch (error) {
      console.error("Error saving order:", error);
      setCouponError("Houve um erro ao processar seu pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => setIsCheckoutMode(false), 300);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[120] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-white">
                {isCheckoutMode ? (
                  <button onClick={() => setIsCheckoutMode(false)} className="text-gray-400 hover:text-white transition-colors mr-2">
                    <ArrowLeft size={24} />
                  </button>
                ) : (
                  <ShoppingBag size={24} className="text-[#dd711c]" />
                )}
                <span className="text-xl font-black uppercase tracking-widest">{isCheckoutMode ? 'Finalizar' : 'Carrinho'}</span>
                {!isCheckoutMode && (
                  <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full font-mono font-bold">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button 
                onClick={handleClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {!isCheckoutMode ? (
                cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                    <ShoppingBag size={64} strokeWidth={1} className="opacity-20 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest text-center">Seu carrinho está vazio</p>
                    <button 
                      onClick={handleClose}
                      className="mt-4 px-6 py-3 border border-white/10 hover:border-[#dd711c] text-white text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white/5 border border-white/5 p-4 rounded-xl relative group">
                      <div className="w-24 h-24 bg-[#1a1a1a] rounded-lg overflow-hidden shrink-0 border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-300" />
                      </div>
                      <div className="flex flex-col flex-1 py-1">
                        <h4 className="text-white font-bold text-sm uppercase tracking-tight mb-1 line-clamp-2">{item.name}</h4>
                        <span className="text-[#dd711c] font-mono font-bold text-sm mb-3">{item.price}</span>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center space-x-3 bg-black/40 rounded-full px-2 py-1 border border-white/5">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-white p-1"><Minus size={14} /></button>
                            <span className="text-white text-xs font-mono w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-white p-1"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/5">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <form id="checkout-form" onSubmit={handleCheckout} className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm mb-6">Preencha seus dados para enviarmos o pedido via WhatsApp.</p>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#dd711c] transition-colors"
                        placeholder="Ex: João da Silva"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">CPF</label>
                      <input 
                        type="text" 
                        required
                        value={formData.cpf}
                        onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#dd711c] transition-colors"
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Endereço de Entrega (Passo Fundo)</label>
                      <textarea 
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#dd711c] transition-colors resize-none h-24"
                        placeholder="Rua, Número, Bairro, CEP"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#050505]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest">Subtotal</span>
                    <span className="font-mono text-gray-300">R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest">Frete</span>
                    <span className="font-mono text-emerald-400 uppercase tracking-widest text-[10px]">{deliveryFee > 0 ? `R$ ${deliveryFee.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Grátis'}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest">Desconto</span>
                        <span className="text-xs text-gray-500">{appliedCoupon.code} ({appliedCoupon.discountPercentage}%)</span>
                      </div>
                      <span className="font-mono text-emerald-400">-R$ {discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  {!appliedCoupon ? (
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Cupom de desconto" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs uppercase tracking-widest focus:outline-none focus:border-[#dd711c] transition-colors"
                        />
                        <button 
                          onClick={handleApplyCoupon}
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && <p className="text-red-400 text-[10px] uppercase tracking-widest mt-2">{couponError}</p>}
                    </div>
                  ) : (
                    <div className="pt-2 flex justify-end">
                      <button 
                        onClick={removeCoupon}
                        className="text-red-400 hover:text-red-300 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Remover Cupom
                      </button>
                    </div>
                  )}

                  <div className="h-px w-full bg-white/10 my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-bold uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-mono font-black text-white">
                      R$ {finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                {!isCheckoutMode ? (
                  <button 
                    onClick={() => setIsCheckoutMode(true)}
                    className="w-full bg-[#dd711c] text-white py-4 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-[#dd711c] transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Finalizar Pedido</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-[#25D366] text-white py-4 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-[#25D366] transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Enviar para WhatsApp</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
