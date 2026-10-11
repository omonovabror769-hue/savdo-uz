import { useMemo, type ReactNode } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useStore } from '../store';
import { products } from '../data/catalog';
import { cities, promos } from '../data/content';
import { stores, storeFeatures } from '../data/stores';
import type { L3 } from '../data/types';
import { Crumbs } from '../components/ui';
import { ProductCard } from '../components/Product';
import RequestForm, { commentField, nameField, phoneField } from '../components/RequestForm';
import { GoogleG, IconCheck, IconPin } from '../components/Icons';
import { PromoCard } from './Promos';
import NotFound from './NotFound';

const infoNav: { to: string; n: L3 }[] = [
  { to: '/about', n: ['Kompaniya haqida', 'О компании', 'About us'] },
  { to: '/stores', n: ["Do'konlar", 'Магазины', 'Stores'] },
  { to: '/delivery', n: ['Yetkazib berish', 'Доставка', 'Delivery'] },
  { to: '/payment', n: ["To'lov usullari", 'Способы оплаты', 'Payment methods'] },
  { to: '/returns', n: ['Tovarni qaytarish', 'Возврат товара', 'Returns'] },
  { to: '/club', n: ["Do'stlar klubi", 'Клуб друзей', 'Friends club'] },
  { to: '/b2b', n: ['Biznes uchun', 'Для бизнеса', 'For business'] },
  { to: '/feedback', n: ['Qayta aloqa', 'Обратная связь', 'Feedback'] },
];

function InfoShell({ title, children }: { title: string; children: ReactNode }) {
  const { tr } = useI18n();
  return (
    <div className="container page">
      <div className="with-side">
        <aside className="acc-side">
          {infoNav.map((x) => <NavLink key={x.to} to={x.to}>{tr(x.n)}</NavLink>)}
        </aside>
        <div className="minw0">
          <Crumbs items={[{ label: title }]} />
          <h1 className="page-title">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Aksiya sahifasi ---------------- */
export function PromoPage() {
  const { id = '' } = useParams();
  const { tr, t } = useI18n();
  const { user, login, club, joinClub, showToast } = useStore();
  const p = promos.find((x) => x.id === id);
  const items = useMemo(() => {
    if (!p) return [];
    if (p.tag === 'electric') return products.filter((x) => x.catId === 'electric' && (x.oldPrice || x.hit)).slice(0, 10);
    if (p.tag === 'new') return products.filter((x) => x.catId === 'finish').slice(0, 10);
    if (p.tag === 'deal' || p.tag === 'sale' || p.tag === 'club') return products.filter((x) => x.oldPrice).slice(0, 10);
    return products.filter((x) => x.hit).slice(0, 10);
  }, [p]);
  if (!p) return <NotFound />;
  const rules: L3[] = [
    ["Aksiya savdo.uz saytida va barcha do'konlarda amal qiladi.", 'Акция действует на сайте savdo.uz и во всех магазинах.', 'Valid on savdo.uz and in all stores.'],
    ["Ballar xariddan keyin 14 kun ichida hisobingizga tushadi.", 'Баллы начисляются в течение 14 дней после покупки.', 'Points are credited within 14 days of purchase.'],
    ["Boshqa aksiyalar bilan birlashtirilmaydi.", 'Не суммируется с другими акциями.', 'Cannot be combined with other offers.'],
    ["Faqat jismoniy shaxslar uchun.", 'Только для физических лиц.', 'For individuals only.'],
  ];
  const others = promos.filter((x) => x.id !== p.id).slice(0, 3);
  return (
    <div className="container page">
      <Crumbs items={[{ to: '/promos', label: t('promosTitle') }, { label: tr(p.title) }]} />
      <div className="promo-hero" style={{ background: p.bg, color: p.fg }}>
        <div>
          <span className="promo-hero-dates">{tr(p.dates)}</span>
          <h1>{tr(p.title)}</h1>
          <p>{tr(p.text)}</p>
        </div>
        <span className="promo-hero-art" aria-hidden="true">{p.emoji}</span>
      </div>
      <div className="promo-body">
        <section>
          <h3>{tr(['Aksiya shartlari', 'Условия акции', 'Terms'])}</h3>
          <ul className="checks">{rules.map((r, i) => <li key={i}><IconCheck size={16} /> {tr(r)}</li>)}</ul>
        </section>
        <aside className="card">
          {p.tag === 'club' || p.tag === 'points' ? (
            club ? (
              <p className="ok-line"><IconCheck size={18} /> {tr(["Siz Do'stlar klubi a'zosisiz — aksiya avtomatik qo'llanadi.", 'Вы участник Клуба друзей — акция применится автоматически.', 'You are a Friends club member; the offer applies automatically.'])}</p>
            ) : (
              <>
                <p>{tr(["Ishtirok etish uchun Do'stlar klubiga qo'shiling.", 'Чтобы участвовать, вступите в Клуб друзей.', 'Join the Friends club to take part.'])}</p>
                <button className="btn btn-brand wide" onClick={() => (user ? (joinClub(), showToast(tr(["Klubga qo'shildingiz", 'Вы вступили в клуб', 'You joined the club']))) : login())}>
                  {user ? tr(["Klubga qo'shilish", 'Вступить в клуб', 'Join the club']) : <><GoogleG size={16} /> {t('withGoogle')}</>}
                </button>
              </>
            )
          ) : (
            <>
              <p>{tr(["Aksiyadagi tovarlarni savatga qo'shing — chegirma avtomatik hisoblanadi.", 'Добавьте товары акции в корзину — скидка применится автоматически.', 'Add offer products to the cart; the discount applies automatically.'])}</p>
              <Link to={p.link || '/sale'} className="btn btn-brand wide">{tr(["Tovarlarni ko'rish", 'Смотреть товары', 'View products'])}</Link>
            </>
          )}
        </aside>
      </div>
      {items.length > 0 && (
        <section className="block">
          <h2 className="h2">{tr(['Aksiyadagi tovarlar', 'Товары по акции', 'Products on offer'])}</h2>
          <div className="pgrid pgrid-5">{items.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}
      <section className="block">
        <h2 className="h2">{tr(['Boshqa aksiyalar', 'Другие акции', 'Other promotions'])}</h2>
        <div className="promo-grid">{others.map((x) => <PromoCard key={x.id} p={x} />)}</div>
      </section>
    </div>
  );
}

/* ---------------- Do'konlar ---------------- */
export function Stores() {
  const { tr } = useI18n();
  const { profile, setProfile } = useStore();
  const list = stores.filter((s) => s.city === profile.city);
  return (
    <InfoShell title={tr(["Do'konlar", 'Магазины', 'Stores'])}>
      <div className="chips-row">
        {cities.map((c, i) => (
          <button key={i} className={'chip' + (i === profile.city ? ' on' : '')} onClick={() => setProfile({ city: i })}>
            {tr(c)} <span className="cnt">{stores.filter((s) => s.city === i).length}</span>
          </button>
        ))}
      </div>
      <div className="stores-list">
        {list.map((s) => (
          <div key={s.id} className="store card">
            <div className="store-main">
              <h3>{tr(s.name)}</h3>
              <p className="store-addr"><IconPin size={15} /> {tr(s.address)}</p>
              <p className="muted small">{tr(['Ish vaqti', 'Режим работы', 'Hours'])}: <b>{s.hours}</b> · {s.phone}</p>
              <div className="chips-row tight">
                {s.features.map((f) => <span key={f} className="tag">{tr(storeFeatures[f])}</span>)}
              </div>
            </div>
            <a className="btn btn-ghost" href={`https://yandex.uz/maps/?text=${encodeURIComponent(s.address[1])}`} target="_blank" rel="noopener noreferrer">
              {tr(["Xaritada ko'rish", 'На карте', 'View on map'])}
            </a>
          </div>
        ))}
      </div>
    </InfoShell>
  );
}

/* ---------------- Do'stlar klubi ---------------- */
export function Club() {
  const { tr, t, money } = useI18n();
  const { user, login, club, joinClub, orders, showToast } = useStore();
  const spent = orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const levels: { n: L3; from: number; pct: number }[] = [
    { n: ['Bronza', 'Бронза', 'Bronze'], from: 0, pct: 2 },
    { n: ['Kumush', 'Серебро', 'Silver'], from: 10000000, pct: 3 },
    { n: ['Oltin', 'Золото', 'Gold'], from: 50000000, pct: 5 },
  ];
  const lvl = [...levels].reverse().find((l) => spent >= l.from)!;
  const perks: L3[] = [
    ["Har bir xariddan 2–5% ball qaytadi", 'Возврат 2–5% баллами с каждой покупки', '2–5% back in points on every purchase'],
    ["Klub a'zolari uchun do'stona narxlar", 'Дружеские цены для участников клуба', 'Friendly prices for members'],
    ["Tug'ilgan kuningizda 500 ball sovg'a", '500 баллов в подарок на день рождения', '500 bonus points on your birthday'],
    ['Yopiq sotuvlarga erta kirish', 'Ранний доступ к закрытым распродажам', 'Early access to private sales'],
  ];
  return (
    <InfoShell title={tr(["Do'stlar klubi", 'Клуб друзей', 'Friends club'])}>
      <div className="club-grid">
        <div className="club-card">
          <span className="logo-word sm">SAVDO</span>
          {club && user ? (
            <>
              <b>{user.name}</b>
              <span>{tr(lvl.n)} · {lvl.pct}%</span>
              <span className="club-pts">{money(Math.round(spent * (lvl.pct / 100))).replace(/ \S+$/, '')} {tr(['ball', 'баллов', 'points'])}</span>
            </>
          ) : (
            <span>{tr(["Do'stlar klubi kartasi", 'Карта Клуба друзей', 'Friends club card'])}</span>
          )}
        </div>
        <div>
          <ul className="checks">{perks.map((p, i) => <li key={i}><IconCheck size={16} /> {tr(p)}</li>)}</ul>
          {!club && (
            <button className="btn btn-brand" onClick={() => (user ? (joinClub(), showToast(tr(["Klubga qo'shildingiz", 'Вы вступили в клуб', 'You joined the club']))) : login())}>
              {user ? tr(["Klubga bepul qo'shilish", 'Вступить бесплатно', 'Join for free']) : <><GoogleG size={16} /> {t('withGoogle')}</>}
            </button>
          )}
        </div>
      </div>
      <h3>{tr(['Darajalar', 'Уровни', 'Levels'])}</h3>
      <div className="calc-sum">
        {levels.map((l, i) => (
          <div key={i} className={'stat' + (club && l === lvl ? ' stat-on' : '')}>
            <b>{l.pct}%</b>
            <span>{tr(l.n)} — {l.from ? `${t('from')} ${money(l.from)}` : tr(['boshlang‘ich', 'стартовый', 'starter'])}</span>
          </div>
        ))}
      </div>
    </InfoShell>
  );
}

/* ---------------- B2B ---------------- */
export function B2B() {
  const { tr } = useI18n();
  const perks: L3[] = [
    ["Shaxsiy menejer va maxsus narxlar", 'Персональный менеджер и специальные цены', 'Personal manager and special prices'],
    ["Pul o'tkazmasi orqali to'lov, hisob-faktura va ishonchnoma", 'Оплата по безналу, счёт-фактура и доверенность', 'Bank transfer, invoices and power of attorney'],
    ["Ob'ektga yetkazib berish, manipulyator bilan tushirish", 'Доставка на объект, разгрузка манипулятором', 'Delivery to site with crane unloading'],
    ["30 kungacha kechiktirilgan to'lov", 'Отсрочка платежа до 30 дней', 'Payment deferral up to 30 days'],
  ];
  return (
    <InfoShell title={tr(['Biznes uchun', 'Для бизнеса', 'For business'])}>
      <div className="svc-body">
        <section>
          <p className="lead">{tr(["Qurilish kompaniyalari, pudratchilar va ustalar uchun.", 'Для строительных компаний, подрядчиков и мастеров.', 'For construction companies, contractors and tradespeople.'])}</p>
          <ul className="checks">{perks.map((p, i) => <li key={i}><IconCheck size={16} /> {tr(p)}</li>)}</ul>
        </section>
        <section className="card">
          <h3>{tr(['Hamkorlik arizasi', 'Заявка на сотрудничество', 'Partnership request'])}</h3>
          <RequestForm
            kind="b2b"
            title={tr(['Biznes uchun ariza', 'Заявка B2B', 'Business request'])}
            fields={[
              { id: 'company', label: ['Kompaniya nomi', 'Название компании', 'Company name'], required: true },
              { id: 'inn', label: ['STIR (INN)', 'ИНН', 'Tax ID (INN)'], type: 'number' },
              nameField,
              phoneField,
              { id: 'volume', label: ['Oylik xarid hajmi', 'Объём закупок в месяц', 'Monthly volume'], type: 'select', options: [["50 mln so'mgacha", 'до 50 млн сум', 'up to 50M UZS'], ["50–200 mln so'm", '50–200 млн сум', '50–200M UZS'], ["200 mln so'mdan ortiq", 'более 200 млн сум', 'over 200M UZS']] },
              commentField,
            ]}
          />
        </section>
      </div>
    </InfoShell>
  );
}

/* ---------------- Qaytarish ---------------- */
export function Returns() {
  const { tr } = useI18n();
  const { orders } = useStore();
  const rules: L3[] = [
    ["Sifatli tovarni 365 kun ichida qaytarish mumkin, agar qadog'i va tovar ko'rinishi saqlangan bo'lsa.", 'Товар надлежащего качества можно вернуть в течение 365 дней при сохранении упаковки и товарного вида.', 'Products in good condition can be returned within 365 days if packaging is intact.'],
    ["Kolerlangan bo'yoq, o'lcham bo'yicha kesilgan materiallar qaytarilmaydi.", 'Колерованные краски и материалы, нарезанные по размеру, возврату не подлежат.', 'Tinted paint and cut-to-size materials cannot be returned.'],
    ["Pul 3 ish kunida karta yoki naqd shaklida qaytariladi.", 'Деньги возвращаются в течение 3 рабочих дней на карту или наличными.', 'Money is refunded within 3 business days to card or in cash.'],
  ];
  return (
    <InfoShell title={tr(['Tovarni qaytarish', 'Возврат товара', 'Returns'])}>
      <div className="svc-body">
        <section>
          <ul className="checks">{rules.map((r, i) => <li key={i}><IconCheck size={16} /> {tr(r)}</li>)}</ul>
        </section>
        <section className="card">
          <h3>{tr(['Qaytarish arizasi', 'Заявление на возврат', 'Return request'])}</h3>
          <RequestForm
            kind="return"
            title={tr(['Tovarni qaytarish', 'Возврат товара', 'Product return'])}
            initial={orders[0] ? { order: orders[0].no } : undefined}
            fields={[
              { id: 'order', label: ['Buyurtma raqami', 'Номер заказа', 'Order number'], required: true },
              { id: 'product', label: ['Tovar nomi yoki kodi', 'Название или код товара', 'Product name or code'], required: true },
              { id: 'reason', label: ['Sabab', 'Причина', 'Reason'], type: 'select', options: [["To'g'ri kelmadi", 'Не подошёл', 'Did not fit'], ['Nuqsonli', 'Брак', 'Defective'], ['Ortiqcha qoldi', 'Остался лишний', 'Leftover'], ['Boshqa', 'Другое', 'Other']] },
              nameField,
              phoneField,
              commentField,
            ]}
          />
        </section>
      </div>
    </InfoShell>
  );
}

/* ---------------- To'lov usullari ---------------- */
export function Payment() {
  const { tr } = useI18n();
  const methods: { e: string; n: L3; d: L3 }[] = [
    { e: '💳', n: ['Uzcard va Humo kartalari', 'Карты Uzcard и Humo', 'Uzcard and Humo cards'], d: ["Saytda yoki kuryerga terminal orqali.", 'На сайте или курьеру через терминал.', 'Online or via the courier terminal.'] },
    { e: '🌐', n: ['Visa / Mastercard', 'Visa / Mastercard', 'Visa / Mastercard'], d: ["Xalqaro kartalar bilan onlayn to'lov.", 'Онлайн-оплата международными картами.', 'Online payment with international cards.'] },
    { e: '📱', n: ['Click, Payme, Uzum', 'Click, Payme, Uzum', 'Click, Payme, Uzum'], d: ["Ilova orqali QR-kod bilan to'lash.", 'Оплата по QR-коду через приложение.', 'Pay by QR code in the app.'] },
    { e: '🗓️', n: ["Bo'lib to'lash", 'Рассрочка', 'Instalments'], d: ["3, 6 yoki 12 oyga, ustamasiz variantlar mavjud.", 'На 3, 6 или 12 месяцев, есть варианты без переплаты.', '3, 6 or 12 months, interest-free options available.'] },
    { e: '💵', n: ['Naqd pul', 'Наличные', 'Cash'], d: ["Do'konda yoki tovarni qabul qilganda.", 'В магазине или при получении.', 'In store or on delivery.'] },
    { e: '🏦', n: ["Bank o'tkazmasi", 'Безналичный расчёт', 'Bank transfer'], d: ["Yuridik shaxslar uchun hisob-faktura bilan.", 'Для юрлиц со счётом-фактурой.', 'For companies, with an invoice.'] },
  ];
  return (
    <InfoShell title={tr(["To'lov usullari", 'Способы оплаты', 'Payment methods'])}>
      <div className="pay-grid">
        {methods.map((m, i) => (
          <div key={i} className="card pay-card">
            <span className="pay-ic">{m.e}</span>
            <b>{tr(m.n)}</b>
            <span className="muted small">{tr(m.d)}</span>
          </div>
        ))}
      </div>
    </InfoShell>
  );
}

/* ---------------- Kompaniya haqida ---------------- */
export function About() {
  const { tr } = useI18n();
  const nums: [string, L3][] = [
    ['11', ["do'kon 8 ta shaharda", 'магазинов в 8 городах', 'stores in 8 cities']],
    ['820+', ['tovar katalogda', 'товаров в каталоге', 'products in catalog']],
    ['2 soat', ['Toshkentda yetkazish', 'доставка по Ташкенту', 'delivery in Tashkent']],
    ['365', ['kun qaytarish muddati', 'дней на возврат', 'days to return']],
  ];
  return (
    <InfoShell title={tr(['Kompaniya haqida', 'О компании', 'About us'])}>
      <p className="lead">{tr([
        "savdo.uz — qurilish, ta'mir va uy uchun tovarlar marketpleysi. Biz g'ishtdan tortib smesitelgacha hamma narsani bir joyda jamladik va O'zbekiston bo'ylab yetkazib beramiz.",
        'savdo.uz — маркетплейс товаров для стройки, ремонта и дома. Мы собрали в одном месте всё — от кирпича до смесителя — и доставляем по всему Узбекистану.',
        'savdo.uz is a marketplace for building, renovation and home goods. Everything from bricks to mixers in one place, delivered across Uzbekistan.',
      ])}</p>
      <div className="calc-sum four">
        {nums.map(([n, l], i) => <div key={i} className="stat"><b>{n}</b><span>{tr(l)}</span></div>)}
      </div>
    </InfoShell>
  );
}

/* ---------------- Qayta aloqa ---------------- */
export function Feedback() {
  const { tr } = useI18n();
  return (
    <InfoShell title={tr(['Qayta aloqa', 'Обратная связь', 'Feedback'])}>
      <p className="lead">{tr(["Saytni yaxshilash bo'yicha taklif, xato yoki shikoyatingizni yozing. Har bir xabarni o'qiymiz.", 'Напишите предложение по улучшению, ошибку или жалобу. Мы читаем каждое сообщение.', 'Send us a suggestion, bug report or complaint. We read every message.'])}</p>
      <div className="card narrow-card">
        <RequestForm
          kind="feedback"
          title={tr(['Qayta aloqa', 'Обратная связь', 'Feedback'])}
          submitLabel={tr(['Yuborish', 'Отправить', 'Send'])}
          fields={[
            { id: 'type', label: ['Mavzu', 'Тема', 'Topic'], type: 'select', options: [['Taklif', 'Предложение', 'Suggestion'], ['Saytda xato', 'Ошибка на сайте', 'Website bug'], ['Shikoyat', 'Жалоба', 'Complaint'], ['Minnatdorchilik', 'Благодарность', 'Thanks']] },
            nameField,
            { ...phoneField, required: false },
            { ...commentField, label: ['Xabar', 'Сообщение', 'Message'], required: true },
          ]}
        />
      </div>
    </InfoShell>
  );
}
