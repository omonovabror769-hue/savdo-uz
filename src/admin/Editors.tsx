import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { L3, UnitKey } from '../data/types';
import { categories, productById, subById } from '../data/catalog';
import { heroSlides, promos, services } from '../data/content';
import { seenTexts, textOverrides, translate, logo as logoNow, type NewProduct } from './content';
import { readImage } from './images';
import { useAdmin } from './AdminProvider';
import { Modal } from '../components/ui';

export type EditTarget =
  | { type: 'text'; key: string }
  | { type: 'product'; id: string }
  | { type: 'new'; subId: string }
  | { type: 'cat'; id: string }
  | { type: 'promo'; id: string }
  | { type: 'service'; id: string }
  | { type: 'slide'; id: string }
  | { type: 'logo' };

/* ---------------- 3 tilli matn maydoni: o'zbekchani yozsangiz ruscha va inglizcha o'zi tarjima bo'ladi ---------------- */
export function L3Field({ label, value, onChange, multiline }: { label: string; value: L3; onChange: (v: L3) => void; multiline?: boolean }) {
  const [v, setV] = useState<L3>(value);
  const [manual, setManual] = useState({ ru: false, en: false });
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');
  const timer = useRef<number>();
  const first = useRef(true);

  useEffect(() => onChange(v), [v]); // eslint-disable-line react-hooks/exhaustive-deps

  const runTranslate = async (uz: string, force = false) => {
    if (!uz.trim()) return;
    setBusy(true);
    setNote('');
    const [ru, en] = await Promise.all([
      force || !manual.ru ? translate(uz, 'ru') : Promise.resolve(''),
      force || !manual.en ? translate(uz, 'en') : Promise.resolve(''),
    ]);
    setBusy(false);
    if (!ru && !en) {
      setNote("Avtomatik tarjima ishlamadi (internet yoki xizmat). Ruscha va inglizchani qo'lda yozing.");
      return;
    }
    setV((cur) => [cur[0], ru && (force || !manual.ru) ? ru : cur[1], en && (force || !manual.en) ? en : cur[2]]);
  };

  const onUz = (uz: string) => {
    setV((cur) => [uz, cur[1], cur[2]]);
    first.current = false;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => runTranslate(uz), 800);
  };

  const Input = multiline ? 'textarea' : 'input';
  return (
    <div className="l3">
      <div className="l3-head">
        <b>{label}</b>
        <button type="button" className="link-btn small" onClick={() => runTranslate(v[0], true)} disabled={busy}>
          {busy ? '⏳ Tarjima qilinmoqda…' : '🔄 Qayta tarjima qilish'}
        </button>
      </div>
      <label className="l3-row"><span>🇺🇿 UZ</span><Input value={v[0]} onChange={(e) => onUz(e.target.value)} rows={3} autoFocus /></label>
      <label className="l3-row"><span>🇷🇺 RU</span><Input value={v[1]} onChange={(e) => { setManual((m) => ({ ...m, ru: true })); setV([v[0], e.target.value, v[2]]); }} rows={3} /></label>
      <label className="l3-row"><span>🇬🇧 EN</span><Input value={v[2]} onChange={(e) => { setManual((m) => ({ ...m, en: true })); setV([v[0], v[1], e.target.value]); }} rows={3} /></label>
      <p className="muted tiny">O'zbekchasini yozing — ruscha va inglizcha avtomatik tarjima bo'ladi. Kerak bo'lsa ularni qo'lda tuzating.</p>
      {note && <p className="err tiny">{note}</p>}
    </div>
  );
}

/* ---------------- Rasm maydoni ---------------- */
export function ImageField({ label, value, onChange, alpha }: { label: string; value?: string; onChange: (v?: string) => void; alpha?: boolean }) {
  const [err, setErr] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="imgf">
      <b>{label}</b>
      <div className="imgf-row">
        <div className="imgf-prev">{value ? <img src={value} alt="" /> : <span className="muted tiny">Rasm yo'q</span>}</div>
        <div className="imgf-btns">
          <button type="button" className="btn btn-brand sm" onClick={() => ref.current?.click()}>📷 Rasm yuklash</button>
          {value && <button type="button" className="btn btn-ghost sm" onClick={() => onChange(undefined)}>Olib tashlash</button>}
          <span className="muted tiny">JPG, PNG, WEBP yoki SVG. Katta rasm avtomatik kichraytiriladi.</span>
        </div>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = '';
          if (!f) return;
          try {
            setErr('');
            onChange(await readImage(f, alpha ? 600 : 1200, alpha));
          } catch (x) {
            setErr((x as Error).message);
          }
        }}
      />
      {err && <p className="err tiny">{err}</p>}
    </div>
  );
}

function Shell({ title, children, onSave, onClose, onReset, saveLabel = 'Saqlash' }: { title: string; children: ReactNode; onSave: () => void; onClose: () => void; onReset?: () => void; saveLabel?: string }) {
  return (
    <Modal onClose={onClose} label={title} wide>
      <div className="editor" data-admin-ui>
        <h2>{title}</h2>
        {children}
        <div className="editor-actions">
          <button className="btn btn-brand" onClick={onSave}>{saveLabel}</button>
          <button className="btn btn-ghost" onClick={onClose}>Bekor qilish</button>
          {onReset && <button className="link-btn small danger-l" onClick={onReset}>Asl holiga qaytarish</button>}
        </div>
        <p className="muted tiny">"Saqlash" o'zgarishni faqat sizga ko'rsatadi. Hamma ko'rishi uchun pastdagi "🚀 Nashr qilish" ni bosing.</p>
      </div>
    </Modal>
  );
}

const num = (s: string) => {
  const n = parseInt(s.replace(/\D/g, '') || '0', 10);
  return Number.isFinite(n) ? n : 0;
};

export default function Editor({ target, onClose }: { target: EditTarget; onClose: () => void }) {
  if (target.type === 'text') return <TextEditor k={target.key} onClose={onClose} />;
  if (target.type === 'logo') return <LogoEditor onClose={onClose} />;
  if (target.type === 'product' || target.type === 'new') return <ProductEditor target={target} onClose={onClose} />;
  if (target.type === 'cat') return <CatEditor id={target.id} onClose={onClose} />;
  if (target.type === 'service') return <ServiceEditor id={target.id} onClose={onClose} />;
  if (target.type === 'promo') return <PromoEditor id={target.id} onClose={onClose} />;
  if (target.type === 'slide') return <SlideEditor id={target.id} onClose={onClose} />;
  return null;
}

function TextEditor({ k, onClose }: { k: string; onClose: () => void }) {
  const { update, draft } = useAdmin();
  const orig = seenTexts.get(k) || (['', '', ''] as L3);
  const [val, setVal] = useState<L3>(textOverrides.get(k) || orig);
  return (
    <Shell
      title="Matnni tahrirlash"
      onClose={onClose}
      onSave={() => { update((c) => { c.texts[k] = val; }); onClose(); }}
      onReset={draft.texts[k] ? () => { update((c) => { delete c.texts[k]; }); onClose(); } : undefined}
    >
      <p className="muted small">Asl matn: «{orig[0]}». U saytning hamma joyida o'zgaradi.</p>
      <L3Field label="Matn" value={val} onChange={setVal} multiline={orig[0].length > 60} />
    </Shell>
  );
}

function NameImgEditor({ title, name, img, onSave, onReset, onClose }: { title: string; name: L3; img?: string; onSave: (n: L3, img?: string) => void; onReset?: () => void; onClose: () => void }) {
  const [n, setN] = useState<L3>(name);
  const [im, setIm] = useState(img);
  return (
    <Shell title={title} onClose={onClose} onSave={() => { onSave(n, im); onClose(); }} onReset={onReset && (() => { onReset(); onClose(); })}>
      <L3Field label="Nomi" value={n} onChange={setN} />
      <ImageField label="Rasm (emoji o'rniga)" value={im} onChange={setIm} />
    </Shell>
  );
}

function CatEditor({ id, onClose }: { id: string; onClose: () => void }) {
  const { update, draft } = useAdmin();
  const c = categories.find((x) => x.id === id) || subById.get(id)?.sub;
  if (!c) return null;
  return (
    <NameImgEditor title="Kategoriya" name={c.n} img={c.img} onClose={onClose}
      onSave={(n, img) => update((d) => { d.cats[id] = { n, img }; })}
      onReset={draft.cats[id] ? () => update((d) => { delete d.cats[id]; }) : undefined} />
  );
}

function ServiceEditor({ id, onClose }: { id: string; onClose: () => void }) {
  const { update, draft } = useAdmin();
  const s = services.find((x) => x.id === id);
  if (!s) return null;
  return (
    <NameImgEditor title="Xizmat" name={s.n} img={s.img} onClose={onClose}
      onSave={(n, img) => update((d) => { d.services[id] = { n, img }; })}
      onReset={draft.services[id] ? () => update((d) => { delete d.services[id]; }) : undefined} />
  );
}

function PromoEditor({ id, onClose }: { id: string; onClose: () => void }) {
  const { update, draft } = useAdmin();
  const p = promos.find((x) => x.id === id);
  const [title, setTitle] = useState<L3>(p?.title || ['', '', '']);
  const [text, setText] = useState<L3>(p?.text || ['', '', '']);
  const [img, setImg] = useState(p?.img);
  if (!p) return null;
  return (
    <Shell title="Aksiya" onClose={onClose}
      onSave={() => { update((d) => { d.promos[id] = { title, text, img }; }); onClose(); }}
      onReset={draft.promos[id] ? () => { update((d) => { delete d.promos[id]; }); onClose(); } : undefined}>
      <L3Field label="Sarlavha" value={title} onChange={setTitle} />
      <L3Field label="Matn" value={text} onChange={setText} multiline />
      <ImageField label="Banner rasmi (16:9 tavsiya etiladi)" value={img} onChange={setImg} />
    </Shell>
  );
}

function SlideEditor({ id, onClose }: { id: string; onClose: () => void }) {
  const { update, draft } = useAdmin();
  const base = heroSlides[+id];
  const cur = draft.slides[id] || {};
  const [t, setT] = useState<L3>(cur.t || base?.t || ['', '', '']);
  const [s, setS] = useState<L3>(cur.s || base?.s || ['', '', '']);
  const [img, setImg] = useState(cur.img);
  return (
    <Shell title={`Bosh sahifa banneri №${+id + 1}`} onClose={onClose}
      onSave={() => { update((d) => { d.slides[id] = { t, s, img }; }); onClose(); }}
      onReset={draft.slides[id] ? () => { update((d) => { delete d.slides[id]; }); onClose(); } : undefined}>
      <L3Field label="Sarlavha" value={t} onChange={setT} />
      <L3Field label="Qisqa matn" value={s} onChange={setS} multiline />
      <ImageField label="O'ngdagi rasm" value={img} onChange={setImg} alpha />
    </Shell>
  );
}

function LogoEditor({ onClose }: { onClose: () => void }) {
  const { update } = useAdmin();
  const [word, setWord] = useState(logoNow.word || 'SAVDO');
  const [suffix, setSuffix] = useState(logoNow.suffix ?? '.uz');
  const [img, setImg] = useState(logoNow.img);
  return (
    <Shell title="Logotip" onClose={onClose}
      onSave={() => { update((d) => { d.logo = { word, suffix, img }; }); onClose(); }}
      onReset={() => { update((d) => { d.logo = {}; }); onClose(); }}>
      <div className="grid2">
        <label className="field"><span>Asosiy so'z</span><input value={word} onChange={(e) => setWord(e.target.value)} /></label>
        <label className="field"><span>Qo'shimcha (masalan .uz)</span><input value={suffix} onChange={(e) => setSuffix(e.target.value)} /></label>
      </div>
      <ImageField label="Yoki logotip rasmi (PNG/SVG, shaffof fon tavsiya etiladi)" value={img} onChange={setImg} alpha />
      <p className="muted tiny">Rasm yuklansa, matn o'rniga rasm ko'rsatiladi.</p>
    </Shell>
  );
}

const unitOptions: [UnitKey, string][] = [
  ['pc', 'dona'], ['bag', 'qop'], ['m2', 'm²'], ['m', 'm'], ['kg', 'kg'], ['l', 'l'], ['pack', 'qadoq'], ['sheet', 'list'], ['set', "to'plam"], ['roll', 'rulon'], ['m3', 'm³'], ['t', 't'],
];

function ProductEditor({ target, onClose }: { target: { type: 'product'; id: string } | { type: 'new'; subId: string }; onClose: () => void }) {
  const { update, draft } = useAdmin();
  const isNew = target.type === 'new';
  const existing = !isNew ? productById.get(target.id) : undefined;
  const fromNew = !isNew ? draft.newProducts.find((x) => x.id === target.id) : undefined;
  const subId = isNew ? target.subId : existing?.subId || '';

  const [name, setName] = useState<L3>(existing?.n || ['', '', '']);
  const [brand, setBrand] = useState(existing?.brand || '');
  const [spec, setSpec] = useState(existing?.spec || '');
  const [price, setPrice] = useState(String(existing?.price || ''));
  const [oldPrice, setOldPrice] = useState(existing?.oldPrice ? String(existing.oldPrice) : '');
  const [stock, setStock] = useState(String(existing?.stock ?? 100));
  const [unit, setUnit] = useState<UnitKey>(existing?.unit || 'pc');
  const [img, setImg] = useState(existing?.img);
  const [hidden, setHidden] = useState(!!existing?.hidden);
  const [err, setErr] = useState('');

  const save = () => {
    if (!name[0].trim()) return setErr("Tovar nomini o'zbekcha yozing");
    if (!num(price)) return setErr('Narxni kiriting');
    const op = num(oldPrice);
    if (isNew || fromNew) {
      const np: NewProduct = {
        id: isNew ? `new-${Date.now().toString(36)}` : fromNew!.id,
        subId, n: name, brand, spec, unit, price: num(price), oldPrice: op > num(price) ? op : undefined, stock: num(stock), img,
      };
      update((d) => {
        d.newProducts = d.newProducts.filter((x) => x.id !== np.id);
        d.newProducts.push(np);
      });
    } else {
      update((d) => {
        d.products[target.id] = {
          n: name, brand, spec, price: num(price), oldPrice: op > num(price) ? op : null, stock: num(stock), img, hidden,
        };
      });
    }
    onClose();
  };

  const remove = fromNew
    ? () => { update((d) => { d.newProducts = d.newProducts.filter((x) => x.id !== fromNew.id); }); onClose(); }
    : !isNew && draft.products[target.id]
      ? () => { update((d) => { delete d.products[target.id]; }); onClose(); }
      : undefined;

  return (
    <Shell title={isNew ? "Yangi tovar qo'shish" : 'Tovarni tahrirlash'} onClose={onClose} onSave={save} onReset={remove} saveLabel={isNew ? "Qo'shish" : 'Saqlash'}>
      <p className="muted small">Bo'lim: {subById.get(subId)?.sub.n[0]}{existing ? ` · Kod: ${existing.sku}` : ''}</p>
      <L3Field label="Tovar nomi" value={name} onChange={setName} />
      <div className="grid2">
        <label className="field"><span>Brend</span><input value={brand} onChange={(e) => setBrand(e.target.value)} /></label>
        <label className="field"><span>O'lcham / parametrlar</span><input value={spec} onChange={(e) => setSpec(e.target.value)} placeholder="masalan 250×120×65 mm" /></label>
        <label className="field"><span>Narx, so'm</span><input value={price} inputMode="numeric" onChange={(e) => setPrice(e.target.value)} /></label>
        <label className="field"><span>Eski narx (chegirma uchun, ixtiyoriy)</span><input value={oldPrice} inputMode="numeric" onChange={(e) => setOldPrice(e.target.value)} /></label>
        <label className="field"><span>Omborda (dona)</span><input value={stock} inputMode="numeric" onChange={(e) => setStock(e.target.value)} /></label>
        <label className="field"><span>O'lchov birligi</span>
          <select value={unit} onChange={(e) => setUnit(e.target.value as UnitKey)} disabled={!isNew && !fromNew}>
            {unitOptions.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
      </div>
      <ImageField label="Tovar rasmi" value={img} onChange={setImg} />
      {!isNew && !fromNew && (
        <label className="chk"><input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} /> Tovarni saytdan yashirish</label>
      )}
      {err && <p className="err">{err}</p>}
    </Shell>
  );
}
