import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
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
  status?: 'new' | 'cancelled';
}

/** Xizmat / B2B / fikr arizasi */
export interface Request {
  id: string;
  kind: string; // xizmat id yoki 'b2b' | 'feedback' | 'rent' | 'return'
  title: string;
  date: string;
  fields: Record<string, string>;
  status: 'new' | 'cancelled';
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Profile { phone: string; address: string; birthday: string; city: number }

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
  cancelOrder: (no: string) => void;
  repeatOrder: (no: string) => void;
  requests: Request[];
  addRequest: (r: Omit<Request, 'id' | 'date' | 'status'>) => Request;
  cancelRequest: (id: string) => void;
  reviews: Review[];
  addReview: (r: Omit<Review, 'id' | 'date' | 'author'>) => void;
  ratingOf: (productId: string) => { avg: number; count: number };
  profile: Profile;
  setProfile: (p: Partial<Profile>) => void;
  club: boolean;
  joinClub: () => void;
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
  const [reqAll, setReqAll] = usePersist<Record<string, Request[]>>('requests', {});
  const [reviews, setReviews] = usePersist<Review[]>('reviews', []);
  const [profiles, setProfiles] = usePersist<Record<string, Profile>>('profiles', {});
  const [cityAnon, setCityAnon] = usePersist<number>('city', 0);
  const [clubAll, setClubAll] = usePersist<Record<string, boolean>>('club', {});
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

  const cancelOrder = (no: string) =>
    user && setOrdersAll((all) => ({ ...all, [user.id]: (all[user.id] || []).map((o) => (o.no === no ? { ...o, status: 'cancelled' } : o)) }));
  const repeatOrder = (no: string) => {
    const o = orders.find((x) => x.no === no);
    o?.lines.forEach((l) => productById.has(l.id) && addToCart(l.id, l.qty));
  };

  // anonim foydalanuvchining arizalari ham saqlanadi ('guest')
  const uid = user?.id || 'guest';
  const requests = reqAll[uid] || [];
  const addRequest: StoreCtx['addRequest'] = (r) => {
    const req: Request = { ...r, id: String(Math.floor(100000 + Math.random() * 899999)), date: new Date().toISOString(), status: 'new' };
    setReqAll((all) => ({ ...all, [uid]: [req, ...(all[uid] || [])] }));
    return req;
  };
  const cancelRequest = (id: string) =>
    setReqAll((all) => ({ ...all, [uid]: (all[uid] || []).map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r)) }));

  const addReview: StoreCtx['addReview'] = (r) =>
    setReviews((list) => [{ ...r, id: String(Date.now()), date: new Date().toISOString(), author: user?.name || 'Mehmon' }, ...list]);

  const ratingMap = useMemo(() => {
    const m = new Map<string, { sum: number; count: number }>();
    reviews.forEach((r) => {
      const x = m.get(r.productId) || { sum: 0, count: 0 };
      m.set(r.productId, { sum: x.sum + r.rating, count: x.count + 1 });
    });
    return m;
  }, [reviews]);
  const ratingOf = (id: string) => {
    const x = ratingMap.get(id);
    return x ? { avg: Math.round((x.sum / x.count) * 10) / 10, count: x.count } : { avg: 0, count: 0 };
  };

  const profile: Profile = { phone: '', address: '', birthday: '', ...(user ? profiles[user.id] : {}), city: user ? profiles[user.id]?.city ?? cityAnon : cityAnon };
  const setProfile = (p: Partial<Profile>) => {
    if (p.city != null) setCityAnon(p.city);
    if (user) setProfiles((all) => ({ ...all, [user.id]: { ...profile, ...all[user.id], ...p } }));
  };
  const club = !!(user && clubAll[user.id]);
  const joinClub = () => user && setClubAll((c) => ({ ...c, [user.id]: true }));

  return (
    <Ctx.Provider
      value={{
        user, login, signInDemo, logout, loginOpen, setLoginOpen,
        cart: valid, addToCart, setQty, removeFromCart, clearCart, cartCount, cartTotal,
        favs, toggleFav, cmp, toggleCmp, clearCmp, orders, placeOrder, cancelOrder, repeatOrder,
        requests, addRequest, cancelRequest, reviews, addReview, ratingOf, profile, setProfile, club, joinClub, toast, showToast,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => useContext(Ctx);
