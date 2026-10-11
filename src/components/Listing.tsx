import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../data/types';
import { useI18n } from '../i18n';
import { storage } from '../store/storage';
import { ProductCard, ProductRow } from './Product';
import { IconFilter, IconGrid, IconList, IconClose } from './Icons';

type SortKey = 'pop' | 'cheap' | 'exp' | 'rating' | 'reviews';
const PAGE = 24;

export default function Listing({ items, aside, banner }: { items: Product[]; aside?: ReactNode; banner?: ReactNode }) {
  const { t, money } = useI18n();
  const [sort, setSort] = useState<SortKey>('pop');
  const [view, setView] = useState<'list' | 'grid'>(() => storage.get('view', 'list'));
  const [brands, setBrands] = useState<string[]>([]);
  const [minP, setMinP] = useState('');
  const [maxP, setMaxP] = useState('');
  const [onlyStock, setOnlyStock] = useState(false);
  const [onlyDisc, setOnlyDisc] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const [brandsAll, setBrandsAll] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => storage.set('view', view), [view]);
  useEffect(() => {
    setBrands([]); setMinP(''); setMaxP(''); setOnlyStock(false); setOnlyDisc(false); setOnlyNew(false); setLimit(PAGE);
  }, [items]);

  const brandList = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((p) => m.set(p.brand, (m.get(p.brand) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);
  const priceRange = useMemo(() => {
    if (!items.length) return [0, 0];
    return [Math.min(...items.map((p) => p.price)), Math.max(...items.map((p) => p.price))];
  }, [items]);

  const filtered = useMemo(() => {
    const lo = parseInt(minP.replace(/\D/g, '') || '0', 10);
    const hi = parseInt(maxP.replace(/\D/g, '') || '0', 10) || Infinity;
    const r = items.filter(
      (p) =>
        (!brands.length || brands.includes(p.brand)) &&
        p.price >= lo && p.price <= hi &&
        (!onlyStock || p.stock > 0) &&
        (!onlyDisc || !!p.oldPrice) &&
        (!onlyNew || !!p.isNew),
    );
    const s = [...r];
    if (sort === 'cheap') s.sort((a, b) => a.price - b.price);
    else if (sort === 'exp') s.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') s.sort((a, b) => b.rating - a.rating);
    else if (sort === 'reviews') s.sort((a, b) => b.reviews - a.reviews);
    else s.sort((a, b) => Number(!!b.hit) - Number(!!a.hit) || b.reviews * b.rating - a.reviews * a.rating);
    return s;
  }, [items, brands, minP, maxP, onlyStock, onlyDisc, onlyNew, sort]);

  const anyFilter = brands.length || minP || maxP || onlyStock || onlyDisc || onlyNew;
  const reset = () => { setBrands([]); setMinP(''); setMaxP(''); setOnlyStock(false); setOnlyDisc(false); setOnlyNew(false); };

  const sorts: [SortKey, string][] = [
    ['pop', t('sortPop')], ['cheap', t('sortCheap')], ['exp', t('sortExp')], ['rating', t('sortRating')], ['reviews', t('sortReviews')],
  ];

  return (
    <div className="listing">
      <aside className={'filters' + (filtersOpen ? ' open' : '')}>
        <div className="filters-head only-mobile">
          <b>{t('filters')}</b>
          <button onClick={() => setFiltersOpen(false)} aria-label="close"><IconClose size={20} /></button>
        </div>
        {aside}
        <div className="fblock">
          <h4>{t('price')}, {t('sum')}</h4>
          <div className="price-inputs">
            <input id="f-min" placeholder={`${t('from')} ${money(priceRange[0]).replace(/ \S+$/, '')}`} value={minP} onChange={(e) => setMinP(e.target.value)} inputMode="numeric" />
            <input id="f-max" placeholder={`${t('to')} ${money(priceRange[1]).replace(/ \S+$/, '')}`} value={maxP} onChange={(e) => setMaxP(e.target.value)} inputMode="numeric" />
          </div>
        </div>
        <div className="fblock">
          <h4>{t('availability')}</h4>
          <label className="chk"><input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} /> {t('onlyStock')}</label>
          <label className="chk"><input type="checkbox" checked={onlyDisc} onChange={(e) => setOnlyDisc(e.target.checked)} /> {t('discounts')} ({items.filter((p) => p.oldPrice).length})</label>
          <label className="chk"><input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} /> {t('novelties')} ({items.filter((p) => p.isNew).length})</label>
        </div>
        <div className="fblock">
          <h4>{t('canGet')}</h4>
          <label className="chk"><input type="radio" name="get" defaultChecked /> {t('today')} ({items.filter((p) => p.stock > 50).length})</label>
          <label className="chk"><input type="radio" name="get" /> {t('tomorrow')} ({items.filter((p) => p.stock > 0).length})</label>
          <label className="chk"><input type="radio" name="get" /> {t('upTo5')} ({items.length})</label>
        </div>
        {brandList.length > 1 && (
          <div className="fblock">
            <h4>{t('brand')}</h4>
            {(brandsAll ? brandList : brandList.slice(0, 7)).map(([b, n]) => (
              <label key={b} className="chk">
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={(e) => setBrands((x) => (e.target.checked ? [...x, b] : x.filter((y) => y !== b)))}
                />
                {b} <span className="cnt">{n}</span>
              </label>
            ))}
            {brandList.length > 7 && (
              <button className="link-btn small" onClick={() => setBrandsAll((v) => !v)}>
                {brandsAll ? t('hide') : t('showAll')}
              </button>
            )}
          </div>
        )}
        {anyFilter ? <button className="btn btn-ghost wide" onClick={reset}>{t('resetFilters')}</button> : null}
      </aside>

      <div className="results">
        <div className="toolbar">
          <span className="found">{t('found')}: <b>{filtered.length}</b></span>
          <button className="btn btn-ghost only-mobile" onClick={() => setFiltersOpen(true)}><IconFilter size={16} /> {t('filters')}</button>
          <div className="sorts">
            <span className="muted hide-mobile">{t('sort')}:</span>
            {sorts.map(([k, l]) => (
              <button key={k} className={'sort-chip' + (sort === k ? ' on' : '')} onClick={() => setSort(k)}>{l}</button>
            ))}
          </div>
          <div className="views hide-mobile">
            <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')} aria-label={t('listView')}><IconList size={18} /></button>
            <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')} aria-label={t('gridView')}><IconGrid size={18} /></button>
          </div>
        </div>
        {banner}
        {filtered.length === 0 ? (
          <div className="empty">{t('nothingFound')}</div>
        ) : view === 'list' ? (
          <div className="plist">{filtered.slice(0, limit).map((p) => <ProductRow key={p.id} p={p} />)}</div>
        ) : (
          <div className="pgrid">{filtered.slice(0, limit).map((p) => <ProductCard key={p.id} p={p} />)}</div>
        )}
        {filtered.length > limit && (
          <button className="btn btn-ghost wide showmore" onClick={() => setLimit((l) => l + PAGE)}>
            {t('showMore')} ({filtered.length - limit})
          </button>
        )}
      </div>
    </div>
  );
}
