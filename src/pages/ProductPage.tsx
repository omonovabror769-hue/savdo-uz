import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { productById, productsOfSub, productsOfCat } from '../data/catalog';
import { subById } from '../data/catalog';
import { Crumbs, Rating, SeoBlock, Thumb } from '../components/ui';
import { Avail, Badges, BuyControls, Price, ProductCard, fullName } from '../components/Product';
import { useStore } from '../store';
import { IconCompare, IconHeart, IconCheck } from '../components/Icons';
import NotFound from './NotFound';

export default function ProductPage() {
  const { id = '' } = useParams();
  const { tr, t, unit, money } = useI18n();
  const { favs, toggleFav, cmp, toggleCmp, showToast } = useStore();
  const p = productById.get(id);
  const [tab, setTab] = useState<'spec' | 'desc'>('spec');
  const variants = useMemo(() => (p ? productsOfSub(p.subId).filter((x) => x.n[0] === p.n[0]) : []), [p]);
  const similar = useMemo(() => (p ? productsOfSub(p.subId).filter((x) => x.n[0] !== p.n[0]).slice(0, 5) : []), [p]);
  const extra = useMemo(() => {
    if (!p) return [];
    const others = productsOfCat(p.catId).filter((x) => x.subId !== p.subId);
    return others.filter((_, i) => i % 7 === 0).slice(0, 5);
  }, [p]);
  if (!p) return <NotFound />;
  const { sub, cat } = subById.get(p.subId)!;
  const isFav = favs.includes(p.id);
  const isCmp = cmp.includes(p.id);
  const desc: [string, string, string] = [
    `${p.n[0]} ${p.brand} — ${p.spec}. Sifat sertifikatiga ega mahsulot. Toshkent bo'ylab 2 soatda yetkazib beramiz, do'kondan olib ketish ham mumkin. Tovarni 365 kun ichida qaytarish mumkin.`,
    `${p.n[1]} ${p.brand} — ${p.spec}. Товар сертифицирован. Доставим по Ташкенту за 2 часа или подготовим к самовывозу. Возврат в течение 365 дней.`,
    `${p.n[2]} by ${p.brand} — ${p.spec}. Certified product. Delivered across Tashkent in 2 hours or ready for pickup. Returns within 365 days.`,
  ];

  return (
    <div className="container page">
      <Crumbs items={[{ to: `/catalog/${cat.id}`, label: tr(cat.n) }, { to: `/catalog/${cat.id}/${sub.id}`, label: tr(sub.n) }, { label: tr(p.n) }]} />
      <h1 className="pp-title">{fullName(p, tr)}</h1>
      <div className="pp-meta">
        <Rating value={p.rating} count={p.reviews} />
        <span className="muted">{t('sku')}: {p.sku}</span>
        <button className={'link-btn' + (isFav ? ' on' : '')} onClick={() => { if (!isFav) showToast(t('addedFav')); toggleFav(p.id); }}>
          <IconHeart size={16} filled={isFav} /> {t('favorites')}
        </button>
        <button className={'link-btn' + (isCmp ? ' on' : '')} onClick={() => { if (!isCmp) showToast(t('addedCmp')); toggleCmp(p.id); }}>
          <IconCompare size={16} /> {t('compare')}
        </button>
      </div>
      <div className="pp">
        <div className="pp-gallery">
          <Badges p={p} />
          <Thumb emoji={p.emoji} catId={p.catId} size="xl" img={p.img} />
        </div>
        <div className="pp-info">
          {variants.length > 1 && (
            <div className="pp-variants">
              <h4>{t('size')}</h4>
              <div className="chips-row">
                {variants.map((v) => (
                  <Link key={v.id} to={`/product/${v.id}`} className={'chip' + (v.id === p.id ? ' on' : '')}>{v.spec}</Link>
                ))}
              </div>
            </div>
          )}
          <dl className="pp-specs short">
            <div><dt>{t('brand')}</dt><dd>{p.brand}</dd></div>
            <div><dt>{t('size')}</dt><dd>{p.spec}</dd></div>
            <div><dt>{t('country')}</dt><dd>{tr(p.country)}</dd></div>
            <div><dt>{t('unitW')}</dt><dd>{unit(p.unit)}</dd></div>
          </dl>
        </div>
        <div className="pp-buy">
          <Price p={p} big />
          <Avail p={p} />
          {p.stock > 0 && <p className="muted small">{t('inStock')}: {p.stock} {unit(p.unit)}</p>}
          <BuyControls p={p} />
          <ul className="pp-perks">
            <li><IconCheck size={15} /> {t('seoDelivery')}</li>
            <li><IconCheck size={15} /> {t('pickup')} — {t('free')}</li>
            <li><IconCheck size={15} /> {t('seoReturn')}</li>
            <li><IconCheck size={15} /> +{money(Math.round(p.price * 0.02))} {tr(['ball', 'баллов', 'points'])}</li>
          </ul>
        </div>
      </div>

      <div className="tabs">
        <button className={tab === 'spec' ? 'on' : ''} onClick={() => setTab('spec')}>{t('specs')}</button>
        <button className={tab === 'desc' ? 'on' : ''} onClick={() => setTab('desc')}>{t('description')}</button>
      </div>
      {tab === 'spec' ? (
        <dl className="pp-specs">
          <div><dt>{t('sku')}</dt><dd>{p.sku}</dd></div>
          <div><dt>{t('category')}</dt><dd>{tr(sub.n)}</dd></div>
          <div><dt>{t('brand')}</dt><dd>{p.brand}</dd></div>
          <div><dt>{t('size')}</dt><dd>{p.spec}</dd></div>
          <div><dt>{t('unitW')}</dt><dd>{unit(p.unit)}</dd></div>
          <div><dt>{t('country')}</dt><dd>{tr(p.country)}</dd></div>
        </dl>
      ) : (
        <p className="pp-desc">{tr(desc)}</p>
      )}

      {similar.length > 0 && (
        <section className="block">
          <h2 className="h2">{t('similar')}</h2>
          <div className="pgrid pgrid-5">{similar.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}
      {extra.length > 0 && (
        <section className="block">
          <h2 className="h2">{t('mayNeed')}</h2>
          <div className="pgrid pgrid-5">{extra.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}
      <SeoBlock title={tr(sub.n)} />
    </div>
  );
}
