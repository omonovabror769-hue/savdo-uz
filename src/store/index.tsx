import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { storage } from './storage';
import { demoUser, googleSignOut, initGoogle, isDemo, type User } from './auth';
import { productById } from '../data/catalog';

export interface CartLine { id: string; qty: number }
export interface Order {
  no: string;
  date: string;
  lines: CartLine[];
  total: number;
  address: string;
  phone: string;
  delivery: 'courier' | 'pickup';
  pay: 'cash' | 'card';
}

interface StoreCtx {
  user: User | null;
  login: () => void;
  signInDemo: () => void;
  logout: () => void;
  loginOpen: boolean;
  setLoginOpen: (v: boolean) => void;
  cart: CartLine[];
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  favs: string[];
  toggleFav: (id: string) => void;
  cmp: string[];
  toggleCmp: (id: string) => void;
  clearCmp: () => void;
  orders: Order[];
  placeOrder: (o: Omit<Order, 'no' | 'date' | 'lines' | 'total'>) => Order;
  toast: string | null;
  showToast: (s: string) => void;
}

const Ctx = createContext<StoreCtx>(null as unknown as StoreCtx);

function usePersist<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => storage.get<T>(key, init));
  useEffect(() => storage.set(key, v), [key, v]);
  return [v, setV] as const;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = usePersist<User | null>('user', null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cart, setCart] = usePersist<CartLine[]>('cart', []);
  const [favs, setFavs] = usePersist<string[]>('favs', []);
  const [cmp, setCmp] = usePersist<string[]>('cmp', []);
  const [ordersAll, setOrdersAll] = usePersist<Record<string, Order[]>>('orders', {});
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number>();

  const showToast = useCallback((s: string) => {
    setToast(s);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const onGoogleUser = useCallback(
    (u: User) => {
      setUser(u);
      setLoginOpen(false);
    },
    [setUser],
  );

  // Avtomatik kirish: sahifa ochilganda Google One Tap (auto_select) ishga tushadi
  useEffect(() => {
    initGoogle(onGoogleUser, { prompt: !user }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = () => setLoginOpen(true);
  const signInDemo = () => {
    if (!isDemo) return;
    setUser(demoUser);
    setLoginOpen(false);
  };
  const logout = () => {
    googleSignOut();
    setUser(null);
  };

  const addToCart = (id: string, qty = 1) =>
    setCart((c) => {
      const ex = c.find((l) => l.id === id);
      if (ex) return c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...c, { id, qty }];
    });
  const setQty = (id: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l))));
  const removeFromCart = (id: string) => setCart((c) => c.filter((l) => l.id !== id));
  const clearCart = () => setCart([]);

  const valid = cart.filter((l) => productById.has(l.id));
  const cartCount = valid.reduce((s, l) => s + l.qty, 0);
  const cartTotal = valid.reduce((s, l) => s + l.qty * productById.get(l.id)!.price, 0);

  const toggleFav = (id: string) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const toggleCmp = (id: string) => setCmp((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id].slice(-6)));
  const clearCmp = () => setCmp([]);

  const orders = user ? ordersAll[user.id] || [] : [];
  const placeOrder: StoreCtx['placeOrder'] = (o) => {
    const order: Order = {
      ...o,
      no: String(Math.floor(10000000 + Math.random() * 89999999)),
      date: new Date().toISOString(),
      lines: valid,
      total: cartTotal + (o.delivery === 'courier' && cartTotal < 3000000 ? 49000 : 0),
    };
    if (user) setOrdersAll((all) => ({ ...all, [user.id]: [order, ...(all[user.id] || [])] }));
    setCart([]);
    return order;
  };

  return (
    <Ctx.Provider
      value={{
        user, login, signInDemo, logout, loginOpen, setLoginOpen,
        cart: valid, addToCart, setQty, removeFromCart, clearCart, cartCount, cartTotal,
        favs, toggleFav, cmp, toggleCmp, clearCmp, orders, placeOrder, toast, showToast,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => useContext(Ctx);
