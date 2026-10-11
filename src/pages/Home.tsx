import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { categories, products } from '../data/catalog';
import { promos, services } from '../data/content';
import { ProductCard } from '../components/Product';
import { IconChevron } from '../components/Icons';
import { PromoCard } from './Promos';

const slides = [
  {
    bg: 'linear-gradient(110deg,#ffd400 0%,#ffd400 55%,#ffb800 100%)', fg: '#1b1b1b', emoji: '🧱🪣🛠️', to: '/catalog/stroy',
    t: ["Kuzgi ta'mir mavsumi: qurilish materiallariga −20% gacha", 'Осенний сезон ремонта: до −20% на стройматериалы', 'Autumn renovation season: up to −20% on building materials'],
    s: ["Sement, g'isht, gipsokarton va aralashmalar — Toshkent bo'ylab 2 soatda yetkazamiz", 'Цемент, кирпич, гипсокартон и смеси — доставим по Ташкенту за 2 часа', 'Cement, bricks, drywall and mixes delivered across Tashkent in 2 hours'],
  },
  {
    bg: 'linear-gradient(110deg,#17191d 0%,#2c3038 100%)', fg: '#ffffff', emoji: '🔌💡⚡', to: '/catalog/electric',
    t: ['Elektrika: kabel va avtomatlarga foydali narxlar', 'Электрика: выгодные цены на кабель и автоматы', 'Electrical: great prices on cable and breakers'],
    s: ["Legrand, Schneider Electric, IEK — rasmiy kafolat bilan", 'Legrand, Schneider Electric, IEK — с официальной гарантией', 'Legrand, Schneider Electric, IEK with official warranty'],
  },
  {
    bg: 'linear-gradient(110deg,#0f5132 0%,#198754 100%)', fg: '#ffffff', emoji: '🌿🔥🍖', to: '/catalog/garden',
    t: ["Bog' va dam olish: mangal, qozon va bog' texnikasi", 'Сад и досуг: мангалы, казаны и садовая техника', 'Garden & leisure: grills, kazans and garden machinery'],
    s: ["Dala hovli uchun hamma narsa bir joyda", 'Всё для дачи в одном месте', 'Everything for your country house in one place'],
  },
];

export default function Home() {
  const { t, tr } = useI18n();
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, []);
  const hits = useMemo(() => products.filter((p) => p.hit && p.stock > 0).slice(0, 10), []);
  const deals = useMemo(() => products.filter((p) => p.oldPrice).sort((a, b) => b.oldPrice! / b.price - a.oldPrice! / a.price).slice(0, 10), []);
  const news = useMemo(() => products.filter((p) => p.isNew).slice(0, 10), []);
  const sl = slides[slide];

  return (
    <div className="container page">
      <section className="hero">
        <Link to={sl.to} className="hero-main" style={{ background: sl.bg, color: sl.fg }}>
          <div className="hero-text">
            <h1>{tr(sl.t as [string, string, string])}</h1>
            <p>{tr(sl.s as [string, string, string])}</p>
            <span className="btn btn-dark">{t('goCatalog')} <IconChevron size={16} /></span>
          </div>
          <div className="hero-art" aria-hidden="true">{sl.emoji}</div>
          <div className="hero-dots" onClick={(e) => e.preventDefault()}>
            {slides.map((_, i) => (
              <button key={i} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} aria-label={`${i + 1}`} />
            ))}
          </div>
        </Link>
        <div className="hero-side">
          <Link to={`/promos/${promos[0].id}`} className="hero-mini" style={{ background: '#14171c', color: '#ffd400' }}>
            <b>{tr(promos[0].title)}</b>
            <span>{tr(promos[0].dates)}</span>
          </Link>
          <Link to="/delivery" className="hero-mini" style={{ background: '#f3f3f1', color: '#1b1b1b' }}>
            <b>🚚 {t('seoDelivery')}</b>
            <span>{t('delivery')} →</span>
          </Link>
        </div>
      </section>

      <section className="home-cats">
        {categories.map((c) => (
          <Link key={c.id} to={`/catalog/${c.id}`} className="home-cat">
            <span className="home-cat-ic">{c.e}</span>
            <span>{tr(c.n)}</span>
          </Link>
        ))}
        <Link to="/services" className="home-cat"><span className="home-cat-ic">🔧</span><span>{t('services')}</span></Link>
      </section>

      <Shelf title={t('hits')} items={hits} to="/sale" />

      <section className="block">
        <div className="block-head">
          <h2>{t('promos')}</h2>
          <Link to="/promos" className="more">{t('showAll')} <IconChevron size={14} /></Link>
        </div>
        <div className="promo-grid promo-grid-4">
          {promos.slice(0, 4).map((p) => <PromoCard key={p.id} p={p} />)}
        </div>
      </section>

      <Shelf title={t('bestDeals')} items={deals} to="/sale" />

      <section className="block">
        <div className="block-head">
          <h2>{t('services')}</h2>
          <Link to="/services" className="more">{t('showAll')} <IconChevron size={14} /></Link>
        </div>
        <div className="svc-strip">
          {services.slice(0, 8).map((s) => (
            <Link key={s.id} to={`/services/${s.id}`} className="svc-mini"><span>{s.e}</span>{tr(s.n)}</Link>
          ))}
        </div>
      </section>

      <Shelf title={t('novelties')} items={news} to="/search?q=" />

      <section className="about">
        <h2>savdo.uz — {t('buyMore')}</h2>
        <p>{t('heroSub')}</p>
      </section>
    </div>
  );
}

function Shelf({ title, items, to }: { title: string; items: typeof products; to: string }) {
  const { t } = useI18n();
  if (!items.length) return null;
  return (
    <section className="block">
      <div className="block-head">
        <h2>{title}</h2>
        <Link to={to} className="more">{t('showAll')} <IconChevron size={14} /></Link>
      </div>
      <div className="shelf">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
