import { useLanguage } from '../context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em]">
      <button
        onClick={() => setLanguage('en')}
        className={`transition-colors ${
          language === 'en'
            ? 'text-[#A88F5C]'
            : 'text-[#0F0F0F]/40 hover:text-[#0F0F0F]'
        }`}
      >
        EN
      </button>
      <span className="text-[#0F0F0F]/20">/</span>
      <button
        onClick={() => setLanguage('vi')}
        className={`transition-colors ${
          language === 'vi'
            ? 'text-[#A88F5C]'
            : 'text-[#0F0F0F]/40 hover:text-[#0F0F0F]'
        }`}
      >
        VI
      </button>
    </div>
  );
}
