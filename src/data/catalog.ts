import type { Category, Product, SubCat, L3 } from './types';
import stroy from './cats/stroy';
import tools from './cats/tools';
import electric from './cats/electric';
import engineering from './cats/engineering';
import finish from './cats/finish';
import home from './cats/home';
import plumbing from './cats/plumbing';
import fasteners from './cats/fasteners';
import garden from './cats/garden';

export const categories: Category[] = [stroy, tools, electric, engineering, finish, home, plumbing, fasteners, garden];

// Deterministik "tasodifiy" son — har safar bir xil natija beradi
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const countries: Record<string, L3> = {
  uz: ["O'zbekiston", 'Узбекистан', 'Uzbekistan'],
  de: ['Germaniya', 'Германия', 'Germany'],
  ru: ['Rossiya', 'Россия', 'Russia'],
  tr: ['Turkiya', 'Турция', 'Turkey'],
  cn: ['Xitoy', 'Китай', 'China'],
  it: ['Italiya', 'Италия', 'Italy'],
  pl: ['Polsha', 'Польша', 'Poland'],
};
const brandCountry: Record<string, keyof typeof countries> = {
  knauf: 'de', bosch: 'de', grohe: 'de', hansgrohe: 'de', kermi: 'de', buderus: 'de', rehau: 'de', wilo: 'de',
  fischer: 'de', 'kärcher': 'de', gardena: 'de', egger: 'de', ceresit: 'de', metabo: 'de', weber: 'de', makita: 'cn',
  dewalt: 'cn', stanley: 'cn', matrix: 'cn', zubr: 'ru', technonikol: 'ru', rifar: 'ru', valtec: 'it', ariston: 'it',
  pedrollo: 'it', 'kerama marazzi': 'ru', tarkett: 'ru', vitra: 'tr', cersanit: 'pl', rockwool: 'ru', baxi: 'it',
  tikkurila: 'ru', ytong: 'de', grohe2: 'de', husqvarna: 'de', stihl: 'de', 'quick-step': 'de', mapei: 'it', franke: 'de', blanco: 'de', ravak: 'pl', roca: 'it', 'ideal standard': 'it', knipex: 'de', hilti: 'de', tesa: 'de', 'soudal': 'pl', ledvance: 'de', osram: 'de', philips: 'pl', abb: 'de', grundfos: 'de', samsung: 'cn', lg: 'cn', midea: 'cn', gree: 'cn', legrand: 'ru', iek: 'ru', 'schneider electric': 'ru', inforce: 'cn', huter: 'cn', champion: 'cn',
};

function countryOf(brand: string, rnd: () => number): L3 {
  const k = brandCountry[brand.toLowerCase()] || brandCountry[brand.toLowerCase().split(' ')[0]];
  if (k) return countries[k];
  if (/[ʻ'‘]|sement|g'isht|imzo|akfa|artel|qizilqum|toshkent|samarqand|navoiy|andijon|farg|bekobod|ohangaron|uzmet|kattaq|chirchiq|angren|nurafshon|zangiota|yunusobod|buxoro|mavzo|^uz|\buz\b/i.test(brand))
    return countries.uz;
  const pool: (keyof typeof countries)[] = ['uz', 'tr', 'cn', 'ru'];
  return countries[pool[Math.floor(rnd() * pool.length)]];
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) + 7;
}

function build(): Product[] {
  const out: Product[] = [];
  let n = 100231;
  for (const c of categories) {
    for (const s of c.subs) {
      s.items.forEach((it, ti) => {
        it.v.forEach(([spec, price], vi) => {
          const id = `${s.id}-${ti}-${vi}`;
          const rnd = seeded(hash(id));
          const brand = it.b[vi % it.b.length];
          const hasDisc = rnd() < 0.22;
          const r = rnd();
          out.push({
            id,
            sku: String(n++),
            catId: c.id,
            subId: s.id,
            n: it.n,
            spec,
            brand,
            unit: it.u,
            price,
            oldPrice: hasDisc ? Math.round((price * (1.08 + rnd() * 0.17)) / 100) * 100 : undefined,
            rating: Math.round((3.9 + r * 1.1) * 10) / 10,
            reviews: Math.floor(rnd() * 240),
            stock: rnd() < 0.1 ? 0 : Math.floor(5 + rnd() * 600),
            emoji: it.e || s.e,
            img: it.img,
            isNew: rnd() < 0.08,
            hit: rnd() < 0.12,
            country: countryOf(brand, rnd),
          });
        });
      });
    }
  }
  return out;
}

export const products: Product[] = build();
export const productById = new Map(products.map((p) => [p.id, p]));

export const catById = new Map(categories.map((c) => [c.id, c]));
export const subById = new Map<string, { sub: SubCat; cat: Category }>();
categories.forEach((cat) => cat.subs.forEach((sub) => subById.set(sub.id, { sub, cat })));

const bySub = new Map<string, Product[]>();
const byCat = new Map<string, Product[]>();
products.forEach((p) => {
  if (!bySub.has(p.subId)) bySub.set(p.subId, []);
  if (!byCat.has(p.catId)) byCat.set(p.catId, []);
  bySub.get(p.subId)!.push(p);
  byCat.get(p.catId)!.push(p);
});
export const visible = (p: Product) => !p.hidden;
// Nusxa qaytaramiz — chaqiruvchi .sort() qilsa ham asl ro'yxat buzilmaydi
export function productsOfSub(subId: string) {
  return (bySub.get(subId) || []).filter(visible);
}
export function productsOfCat(catId: string) {
  return (byCat.get(catId) || []).filter(visible);
}
export function countOfSub(subId: string) {
  return (bySub.get(subId) || []).filter(visible).length;
}
/** Admin qo'shgan yangi tovarni katalogga kiritish */
export function addProductToCatalog(p: Product) {
  products.push(p);
  productById.set(p.id, p);
  if (!bySub.has(p.subId)) bySub.set(p.subId, []);
  if (!byCat.has(p.catId)) byCat.set(p.catId, []);
  bySub.get(p.subId)!.push(p);
  byCat.get(p.catId)!.push(p);
}

export function searchProducts(q: string): Product[] {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  const words = t.split(/\s+/);
  return products.filter((p) => {
    if (p.hidden) return false;
    const hay = (p.n.join(' ') + ' ' + p.brand + ' ' + p.spec + ' ' + p.sku).toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}
