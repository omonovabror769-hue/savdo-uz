import { useMemo, useState } from 'react';
import { allDict, useI18n } from '../i18n';
import { categories, products } from '../data/catalog';
import { seenTexts, textOverrides } from './content';
import { checkToken, getToken, setToken } from './github';
import { useAdmin } from './AdminProvider';
import { Thumb } from '../components/ui';
import NotFound from '../pages/NotFound';

type Tab = 'start' | 'texts' | 'products' | 'github';

export default function AdminPage() {
  const { isAdmin, draft, dirty, publish, publishing, setEditing } = useAdmin();
  const [tab, setTab] = useState<Tab>(getToken() ? 'start' : 'github');
  if (!isAdmin) return <NotFound />;
  const count =
    Object.keys(draft.texts).length + Object.keys(draft.products).length + draft.newProducts.length +
    Object.keys(draft.cats).length + Object.keys(draft.promos).length + Object.keys(draft.services).length +
    Object.keys(draft.slides).length + (Object.keys(draft.logo).length ? 1 : 0);

  return (
    <div className="container page admin-page" data-admin-ui>
      <h1 className="page-title">Admin panel</h1>
      <div className="tabs">
        {([['start', 'Boshlash'], ['texts', 'Matnlar'], ['products', 'Tovarlar'], ['github', 'GitHub ulash']] as [Tab, string][]).map(([k, l]) => (
          <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'start' && (
        <div className="admin-start">
          <div className="calc-sum">
            <div className="stat"><b>{count}</b><span>Saytdagi o'zgarishlar soni</span></div>
            <div className="stat"><b>{dirty ? 'Bor' : "Yo'q"}</b><span>Nashr qilinmagan o'zgarishlar</span></div>
            <div className="stat"><b>{getToken() ? 'Ulangan' : 'Ulanmagan'}</b><span>GitHub</span></div>
          </div>
          <ol className="steps">
            <li>Pastdagi <b>✏️ Tahrirlash</b> tugmasini yoqing.</li>
            <li>Saytdagi istalgan matn, tovar, kategoriya, aksiya, banner yoki logotipni bosing — tahrirlash oynasi ochiladi.</li>
            <li>O'zbekcha matnni yozing — ruscha va inglizcha avtomatik tarjima qilinadi. Rasm yuklash mumkin.</li>
            <li><b>Saqlash</b> — o'zgarish faqat sizga ko'rinadi. Hammaga ko'rsatish uchun <b>🚀 Nashr qilish</b> ni bosing (1–2 daqiqada saytda chiqadi).</li>
          </ol>
          <div className="row-gap left">
            <button className="btn btn-brand" onClick={() => { setEditing(true); location.hash = '#/'; }}>✏️ Tahrirlashni boshlash</button>
            {dirty && <button className="btn btn-ghost" onClick={publish} disabled={publishing}>{publishing ? 'Yuklanmoqda…' : '🚀 Nashr qilish'}</button>}
          </div>
        </div>
      )}
      {tab === 'texts' && <TextsTab />}
      {tab === 'products' && <ProductsTab />}
      {tab === 'github' && <GithubTab />}
    </div>
  );
}

function TextsTab() {
  const { open, version } = useAdmin();
  const { lang } = useI18n();
  const i = lang === 'uz' ? 0 : lang === 'ru' ? 1 : 2;
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const all = new Map<string, [string, string, string]>();
    Object.entries(allDict).forEach(([k, v]) => all.set('t.' + k, v));
    seenTexts.forEach((v, k) => !all.has(k) && v[0] && all.set(k, v));
    const t = q.trim().toLowerCase();
    return [...all.entries()]
      .map(([k, v]) => ({ k, v: textOverrides.get(k) || v, edited: textOverrides.has(k) }))
      .filter((r) => !t || r.v.join(' ').toLowerCase().includes(t))
      .slice(0, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, version]);
  return (
    <div>
      <input className="input wide" placeholder="Matn qidirish (o'zbekcha, ruscha yoki inglizcha)…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
      <p className="muted tiny">Ko'rsatilmoqda: {rows.length} ta. Ro'yxatda sayt menyusi, tugmalar va siz ochgan sahifalardagi matnlar bor.</p>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>🇺🇿 UZ</th><th>🇷🇺 RU</th><th>🇬🇧 EN</th><th /></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k} className={r.edited ? 'edited' : ''}>
                <td>{r.v[0]}</td><td>{r.v[1]}</td><td>{r.v[2]}</td>
                <td><button className="btn btn-ghost sm" onClick={() => { if (!seenTexts.has(r.k)) seenTexts.set(r.k, allDict[r.k.slice(2)]); open({ type: 'text', key: r.k }); }}>Tahrirlash</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted tiny">Joriy til: {['UZ', 'RU', 'EN'][i]}</p>
    </div>
  );
}

function ProductsTab() {
  const { open, version } = useAdmin();
  const { tr, money } = useI18n();
  const [q, setQ] = useState('');
  const [sub, setSub] = useState(categories[0].subs[0].id);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products
      .filter((p) => !t || (p.n.join(' ') + ' ' + p.brand + ' ' + p.spec + ' ' + p.sku).toLowerCase().includes(t))
      .slice(0, 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, version]);
  return (
    <div>
      <div className="card admin-new">
        <b>Yangi tovar qo'shish</b>
        <select value={sub} onChange={(e) => setSub(e.target.value)}>
          {categories.map((c) => (
            <optgroup key={c.id} label={tr(c.n)}>
              {c.subs.map((s) => <option key={s.id} value={s.id}>{tr(s.n)}</option>)}
            </optgroup>
          ))}
        </select>
        <button className="btn btn-brand" onClick={() => open({ type: 'new', subId: sub })}>+ Qo'shish</button>
      </div>
      <input className="input wide" placeholder="Tovar nomi, brend yoki kod bo'yicha qidirish…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="admin-plist">
        {list.map((p) => (
          <button key={p.id} className={'admin-prow' + (p.hidden ? ' is-hidden' : '')} onClick={() => open({ type: 'product', id: p.id })}>
            <Thumb emoji={p.emoji} catId={p.catId} size="sm" img={p.img} />
            <span className="admin-pname">{tr(p.n)} {p.brand} {p.spec}{p.hidden ? ' · yashirilgan' : ''}</span>
            <b>{money(p.price)}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

function GithubTab() {
  const [tok, setTok] = useState(getToken());
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <div className="svc-body">
      <section>
        <h3>Nima uchun kerak?</h3>
        <p className="muted">Sayt GitHub'da turadi. "Nashr qilish" bosilganda o'zgarishlar va rasmlar shu kalit orqali repozitoriyga yoziladi. Kalit faqat shu brauzerda saqlanadi.</p>
        <h3>Kalitni qanday olish (1 marta)</h3>
        <ol className="steps">
          <li>github.com/settings/personal-access-tokens/new sahifasini oching.</li>
          <li><b>Token name:</b> savdo-admin. <b>Expiration:</b> 1 yil (yoki xohlaganingiz).</li>
          <li><b>Repository access:</b> "Only select repositories" → <b>savdo-uz</b>.</li>
          <li><b>Permissions → Repository permissions → Contents:</b> "Read and write".</li>
          <li><b>Generate token</b> ni bosing, chiqqan kalitni nusxalab, shu yerga qo'ying.</li>
        </ol>
      </section>
      <section className="card">
        <h3>GitHub kaliti</h3>
        <label className="field">
          <span>Token</span>
          <input id="gh-token" type="password" value={tok} onChange={(e) => setTok(e.target.value)} placeholder="github_pat_…" autoComplete="off" />
        </label>
        <div className="row-gap left">
          <button className="btn btn-brand" disabled={busy || !tok.trim()} onClick={async () => {
            setBusy(true);
            const r = await checkToken(tok.trim());
            setBusy(false);
            if (r.ok) { setToken(tok.trim()); setMsg(`✅ Ulandi: ${r.msg}`); } else setMsg(`❌ Xato: ${r.msg}`);
          }}>{busy ? 'Tekshirilmoqda…' : 'Tekshirish va saqlash'}</button>
          {getToken() && <button className="btn btn-ghost" onClick={() => { setToken(''); setTok(''); setMsg("Kalit o'chirildi"); }}>Kalitni o'chirish</button>}
        </div>
        {msg && <p className="small">{msg}</p>}
        <p className="muted tiny">Kalitni hech kimga bermang. Yo'qotsangiz yoki shubha bo'lsa, GitHub'da o'chirib, yangisini yarating.</p>
      </section>
    </div>
  );
}
