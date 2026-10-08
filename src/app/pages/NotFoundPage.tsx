import { useLang, usePageMeta } from '../lib/i18n';
import { Button, Section } from '../components/Kit';

const T = {
  en: { title: 'Page not found', lead: 'The page you are looking for has moved or no longer exists.', home: 'Back to home', contact: 'Contact us' },
  vi: { title: 'Không tìm thấy trang', lead: 'Trang bạn tìm đã được chuyển đi hoặc không còn tồn tại.', home: 'Về trang chủ', contact: 'Liên hệ' },
};

export function NotFoundPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.title);
  return (
    <Section tone="cream" className="min-h-[60vh]">
      <p className="eyebrow">404</p>
      <h1 className="mb-6">{t.title}</h1>
      <p className="lede mb-10 max-w-xl">{t.lead}</p>
      <div className="flex flex-wrap gap-4">
        <Button to={l('/')} variant="dark">{t.home}</Button>
        <Button to={l('/contact')} variant="line">{t.contact}</Button>
      </div>
    </Section>
  );
}
