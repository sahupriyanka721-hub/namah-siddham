import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Lock } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-forest-950 text-sage-200 border-t border-forest-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-900">
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md">
                <span className="text-forest-950 font-serif font-black text-lg">NS</span>
              </div>
              <span className="font-serif font-bold text-lg text-white uppercase tracking-wider">
                {settings.companyName}
              </span>
            </div>
            <p className="text-xs text-gold-400 font-mono tracking-wider">
              CIN: {settings.cin}
            </p>
            <p className="text-sm text-sage-300 leading-relaxed pr-4">
              {settings.footerContent?.aboutText ||
                'Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.'}
            </p>
            <div className="pt-2 flex items-center space-x-4 text-xs text-sage-300">
              <span className="inline-flex items-center text-gold-400">
                <ShieldCheck className="w-4 h-4 mr-1" />
                {settings.companyType}
              </span>
              <span>•</span>
              <span>Registered in India</span>
            </div>
          </div>

          {/* Column 2: Digital Ecosystem */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-serif border-b border-forest-800 pb-2">
              Our Platforms
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://homeservixo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors inline-flex items-center group"
                >
                  <span>HomeServixo</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://carrento.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors inline-flex items-center group"
                >
                  <span>Carrento</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://jainamshree.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors inline-flex items-center group"
                >
                  <span>Jainamshree</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://superiormart.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors inline-flex items-center group"
                >
                  <span>SuperiorMart</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li className="pt-2">
                <Link to="/ecosystem" className="text-xs text-gold-400 font-semibold hover:underline">
                  View Full Ecosystem →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Company */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-serif border-b border-forest-800 pb-2">
              Corporate
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/business-model" className="hover:text-gold-300 transition-colors">
                  Business Model
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-gold-300 transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-gold-300 transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-gold-300 transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-gold-300 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Registered Office & Contact */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-serif border-b border-forest-800 pb-2">
              Registered Office
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-sage-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-1 shrink-0" />
                <span>
                  {settings.registeredOffice?.fullAddress ||
                    'Registered Office: Madhya Pradesh, India. CIN: U77100MP2026PTC087531'}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`mailto:${settings.officialEmail}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {settings.officialEmail}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${settings.officialPhone}`} className="hover:text-white transition-colors">
                  {settings.officialPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-sage-400 space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-gold-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-of-use" className="hover:text-gold-300 transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link to="/cookie-policy" className="hover:text-gold-300 transition-colors">
              Cookie Policy
            </Link>
            <span>•</span>
            <Link to="/grievance" className="hover:text-gold-300 transition-colors">
              Grievance Officer
            </Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-gold-300 transition-colors">
              Disclaimer
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <p>
              {settings.footerContent?.copyrightText ||
                '© 2026 Namah Siddham Corporation Private Limited. All rights reserved.'}
            </p>
            <Link
              to="/admin/login"
              className="text-sage-500 hover:text-gold-400 transition-colors p-1"
              title="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
