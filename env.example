import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate().toLocaleDateString('pt-BR')
      }));
      setOrders(fetchedOrders);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders in real-time:", error);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-[160px] md:pt-[200px] pb-8 relative z-20">
      <h1 className="text-3xl font-black uppercase tracking-tighter text-white mb-8">Meus Pedidos</h1>
      
      {loading ? (
        <div className="text-gray-400">Carregando pedidos...</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-400">Você ainda não tem pedidos.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-widest">Pedido #{order.id.substring(0, 8)}</p>
                  <p className="text-xs text-gray-400">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#dd711c] font-mono font-bold text-lg">
                    R$ {order.total?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-sm text-gray-300">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-mono">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
