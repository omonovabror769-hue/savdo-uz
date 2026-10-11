import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { isDemo } from '../store/auth';
import { ADMIN_EMAILS } from '../config';
import { storage } from '../store/storage';
import { showToast } from '../store/toast';
import { allDict, useI18n } from '../i18n';
import { applyContent, normalize, seenTexts, textOverrides, type Content } from './content';
import { commitFiles, getToken } from './github';
import { extractImages } from './images';
import Editor, { type EditTarget } from './Editors';

interface AdminCtx {
  isAdmin: boolean;
  editing: boolean;
  setEditing: (v: boolean) => void;
  draft: Content;
  update: (fn: (c: Content) => void) => void;
  dirty: boolean;
  version: number;
  open: (t: EditTarget) => void;
  publish: () => Promise<void>;
  publishing: boolean;
  discard: () => void;
}

const Ctx = createContext<AdminCtx>({
  isAdmin: false, editing: false, setEditing: () => {}, draft: normalize({}), update: () => {}, dirty: false,
  version: 0, open: () => {}, publish: async () => {}, publishing: false, discard: () => {},
});
export const useAdmin = () => useContext(Ctx);

const clone = (c: Content): Content => JSON.parse(JSON.stringify(c));
const langIdx = { uz: 0, ru: 1, en: 2 } as const;

export function AdminProvider({ initial, children }: { initial: Content; children: ReactNode }) {
  const { user } = useStore();
  const { lang } = useI18n();
  const isAdmin = !isDemo && !!user && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes((user.email || '').toLowerCase());

  const [published, setPublished] = useState<Content>(initial);
  const [draft, setDraft] = useState<Content>(() => {
    const saved = storage.get<Content | null>('admin_draft', null);
    return saved ? normalize(saved) : clone(initial);
  });
  const [version, setVersion] = useState(0);
  const [editing, setEditingState] = useState(false);
  const [target, setTarget] = useState<EditTarget | null>(null);
  const [publishing, setPublishing] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(published);

  // Admin bo'lmaganlar doim nashr qilingan variantni ko'radi
  useEffect(() => {
    applyContent(isAdmin ? draft : published);
    setVersion((v) => v + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const update = useCallback((fn: (c: Content) => void) => {
    setDraft((d) => {
      const n = clone(d);
      fn(n);
      applyContent(n);
      storage.set('admin_draft', n);
      return n;
    });
    setVersion((v) => v + 1);
  }, []);

  const discard = () => {
    storage.remove('admin_draft');
    setDraft(clone(published));
    applyContent(published);
    setVersion((v) => v + 1);
    showToast("O'zgarishlar bekor qilindi");
  };

  const publish = async () => {
    const token = getToken();
    if (!token) {
      showToast('Avval Admin panelda GitHub tokenini kiriting');
      location.hash = '#/admin';
      return;
    }
    setPublishing(true);
    try {
      const { content, files } = await extractImages(draft);
      files.push({ path: 'public/content.json', content: JSON.stringify(content, null, 2) + '\n' });
      await commitFiles(token, files, `Admin: sayt kontenti yangilandi (${new Date().toLocaleString('ru-RU')})`);
      // Rasmlar endi fayl yo'llari bilan — lekin sayt qayta yig'ilguncha eski data: rasmlarni ko'rsatib turamiz
      setPublished(clone(draft));
      storage.remove('admin_draft');
      showToast("Nashr qilindi! 1–2 daqiqada saytda hamma uchun ko'rinadi");
      void content;
    } catch (e) {
      showToast('Nashr qilib bo\'lmadi: ' + (e as Error).message);
    } finally {
      setPublishing(false);
    }
  };

  const setEditing = (v: boolean) => {
    setEditingState(v);
    document.body.classList.toggle('admin-editing', v);
  };

  /* ---------- Tahrirlash rejimi: bosilgan joyni topish ---------- */
  const hoverEl = useRef<Element | null>(null);
  useEffect(() => {
    if (!editing || !isAdmin) return;
    const i = langIdx[lang];
    const textOf = (key: string) => (textOverrides.get(key) || seenTexts.get(key))?.[i] || '';

    const findTextKey = (txt: string): string | null => {
      if (!txt) return null;
      for (const k of seenTexts.keys()) if (textOf(k) === txt) return k;
      return null;
    };
    const findContained = (txt: string): string | null => {
      let best: string | null = null;
      let len = 0;
      for (const k of seenTexts.keys()) {
        const v = textOf(k);
        if (v.length > 3 && v.length > len && txt.includes(v)) {
          best = k;
          len = v.length;
        }
      }
      return best;
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as Element;
      if (!t || t.closest('[data-admin-ui]') || t.closest('.modal-wrap')) return;
      e.preventDefault();
      e.stopPropagation();
      const own = (t as HTMLElement).innerText?.trim() || '';
      const tagged = t.closest('[data-edit]');
      const inRich = t.closest('.pname, .price, .thumb, .pp-title, .logo, .promo-art, .hero-art, .svc-ic, .home-cat-ic, .mega-ic, .pp-gallery');
      const exact = own.length < 200 ? findTextKey(own) : null;
      if (exact && !inRich) return setTarget({ type: 'text', key: exact });
      if (tagged) {
        const [type, id] = (tagged.getAttribute('data-edit') || '').split(':');
        if (type === 'logo') return setTarget({ type: 'logo' });
        if (type === 'product' || type === 'cat' || type === 'promo' || type === 'service') return setTarget({ type, id } as EditTarget);
        if (type === 'slide') return setTarget({ type: 'slide', id });
      }
      const part = own.length < 400 ? findContained(own) : null;
      if (part) return setTarget({ type: 'text', key: part });
      showToast("Bu joyni bosib tahrirlab bo'lmaydi. Admin paneldagi \"Matnlar\" bo'limidan qidiring.");
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (hoverEl.current) hoverEl.current.removeAttribute('data-admin-hover');
      if (!t || t.closest('[data-admin-ui]')) return;
      const el = t.closest('[data-edit]') && t.closest('.pname, .price, .thumb, .pp-title, .logo, .promo-art, .hero-art, .svc-ic, .home-cat-ic, .mega-ic')
        ? t.closest('[data-edit]')!
        : t;
      el.setAttribute('data-admin-hover', '');
      hoverEl.current = el;
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('mouseover', onOver, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('mouseover', onOver, true);
      hoverEl.current?.removeAttribute('data-admin-hover');
    };
  }, [editing, isAdmin, lang]);

  const value: AdminCtx = {
    isAdmin, editing, setEditing, draft, update, dirty, version, open: setTarget, publish, publishing, discard,
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      {isAdmin && <AdminBar />}
      {isAdmin && target && <Editor target={target} onClose={() => setTarget(null)} />}
    </Ctx.Provider>
  );
}

function AdminBar() {
  const { editing, setEditing, dirty, publish, publishing, discard, open } = useAdmin();
  return (
    <div className={'admin-bar' + (editing ? ' on' : '')} data-admin-ui>
      <button className={'ab-toggle' + (editing ? ' on' : '')} onClick={() => setEditing(!editing)} title="Tahrirlash rejimi">
        ✏️ {editing ? 'Tahrirlash: YONIQ' : 'Tahrirlash'}
      </button>
      <button className="ab-link" onClick={() => open({ type: 'theme' })}>🎨 Ranglar</button>
      <Link to="/admin" className="ab-link" onClick={() => setEditing(false)}>⚙️ Admin panel</Link>
      {dirty && (
        <>
          <span className="ab-dirty">● Nashr qilinmagan o'zgarishlar</span>
          <button className="ab-pub" onClick={publish} disabled={publishing}>{publishing ? 'Yuklanmoqda…' : '🚀 Nashr qilish'}</button>
          <button className="ab-undo" onClick={discard} disabled={publishing}>Bekor qilish</button>
        </>
      )}
      {editing && <span className="ab-hint">Istalgan matn, rasm yoki tovarni bosing</span>}
    </div>
  );
}

export { allDict };
