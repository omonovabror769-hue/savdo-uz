import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as RKeyboardEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LANGS, useI18n } from '../i18n';
import { useStore } from '../store';
import { categories, countOfSub, searchProducts } from '../data/catalog';
import { Thumb } from './ui';
import { cities } from '../data/content';
import {
  IconCart, IconChevronDown, IconClose, IconCompare, IconHeart, IconMenu, IconPin, IconSearch, IconServices, IconUser, IconBox,
} from './Icons';

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="savdo.uz">
      <span className="logo-word">SAVDO</span>
      <span className="logo-dot">.uz</span>
    </Link>
  );
}

function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label="Til / Язык / Language">
      {LANGS.map((l) => (
        <button key={l.id} className={lang === l.id ? 'on' : ''} onClick={() => setLang(l.id)} aria-pressed={lang === l.id}>
          {l.short}
        </button>
      ))}
    </div>
  );
}

function CitySelect() {
  const { tr } = useI18n();
  const { profile, setProfile } = useStore();
  const city = profile.city;
  const setCity = (i: number) => setProfile({ city: i });
  const [open, setOpen] = useState(false);
  return (
    <div className="city">
      <button className="link-btn" onClick={() => setOpen((v) => !v)}>
        <IconPin size={14} /> {tr(cities[city])} <IconChevronDown size={12} />
      </button>
      {open && (
        <ul className="dropdown" onMouseLeave={() => setOpen(false)}>
          {cities.map((c, i) => (
            <li key={i}>
              <button className={i === city ? 'on' : ''} onClick={() => { setCity(i); setOpen(false); }}>{tr(c)}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MegaMenu({ onClose }: { onClose: () => void }) {
  const { tr, t } = useI18n();
  const [active, setActive] = useState(categories[0].id);
  const cat = categories.find((c) => c.id === active)!;
  return (
    <div className="mega" role="dialog" aria-label={t('catalog')}>
      <div className="mega-inner container">
        <ul className="mega-cats">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                to={`/catalog/${c.id}`}
                className={c.id === active ? 'on' : ''}
                onMouseEnter={() => setActive(c.id)}
                onFocus={() => setActive(c.id)}
                onClick={onClose}
              >
                <span className="mega-ic">{c.e}</span>
                {tr(c.n)}
              </Link>
            </li>
          ))}
          <li className="mega-sep" />
          <li><Link to="/services" onClick={onClose}><span className="mega-ic">🔧</span>{t('services')}</Link></li>
          <li><Link to="/promos" onClick={onClose}><span className="mega-ic">%</span>{t('promos')}</Link></li>
          <li><Link to="/sale" onClick={onClose}><span className="mega-ic">🏷️</span>{t('bestDeals')}</Link></li>
        </ul>
        <div className="mega-subs">
          <h2><Link to={`/catalog/${cat.id}`} onClick={onClose}>{tr(cat.n)}</Link></h2>
          <div className="mega-cols">
            {cat.subs.map((s) => (
              <div key={s.id} className="mega-col">
                <Link to={`/catalog/${cat.id}/${s.id}`} onClick={onClose} className="mega-sub-title">{tr(s.n)}</Link>
                <ul>
                  {s.items.map((it, i) => (
                    <li key={i}>
                      <Link to={`/catalog/${cat.id}/${s.id}?g=${i}`} onClick={onClose}>
                        {tr(it.n)} <span className="cnt">{it.v.length}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <span className="cnt-all">{countOfSub(s.id)} {t('goods')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { t, tr, money } = useI18n();
  const { cartCount, favs, cmp, user, login } = useStore();
  const [menu, setMenu] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const loc = useLocation();
  const nav = useNavigate();
  const params = new URLSearchParams(loc.search);
  const [q, setQ] = useState(params.get('q') || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMenu(false);
    setMobileNav(false);
  }, [loc.pathname, loc.search]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const [focus, setFocus] = useState(false);
  const [hi, setHi] = useState(-1);
  const sugg = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [] as { to: string; label: string; sub?: string; emoji: string; catId: string }[];
    const subs = categories.flatMap((c) => c.subs.map((s) => ({ c, s })))
      .filter(({ s }) => s.n.some((n) => n.toLowerCase().includes(term)))
      .slice(0, 3)
      .map(({ c, s }) => ({ to: `/catalog/${c.id}/${s.id}`, label: tr(s.n), sub: tr(c.n), emoji: s.e, catId: c.id }));
    const prods = searchProducts(term).slice(0, 6).map((p) => ({
      to: `/product/${p.id}`, label: `${tr(p.n)} ${p.brand} ${p.spec}`, sub: money(p.price), emoji: p.emoji, catId: p.catId,
    }));
    return [...subs, ...prods];
  }, [q, tr, money]);
  const showSugg = focus && sugg.length > 0;

  const go = (to: string) => {
    nav(to);
    setFocus(false);
    inputRef.current?.blur();
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (hi >= 0 && sugg[hi]) return go(sugg[hi].to);
    if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`);
  };
  const onKey = (e: RKeyboardEvent<HTMLInputElement>) => {
    if (!showSugg) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(sugg.length - 1, h + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(-1, h - 1)); }
    else if (e.key === 'Escape') setFocus(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar-row">
          <nav className="topbar-links">
            <Link to="/stores">{t('stores')}</Link>
            <Link to="/delivery">{t('delivery')}</Link>
            <Link to="/club">{t('club')}</Link>
            <Link to="/b2b">{t('b2b')}</Link>
            <span className="muted">{t('allDay')} <a href="tel:+998712000000" className="phone">+998 (71) 200-00-00</a></span>
          </nav>
          <div className="topbar-right">
            <CitySelect />
            <LangSwitch />
            <Link to="/account/orders" className="orders-link"><IconBox size={14} /> {t('orders')}</Link>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container header-row">
          <button className="burger" onClick={() => setMobileNav((v) => !v)} aria-label={t('menu')}>
            {mobileNav ? <IconClose /> : <IconMenu />}
          </button>
          <Logo />
          <button className={'btn-catalog' + (menu ? ' open' : '')} onClick={() => setMenu((v) => !v)} aria-expanded={menu}>
            {menu ? <IconClose size={18} /> : <IconMenu size={18} />}
            <span>{t('catalog')}</span>
          </button>
          <form className="search" onSubmit={submit} role="search">
            <input
              ref={inputRef}
              id="search-input"
              value={q}
              onChange={(e) => { setQ(e.target.value); setHi(-1); setFocus(true); }}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 150)}
              onKeyDown={onKey}
              placeholder={t('searchPh')}
              aria-label={t('find')}
              autoComplete="off"
              role="combobox"
              aria-expanded={showSugg}
              aria-controls="search-sugg"
            />
            {showSugg && (
              <ul className="sugg" id="search-sugg" role="listbox">
                {sugg.map((s, i) => (
                  <li key={s.to} role="option" aria-selected={i === hi}>
                    <button type="button" className={i === hi ? 'on' : ''} onMouseDown={(e) => { e.preventDefault(); go(s.to); }}>
                      <Thumb emoji={s.emoji} catId={s.catId} size="sm" />
                      <span className="sugg-l">{s.label}</span>
                      <span className="sugg-s">{s.sub}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button type="button" className="sugg-all" onMouseDown={(e) => { e.preventDefault(); go(`/search?q=${encodeURIComponent(q.trim())}`); }}>
                    {t('showAll')}: «{q.trim()}»
                  </button>
                </li>
              </ul>
            )}
            <button type="submit" className="search-btn">
              <IconSearch size={18} className="only-mobile" />
              <span className="hide-mobile">{t('find')}</span>
            </button>
          </form>
          <nav className="hicons">
            <Link to="/services" className="hicon hide-mobile"><IconServices /><span>{t('services')}</span></Link>
            <Link to="/favorites" className="hicon">
              <IconHeart />{favs.length > 0 && <b className="badge">{favs.length}</b>}<span>{t('favorites')}</span>
            </Link>
            <Link to="/compare" className="hicon hide-mobile">
              <IconCompare />{cmp.length > 0 && <b className="badge">{cmp.length}</b>}<span>{t('compare')}</span>
            </Link>
            {user ? (
              <Link to="/account" className="hicon">
                {user.picture ? <img src={user.picture} alt="" className="avatar-sm" referrerPolicy="no-referrer" /> : <span className="avatar-sm ph">{user.name[0]}</span>}
                <span>{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button className="hicon" onClick={login}><IconUser /><span>{t('login')}</span></button>
            )}
            <Link to="/cart" className="hicon">
              <IconCart />{cartCount > 0 && <b className="badge">{cartCount}</b>}<span>{t('cart')}</span>
            </Link>
          </nav>
        </div>
        <nav className={'catnav' + (mobileNav ? ' open' : '')}>
          <div className="container catnav-row">
            {categories.map((c) => (
              <NavLink key={c.id} to={`/catalog/${c.id}`}>
                <span className="only-mobile">{c.e} </span>{tr(c.n)}
              </NavLink>
            ))}
            <NavLink to="/promos" className="promo-link">% {t('promos')}</NavLink>
            <NavLink to="/sale" className="chip-yellow">{t('cashback')}</NavLink>
            <div className="only-mobile mobile-extra">
              <LangSwitch />
            </div>
          </div>
        </nav>
        {menu && (
          <>
            <MegaMenu onClose={() => setMenu(false)} />
            <div className="mega-backdrop" onClick={() => setMenu(false)} />
          </>
        )}
      </header>
    </>
  );
}
