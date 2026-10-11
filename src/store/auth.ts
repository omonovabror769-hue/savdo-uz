// Google orqali kirish (Google Identity Services).
// Client ID .env faylidagi VITE_GOOGLE_CLIENT_ID dan olinadi.
// Client ID bo'lmasa — sayt demo rejimida ishlaydi (sinov akkaunti bilan kiradi).

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  demo?: boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: any;
    SAVDO_CONFIG?: { googleClientId?: string };
  }
}

import { GOOGLE_CLIENT_ID as CONFIG_ID } from '../config';

// Ustuvorlik: build paytidagi VITE_GOOGLE_CLIENT_ID → src/config.ts → window.SAVDO_CONFIG
export const GOOGLE_CLIENT_ID: string =
  (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) || CONFIG_ID || window.SAVDO_CONFIG?.googleClientId || '';

// Claude ichidagi ko'rib chiqish oynasida Google kirish ishlamaydi (manzil Google'da ro'yxatdan o'tmagan),
// shuning uchun u yerda doim demo rejim.
const PREVIEW = import.meta.env.VITE_ROUTER === 'memory';

export const isDemo = PREVIEW || !GOOGLE_CLIENT_ID;

let loading: Promise<void> | null = null;
export function loadGis(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('GIS load failed'));
    document.head.appendChild(s);
  });
  return loading;
}

function decodeJwt(token: string): any {
  const part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    atob(part)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
  return JSON.parse(json);
}

let initialized = false;
let onUserCb: ((u: User) => void) | null = null;
/**
 * Google kirishni ishga tushiradi. auto_select: true — ilgari kirgan foydalanuvchi
 * keyingi safar hech narsa bosmasdan avtomatik kiradi (One Tap).
 */
export async function initGoogle(onUser: ((u: User) => void) | null, opts: { prompt: boolean }) {
  if (onUser) onUserCb = onUser;
  if (isDemo) return;
  await loadGis();
  if (!initialized) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      auto_select: true,
      cancel_on_tap_outside: false,
      itp_support: true,
      use_fedcm_for_prompt: true,
      callback: (resp: { credential: string }) => {
        const p = decodeJwt(resp.credential);
        onUserCb?.({ id: p.sub, name: p.name, email: p.email, picture: p.picture });
      },
    });
    initialized = true;
  }
  if (opts.prompt) window.google.accounts.id.prompt();
}

export function renderGoogleButton(el: HTMLElement, locale: string) {
  if (isDemo || !window.google?.accounts?.id) return;
  el.innerHTML = '';
  window.google.accounts.id.renderButton(el, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    text: 'continue_with',
    logo_alignment: 'left',
    width: 320,
    locale,
  });
}

export function googleSignOut() {
  try {
    window.google?.accounts?.id?.disableAutoSelect();
  } catch {
    /* ignore */
  }
}

export const demoUser: User = {
  id: 'demo-1',
  name: 'Demo foydalanuvchi',
  email: 'demo@savdo.uz',
  demo: true,
};
