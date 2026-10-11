import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/types';
import { useI18n } from '../i18n';
import { useStore } from '../store';
import { subById, catById } from '../data/catalog';
import { PRating, Thumb } from './ui';
import { IconCompare, IconHeart, IconCheck } from './Icons';

export function Qty({ value, onChange, min = 1 }: { value: number; onChange: (n: number) => void; min?: number }) {
  return (
    <div className="qty">
      <button onClick={() => onChange(Math.max(min, value - 1))} aria-label="−">−</button>
      <input
        value={value}
        inputMode="numeric"
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, '') || '0', 10);
          onChange(Math.max(min, Math.min(9999, n)));
        }}
        aria-label="qty"
      />
      <button onClick={() => onChange(value + 1)} aria-label="+">+</button>
    </div>
  );
}

export function Avail({ p }: { p: Product }) {
  const { t } = useI18n();
  return p.stock > 0 ? (
    <span className="avail ok"><IconCheck size={13} /> {t('availToday')}</span>
  ) : (
    <span className="avail wait">● {t('onOrder')}</span>
  );
}

export function Price({ p, big }: { p: Product; big?: boolean }) {
  const { money, unit, lang } = useI18n();
  const per = lang === 'uz' ? `1 ${unit(p.unit)} narxi` : lang === 'ru' ? `Цена за ${unit(p.unit)}` : `Price per ${unit(p.unit)}`;
  return (
    <div className={'price' + (big ? ' price-big' : '')}>
      <span className="price-per">{per}</span>
      <b className={p.oldPrice ? 'price-now red' : 'price-now'}>{money(p.price)}</b>
      {p.oldPrice && <s className="price-old">{money(p.oldPrice)}</s>}
    </div>
  );
}

function useBuy(p: Product) {
  const { cart, addToCart, setQty, showToast, favs, toggleFav, cmp, toggleCmp } = useStore();
  const { t } = useI18n();
  const line = cart.find((l) => l.id === p.id);
  const [q, setQ] = useState(1);
  return {
    line,
    q,
    setQ: (n: number) => (line ? setQty(p.id, n) : setQ(n)),
    add: () => {
      addToCart(p.id, q);
      showToast(t('added'));
    },
    fav: favs.includes(p.id),
    toggleFav: () => {
      if (!favs.includes(p.id)) showToast(t('addedFav'));
      toggleFav(p.id);
    },
    cmp: cmp.includes(p.id),
    toggleCmp: () => {
      if (!cmp.includes(p.id)) showToast(t('addedCmp'));
      toggleCmp(p.id);
    },
  };
}

export function BuyControls({ p, vertical }: { p: Product; vertical?: boolean }) {
  const { t } = useI18n();
  const b = useBuy(p);
  return (
    <div className={'buy' + (vertical ? ' buy-v' : '')}>
      <Qty value={b.line ? b.line.qty : b.q} onChange={b.setQ} min={b.line ? 0 : 1} />
      {b.line ? (
        <Link to="/cart" className="btn btn-in-cart"><IconCheck size={16} /> {t('inCart')}</Link>
      ) : (
        <button className="btn btn-brand" onClick={b.add}>{t('toCart')}</button>
      )}
    </div>
  );
}

function SideIcons({ p }: { p: Product }) {
  const b = useBuy(p);
  const { t } = useI18n();
  return (
    <div className="side-icons">
      <button className={b.fav ? 'on' : ''} onClick={b.toggleFav} aria-label={t('favorites')} aria-pressed={b.fav}>
        <IconHeart size={19} filled={b.fav} />
      </button>
      <button className={b.cmp ? 'on' : ''} onClick={b.toggleCmp} aria-label={t('compare')} aria-pressed={b.cmp}>
        <IconCompare size={19} />
      </button>
    </div>
  );
}

export function Badges({ p }: { p: Product }) {
  const { t } = useI18n();
  return (
    <div className="badges">
      {p.oldPrice && <span className="bdg bdg-red">−{Math.round((1 - p.price / p.oldPrice) * 100)}%</span>}
      {p.hit && <span className="bdg bdg-hit">{t('hitBadge')}</span>}
      {p.isNew && <span className="bdg bdg-green">{t('newBadge')}</span>}
    </div>
  );
}

export function fullName(p: Product, tr: (v: [string, string, string]) => string) {
  return `${tr(p.n)} ${p.brand} ${p.spec}`;
}

/** Ro'yxat ko'rinishidagi mahsulot qatori (Petrovich uslubida) */
export function ProductRow({ p }: { p: Product }) {
  const { tr, t } = useI18n();
  const s = subById.get(p.subId)!;
  const cat = catById.get(p.catId)!;
  return (
    <article className="prow" data-edit={`product:${p.id}`}>
      <Link to={`/product/${p.id}`} className="prow-img">
        <Badges p={p} />
        <Thumb emoji={p.emoji} catId={p.catId} size="lg" img={p.img} />
        <span className="sku">{p.sku}</span>
      </Link>
      <div className="prow-main">
        <Link to={`/product/${p.id}`} className="pname">{fullName(p, tr)}</Link>
        <Avail p={p} />
        <PRating id={p.id} />
        <div className="ppath">
          <Link to={`/catalog/${cat.id}`}>{tr(cat.n)}</Link> › <Link to={`/catalog/${cat.id}/${s.sub.id}`}>{tr(s.sub.n)}</Link>
        </div>
        <dl className="pspecs">
          <div><dt>{t('brand')}:</dt><dd>{p.brand}</dd></div>
          <div><dt>{t('size')}:</dt><dd>{p.spec}</dd></div>
          <div><dt>{t('country')}:</dt><dd>{tr(p.country)}</dd></div>
        </dl>
      </div>
      <div className="prow-buy">
        <Price p={p} />
        <BuyControls p={p} vertical />
      </div>
      <SideIcons p={p} />
    </article>
  );
}

/** Panjara (plitka) ko'rinishidagi mahsulot kartasi */
export function ProductCard({ p }: { p: Product }) {
  const { tr } = useI18n();
  return (
    <article className="pcard" data-edit={`product:${p.id}`}>
      <Link to={`/product/${p.id}`} className="pcard-img">
        <Badges p={p} />
        <Thumb emoji={p.emoji} catId={p.catId} size="lg" img={p.img} />
      </Link>
      <SideIcons p={p} />
      <Price p={p} />
      <Link to={`/product/${p.id}`} className="pname">{fullName(p, tr)}</Link>
      <PRating id={p.id} />
      <Avail p={p} />
      <BuyControls p={p} />
    </article>
  );
}
