import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { districts } from '../data/content';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { promos, promoTags, trucks, type Promo } from '../data/content';
import { Crumbs } from '../components/ui';

export function PromoCard({ p }: { p: Promo }) {
  const { tr, lang } = useI18n();
  const ad = lang === 'uz' ? 'Reklama' : lang === 'ru' ? 'Реклама' : 'Ad';
  return (
    <Link to={`/promos/${p.id}`} className="promo">
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
  const { profile } = useStore();
  const [addr, setAddr] = useState(profile.address);
  const [dist, setDist] = useState(0);
  const [truck, setTruck] = useState(1);
  const [floor, setFloor] = useState(1);
  const [lift, setLift] = useState(true);
  const [kg, setKg] = useState(50);
  // Yuk og'irligiga mos eng kichik mashinani avtomatik tanlash
  useEffect(() => {
    const i = trucks.findIndex((x) => x.cap >= kg);
    setTruck(i === -1 ? trucks.length - 1 : i);
  }, [kg]);
  const perKm = 3000;
  const extraKm = Math.max(0, districts[dist].km - 10);
  const loads = Math.max(1, Math.ceil(kg / 50));
  const liftCost = floor <= 1 ? 0 : (floor - 1) * loads * (lift ? 5000 : 12000);
  const total = trucks[truck].price + extraKm * perKm + liftCost;
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
          <div className="dcalc card">
            <div className="rform">
              <label className="field full">
                <span>{t('address')}</span>
                <input id="d-addr" placeholder={t('deliveryAddrPh')} value={addr} onChange={(e) => setAddr(e.target.value)} />
              </label>
              <label className="field">
                <span>{tr(['Tuman', 'Район', 'District'])}</span>
                <select id="d-district" value={dist} onChange={(e) => setDist(+e.target.value)}>
                  {districts.map((d, i) => <option key={i} value={i}>{tr(d.n)} — {d.km} km</option>)}
                </select>
              </label>
              <label className="field">
                <span>{tr(['Qavat', 'Этаж', 'Floor'])}</span>
                <div className="num-in"><input id="d-floor" type="number" min={0} max={30} value={floor} onChange={(e) => setFloor(Math.max(0, Math.min(30, parseInt(e.target.value) || 0)))} /></div>
              </label>
              <label className="field">
                <span>{tr(['Yuk og‘irligi', 'Вес груза', 'Load weight'])}</span>
                <div className="num-in"><input id="d-kg" type="number" min={0} step={10} value={kg} onChange={(e) => setKg(Math.max(0, parseInt(e.target.value) || 0))} /><em>kg</em></div>
              </label>
              <label className="chk lift-chk"><input type="checkbox" checked={lift} onChange={(e) => setLift(e.target.checked)} /> {tr(['Lift bor', 'Есть лифт', 'Lift available'])}</label>
            </div>
          </div>
          <div className="trucks">
            {trucks.map((x, i) => (
              <button key={i} className={'truck' + (i === truck ? ' on' : '')} onClick={() => setTruck(i)} aria-pressed={i === truck}>
                <span className="truck-ic">{x.e}</span>
                <b>{tr(x.n)}</b>
                <span className="muted small">{t('from')} {money(x.price)}</span>
              </button>
            ))}
          </div>
          <div className="dres card">
            <div className="srow"><span>{tr(trucks[truck].n)}</span><span>{money(trucks[truck].price)}</span></div>
            <div className="srow"><span>{tr(['Masofa', 'Расстояние', 'Distance'])}: {districts[dist].km} km{extraKm > 0 ? ` (+${extraKm} km × ${money(perKm)})` : ''}</span><span>{money(extraKm * perKm)}</span></div>
            <div className="srow"><span>{tr(["Ko'tarish", 'Подъём', 'Lifting'])}: {Math.max(0, floor - 1)} {tr(['qavat', 'эт.', 'floors'])} × {loads} × {money(lift ? 5000 : 12000)}</span><span>{money(liftCost)}</span></div>
            <div className="srow total"><span>{t('total')}</span><b>{money(total)}</b></div>
            {kg > trucks[truck].cap && <p className="err">{tr(["Yuk bu mashina uchun og'ir — kattaroq mashina tanlang.", 'Груз слишком тяжёлый для этой машины — выберите больше.', 'Too heavy for this vehicle; pick a larger one.'])}</p>}
            <p className="muted small">{tr(["Buyurtma 3 000 000 so'mdan oshsa, kuryer yetkazishi bepul.", 'При заказе от 3 000 000 сум доставка курьером бесплатна.', 'Courier delivery is free for orders over 3 000 000 UZS.'])}</p>
            <Link to="/cart" className="btn btn-brand">{tr(["Savatga o'tish", 'Перейти в корзину', 'Go to cart'])}</Link>
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
            <circle cx="205" cy="212" r="11" fill="var(--brand)" stroke="#ffffff" strokeWidth="3" />
            <text x="205" y="250" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1b1b1b">{tr(['Toshkent', 'Ташкент', 'Tashkent'])}</text>
            <text x="20" y="440" fontSize="12" fill="#555"><tspan fill="#16a34a">●</tspan> {tr(['2 soatda', 'за 2 часа', 'in 2 hours'])}  <tspan fill="#e31e24">●</tspan> {tr(['Bugun', 'Сегодня', 'Same day'])}</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
