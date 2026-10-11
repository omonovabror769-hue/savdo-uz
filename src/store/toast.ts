// Bildirishnoma (toast) uchun kichik hodisa kanali.
// Toast holati alohida saqlanadi, shuning uchun u chiqqanda butun sayt qayta chizilmaydi.
type Fn = (s: string | null) => void;
const subs = new Set<Fn>();
let timer: number | undefined;

export function showToast(s: string) {
  subs.forEach((f) => f(s));
  window.clearTimeout(timer);
  timer = window.setTimeout(() => subs.forEach((f) => f(null)), 2200);
}

export function subscribeToast(f: Fn) {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
}
