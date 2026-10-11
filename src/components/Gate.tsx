import { useEffect, useRef } from 'react';
import { useI18n, LANGS } from '../i18n';
import { useStore } from '../store';
import { initGoogle, renderGoogleButton } from '../store/auth';
import { Logo } from './Header';

/** Yopiq rejimdagi kirish oynasi: sayt tayyor bo'lguncha faqat ruxsat berilgan Gmail'lar uchun */
export default function Gate({ denied }: { denied: boolean }) {
  const { tr, lang, setLang } = useI18n();
  const { user, logout } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (denied) return;
    initGoogle(null, { prompt: true })
      .then(() => ref.current && renderGoogleButton(ref.current, lang))
      .catch(() => {});
  }, [lang, denied]);

  return (
    <div className="gate">
      <div className="gate-box">
        <Logo />
        <div className="lang-switch">
          {LANGS.map((l) => (
            <button key={l.id} className={lang === l.id ? 'on' : ''} onClick={() => setLang(l.id)}>{l.short}</button>
          ))}
        </div>
        {denied && user ? (
          <>
            <h1>{tr(["Ruxsat yo'q", 'Нет доступа', 'No access'])}</h1>
            <p className="muted">
              {tr([
                `${user.email} uchun hali ruxsat berilmagan. Sayt tez orada hamma uchun ochiladi.`,
                `Для ${user.email} доступ пока не открыт. Скоро сайт откроется для всех.`,
                `${user.email} does not have access yet. The site will open to everyone soon.`,
              ])}
            </p>
            <button className="btn btn-ghost" onClick={logout}>{tr(['Boshqa akkaunt bilan kirish', 'Войти другим аккаунтом', 'Use another account'])}</button>
          </>
        ) : (
          <>
            <h1>{tr(['Sayt tayyorlanmoqda', 'Сайт готовится к запуску', 'Coming soon'])}</h1>
            <p className="muted">{tr(["Hozircha faqat taklif qilinganlar uchun. Google akkauntingiz bilan kiring.", 'Пока только по приглашениям. Войдите через аккаунт Google.', 'Invite-only for now. Sign in with your Google account.'])}</p>
            <div ref={ref} className="gbtn-host" />
          </>
        )}
      </div>
    </div>
  );
}
