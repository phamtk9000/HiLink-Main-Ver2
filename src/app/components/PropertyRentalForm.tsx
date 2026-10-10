import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, Upload } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { translations } from '../translations';
import { Contours } from './Contours';
import { Select } from './Select';
import { HONEYPOT_PROPS, honeypot, leadError, sendLead } from '../lib/lead';

const UTILITIES = [
  { en: 'None', vi: 'Không' },
  { en: 'Gym', vi: 'Phòng gym' },
  { en: 'Pool', vi: 'Hồ bơi' },
  { en: 'Gym + Pool', vi: 'Gym + hồ bơi' },
  { en: 'Gym + Pool + Parking', vi: 'Gym + hồ bơi + bãi đỗ xe' },
  { en: 'Full Amenities', vi: 'Đầy đủ tiện ích' },
];

export function PropertyRentalForm() {
  const { lang } = useLang();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (key: string): string => key.split('.').reduce((v: any, k) => v?.[k], translations[lang]) || key;
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [utility, setUtility] = useState('0');
  const [location, setLocation] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
    }
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const utilityLabel = UTILITIES[Number(utility)]?.[lang] ?? utility;
    try {
      await sendLead('rental', {
        Name: fullName, Email: email, Phone: phone, Location: location,
        Bedrooms: String(bedrooms), Bathrooms: String(bathrooms), Utility: utilityLabel,
        Photo: image ? (image.size > 3 * 1024 * 1024 ? `${image.name} (too large to attach)` : image.name) : '',
      }, { website: honeypot(e.currentTarget), lang, file: image });
    } catch {
      setError(leadError(lang));
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form
    setTimeout(() => {
      setShowSuccess(false);
      setBedrooms(0);
      setBathrooms(0);
      setUtility('0');
      setLocation('');
      setFullName('');
      setEmail('');
      setPhone('');
      setImage(null);
      setImageName('');
    }, 3000);
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#361716] text-white">
      <Contours />
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="serif text-4xl lg:text-5xl mb-6 text-[#E9E3DA]">
            {t('propertyForm.title')}
          </h2>
          <p className="text-lg text-[#E9E3DA]/80">
            {t('propertyForm.subtitle')}
          </p>
        </motion.div>

        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-[#361716] rounded-lg"
          >
            <div className="text-3xl mb-4">✓</div>
            <p className="text-2xl text-[#E9E3DA]">{t('propertyForm.success')}</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <input {...HONEYPOT_PROPS} />
            {/* Location */}
            <div className="mb-8">
              <label className="block text-sm mb-3 uppercase tracking-wider">
                {t('propertyForm.location')} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('propertyForm.locationPlaceholder')}
                required
                className="w-full px-6 py-4 bg-transparent border border-white/40 text-white placeholder:text-white/50 focus:border-[#E9E3DA] focus:outline-none transition-colors"
              />
            </div>

            {/* Bedroom, Bathroom, Utility */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Bedroom */}
              <div>
                <label className="block text-sm mb-3 uppercase tracking-wider">
                  {t('propertyForm.bedroom')} <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center justify-between px-6 py-4 bg-transparent border border-white/40">
                  <button
                    type="button"
                    onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                    className="text-white hover:text-[#E9E3DA] transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-lg">{bedrooms}</span>
                  <button
                    type="button"
                    onClick={() => setBedrooms(bedrooms + 1)}
                    className="text-white hover:text-[#E9E3DA] transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Bathroom */}
              <div>
                <label className="block text-sm mb-3 uppercase tracking-wider">
                  {t('propertyForm.bathroom')} <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center justify-between px-6 py-4 bg-transparent border border-white/40">
                  <button
                    type="button"
                    onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}
                    className="text-white hover:text-[#E9E3DA] transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-lg">{bathrooms}</span>
                  <button
                    type="button"
                    onClick={() => setBathrooms(bathrooms + 1)}
                    className="text-white hover:text-[#E9E3DA] transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Utility */}
              <div>
                <label className="block text-sm mb-3 uppercase tracking-wider">
                  {t('propertyForm.utility')} <span className="text-red-400">*</span>
                </label>
                <Select
                  value={utility}
                  onChange={setUtility}
                  options={UTILITIES.map((u, k) => ({ value: String(k), label: u[lang] }))}
                  tone="dark"
                  className="w-full px-6 py-4 bg-transparent border border-white/40 text-white focus:border-[#E9E3DA] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Property Image */}
            <div className="mb-8">
              <label className="block text-sm mb-3 uppercase tracking-wider">
                {t('propertyForm.apartmentImage')}
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-6 py-4 bg-transparent border border-white/40 text-white text-left hover:border-[#E9E3DA] transition-colors flex items-center justify-between"
                >
                  <span className={imageName ? 'text-white' : 'text-white/50'}>
                    {imageName || t('propertyForm.chooseImage')}
                  </span>
                  <Upload size={20} />
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="mb-8">
              <label className="block text-sm mb-3 uppercase tracking-wider">
                {t('propertyForm.fullName')} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('propertyForm.fullNamePlaceholder')}
                required
                className="w-full px-6 py-4 bg-transparent border border-white/40 text-white placeholder:text-white/50 focus:border-[#E9E3DA] focus:outline-none transition-colors"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Email */}
              <div>
                <label className="block text-sm mb-3 uppercase tracking-wider">
                  {t('propertyForm.email')} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('propertyForm.emailPlaceholder')}
                  required
                  className="w-full px-6 py-4 bg-transparent border border-white/40 text-white placeholder:text-white/50 focus:border-[#E9E3DA] focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm mb-3 uppercase tracking-wider">
                  {t('propertyForm.phone')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('propertyForm.phonePlaceholder')}
                  className="w-full px-6 py-4 bg-transparent border border-white/40 text-white placeholder:text-white/50 focus:border-[#E9E3DA] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            {error && <p role="alert" className="mb-4 text-right text-[15px] text-[#F7B4B6]">{error}</p>}
            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-16 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('propertyForm.submitting') : t('propertyForm.sendNow')}
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
