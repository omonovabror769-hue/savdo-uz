import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container page narrow">
      <div className="done">
        <div className="nf">404</div>
        <h1>{t('notFound')}</h1>
        <Link to="/" className="btn btn-yellow">{t('toHome')}</Link>
      </div>
    </div>
  );
}
