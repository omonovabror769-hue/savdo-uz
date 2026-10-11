// L3 = [o'zbekcha, русский, English]
export type L3 = [string, string, string];

export type UnitKey =
  | 'pc' | 'bag' | 'm2' | 'm' | 'kg' | 'l' | 'pack' | 'sheet' | 'set' | 'roll' | 'm3' | 't';

/**
 * Mahsulot shabloni. Har bir variant (v) alohida mahsulotga aylanadi.
 *  n  — nomi 3 tilda
 *  u  — o'lchov birligi
 *  v  — variantlar: [xususiyat (tilga bog'liq bo'lmagan: o'lcham, quvvat...), narx so'mda]
 *  b  — brendlar ro'yxati (variantlarga navbat bilan beriladi)
 *  e  — emoji (rasm o'rniga). Bo'lmasa kichik kategoriya emojisi olinadi
 *  img — ixtiyoriy rasm URL (keyinchalik haqiqiy rasm qo'yish uchun)
 */
export interface ItemTpl {
  n: L3;
  u: UnitKey;
  v: [string, number][];
  b: string[];
  e?: string;
  img?: string;
}

export interface SubCat {
  id: string;
  e: string;
  n: L3;
  items: ItemTpl[];
}

export interface Category {
  id: string;
  e: string;
  n: L3;
  subs: SubCat[];
}

export interface Product {
  id: string;
  sku: string;
  catId: string;
  subId: string;
  n: L3;
  spec: string;
  brand: string;
  unit: UnitKey;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number; // 0 = buyurtma asosida
  emoji: string;
  img?: string;
  isNew?: boolean;
  hit?: boolean;
  country: L3;
}
