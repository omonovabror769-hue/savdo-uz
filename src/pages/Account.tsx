import { Link, NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useStore } from '../store';
import { productById, subById } from '../data/catalog';
import { ProductCard, fullName } from '../components/Product';
import { Thumb } from '../components/ui';
import { GoogleG, IconTrash } from '../components/Icons';
import { isDemo } from '../store/auth';
import { useState, type FormEvent, type ReactNode } from 'react';
import { cities } from '../data/content';

function AccountShell({ children, title }: { children: ReactNode; title: string }) {
  const { t, tr } = useI18n();
  const { user, logout } = useStore();
  return (
    <div className="container page">
      <div className="with-side">
        <aside className="acc-side">
          <NavLink to="/account" end>{t('personal')}</NavLink>
          <h5>{t('goodsH')}</h5>
          <NavLink to="/account/orders">{t('orders')}</NavLink>
          <NavLink to="/account/requests">{tr(['Arizalarim', 'Мои заявки', 'My requests'])}</NavLink>
          <NavLink to="/favorites">{t('favorites')}</NavLink>
          <NavLink to="/compare">{t('compare')}</NavLink>
          <h5>{t('privileges')}</h5>
          <NavLink to="/account/points">{t('points')}</NavLink>
          <NavLink to="/promos">{t('promos')}</NavLink>
          {user && <button className="link-btn danger" onClick={logout}>{t('logout')}</button>}
        </aside>
        <div className="minw0">
          <h1 className="page-title sm">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

function NeedLogin() {
  const { t } = useI18n();
  const { login } = useStore();
  return (
    <div className="cart-empty">
      <b>{t('loginTitle')}</b>
      <p className="muted">{t('loginSub')}</p>
      <button className="gbtn" onClick={login}><GoogleG /> <span>{t('withGoogle')}</span></button>
    </div>
  );
}

export function Account() {
  const { t } = useI18n();
  const { user, orders, favs } = useStore();
  return (
    <AccountShell title={t('profile')}>
      {!user ? <NeedLogin /> : (
        <div className="acc">
          <div className="acc-card">
            {user.picture ? <img src={user.picture} alt="" className="avatar-lg" referrerPolicy="no-referrer" /> : <span className="avatar-lg ph">{user.name[0]}</span>}
            <div>
              <p className="muted small">{t('welcome')}</p>
              <h2>{user.name}</h2>
              <p className="muted">{user.email}</p>
              <span className="pill"><GoogleG size={14} /> {t('googleAcc')}{isDemo ? ' · demo' : ''}</span>
            </div>
          </div>
          <div className="acc-stats">
            <Link to="/account/orders" className="stat"><b>{orders.length}</b><span>{t('orders')}</span></Link>
            <Link to="/favorites" className="stat"><b>{favs.length}</b><span>{t('favorites')}</span></Link>
            <Link to="/account/points" className="stat"><b>{Math.round(orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0) * 0.02)}</b><span>{t('balance')}</span></Link>
          </div>
          <ProfileForm />
        </div>
      )}
    </AccountShell>
  );
}

export function Orders() {
  const { t, money, tr } = useI18n();
  const { user, orders, cancelOrder, repeatOrder, showToast } = useStore();
  const dfmt = (s: string) => new Date(s).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' });
  return (
    <AccountShell title={t('myOrders')}>
      {!user ? <NeedLogin /> : orders.length === 0 ? (
        <div className="empty-box">{t('noOrders')}</div>
      ) : (
        <div className="orders">
          {orders.map((o) => (
            <div key={o.no} className="order">
              <div className="order-head">
                <b>{t('orderNo')}{o.no}</b>
                <span className="muted">{dfmt(o.date)}</span>
                {o.status === 'cancelled'
                  ? <span className="pill grey">{tr(['Bekor qilingan', 'Отменён', 'Cancelled'])}</span>
                  : <span className="pill green">{t('statusNew')}</span>}
                <b className="order-sum">{money(o.total)}</b>
              </div>
              <div className="order-actions">
                <button className="btn btn-ghost sm" onClick={() => { repeatOrder(o.no); showToast(t('added')); }}>{tr(['Yana buyurtma qilish', 'Повторить заказ', 'Order again'])}</button>
                {o.status !== 'cancelled' && (
                  <button className="link-btn small danger-l" onClick={() => cancelOrder(o.no)}>{tr(['Buyurtmani bekor qilish', 'Отменить заказ', 'Cancel order'])}</button>
                )}
              </div>
              <div className="order-items">
                {o.lines.map((l) => {
                  const p = productById.get(l.id);
                  if (!p) return null;
                  return (
                    <Link key={l.id} to={`/product/${p.id}`} className="order-item" title={fullName(p, tr)}>
                      <Thumb emoji={p.emoji} catId={p.catId} size="sm" />
                      <span className="small">×{l.qty}</span>
                    </Link>
                  );
                })}
              </div>
              <p className="muted small">{o.delivery === 'courier' ? `${t('courier')}: ${o.address}` : t('pickup')} · {o.phone}</p>
            </div>
          ))}
        </div>
      )}
    </AccountShell>
  );
}

export function Points() {
  const { t, money } = useI18n();
  const { user, orders } = useStore();
  const pts = Math.round(orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0) * 0.02);
  return (
    <AccountShell title={t('points')}>
      {!user ? <NeedLogin /> : (
        <div className="points-card">
          <span className="muted">{t('balance')}</span>
          <b>{money(pts).replace(/ \S+$/, '')}</b>
          <p>{t('pointsInfo')}</p>
        </div>
      )}
    </AccountShell>
  );
}

export function Favorites() {
  const { t } = useI18n();
  const { favs } = useStore();
  const items = favs.map((id) => productById.get(id)).filter(Boolean);
  return (
    <AccountShell title={t('favorites')}>
      {items.length === 0 ? <div className="empty-box">{t('favEmpty')}</div> : (
        <div className="pgrid pgrid-4">{items.map((p) => <ProductCard key={p!.id} p={p!} />)}</div>
      )}
    </AccountShell>
  );
}

export function Compare() {
  const { t, tr, money, unit } = useI18n();
  const { cmp, toggleCmp, clearCmp, ratingOf } = useStore();
  const items = cmp.map((id) => productById.get(id)!).filter(Boolean);
  return (
    <AccountShell title={t('compare')}>
      {items.length === 0 ? <div className="empty-box">{t('cmpEmpty')}</div> : (
        <>
          <div className="cmp-wrap">
            <table className="cmp">
              <thead>
                <tr>
                  <th />
                  {items.map((p) => (
                    <th key={p.id}>
                      <Link to={`/product/${p.id}`}><Thumb emoji={p.emoji} catId={p.catId} size="sm" /></Link>
                      <Link to={`/product/${p.id}`} className="pname">{fullName(p, tr)}</Link>
                      <button className="icon-btn" onClick={() => toggleCmp(p.id)} aria-label={t('remove')}><IconTrash size={16} /></button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr><td>{t('price')}</td>{items.map((p) => <td key={p.id}><b>{money(p.price)}</b> / {unit(p.unit)}</td>)}</tr>
                <tr><td>{t('brand')}</td>{items.map((p) => <td key={p.id}>{p.brand}</td>)}</tr>
                <tr><td>{t('size')}</td>{items.map((p) => <td key={p.id}>{p.spec}</td>)}</tr>
                <tr><td>{t('category')}</td>{items.map((p) => <td key={p.id}>{tr(subById.get(p.subId)!.sub.n)}</td>)}</tr>
                <tr><td>{t('country')}</td>{items.map((p) => <td key={p.id}>{tr(p.country)}</td>)}</tr>
                <tr><td>{t('sortRating')}</td>{items.map((p) => <td key={p.id}>{ratingOf(p.id).count ? `★ ${ratingOf(p.id).avg} (${ratingOf(p.id).count})` : '—'}</td>)}</tr>
                <tr><td>{t('availability')}</td>{items.map((p) => <td key={p.id}>{p.stock > 0 ? `${p.stock} ${unit(p.unit)}` : t('onOrder')}</td>)}</tr>
              </tbody>
            </table>
          </div>
          <button className="link-btn small" onClick={clearCmp}><IconTrash size={14} /> {t('clearCmp')}</button>
        </>
      )}
    </AccountShell>
  );
}

export function Requests() {
  const { tr } = useI18n();
  const { requests, cancelRequest } = useStore();
  const dfmt = (s: string) => new Date(s).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' });
  return (
    <AccountShell title={tr(['Arizalarim', 'Мои заявки', 'My requests'])}>
      {requests.length === 0 ? (
        <div className="empty-box">
          {tr(["Hozircha arizalar yo'q.", 'Заявок пока нет.', 'No requests yet.'])}{' '}
          <Link to="/services" className="link-u">{tr(["Xizmatlarni ko'rish", 'Посмотреть услуги', 'Browse services'])}</Link>
        </div>
      ) : (
        <div className="orders">
          {requests.map((r) => (
            <div key={r.id} className="order">
              <div className="order-head">
                <b>№{r.id} · {r.title}</b>
                <span className="muted">{dfmt(r.date)}</span>
                <span className={'pill ' + (r.status === 'cancelled' ? 'grey' : 'green')}>
                  {r.status === 'cancelled' ? tr(['Bekor qilingan', 'Отменена', 'Cancelled']) : tr(["Ko'rib chiqilmoqda", 'На рассмотрении', 'In review'])}
                </span>
                {r.status !== 'cancelled' && (
                  <button className="link-btn small order-sum" onClick={() => cancelRequest(r.id)}>{tr(['Bekor qilish', 'Отменить', 'Cancel'])}</button>
                )}
              </div>
              <dl className="kv">
                {Object.entries(r.fields).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
          ))}
        </div>
      )}
    </AccountShell>
  );
}

function ProfileForm() {
  const { tr, t } = useI18n();
  const { profile, setProfile, showToast, club } = useStore();
  const [f, setF] = useState(profile);
  const save = (e: FormEvent) => {
    e.preventDefault();
    setProfile(f);
    showToast(tr(["Ma'lumotlar saqlandi", 'Данные сохранены', 'Saved']));
  };
  return (
    <form className="card profile-form" onSubmit={save}>
      <h3>{t('personal')}</h3>
      <div className="rform">
        <label className="field"><span>{t('phone')}</span><input id="pf-phone" type="tel" value={f.phone || '+998 '} onChange={(e) => setF({ ...f, phone: e.target.value })} /></label>
        <label className="field"><span>{tr(["Tug'ilgan sana", 'Дата рождения', 'Date of birth'])}</span><input id="pf-bday" type="date" value={f.birthday} onChange={(e) => setF({ ...f, birthday: e.target.value })} /></label>
        <label className="field"><span>{t('city')}</span>
          <select id="pf-city" value={f.city} onChange={(e) => setF({ ...f, city: +e.target.value })}>
            {cities.map((c, i) => <option key={i} value={i}>{tr(c)}</option>)}
          </select>
        </label>
        <label className="field"><span>{t('address')}</span><input id="pf-address" value={f.address} placeholder={t('addressPh')} onChange={(e) => setF({ ...f, address: e.target.value })} /></label>
        <p className="muted small full">
          {club ? tr(["Siz Do'stlar klubi a'zosisiz.", 'Вы участник Клуба друзей.', 'You are a Friends club member.']) : <Link to="/club" className="link-u">{tr(["Do'stlar klubiga qo'shiling", 'Вступите в Клуб друзей', 'Join the Friends club'])}</Link>}
          {' · '}{tr(["Telefon va manzil buyurtma berishda avtomatik to'ldiriladi.", 'Телефон и адрес подставятся при оформлении заказа.', 'Phone and address are filled in automatically at checkout.'])}
        </p>
        <button className="btn btn-yellow" type="submit">{t('saved')}</button>
      </div>
    </form>
  );
}
