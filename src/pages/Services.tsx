import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useStore } from '../store';
import { services } from '../data/content';
import { serviceInfo } from '../data/serviceInfo';
import { productById, productsOfCat } from '../data/catalog';
import type { L3 } from '../data/types';
import { Crumbs, Pic, Thumb } from '../components/ui';
import { fullName } from '../components/Product';
import RequestForm, { addressField, commentField, dateField, nameField, phoneField } from '../components/RequestForm';
import NotFound from './NotFound';

export function Services() {
  const { t, tr, money } = useI18n();
  return (
    <div className="container page">
      <div className="with-side">
        <aside className="side-nav">
          {services.map((s) => <Link key={s.id} to={`/services/${s.id}`}>{tr(s.n)}</Link>)}
        </aside>
        <div className="minw0">
          <Crumbs items={[{ label: t('servicesTitle') }]} />
          <h1 className="page-title">{t('servicesTitle')}</h1>
          <p className="lead">{t('servicesLead')}</p>
          <div className="svc-grid">
            {services.map((s) => {
              const info = serviceInfo[s.id];
              return (
                <Link key={s.id} to={`/services/${s.id}`} className="svc" data-edit={`service:${s.id}`}>
                  <span className="svc-ic"><Pic img={s.img} e={s.e} /></span>
                  <span>{tr(s.n)}</span>
                  {info?.price ? <small className="muted">{t('from')} {money(info.price)}</small> : info?.kind?.startsWith('calc') ? <small className="muted">{tr(['Onlayn', 'Онлайн', 'Online'])}</small> : null}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const how: L3[] = [
  ['Ariza qoldiring', 'Оставьте заявку', 'Leave a request'],
  ["Menejer 15 daqiqada qo'ng'iroq qilib, narx va vaqtni kelishadi", 'Менеджер за 15 минут перезвонит и согласует цену и время', 'A manager calls back within 15 minutes to agree price and time'],
  ['Mutaxassis kelishilgan vaqtda ishni bajaradi', 'Специалист выполнит работу в согласованное время', 'A specialist does the job at the agreed time'],
  ["Ish qabul qilingach to'lov qilasiz", 'Оплата после приёмки работы', 'You pay after accepting the work'],
];

export function ServicePage() {
  const { id = '' } = useParams();
  const { tr, t, money } = useI18n();
  const s = services.find((x) => x.id === id);
  const info = serviceInfo[id];
  if (!s || !info) return <NotFound />;
  if (info.kind === 'link' && info.to) return <Navigate to={info.to} replace />;

  return (
    <div className="container page">
      <div className="with-side">
        <aside className="side-nav">
          {services.map((x) => <Link key={x.id} to={`/services/${x.id}`} className={x.id === id ? 'on' : ''}>{tr(x.n)}</Link>)}
        </aside>
        <div className="minw0">
          <Crumbs items={[{ to: '/services', label: t('servicesTitle') }, { label: tr(s.n) }]} />
          <div className="svc-head">
            <span className="svc-ic lg" data-edit={`service:${s.id}`}><Pic img={s.img} e={s.e} /></span>
            <div>
              <h1 className="page-title sm">{tr(s.n)}</h1>
              <p className="lead">{tr(info.d)}</p>
              {info.kind === 'order' && (
                <b className="svc-price">{info.price ? `${t('from')} ${money(info.price)} ${info.per ? tr(info.per) : ''}` : tr(['Bepul', 'Бесплатно', 'Free'])}</b>
              )}
            </div>
          </div>

          {info.kind === 'calc-repair' && <RepairCalc />}
          {info.kind === 'calc-build' && <BuildCalc />}
          {info.kind === 'rent' && <Rent />}
          {info.kind === 'order' && (
            <div className="svc-body">
              <section>
                <h3>{tr(['Qanday ishlaydi', 'Как это работает', 'How it works'])}</h3>
                <ol className="steps">{how.map((h, i) => <li key={i}>{tr(h)}</li>)}</ol>
              </section>
              <section className="card">
                <h3>{tr(['Ariza qoldirish', 'Оставить заявку', 'Leave a request'])}</h3>
                <RequestForm kind={s.id} title={tr(s.n)} fields={[nameField, phoneField, addressField, dateField, commentField]} />
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Kalkulyator natijasi: materiallar jadvali ---------- */
type Line = { id: string; qty: number; note?: string };

function Materials({ lines }: { lines: Line[] }) {
  const { tr, money, unit } = useI18n();
  const { addToCart, showToast } = useStore();
  const rows = lines.filter((l) => l.qty > 0 && productById.has(l.id));
  const total = rows.reduce((s, l) => s + productById.get(l.id)!.price * l.qty, 0);
  if (!rows.length) return null;
  return (
    <div className="calc-res">
      <h3>{tr(['Kerakli materiallar', 'Необходимые материалы', 'Materials needed'])}</h3>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>{tr(['Tovar', 'Товар', 'Product'])}</th>
              <th>{tr(['Soni', 'Кол-во', 'Qty'])}</th>
              <th>{tr(['Narxi', 'Цена', 'Price'])}</th>
              <th>{tr(['Summa', 'Сумма', 'Sum'])}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => {
              const p = productById.get(l.id)!;
              return (
                <tr key={l.id}>
                  <td>
                    <div className="tbl-prod">
                      <Thumb emoji={p.emoji} catId={p.catId} size="sm" img={p.img} />
                      <div>
                        <Link to={`/product/${p.id}`}>{fullName(p, tr)}</Link>
                        {l.note && <small className="muted">{l.note}</small>}
                      </div>
                    </div>
                  </td>
                  <td className="num">{l.qty} {unit(p.unit)}</td>
                  <td className="num">{money(p.price)}</td>
                  <td className="num"><b>{money(p.price * l.qty)}</b></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr><td colSpan={3}>{tr(['Jami', 'Итого', 'Total'])}</td><td className="num"><b>{money(total)}</b></td></tr>
          </tfoot>
        </table>
      </div>
      <button
        className="btn btn-brand"
        onClick={() => {
          rows.forEach((l) => addToCart(l.id, l.qty));
          showToast(tr(["Barcha materiallar savatga qo'shildi", 'Все материалы добавлены в корзину', 'All materials added to cart']));
        }}
      >
        {tr(["Hammasini savatga qo'shish", 'Добавить всё в корзину', 'Add all to cart'])}
      </button>
    </div>
  );
}

function Num({ id, label, value, onChange, step = 0.1, suffix }: { id: string; label: string; value: number; onChange: (n: number) => void; step?: number; suffix?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="num-in">
        <input id={id} type="number" min={0} step={step} value={Number.isFinite(value) ? value : ''} onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))} />
        {suffix && <em>{suffix}</em>}
      </div>
    </label>
  );
}

function Seg<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: [T, string][] }) {
  return (
    <div className="seg-row">
      {options.map(([v, l]) => (
        <button key={v} type="button" className={'chip' + (v === value ? ' on' : '')} onClick={() => onChange(v)}>{l}</button>
      ))}
    </div>
  );
}

/* ---------- Ta'mir kalkulyatori ---------- */
function RepairCalc() {
  const { tr } = useI18n();
  const [L, setL] = useState(4.5);
  const [W, setW] = useState(3.5);
  const [H, setH] = useState(2.7);
  const [doors, setDoors] = useState(1);
  const [wins, setWins] = useState(1);
  const [wall, setWall] = useState<'paint' | 'wallpaper' | 'tile'>('paint');
  const [floor, setFloor] = useState<'laminate' | 'tile' | 'none'>('laminate');

  const r = useMemo(() => {
    const perim = 2 * (L + W);
    const openings = doors * 0.9 * 2.0 + wins * 1.5 * 1.4;
    const wallArea = Math.max(0, perim * H - openings);
    const floorArea = L * W;
    const lines: Line[] = [];
    if (wall === 'paint') {
      const liters = (wallArea * 2) / 10; // 2 qatlam, 10 m²/l
      lines.push({ id: 'stroy-paint-0-1', qty: Math.ceil(liters / 9), note: `${liters.toFixed(1)} l · 2×` });
      lines.push({ id: 'stroy-paint-2-1', qty: Math.ceil((wallArea * 0.15) / 10) });
      lines.push({ id: 'stroy-mixes-1-1', qty: Math.ceil((wallArea * 1.2) / 20) });
    } else if (wall === 'wallpaper') {
      const strips = Math.floor(10.05 / (H + 0.1)) || 1;
      const rolls = Math.ceil(Math.ceil((perim - doors * 0.9) / 1.06) / strips);
      lines.push({ id: 'finish-wallpaper-1-0', qty: rolls, note: `${strips} × ${(H + 0.1).toFixed(2)} m` });
      lines.push({ id: 'finish-wallpaper-3-0', qty: Math.ceil(rolls / 6) });
      lines.push({ id: 'stroy-paint-2-1', qty: Math.ceil((wallArea * 0.15) / 10) });
    } else {
      lines.push({ id: 'finish-tile-1-0', qty: Math.ceil(wallArea * 1.1), note: '+10%' });
      lines.push({ id: 'stroy-mixes-2-1', qty: Math.ceil(wallArea / 5) });
    }
    if (floor === 'laminate') {
      lines.push({ id: 'finish-laminate-0-0', qty: Math.ceil(floorArea * 1.07), note: '+7%' });
      lines.push({ id: 'finish-laminate-3-0', qty: Math.ceil(floorArea / 10) });
      lines.push({ id: 'finish-skirting-0-0', qty: Math.ceil((perim - doors * 0.9) / 2.5) });
    } else if (floor === 'tile') {
      lines.push({ id: 'finish-tile-0-1', qty: Math.ceil(floorArea * 1.1), note: '+10%' });
      lines.push({ id: 'stroy-mixes-2-1', qty: Math.ceil(floorArea / 5) });
    }
    // bir xil tovarlarni birlashtirish
    const merged = new Map<string, Line>();
    lines.forEach((l) => merged.set(l.id, merged.has(l.id) ? { ...l, qty: merged.get(l.id)!.qty + l.qty } : l));
    return { wallArea, floorArea, perim, lines: [...merged.values()] };
  }, [L, W, H, doors, wins, wall, floor]);

  return (
    <div className="calc">
      <div className="calc-form card">
        <div className="grid3">
          <Num id="c-l" label={tr(['Uzunligi', 'Длина', 'Length'])} value={L} onChange={setL} suffix="m" />
          <Num id="c-w" label={tr(['Eni', 'Ширина', 'Width'])} value={W} onChange={setW} suffix="m" />
          <Num id="c-h" label={tr(['Balandligi', 'Высота', 'Height'])} value={H} onChange={setH} suffix="m" />
          <Num id="c-d" label={tr(['Eshiklar', 'Двери', 'Doors'])} value={doors} onChange={(n) => setDoors(Math.round(n))} step={1} />
          <Num id="c-o" label={tr(['Derazalar', 'Окна', 'Windows'])} value={wins} onChange={(n) => setWins(Math.round(n))} step={1} />
        </div>
        <h4>{tr(['Devorlar', 'Стены', 'Walls'])}</h4>
        <Seg value={wall} onChange={setWall} options={[['paint', tr(["Bo'yash", 'Покраска', 'Paint'])], ['wallpaper', tr(['Oboy', 'Обои', 'Wallpaper'])], ['tile', tr(['Plitka', 'Плитка', 'Tiles'])]]} />
        <h4>{tr(['Pol', 'Пол', 'Floor'])}</h4>
        <Seg value={floor} onChange={setFloor} options={[['laminate', tr(['Laminat', 'Ламинат', 'Laminate'])], ['tile', tr(['Plitka', 'Плитка', 'Tiles'])], ['none', tr(['Kerak emas', 'Не нужно', 'None'])]]} />
      </div>
      <div className="calc-sum">
        <div className="stat"><b>{r.wallArea.toFixed(1)} m²</b><span>{tr(['Devorlar maydoni', 'Площадь стен', 'Wall area'])}</span></div>
        <div className="stat"><b>{r.floorArea.toFixed(1)} m²</b><span>{tr(['Pol maydoni', 'Площадь пола', 'Floor area'])}</span></div>
        <div className="stat"><b>{r.perim.toFixed(1)} m</b><span>{tr(['Perimetr', 'Периметр', 'Perimeter'])}</span></div>
      </div>
      <Materials lines={r.lines} />
    </div>
  );
}

/* ---------- Qurilish kalkulyatori ---------- */
function BuildCalc() {
  const { tr } = useI18n();
  const [mode, setMode] = useState<'wall' | 'found'>('wall');
  const [len, setLen] = useState(10);
  const [h, setH] = useState(3);
  const [mat, setMat] = useState<'brick05' | 'brick1' | 'brick15' | 'block200' | 'block300'>('brick1');
  const [openings, setOpenings] = useState(4);
  const [fl, setFl] = useState(40);
  const [fw, setFw] = useState(0.4);
  const [fd, setFd] = useState(0.8);

  const r = useMemo(() => {
    const lines: Line[] = [];
    let info = '';
    if (mode === 'wall') {
      const area = Math.max(0, len * h - openings);
      info = `${area.toFixed(1)} m²`;
      if (mat.startsWith('brick')) {
        const perM2 = mat === 'brick05' ? 51 : mat === 'brick1' ? 102 : 153;
        const bricks = Math.ceil(area * perM2 * 1.05);
        lines.push({ id: 'stroy-wall-0-0', qty: bricks, note: `${perM2} / m² +5%` });
        lines.push({ id: 'stroy-cement-0-0', qty: Math.ceil((bricks / 1000) * 5) });
        lines.push({ id: 'stroy-cement-1-0', qty: Math.ceil((bricks / 1000) * 0.25 * 10) / 10 });
      } else {
        const blocks = Math.ceil((area / 0.18) * 1.05);
        lines.push({ id: mat === 'block200' ? 'stroy-wall-2-1' : 'stroy-wall-2-2', qty: blocks, note: '600×300 · +5%' });
        lines.push({ id: 'stroy-mixes-2-0', qty: Math.ceil(blocks / 30) });
      }
    } else {
      const vol = fl * fw * fd;
      info = `${vol.toFixed(2)} m³`;
      lines.push({ id: 'stroy-cement-0-1', qty: Math.ceil(vol * 5.6), note: 'M400 · 280 kg/m³' });
      lines.push({ id: 'stroy-cement-1-0', qty: Math.ceil(vol * 0.5 * 10) / 10 });
      lines.push({ id: 'stroy-cement-2-0', qty: Math.ceil(vol * 0.8 * 10) / 10 });
    }
    return { lines, info };
  }, [mode, len, h, mat, openings, fl, fw, fd]);

  // m³ mahsulotlar kasr miqdorda bo'lishi mumkin — savat uchun butun songa yaxlitlaymiz
  const lines = r.lines.map((l) => ({ ...l, qty: Math.ceil(l.qty) }));

  return (
    <div className="calc">
      <div className="calc-form card">
        <Seg value={mode} onChange={setMode} options={[['wall', tr(['Devor', 'Стена', 'Wall'])], ['found', tr(['Lentali poydevor', 'Ленточный фундамент', 'Strip foundation'])]]} />
        {mode === 'wall' ? (
          <>
            <div className="grid3">
              <Num id="b-len" label={tr(['Devorlar uzunligi', 'Длина стен', 'Wall length'])} value={len} onChange={setLen} suffix="m" />
              <Num id="b-h" label={tr(['Balandligi', 'Высота', 'Height'])} value={h} onChange={setH} suffix="m" />
              <Num id="b-o" label={tr(['Eshik/deraza maydoni', 'Площадь проёмов', 'Openings area'])} value={openings} onChange={setOpenings} suffix="m²" />
            </div>
            <h4>{tr(['Material', 'Материал', 'Material'])}</h4>
            <Seg value={mat} onChange={setMat} options={[
              ['brick05', tr(["G'isht, 0.5 g'isht (120 mm)", 'Кирпич в 0,5 (120 мм)', 'Brick, ½ (120 mm)'])],
              ['brick1', tr(["G'isht, 1 g'isht (250 mm)", 'Кирпич в 1 (250 мм)', 'Brick, 1 (250 mm)'])],
              ['brick15', tr(["G'isht, 1.5 g'isht (380 mm)", 'Кирпич в 1,5 (380 мм)', 'Brick, 1½ (380 mm)'])],
              ['block200', tr(['Gazoblok 200 mm', 'Газоблок 200 мм', 'Aerated block 200 mm'])],
              ['block300', tr(['Gazoblok 300 mm', 'Газоблок 300 мм', 'Aerated block 300 mm'])],
            ]} />
          </>
        ) : (
          <div className="grid3">
            <Num id="f-l" label={tr(['Umumiy uzunlik', 'Общая длина', 'Total length'])} value={fl} onChange={setFl} suffix="m" />
            <Num id="f-w" label={tr(['Eni', 'Ширина', 'Width'])} value={fw} onChange={setFw} suffix="m" />
            <Num id="f-d" label={tr(['Chuqurligi', 'Глубина', 'Depth'])} value={fd} onChange={setFd} suffix="m" />
          </div>
        )}
      </div>
      <div className="calc-sum">
        <div className="stat"><b>{r.info}</b><span>{mode === 'wall' ? tr(['Terish maydoni', 'Площадь кладки', 'Masonry area']) : tr(['Beton hajmi', 'Объём бетона', 'Concrete volume'])}</span></div>
      </div>
      <Materials lines={lines} />
    </div>
  );
}

/* ---------- Asbob ijarasi ---------- */
function Rent() {
  const { tr, money } = useI18n();
  const tools = useMemo(() => productsOfCat('tools').filter((p) => p.price >= 400000).sort((a, b) => a.price - b.price), []);
  const [sel, setSel] = useState(tools[0]?.id || '');
  const [days, setDays] = useState(1);
  const p = productById.get(sel);
  const perDay = p ? Math.max(25000, Math.round((p.price * 0.06) / 1000) * 1000) : 0;
  const deposit = p ? Math.round((p.price * 0.3) / 1000) * 1000 : 0;
  return (
    <div className="rent">
      <div className="rent-list">
        {tools.map((x) => {
          const d = Math.max(25000, Math.round((x.price * 0.06) / 1000) * 1000);
          return (
            <button key={x.id} className={'rent-item' + (x.id === sel ? ' on' : '')} onClick={() => setSel(x.id)}>
              <Thumb emoji={x.emoji} catId={x.catId} size="sm" />
              <span className="rent-name">{fullName(x, tr)}</span>
              <b>{money(d)}<small className="muted"> / {tr(['kun', 'сутки', 'day'])}</small></b>
            </button>
          );
        })}
      </div>
      {p && (
        <aside className="card rent-box">
          <h3>{fullName(p, tr)}</h3>
          <label className="field">
            <span>{tr(['Necha kunga', 'На сколько дней', 'How many days'])}</span>
            <div className="num-in"><input id="rent-days" type="number" min={1} max={60} value={days} onChange={(e) => setDays(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))} /></div>
          </label>
          <div className="srow"><span>{tr(['Ijara', 'Аренда', 'Rent'])} ({days} × {money(perDay)})</span><b>{money(perDay * days)}</b></div>
          <div className="srow"><span>{tr(['Garov (qaytariladi)', 'Залог (возвращается)', 'Deposit (refundable)'])}</span><span>{money(deposit)}</span></div>
          <RequestForm
            key={p.id + days}
            kind="rent"
            title={`${tr(['Ijara', 'Аренда', 'Rent'])}: ${fullName(p, tr)}`}
            extra={{ [tr(['Kunlar', 'Дней', 'Days'])]: String(days), [tr(['Summa', 'Сумма', 'Sum'])]: money(perDay * days) }}
            fields={[nameField, phoneField, { ...dateField, label: ['Olish sanasi', 'Дата получения', 'Pickup date'], required: true }]}
            submitLabel={tr(['Bron qilish', 'Забронировать', 'Book'])}
          />
        </aside>
      )}
    </div>
  );
}
