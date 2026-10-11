import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { promos, promoTags, trucks, type Promo } from '../data/content';
import { Crumbs } from '../components/ui';

export function PromoCard({ p }: { p: Promo }) {
  const { tr, lang } = useI18n();
  const ad = lang === 'uz' ? 'Reklama' : lang === 'ru' ? 'Реклама' : 'Ad';
  return (
    <Link to={p.link || '/promos'} className="promo">
      <div className="promo-art" style={{ background: p.bg, color: p.fg }}>
        {p.ad && <span className="promo-ad">{ad}</span>}
        <b className="promo-big">{typeof p.big === 'string' ? p.big : tr(p.big)}</b>
        <span className="promo-emoji" aria-hidden="true">{p.emoji}</span>
      </div>
      <span className="promo-dates muted">{tr(p.dates)}</span>
      <b className="promo-title">{tr(p.title)}</b>
      <span className="promo-text muted">{tr(p.text)}</span>
    </Link>
  );
}

export function Promos() {
  const { t, tr } = useI18n();
  const [tag, setTag] = useState<string>('all');
  const list = tag === 'all' ? promos : promos.filter((p) => p.tag === tag);
  return (
    <div className="container page">
      <Crumbs items={[{ label: t('promosTitle') }]} />
      <h1 className="page-title">{t('promosTitle')}</h1>
      <div className="chips-row">
        {promoTags.map((x) => (
          <button key={x.id} className={'chip' + (tag === x.id ? ' on' : '')} onClick={() => setTag(x.id)}>{tr(x.n)}</button>
        ))}
      </div>
      <div className="promo-grid">{list.map((p) => <PromoCard key={p.id} p={p} />)}</div>
    </div>
  );
}

export function Delivery() {
  const { t, tr, money } = useI18n();
  const [tab, setTab] = useState<'d' | 'l'>('d');
  const [addr, setAddr] = useState('');
  const rules: [string, string, string][] = tab === 'd'
    ? [
        ['Uy raqami (korpus, bino)', 'номер дома (корпус, строение)', 'house number (block, building)'],
        ["Uyga kirish xususiyatlari (qaysi ko'chadan, hovli, ruxsatnoma, tushirish joyi)", 'особенности подъезда к дому (с какой улицы, двор, арка, пропуск, место для разгрузки)', 'access details (street, yard, arch, pass, unloading spot)'],
        ['Xonadon raqami, qavat va podyezd kodi', 'номер квартиры, этаж и код парадной', 'apartment number, floor and entrance code'],
        ['Lift borligi', 'наличие лифта', 'whether there is a lift'],
        ['Buyurtmani qabul qiluvchining telefon raqami', 'номер телефона того, кто примет заказ', 'phone number of the person receiving the order'],
      ]
    : [
        ["Tushirish va ko'tarish alohida xizmat sifatida hisoblanadi", 'Разгрузка и подъем — отдельные услуги', 'Unloading and lifting are separate services'],
        ["Lift bo'lsa — har qavat uchun 5 000 so'm", 'При наличии лифта — 5 000 сум за этаж', 'With a lift: 5 000 UZS per floor'],
        ["Liftsiz — har qavat uchun 12 000 so'm (50 kg gacha)", 'Без лифта — 12 000 сум за этаж (до 50 кг)', 'Without a lift: 12 000 UZS per floor (up to 50 kg)'],
        ["Uzun o'lchamli yuklar (3 m dan ortiq) faqat zinapoyadan", 'Длинномеры (более 3 м) — только по лестнице', 'Long items (over 3 m) by stairs only'],
      ];
  return (
    <div className="container page">
      <Crumbs items={[{ label: t('delivery') }]} />
      <div className="delivery">
        <div className="minw0">
          <h1 className="page-title sm">{t('deliveryTitle')}</h1>
          <input id="d-addr" className="input wide" placeholder={t('deliveryAddrPh')} value={addr} onChange={(e) => setAddr(e.target.value)} />
          <div className="trucks">
            {trucks.map((x, i) => (
              <div key={i} className="truck">
                <span className="truck-ic">{x.e}</span>
                <b>{tr(x.n)}</b>
                <span className="muted small">{t('from')} {money(x.price)}</span>
              </div>
            ))}
          </div>
          <div className="tabs">
            <button className={tab === 'd' ? 'on' : ''} onClick={() => setTab('d')}>{t('deliveryRules')}</button>
            <button className={tab === 'l' ? 'on' : ''} onClick={() => setTab('l')}>{t('liftRules')}</button>
          </div>
          <h3>{tr(['Xizmat ko‘rsatish uchun quyidagilarni ko‘rsating:', 'Для оказания услуги просим указать:', 'To provide the service, please specify:'])}</h3>
          <ul className="bullets">{rules.map((r, i) => <li key={i}>{tr(r)}</li>)}</ul>
        </div>
        <div className="map" aria-label="map">
          <svg viewBox="0 0 400 460" role="img">
            <rect width="400" height="460" fill="var(--map-bg)" />
            <path d="M0 300 C80 280 120 330 200 310 S330 260 400 290" stroke="var(--map-water)" strokeWidth="14" fill="none" />
            <path d="M60 0 L120 460 M0 160 L400 120 M250 0 L300 460 M0 400 L400 360" stroke="var(--map-road)" strokeWidth="5" />
            <path d="M200 70 L300 110 L330 210 L290 310 L190 340 L100 300 L80 190 L120 110 Z" fill="var(--zone1)" stroke="var(--zone1s)" strokeWidth="2" />
            <path d="M200 140 L260 160 L275 220 L245 270 L185 285 L140 255 L135 190 L160 150 Z" fill="var(--zone2)" stroke="var(--zone2s)" strokeWidth="2" />
            <circle cx="205" cy="212" r="11" fill="var(--yellow)" stroke="#1b1b1b" strokeWidth="3" />
            <text x="205" y="250" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1b1b1b">{tr(['Toshkent', 'Ташкент', 'Tashkent'])}</text>
            <text x="20" y="440" fontSize="12" fill="#555">● {tr(['2 soatda', 'за 2 часа', 'in 2 hours'])}   ● {tr(['Bugun', 'Сегодня', 'Same day'])}</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
