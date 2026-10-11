// Admin tahrirlari: sayt kodiga tegmasdan, public/content.json fayli orqali ustidan yoziladi.
// Fayl sahifa ochilishidan oldin yuklanadi va katalog, aksiyalar, matnlar ustiga qo'llanadi.
import type { L3, Product, UnitKey } from '../data/types';
import { addProductToCatalog, categories, products, productById, subById } from '../data/catalog';
import { promos, services } from '../data/content';

export interface ProductPatch {
  n?: L3;
  brand?: string;
  spec?: string;
  price?: number;
  oldPrice?: number | null;
  stock?: number;
  img?: string;
  hidden?: boolean;
}
export interface NewProduct {
  id: string;
  subId: string;
  n: L3;
  brand: string;
  spec: string;
  unit: UnitKey;
  price: number;
  oldPrice?: number;
  stock: number;
  img?: string;
}
export interface Content {
  v: 1;
  texts: Record<string, L3>; // kalit: "t.<dictKey>" yoki asl o'zbekcha matn
  products: Record<string, ProductPatch>;
  newProducts: NewProduct[];
  cats: Record<string, { n?: L3; img?: string }>; // kategoriya va kichik kategoriya id lari
  promos: Record<string, { title?: L3; text?: L3; img?: string }>;
  services: Record<string, { n?: L3; img?: string }>;
  slides: Record<string, { t?: L3; s?: L3; img?: string }>;
  logo: { word?: string; suffix?: string; img?: string };
}

export const emptyContent = (): Content => ({
  v: 1, texts: {}, products: {}, newProducts: [], cats: {}, promos: {}, services: {}, slides: {}, logo: {},
});

export function normalize(c: Partial<Content> | null | undefined): Content {
  const e = emptyContent();
  return {
    v: 1,
    texts: { ...e.texts, ...(c?.texts || {}) },
    products: { ...(c?.products || {}) },
    newProducts: [...(c?.newProducts || [])],
    cats: { ...(c?.cats || {}) },
    promos: { ...(c?.promos || {}) },
    services: { ...(c?.services || {}) },
    slides: { ...(c?.slides || {}) },
    logo: { ...(c?.logo || {}) },
  };
}

/* ---------------- Matnlar: istalgan tr()/t() matnini ustidan yozish ---------------- */
export const textOverrides = new Map<string, L3>();
/** Sahifada chiqarilgan barcha 3 tilli matnlar ro'yxati (bosib tahrirlash uchun) */
export const seenTexts = new Map<string, L3>();

/* ---------------- Asl qiymatlar (qayta qo'llash uchun) ---------------- */
type Snap = Record<string, unknown>;
const baseProducts = new Map<string, Snap>();
const baseCats = new Map<string, Snap>();
const basePromos = new Map<string, Snap>();
const baseServices = new Map<string, Snap>();
let baselineTaken = false;
const addedIds = new Set<string>();

function snap<T extends object>(o: T, keys: (keyof T)[]): Snap {
  const s: Snap = {};
  keys.forEach((k) => (s[k as string] = (o as Record<string, unknown>)[k as string]));
  return s;
}
function restore(o: object, s: Snap) {
  Object.entries(s).forEach(([k, v]) => {
    if (v === undefined) delete (o as Record<string, unknown>)[k];
    else (o as Record<string, unknown>)[k] = v;
  });
}

function takeBaseline() {
  if (baselineTaken) return;
  products.forEach((p) => baseProducts.set(p.id, snap(p, ['n', 'brand', 'spec', 'price', 'oldPrice', 'stock', 'img', 'hidden'])));
  categories.forEach((c) => {
    baseCats.set(c.id, snap(c, ['n', 'img']));
    c.subs.forEach((s) => baseCats.set(s.id, snap(s, ['n', 'img'])));
  });
  promos.forEach((p) => basePromos.set(p.id, snap(p, ['title', 'text', 'img'])));
  services.forEach((s) => baseServices.set(s.id, snap(s, ['n', 'img'])));
  baselineTaken = true;
}

export let logo: Content['logo'] = {};
export let slideOverrides: Content['slides'] = {};

/** Saqlangan tahrirlarni saytga qo'llash (har safar asl holatdan boshlab) */
export function applyContent(c: Content) {
  takeBaseline();
  // asl holatga qaytarish
  products.forEach((p) => baseProducts.has(p.id) && restore(p, baseProducts.get(p.id)!));
  categories.forEach((cat) => {
    restore(cat, baseCats.get(cat.id)!);
    cat.subs.forEach((s) => restore(s, baseCats.get(s.id)!));
  });
  promos.forEach((p) => restore(p, basePromos.get(p.id)!));
  services.forEach((s) => restore(s, baseServices.get(s.id)!));

  // yangi tovarlar (o'chirilganlari yashiriladi)
  addedIds.forEach((id) => { const p = productById.get(id); if (p) p.hidden = true; });
  c.newProducts.forEach((np) => {
    if (!subById.has(np.subId)) return;
    const ex = productById.get(np.id);
    const { cat } = subById.get(np.subId)!;
    const p: Product = {
      id: np.id, sku: ex?.sku || String(900000 + addedIds.size), catId: cat.id, subId: np.subId, n: np.n, spec: np.spec,
      brand: np.brand, unit: np.unit, price: np.price, oldPrice: np.oldPrice || undefined, rating: 4.5, reviews: 0,
      stock: np.stock, emoji: subById.get(np.subId)!.sub.e, img: np.img, isNew: true, country: ['', '', ''], hidden: false,
    };
    if (ex) Object.assign(ex, p);
    else {
      addProductToCatalog(p);
      addedIds.add(p.id);
    }
  });

  // tovar o'zgarishlari
  Object.entries(c.products).forEach(([id, patch]) => {
    const p = productById.get(id);
    if (!p) return;
    if (patch.n) p.n = patch.n;
    if (patch.brand != null) p.brand = patch.brand;
    if (patch.spec != null) p.spec = patch.spec;
    if (patch.price != null) p.price = patch.price;
    if (patch.oldPrice !== undefined) p.oldPrice = patch.oldPrice || undefined;
    if (patch.stock != null) p.stock = patch.stock;
    if (patch.img) p.img = patch.img;
    if (patch.hidden != null) p.hidden = patch.hidden;
  });

  // kategoriyalar
  Object.entries(c.cats).forEach(([id, o]) => {
    const target = categories.find((x) => x.id === id) || subById.get(id)?.sub;
    if (!target) return;
    if (o.n) target.n = o.n;
    if (o.img) target.img = o.img;
  });
  Object.entries(c.promos).forEach(([id, o]) => {
    const p = promos.find((x) => x.id === id);
    if (!p) return;
    if (o.title) p.title = o.title;
    if (o.text) p.text = o.text;
    if (o.img) p.img = o.img;
  });
  Object.entries(c.services).forEach(([id, o]) => {
    const s = services.find((x) => x.id === id);
    if (!s) return;
    if (o.n) s.n = o.n;
    if (o.img) s.img = o.img;
  });

  textOverrides.clear();
  Object.entries(c.texts).forEach(([k, v]) => textOverrides.set(k, v));
  logo = c.logo;
  slideOverrides = c.slides;
}

/** Sayt ochilishida content.json ni yuklash (2 soniyadan ko'p kutmaydi) */
export async function loadContent(): Promise<Content> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    const r = await fetch(`./content.json?t=${Date.now()}`, { cache: 'no-store', signal: ctrl.signal });
    clearTimeout(timer);
    if (!r.ok) return emptyContent();
    return normalize(await r.json());
  } catch {
    return emptyContent();
  }
}

/* ---------------- Avtomatik tarjima ---------------- */
const trCache = new Map<string, string>();
/** O'zbekchadan ruscha/inglizchaga tarjima. Bepul xizmatlar: Google Translate (rasmiy bo'lmagan), zaxira — MyMemory */
export async function translate(text: string, to: 'ru' | 'en'): Promise<string> {
  const src = text.trim();
  if (!src) return '';
  const key = `${to}:${src}`;
  if (trCache.has(key)) return trCache.get(key)!;
  let out = '';
  try {
    const r = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=uz&tl=${to}&dt=t&q=${encodeURIComponent(src)}`);
    if (r.ok) {
      const j = await r.json();
      out = (j?.[0] || []).map((x: unknown[]) => x?.[0] ?? '').join('');
    }
  } catch {
    /* zaxiraga o'tamiz */
  }
  if (!out) {
    try {
      const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(src)}&langpair=uz|${to}`);
      if (r.ok) {
        const j = await r.json();
        out = j?.responseData?.translatedText || '';
      }
    } catch {
      /* tarjima bo'lmadi */
    }
  }
  if (out) trCache.set(key, out);
  return out;
}
