import { useEffect, useRef, useState, type ReactNode } from 'react';
import { subscribeToast } from '../store/toast';
import { Link } from 'react-router-dom';
import { LANGS, useI18n } from '../i18n';
import { useStore } from '../store';
import { isDemo, renderGoogleButton, initGoogle } from '../store/auth';
import { IconChat, IconClose, GoogleG, Star, IconCheck } from './Icons';
import { Logo } from './Header';
import { categories, catById } from '../data/catalog';

// Rasm o'rnida — kategoriyaga mos rangdagi fon ustida emoji
const tints: Record<string, string> = {
  stroy: '#fbe9e1', tools: '#e8eef6', electric: '#fff6d6', engineering: '#e3f2f5', finish: '#f3ebf7',
  home: '#eef4e6', plumbing: '#e6f0fb', fasteners: '#eeeeee', garden: '#e5f4e3',
};
export function Thumb({ emoji, catId, size = 'md', img }: { emoji: string; catId: string; size?: 'sm' | 'md' | 'lg' | 'xl'; img?: string }) {
  return (
    <div className={`thumb thumb-${size}`} style={{ ['--tint' as string]: tints[catId] || '#f1f1f1' }}>
      {img ? <img src={img} alt="" loading="lazy" /> : <span aria-hidden="true">{emoji}</span>}
    </div>
  );
}

/** Tovar reytingi — faqat haqiqiy foydalanuvchi sharhlaridan hisoblanadi */
export function PRating({ id }: { id: string }) {
  const { ratingOf } = useStore();
  const r = ratingOf(id);
  return <Rating value={r.avg} count={r.count} />;
}

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="rating" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} on={value >= i - 0.25} />)}
      {count != null && <span className="rating-n">{count}</span>}
    </span>
  );
}

export function Crumbs({ items }: { items: { to?: string; label: string }[] }) {
  const { t } = useI18n();
  return (
    <nav className="crumbs" aria-label="breadcrumbs">
      <Link to="/">{t('home')}</Link>
      {items.map((it, i) => (
        <span key={i}>
          <span className="sep">/</span>
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function SeoBlock({ title }: { title: string }) {
  const { t, lang } = useI18n();
  const city = lang === 'uz' ? 'Toshkentda' : lang === 'ru' ? 'в Ташкенте' : 'in Tashkent';
  return (
    <section className="seo">
      <h3>{title} {city}</h3>
      <p>{title} — {t('seoBuy')}</p>
      <ul>
        <li><b className="seo-dot" />{t('seoDelivery')}</li>
        <li><b className="seo-dot" />{t('seoAuto')}</li>
        <li><b className="seo-dot" />{t('seoReturn')}</li>
      </ul>
    </section>
  );
}

export function FeedbackBar() {
  const { t } = useI18n();
  return (
    <div className="feedback-bar">
      <IconChat size={18} /> <Link to="/feedback">{t('feedback')}</Link>
    </div>
  );
}

export function Modal({ onClose, children, label, wide }: { onClose: () => void; children: ReactNode; label: string; wide?: boolean }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', k);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return (
    <div className="modal-wrap" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <div className={'modal' + (wide ? ' modal-wide' : '')} onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="close"><IconClose size={20} /></button>
        {children}
      </div>
    </div>
  );
}

export function LoginModal() {
  const { t, lang } = useI18n();
  const { loginOpen, setLoginOpen, signInDemo, user } = useStore();
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loginOpen || isDemo) return;
    initGoogle(null, { prompt: false })
      .then(() => btnRef.current && renderGoogleButton(btnRef.current, lang))
      .catch(() => {});
  }, [loginOpen, lang]);

  if (!loginOpen || user) return null;
  return (
    <Modal onClose={() => setLoginOpen(false)} label={t('loginTitle')}>
      <div className="login">
        <Logo />
        <h2>{t('loginTitle')}</h2>
        <p className="muted">{t('loginSub')}</p>
        {isDemo ? (
          <button className="gbtn" onClick={signInDemo} id="google-demo-btn">
            <GoogleG /> <span>{t('withGoogle')}</span>
          </button>
        ) : (
          <div ref={btnRef} className="gbtn-host" />
        )}
        <p className="login-auto"><IconCheck size={16} /> {t('autoLogin')}</p>
        {isDemo && <p className="demo-note">{t('demoMode')}</p>}
        <p className="tiny muted">{t('terms')}</p>
      </div>
    </Modal>
  );
}

export function LangModal() {
  const { chosen, setLang, t, lang } = useI18n();
  if (chosen) return null;
  return (
    <Modal onClose={() => setLang(lang)} label="Language">
      <div className="langpick">
        <Logo />
        <h2>{t('chooseLang')}</h2>
        <p className="muted">{t('chooseLangSub')}</p>
        <div className="langpick-row">
          {LANGS.map((l) => (
            <button key={l.id} className={'langpick-btn' + (l.id === lang ? ' on' : '')} onClick={() => setLang(l.id)}>
              <span className="flag">{l.flag}</span>
              <b>{l.label}</b>
              <span className="muted">{l.short}</span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export function Toast() {
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => subscribeToast(setToast), []);
  const last = useRef('');
  if (toast) last.current = toast;
  return (
    <div className={'toast' + (toast ? ' show' : '')} role="status" aria-live="polite" hidden={!last.current}>
      <IconCheck size={18} /> {toast || last.current}
    </div>
  );
}

export function Footer() {
  const { t, tr } = useI18n();
  const col = (title: string, links: { to: string; l: string }[]) => (
    <div className="fcol">
      <h4>{title}</h4>
      <ul>{links.map((x, i) => <li key={i}><Link to={x.to}>{x.l}</Link></li>)}</ul>
    </div>
  );
  return (
    <footer className="footer">
      <div className="container">
        <div className="fgrid">
          {col(t('catalog'), categories.map((c) => ({ to: `/catalog/${c.id}`, l: tr(c.n) })))}
          {col(tr(['Xaridorlarga', 'Покупателям', 'For customers']), [
            { to: '/delivery', l: t('delivery') },
            { to: '/stores', l: t('pickup') },
            { to: '/payment', l: t('payMethod') },
            { to: '/b2b', l: t('b2b') },
            { to: '/returns', l: tr(['Tovarni qaytarish', 'Возврат товара', 'Returns']) },
            { to: '/promos', l: t('promos') },
            { to: '/about', l: tr(['Kompaniya haqida', 'О компании', 'About us']) },
          ])}
          {col(t('services'), [
            { to: '/services/rent', l: tr(['Asbob ijarasi', 'Аренда инструмента', 'Tool rental']) },
            { to: '/services/tint', l: tr(["Bo'yoqlarni kolerlash", 'Колеровка красок', 'Paint tinting']) },
            { to: '/services/cut', l: tr(['Arralash', 'Распил', 'Cutting']) },
            { to: '/services/calc', l: tr(["Ta'mir kalkulyatori", 'Калькулятор ремонта', 'Renovation calculator']) },
            { to: '/services/build-calc', l: tr(['Qurilish kalkulyatori', 'Строительный калькулятор', 'Building calculator']) },
            { to: '/services/electro', l: tr(['Elektr montaj ishlari', 'Электромонтажные работы', 'Electrical works']) },
          ])}
          {col(tr(['Sodiqlik', 'Лояльность', 'Loyalty']), [
            { to: '/club', l: t('club') },
            { to: '/account/points', l: t('points') },
            { to: '/sale', l: t('cashback') },
          ])}
          <div className="fcol">
            <h4>{tr(['Aloqa', 'Контакты', 'Contacts'])}</h4>
            <ul>
              <li className="fphone"><a href="tel:+998712000000">+998 (71) 200-00-00</a></li>
              <li>info@savdo.uz</li>
              <li><Link to="/stores">{tr(["Barcha do'konlar manzillari", 'Адреса всех магазинов', 'All store addresses'])}</Link></li>
            </ul>
            <h4 className="mt">{t('fbTitle')}</h4>
            <ul>
              <li><Link to="/feedback">{tr(['Xabar yozish', 'Написать сообщение', 'Send a message'])}</Link></li>
              <li><Link to="/services/pro">{tr(['Usta chaqirish', 'Вызвать мастера', 'Book a contractor'])}</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbottom">
          <div className="apps">
            <div className="qr" aria-hidden="true">
              {Array.from({ length: 49 }).map((_, i) => <i key={i} className={(i * 7 + (i % 5)) % 3 === 0 || [0, 1, 2, 7, 14, 4, 5, 6, 13, 20, 28, 35, 42, 43, 44].includes(i) ? 'on' : ''} />)}
            </div>
            <div>
              <h4>{t('mobileApps')}</h4>
              <p className="muted">{t('scanQr')}</p>
              <div className="stores"><span>▶ Google Play</span><span> App Store</span></div>
            </div>
          </div>
          <div className="pays">
            <h4>{t('weAccept')}</h4>
            <div className="pay-row">
              <span className="pay uzcard">UZCARD</span>
              <span className="pay humo">HUMO</span>
              <span className="pay visa">VISA</span>
              <span className="pay click">click</span>
              <span className="pay payme">payme</span>
              <span className="pay uzum">uzum</span>
            </div>
          </div>
        </div>
        <p className="copy">© 2026 savdo.uz. {t('rights')}</p>
      </div>
    </footer>
  );
}

export function catName(id: string, tr: (v: [string, string, string]) => string) {
  const c = catById.get(id);
  return c ? tr(c.n) : '';
}
