import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useStore, type Order } from '../store';
import { productById } from '../data/catalog';
import { Modal, Thumb } from '../components/ui';
import { Qty, fullName } from '../components/Product';
import { IconTrash, GoogleG, IconCheck } from '../components/Icons';

const FREE_FROM = 3000000;
const COURIER = 49000;

export default function Cart() {
  const { t, tr, money, unit } = useI18n();
  const { cart, setQty, removeFromCart, clearCart, cartTotal, user, login } = useStore();
  const [checkout, setCheckout] = useState(false);
  const [done, setDone] = useState<Order | null>(null);
  const nav = useNavigate();
  const oldSum = cart.reduce((s, l) => {
    const p = productById.get(l.id)!;
    return s + (p.oldPrice || p.price) * l.qty;
  }, 0);

  if (done) {
    return (
      <div className="container page narrow">
        <div className="done">
          <div className="done-ic"><IconCheck size={36} /></div>
          <h1>{t('orderPlaced')}</h1>
          <p className="big">{t('orderNo')}{done.no}</p>
          <p>{t('total')}: <b>{money(done.total)}</b></p>
          <div className="row-gap">
            <Link to="/account" className="btn btn-brand">{t('myOrders')}</Link>
            <Link to="/" className="btn btn-ghost">{t('toHome')}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <button className="link-btn back" onClick={() => nav(-1)}>← {t('back')}</button>
      <h1 className="page-title">{t('cart')}</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <b>{t('cartEmpty')}</b>
          <p className="muted">{t('cartEmptyHint')}</p>
          <Link to="/catalog/stroy" className="btn btn-brand">{t('goCatalog')}</Link>
        </div>
      ) : (
        <div className="cart">
          <div className="cart-lines">
            {cart.map((l) => {
              const p = productById.get(l.id)!;
              return (
                <div key={l.id} className="cline">
                  <Link to={`/product/${p.id}`}><Thumb emoji={p.emoji} catId={p.catId} size="sm" img={p.img} /></Link>
                  <div className="cline-main">
                    <Link to={`/product/${p.id}`} className="pname">{fullName(p, tr)}</Link>
                    <span className="muted small">{t('sku')}: {p.sku} · {money(p.price)} / {unit(p.unit)}</span>
                  </div>
                  <Qty value={l.qty} onChange={(n) => setQty(l.id, n)} min={1} />
                  <b className="cline-sum">{money(p.price * l.qty)}</b>
                  <button className="icon-btn" onClick={() => removeFromCart(l.id)} aria-label={t('remove')}><IconTrash size={18} /></button>
                </div>
              );
            })}
            <button className="link-btn small" onClick={clearCart}><IconTrash size={14} /> {t('clearCart')}</button>
          </div>
          <aside className="summary">
            <div className="srow"><span>{t('goodsSum')} ({cart.reduce((s, l) => s + l.qty, 0)})</span><span>{money(oldSum)}</span></div>
            {oldSum > cartTotal && <div className="srow red"><span>{t('discount')}</span><span>−{money(oldSum - cartTotal)}</span></div>}
            <div className="srow"><span>{t('deliveryCost')}</span><span>{cartTotal >= FREE_FROM ? t('free') : `${t('from')} ${money(COURIER)}`}</span></div>
            <div className="srow total"><span>{t('total')}</span><b>{money(cartTotal)}</b></div>
            <p className="muted small">+{money(Math.round(cartTotal * 0.02))} {tr(['ball', 'баллов', 'points'])}</p>
            {user ? (
              <button className="btn btn-brand wide" onClick={() => setCheckout(true)}>{t('checkout')}</button>
            ) : (
              <>
                <p className="small">{t('loginToOrder')}</p>
                <button className="gbtn wide" onClick={login}><GoogleG /> <span>{t('withGoogle')}</span></button>
              </>
            )}
          </aside>
        </div>
      )}
      {checkout && <Checkout onClose={() => setCheckout(false)} onDone={(o) => { setCheckout(false); setDone(o); }} />}
    </div>
  );
}

function Checkout({ onClose, onDone }: { onClose: () => void; onDone: (o: Order) => void }) {
  const { t, money } = useI18n();
  const { placeOrder, cartTotal, user, profile, setProfile } = useStore();
  const [delivery, setDelivery] = useState<'courier' | 'pickup'>('courier');
  const [pay, setPay] = useState<'cash' | 'card'>('card');
  const [address, setAddress] = useState(profile.address);
  const [phone, setPhone] = useState(profile.phone || '+998 ');
  const [err, setErr] = useState('');
  const fee = delivery === 'courier' && cartTotal < FREE_FROM ? COURIER : 0;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 12) return setErr(t('phone') + ': +998 XX XXX-XX-XX');
    if (delivery === 'courier' && address.trim().length < 5) return setErr(t('address'));
    setProfile({ phone, ...(delivery === 'courier' ? { address } : {}) });
    onDone(placeOrder({ delivery, pay, address: delivery === 'pickup' ? '—' : address, phone }));
  };

  return (
    <Modal onClose={onClose} label={t('checkout')} wide>
      <form className="checkout" onSubmit={submit}>
        <h2>{t('checkout')}</h2>
        <p className="muted small">{t('signedInAs')} <b>{user?.email}</b></p>
        <fieldset>
          <legend>{t('deliveryType')}</legend>
          <div className="seg">
            <label className={delivery === 'courier' ? 'on' : ''}><input type="radio" checked={delivery === 'courier'} onChange={() => setDelivery('courier')} /> 🚚 {t('courier')}</label>
            <label className={delivery === 'pickup' ? 'on' : ''}><input type="radio" checked={delivery === 'pickup'} onChange={() => setDelivery('pickup')} /> 🏬 {t('pickup')}</label>
          </div>
        </fieldset>
        {delivery === 'courier' && (
          <label className="field">
            <span>{t('address')}</span>
            <input id="co-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('addressPh')} />
          </label>
        )}
        <label className="field">
          <span>{t('phone')}</span>
          <input id="co-phone" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" />
        </label>
        <fieldset>
          <legend>{t('payMethod')}</legend>
          <div className="seg">
            <label className={pay === 'card' ? 'on' : ''}><input type="radio" checked={pay === 'card'} onChange={() => setPay('card')} /> 💳 {t('payCard')}</label>
            <label className={pay === 'cash' ? 'on' : ''}><input type="radio" checked={pay === 'cash'} onChange={() => setPay('cash')} /> 💵 {t('payCash')}</label>
          </div>
        </fieldset>
        <div className="srow"><span>{t('goodsSum')}</span><span>{money(cartTotal)}</span></div>
        <div className="srow"><span>{t('deliveryCost')}</span><span>{fee ? money(fee) : t('free')}</span></div>
        <div className="srow total"><span>{t('total')}</span><b>{money(cartTotal + fee)}</b></div>
        {err && <p className="err">{err}</p>}
        <button className="btn btn-brand wide" type="submit">{t('confirm')}</button>
      </form>
    </Modal>
  );
}
