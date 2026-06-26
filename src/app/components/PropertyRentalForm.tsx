import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, Upload, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function PropertyRentalForm() {
  const { t } = useLanguage();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
    <section className="py-24 lg:py-32 bg-[#2A4A5E] text-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="serif text-4xl lg:text-5xl mb-6 text-[#EAE3D2] uppercase tracking-wider">
            {t('propertyForm.title')}
          </h2>
          <p className="text-lg text-[#EAE3D2]/80">
            {t('propertyForm.subtitle')}
          </p>
        </motion.div>

        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-[#3A5A6E] rounded-lg"
          >
            <div className="text-3xl mb-4">✓</div>
            <p className="text-2xl text-[#EAE3D2]">{t('propertyForm.success')}</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
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
                className="w-full px-6 py-4 bg-transparent border border-white/40 text-white placeholder:text-white/50 focus:border-[#EAE3D2] focus:outline-none transition-colors"
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
                    className="text-white hover:text-[#EAE3D2] transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-lg">{bedrooms}</span>
                  <button
                    type="button"
                    onClick={() => setBedrooms(bedrooms + 1)}
                    className="text-white hover:text-[#EAE3D2] transition-colors"
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
                    className="text-white hover:text-[#EAE3D2] transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-lg">{bathrooms}</span>
                  <button
                    type="button"
                    onClick={() => setBathrooms(bathrooms + 1)}
                    className="text-white hover:text-[#EAE3D2] transition-colors"
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
                <div className="relative">
                  <select
                    value={utility}
                    onChange={(e) => setUtility(e.target.value)}
                    className="w-full px-6 py-4 bg-transparent border border-white/40 text-white appearance-none focus:border-[#EAE3D2] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="0" className="bg-[#2A4A5E]">0 Utility</option>
                    <option value="1" className="bg-[#2A4A5E]">Gym</option>
                    <option value="2" className="bg-[#2A4A5E]">Pool</option>
                    <option value="3" className="bg-[#2A4A5E]">Gym + Pool</option>
                    <option value="4" className="bg-[#2A4A5E]">Gym + Pool + Parking</option>
                    <option value="5" className="bg-[#2A4A5E]">Full Amenities</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
                </div>
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
                  className="w-full px-6 py-4 bg-transparent border border-white/40 text-white text-left hover:border-[#EAE3D2] transition-colors flex items-center justify-between"
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
                className="w-full px-6 py-4 bg-transparent border border-white/40 text-white placeholder:text-white/50 focus:border-[#EAE3D2] focus:outline-none transition-colors"
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
                  className="w-full px-6 py-4 bg-transparent border border-white/40 text-white placeholder:text-white/50 focus:border-[#EAE3D2] focus:outline-none transition-colors"
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
                  className="w-full px-6 py-4 bg-transparent border border-white/40 text-white placeholder:text-white/50 focus:border-[#EAE3D2] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-16 py-4 bg-[#C9A961] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#2A4A5E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
