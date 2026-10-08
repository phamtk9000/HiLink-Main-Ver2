import { Link } from 'react-router';
import { useLang, usePageMeta } from '../lib/i18n';

const T = {
  en: { title: 'Page Not Found', back: 'Back to Home' },
  vi: { title: 'Không tìm thấy trang', back: 'Về trang chủ' },
};

export function NotFoundPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.title);
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#F7F7F7]">
      <div className="text-center">
        <p className="text-sm uppercase tracking-wider text-[#D12126] mb-4">404</p>
        <h2 className="serif text-4xl mb-4">{t.title}</h2>
        <Link to={l('/')} className="text-[#D12126] uppercase text-sm tracking-wider underline">
          {t.back}
        </Link>
      </div>
    </div>
  );
}
