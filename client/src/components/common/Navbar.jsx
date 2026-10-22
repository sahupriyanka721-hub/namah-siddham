import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Ecosystem', path: '/ecosystem' },
  { name: 'Business Model', path: '/business-model' },
  { name: 'Partners', path: '/partners' },
  { name: 'News', path: '/news' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact Us', path: '/contact' },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-forest-900/95 backdrop-blur-md shadow-soft-lg py-3 text-white border-b border-forest-800'
          : 'bg-forest-900 py-4 text-white border-b border-forest-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
              <span className="text-forest-950 font-serif font-black text-xl tracking-tighter">NS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base md:text-lg tracking-wider text-white uppercase group-hover:text-gold-300 transition-colors">
                Namah Siddham
              </span>
              <span className="text-[10px] tracking-widest text-gold-400/90 uppercase font-semibold">
                Corporation Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-gold-300 bg-forest-800/80 font-semibold'
                    : 'text-sage-100 hover:text-white hover:bg-forest-800/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/ecosystem"
              className="inline-flex items-center justify-center px-4 py-2 text-xs xl:text-sm font-semibold rounded-lg bg-gold-500 hover:bg-gold-400 text-forest-950 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Our Platforms</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-sage-200 hover:text-white hover:bg-forest-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-forest-950 border-b border-forest-800 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-forest-800 text-gold-300 font-bold'
                  : 'text-sage-100 hover:bg-forest-900 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-forest-800 flex flex-col space-y-2">
            <Link
              to="/ecosystem"
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gold-500 text-forest-950 font-bold text-sm text-center shadow-md"
            >
              Explore Our Platforms
            </Link>
            <Link
              to="/partners"
              className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg border border-forest-700 text-sage-200 text-sm text-center font-medium"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
