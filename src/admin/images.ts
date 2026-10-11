// Rasmlar: yuklashda kichraytirish, nashr qilishda alohida faylga ajratish
import type { Content } from './content';
import type { OutFile } from './github';

/** Faylni o'qib, eng katta tomoni maxSize dan oshmaydigan qilib kichraytiradi */
export function readImage(file: File, maxSize = 1200, keepAlpha = false): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Rasm fayli emas'));
    const fr = new FileReader();
    fr.onerror = () => reject(fr.error);
    fr.onload = () => {
      const src = String(fr.result);
      if (file.type === 'image/svg+xml') return resolve(src);
      const img = new Image();
      img.onerror = () => reject(new Error('Rasmni ochib bo\'lmadi'));
      img.onload = () => {
        const k = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = Math.round(img.width * k);
        const h = Math.round(img.height * k);
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d')!;
        if (!keepAlpha) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, w, h);
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(keepAlpha ? c.toDataURL('image/png') : c.toDataURL('image/webp', 0.85));
      };
      img.src = src;
    };
    fr.readAsDataURL(file);
  });
}

async function shortHash(s: string) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return [...new Uint8Array(buf)].slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h).toString(16) + s.length.toString(16);
  }
}

/**
 * Kontent ichidagi data: rasmlarni alohida fayllarga ajratadi va
 * ularning o'rniga "uploads/xxxx.webp" yo'llarini qo'yadi.
 */
export async function extractImages(c: Content): Promise<{ content: Content; files: OutFile[] }> {
  const copy: Content = JSON.parse(JSON.stringify(c));
  const files: OutFile[] = [];
  const seen = new Map<string, string>();

  const conv = async (v?: string) => {
    if (!v || !v.startsWith('data:')) return v;
    if (seen.has(v)) return seen.get(v)!;
    const m = /^data:image\/([a-z0-9.+-]+);base64,(.*)$/i.exec(v);
    if (!m) return v;
    const ext = m[1] === 'svg+xml' ? 'svg' : m[1] === 'jpeg' ? 'jpg' : m[1];
    const name = `uploads/${await shortHash(m[2])}.${ext}`;
    files.push({ path: `public/${name}`, content: m[2], base64: true });
    seen.set(v, name);
    return name;
  };

  for (const p of Object.values(copy.products)) p.img = await conv(p.img);
  for (const p of copy.newProducts) p.img = await conv(p.img);
  for (const o of Object.values(copy.cats)) o.img = await conv(o.img);
  for (const o of Object.values(copy.promos)) o.img = await conv(o.img);
  for (const o of Object.values(copy.services)) o.img = await conv(o.img);
  for (const o of Object.values(copy.slides)) o.img = await conv(o.img);
  copy.logo.img = await conv(copy.logo.img);
  return { content: copy, files };
}
