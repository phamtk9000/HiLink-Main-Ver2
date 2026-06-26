import { Link } from 'react-router';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const socials = [
  { label: 'Facebook', href: 'https://facebook.com/hilink.vn', Icon: Facebook },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/hilink-vietnam', Icon: Linkedin },
  { label: 'Instagram', href: 'https://instagram.com/hilink.vn', Icon: Instagram },
  { label: 'YouTube', href: 'https://youtube.com/@hilinkvietnam', Icon: Youtube },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0F0F] text-white border-t-2 border-[#A88F5C]/35">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24">
        {/* Pre-footer CTA band */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-16 mb-16 border-b border-white/10">
          <h2 className="serif text-4xl lg:text-5xl leading-tight max-w-2xl">Let's build something <span className="text-[#C9A55A]">exceptional</span>.</h2>
          <Link to="/book-consultation" className="shrink-0 inline-flex items-center gap-2 px-9 py-4 bg-[#A88F5C] text-white text-[11px] uppercase tracking-[0.18em] hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors">
            Book a Consultation
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-4">
            <img src="/brand/hilink-logo-light.png" alt="HiLink — Your Solution" className="h-12 w-auto mb-6" />
            <p className="text-[#EAE3D2] text-base leading-relaxed mb-8">
              Premium real estate solutions for international clients seeking excellence in Vietnam.
            </p>
            <Link
              to="/book-consultation"
              className="inline-block px-8 py-3 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors"
            >
              Book a Consultation
            </Link>

            <div className="mt-10">
              <h4 className="text-xs uppercase tracking-wider text-[#EAE3D2] mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center border border-white/20 text-[#EAE3D2] hover:bg-[#A88F5C] hover:border-[#A88F5C] hover:text-white transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm uppercase tracking-wider mb-6">Solutions</h4>
            <nav className="space-y-3">
              {[
                { to: '/property-management', label: 'Property Management' },
                { to: '/workspace-leasing', label: 'Workspace Leasing' },
                { to: '/concierge-services', label: 'Concierge Services' },
                { to: '/business-services', label: 'Business Services' },
                { to: '/industrial-logistics', label: 'Industrial & Logistics' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="block text-[#EAE3D2] hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm uppercase tracking-wider mb-6">Company</h4>
            <nav className="space-y-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/partners', label: 'Partners' },
                { to: '/careers', label: 'Careers' },
                { to: '/news', label: 'News' },
                { to: '/solutions', label: 'All Solutions' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="block text-[#EAE3D2] hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm uppercase tracking-wider mb-6">Contact</h4>
            <address className="not-italic space-y-3 text-[#EAE3D2]">
              <p>
                <a href="mailto:contact@hilink.vn" className="hover:text-white transition-colors">
                  contact@hilink.vn
                </a>
              </p>
              <p>
                <a href="tel:+842422029000" className="hover:text-white transition-colors">
                  (+84) 24 2202 9000
                </a>
              </p>
              <p>Tầng 15 số 4 Tôn Thất Tùng,<br />Đống Đa, Hà Nội, Việt Nam</p>
            </address>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#EAE3D2] text-sm">
            © {currentYear} HiLink Vietnam. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <Link to="/privacy-policy" className="text-[#EAE3D2] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[#EAE3D2] hover:text-white transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
