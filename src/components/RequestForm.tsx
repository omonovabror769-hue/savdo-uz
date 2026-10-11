import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useStore } from '../store';
import { IconCheck } from './Icons';

export interface FieldDef {
  id: string;
  label: [string, string, string];
  type?: 'text' | 'tel' | 'date' | 'textarea' | 'number' | 'select' | 'email';
  required?: boolean;
  options?: [string, string, string][];
  placeholder?: [string, string, string];
}

export const nameField: FieldDef = { id: 'name', label: ['Ismingiz', 'Ваше имя', 'Your name'], required: true };
export const phoneField: FieldDef = { id: 'phone', label: ['Telefon', 'Телефон', 'Phone'], type: 'tel', required: true };
export const addressField: FieldDef = { id: 'address', label: ['Manzil', 'Адрес', 'Address'], placeholder: ["Ko'cha, uy", 'Улица, дом', 'Street, house'] };
export const dateField: FieldDef = { id: 'date', label: ['Qulay sana', 'Удобная дата', 'Preferred date'], type: 'date' };
export const commentField: FieldDef = { id: 'comment', label: ['Izoh', 'Комментарий', 'Comment'], type: 'textarea' };

/** Har qanday ariza formasi: yuborilgach kabinetdagi "Arizalarim" ro'yxatiga tushadi */
export default function RequestForm({
  kind, title, fields, submitLabel, extra, onSent, initial,
}: {
  kind: string;
  title: string;
  fields: FieldDef[];
  submitLabel?: string;
  extra?: Record<string, string>;
  onSent?: () => void;
  initial?: Record<string, string>;
}) {
  const { tr } = useI18n();
  const { user, profile, addRequest, showToast } = useStore();
  const [vals, setVals] = useState<Record<string, string>>(() => ({
    name: user?.name || '',
    phone: profile.phone || '+998 ',
    address: profile.address || '',
    ...initial,
  }));
  const [err, setErr] = useState('');
  const [sent, setSent] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      const raw = (vals[f.id] || '').trim();
      const v = raw === '+998' ? '' : raw;
      if (f.required && !v) return setErr(`${tr(['To‘ldiring', 'Заполните поле', 'Please fill in'])}: ${tr(f.label)}`);
      if (f.type === 'tel' && v && v.replace(/\D/g, '').length < 12) return setErr(`${tr(f.label)}: +998 XX XXX-XX-XX`);
    }
    setErr('');
    const data: Record<string, string> = { ...extra };
    fields.forEach((f) => { if (vals[f.id] && vals[f.id].trim() !== '+998') data[tr(f.label)] = f.type === 'select' && f.options ? tr(f.options[+vals[f.id]] || f.options[0]) : vals[f.id]; });
    const r = addRequest({ kind, title, fields: data });
    setSent(r.id);
    showToast(tr(['Ariza yuborildi', 'Заявка отправлена', 'Request sent']));
    onSent?.();
  };

  if (sent) {
    return (
      <div className="sent">
        <div className="done-ic sm"><IconCheck size={26} /></div>
        <b>{tr(['Ariza qabul qilindi', 'Заявка принята', 'Request received'])} №{sent}</b>
        <p className="muted">{tr(["Menejer 15 daqiqa ichida siz bilan bog'lanadi.", 'Менеджер свяжется с вами в течение 15 минут.', 'A manager will contact you within 15 minutes.'])}</p>
        <div className="row-gap">
          <Link to="/account/requests" className="btn btn-yellow">{tr(['Arizalarim', 'Мои заявки', 'My requests'])}</Link>
          <button className="btn btn-ghost" onClick={() => setSent(null)}>{tr(['Yana ariza', 'Ещё заявка', 'New request'])}</button>
        </div>
      </div>
    );
  }

  const input = (f: FieldDef): ReactNode => {
    const common = { id: `rf-${kind}-${f.id}`, value: vals[f.id] || '', onChange: (e: { target: { value: string } }) => setVals((v) => ({ ...v, [f.id]: e.target.value })) };
    if (f.type === 'textarea') return <textarea {...common} rows={3} placeholder={f.placeholder && tr(f.placeholder)} />;
    if (f.type === 'select') return (
      <select {...common} value={vals[f.id] || '0'}>
        {f.options!.map((o, i) => <option key={i} value={i}>{tr(o)}</option>)}
      </select>
    );
    return <input {...common} type={f.type === 'tel' ? 'tel' : f.type || 'text'} inputMode={f.type === 'tel' ? 'tel' : f.type === 'number' ? 'numeric' : undefined} placeholder={f.placeholder && tr(f.placeholder)} />;
  };

  return (
    <form className="rform" onSubmit={submit} noValidate>
      {fields.map((f) => (
        <label key={f.id} className={'field' + (f.type === 'textarea' ? ' full' : '')}>
          <span>{tr(f.label)}{f.required && ' *'}</span>
          {input(f)}
        </label>
      ))}
      {err && <p className="err full">{err}</p>}
      <button className="btn btn-yellow full" type="submit">{submitLabel || tr(['Ariza yuborish', 'Отправить заявку', 'Send request'])}</button>
    </form>
  );
}
