import { useMemo } from 'react';
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { catById, categories, products, productsOfCat, productsOfSub, searchProducts, subById } from '../data/catalog';
import { promos } from '../data/content';
import { Crumbs, SeoBlock, Thumb } from '../components/ui';
import Listing from '../components/Listing';
import { ProductCard } from '../components/Product';
import NotFound from './NotFound';

export function CategoryPage() {
  const { catId = '' } = useParams();
  const { tr, t } = useI18n();
  const cat = catById.get(catId);
  const popular = useMemo(
    () => (cat ? productsOfCat(cat.id).sort((a, b) => b.reviews * b.rating - a.reviews * a.rating).slice(0, 10) : []),
    [cat],
  );
  if (!cat) return <NotFound />;
  return (
    <div className="container page">
      <h1 className="page-title">{tr(cat.n)}</h1>
      <div className="with-side">
        <aside className="side-nav">
          {cat.subs.map((s) => (
            <Link key={s.id} to={`/catalog/${cat.id}/${s.id}`}>{tr(s.n)}</Link>
          ))}
        </aside>
        <div className="minw0">
          <Crumbs items={[{ label: tr(cat.n) }]} />
          <div className="tiles">
            {cat.subs.map((s) => (
              <Link key={s.id} to={`/catalog/${cat.id}/${s.id}`} className="tile">
                <Thumb emoji={s.e} catId={cat.id} size="md" />
                <span>{tr(s.n)}</span>
                <small className="muted">{productsOfSub(s.id).length} {t('goods')}</small>
              </Link>
            ))}
          </div>
          <h2 className="h2">{t('popular')}</h2>
          <div className="pgrid pgrid-5">{popular.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          <SeoBlock title={tr(cat.n)} />
        </div>
      </div>
    </div>
  );
}

export function SubPage() {
  const { catId = '', subId = '' } = useParams();
  const [sp] = useSearchParams();
  const { tr } = useI18n();
  const entry = subById.get(subId);
  const g = sp.get('g');
  const items = useMemo(() => {
    const all = productsOfSub(subId);
    return g != null ? all.filter((p) => p.id.startsWith(`${subId}-${g}-`)) : all;
  }, [subId, g]);
  if (!entry || entry.cat.id !== catId) return <NotFound />;
  const { sub, cat } = entry;
  const promo = promos[(cat.subs.indexOf(sub) + 2) % promos.length];
  const banner = (
    <Link to="/promos" className="list-banner" style={{ background: promo.bg, color: promo.fg }}>
      <div>
        <b>{tr(promo.title)}</b>
        <span>{tr(promo.text)}</span>
      </div>
      <span className="list-banner-art" aria-hidden="true">{promo.emoji}</span>
    </Link>
  );
  return (
    <div className="container page">
      <Crumbs items={[{ to: `/catalog/${cat.id}`, label: tr(cat.n) }, { label: tr(sub.n) }]} />
      <h1 className="page-title">{tr(sub.n)}</h1>
      <div className="chips-row">
        <Link to={`/catalog/${cat.id}/${sub.id}`} className={'chip' + (g == null ? ' on' : '')}>
          {tr(['Hammasi', 'Все', 'All'])}
        </Link>
        {sub.items.map((it, i) => (
          <Link key={i} to={`/catalog/${cat.id}/${sub.id}?g=${i}`} className={'chip' + (g === String(i) ? ' on' : '')}>
            {tr(it.n)}
          </Link>
        ))}
      </div>
      <div className="sub-icons">
        {cat.subs.map((s) => (
          <NavLink key={s.id} to={`/catalog/${cat.id}/${s.id}`} className="sub-icon">
            <Thumb emoji={s.e} catId={cat.id} size="sm" />
            <span>{tr(s.n)}</span>
          </NavLink>
        ))}
      </div>
      <Listing
        items={items}
        banner={banner}
        aside={
          <div className="fblock">
            <h4><Link to={`/catalog/${cat.id}`}>{tr(cat.n)}</Link></h4>
            {cat.subs.map((s) => (
              <NavLink key={s.id} to={`/catalog/${cat.id}/${s.id}`} className="fnav" end>
                {tr(s.n)} <span className="cnt">{productsOfSub(s.id).length}</span>
              </NavLink>
            ))}
          </div>
        }
      />
      <SeoBlock title={tr(sub.n)} />
    </div>
  );
}

export function SearchPage() {
  const [sp] = useSearchParams();
  const q = sp.get('q') || '';
  const { t, tr } = useI18n();
  const items = useMemo(() => (q ? searchProducts(q) : products.filter((p) => p.isNew)), [q]);
  return (
    <div className="container page">
      <Crumbs items={[{ label: t('searchResults') }]} />
      <h1 className="page-title">{q ? `«${q}»` : t('novelties')}</h1>
      {q && items.length === 0 ? (
        <div className="empty">
          <p>{t('nothingFound')}</p>
          <div className="chips-row center">
            {categories.map((c) => <Link key={c.id} className="chip" to={`/catalog/${c.id}`}>{c.e} {tr(c.n)}</Link>)}
          </div>
        </div>
      ) : (
        <Listing items={items} />
      )}
    </div>
  );
}

export function SalePage() {
  const { t } = useI18n();
  const items = useMemo(() => products.filter((p) => p.oldPrice || p.hit), []);
  return (
    <div className="container page">
      <Crumbs items={[{ label: t('bestDeals') }]} />
      <h1 className="page-title">{t('bestDeals')}</h1>
      <Listing items={items} />
    </div>
  );
}
