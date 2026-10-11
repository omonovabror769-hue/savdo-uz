// Rang yordamchilari: hex tekshirish, ochroq/to'qroq qilish, ustidagi matn rangini tanlash

export const isHex = (s: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s.trim());

export function normHex(s: string): string {
  let h = s.trim().toLowerCase();
  if (!h.startsWith('#')) h = '#' + h;
  if (/^#[0-9a-f]{3}$/.test(h)) h = '#' + [...h.slice(1)].map((c) => c + c).join('');
  return h;
}

function rgb(hex: string): [number, number, number] {
  const h = normHex(hex).slice(1);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
const toHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

/** k > 0 — oq bilan aralashtirish (ochroq), k < 0 — qora bilan (to'qroq) */
export function mix(hex: string, k: number) {
  const [r, g, b] = rgb(hex);
  const t = k > 0 ? 255 : 0;
  const a = Math.abs(k);
  return toHex(r + (t - r) * a, g + (t - g) * a, b + (t - b) * a);
}

export function luminance(hex: string) {
  const [r, g, b] = rgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Fon ustida o'qiladigan matn rangi */
export const textOn = (hex: string) => (luminance(hex) > 0.45 ? '#1b1b1d' : '#ffffff');

export const PRESETS: { name: string; hex: string }[] = [
  { name: 'Qizil', hex: '#e31e24' },
  { name: "To'q qizil", hex: '#b3121a' },
  { name: "To'q sariq", hex: '#ff7a00' },
  { name: 'Sariq', hex: '#ffd400' },
  { name: 'Yashil', hex: '#16a34a' },
  { name: 'Moviy', hex: '#0ea5e9' },
  { name: "Ko'k", hex: '#2563eb' },
  { name: 'Binafsha', hex: '#7c3aed' },
  { name: 'Pushti', hex: '#db2777' },
  { name: 'Qora', hex: '#1b1b1d' },
  { name: 'Kulrang', hex: '#6b7280' },
  { name: 'Oq', hex: '#ffffff' },
];
