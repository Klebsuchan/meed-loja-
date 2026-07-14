import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from './lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type ToastMessage = {
  id: number;
  productName: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Sync to Firestore for abandoned cart recovery
    if (user && user.email) {
      if (cart.length > 0) {
        setDoc(doc(db, 'carts', user.uid), {
          userId: user.uid,
          email: user.email,
          items: cart,
          updatedAt: serverTimestamp(),
          lastEmailSentAt: null,
          notified: false
        }, { merge: true }).catch(err => console.error('Error syncing cart:', err));
      } else {
        // If cart is cleared, mark as not needing recovery or delete, but updating is fine
        setDoc(doc(db, 'carts', user.uid), {
          items: [],
          updatedAt: serverTimestamp()
        }, { merge: true }).catch(err => console.error('Error syncing cart:', err));
      }
    }
  }, [cart, user]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name || product.title, price: product.price, image: product.image, quantity: 1 }];
    });
    
    // Add toast notification
    const toastId = Date.now();
    setToasts(prev => [...prev, { id: toastId, productName: product.name || product.title }]);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => {
    // Parse price like "R$ 499,00"
    const priceStr = item.price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    const priceNum = parseFloat(priceStr);
    return total + priceNum * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartTotal, toasts, removeToast }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
