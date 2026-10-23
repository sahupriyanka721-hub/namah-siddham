import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Code2,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Zap,
  Building2,
  ChevronRight,
  Layers,
  Sparkles,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Handshake,
  Workflow,
  Compass,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';

// Icon resolver for services
const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Code2':
      return Code2;
    case 'Smartphone':
      return Smartphone;
    case 'TrendingUp':
      return TrendingUp;
    case 'Globe':
    default:
      return Globe;
  }
};

export const HomePage = () => {
  const { settings } = useSettings();
  const [services, setServices] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesRes, platformsRes, portfolioRes, newsRes] = await Promise.all([
          publicApi.getServices(),
          publicApi.getPlatforms(),
          publicApi.getPortfolio(),
          publicApi.getNews(),
        ]);
        setServices(servicesRes.data?.data || []);
        setPlatforms(platformsRes.data?.data || []);
        setPortfolio(portfolioRes.data?.data?.slice(0, 3) || []);
        setNews(newsRes.data?.data?.slice(0, 3) || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      <SeoMeta
        title="Home"
        description="Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners."
      />

      {/* ========================================================================= */}
      {/* SECTION A: HERO BANNER */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 text-white pt-16 pb-28 sm:pb-36 border-b border-navy-800">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#FFBE00_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Headline, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-navy-800/90 border border-royal-400/30 text-royal-200 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                <span>CIN: {settings.cin || 'U77100MP2026PTC087531'} • Bhopal, MP, India</span>
              </div>

              <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Technology That Builds Businesses and Connects Opportunities
              </h1>

              <p className="text-base sm:text-lg text-surface-300 leading-relaxed font-normal">
                Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold text-sm sm:text-base shadow-soft-md transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explore Our IT Services</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-navy-800/90 hover:bg-navy-800 text-surface-200 border border-navy-700 font-semibold text-sm sm:text-base transition-colors"
                >
                  <span>Discover Our Products</span>
                </Link>
              </div>

              {/* Corporate Identity Tag */}
              <div className="pt-6 border-t border-navy-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-surface-400 font-mono">
                <div>
                  <span className="text-gold-400 font-bold">Entity:</span> Private Limited Company
                </div>
                <div>
                  <span className="text-gold-400 font-bold">Location:</span> Bhopal, Madhya Pradesh
                </div>
                <div>
                  <span className="text-gold-400 font-bold">Two Verticals:</span> Services &amp; Platforms
                </div>
              </div>
            </div>

            {/* Right: Visually engaging technology and digital ecosystem composition */}
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-br from-navy-900 to-navy-950 p-6 sm:p-8 rounded-3xl border border-navy-700/80 shadow-soft-xl space-y-6 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-royal-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/assets/namah-siddham-logo.png"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/logo-white.svg';
                      }}
                      alt="Namah Siddham Brand"
                      className="h-9 w-auto"
                    />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 uppercase tracking-widest font-mono">
                    Integrated Hub
                  </span>
                </div>

                {/* Vertical 1 Card */}
                <div className="bg-navy-800/80 border border-navy-700 rounded-2xl p-4 space-y-2 hover:border-royal-500/50 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-royal-400 uppercase tracking-wider font-serif flex items-center">
                      <Code2 className="w-3.5 h-3.5 mr-1.5" />
                      Vertical 1: IT Solutions
                    </span>
                    <span className="text-[10px] text-surface-400">Client Delivery</span>
                  </div>
                  <div className="text-xs text-surface-300">
                    Custom web architecture, mobile solutions, tailored ERP/CRM systems, and SEO visibility.
                  </div>
                </div>

                {/* Vertical 2 Card */}
                <div className="bg-navy-800/80 border border-navy-700 rounded-2xl p-4 space-y-2 hover:border-orange-500/50 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-orange-400 uppercase tracking-wider font-serif flex items-center">
                      <Layers className="w-3.5 h-3.5 mr-1.5" />
                      Vertical 2: Digital Marketplaces
                    </span>
                    <span className="text-[10px] text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">
                      4 Platforms
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-surface-300">
                    <div className="p-1.5 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
                      <span>HomeServixo</span>
                      <span className="text-[9px] text-surface-500">Repair</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
                      <span>Carrento</span>
                      <span className="text-[9px] text-surface-500">Mobility</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
                      <span>Jainamshree</span>
                      <span className="text-[9px] text-surface-500">Satvik</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-between">
                      <span>SuperiorMart</span>
                      <span className="text-[9px] text-surface-500">Retail</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: COMPANY INTRODUCTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-surface-200 shadow-soft-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
              Corporate Overview
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-navy-900">
              One Company. Two Digital Growth Verticals.
            </h2>
            <p className="text-sm sm:text-base text-surface-500 leading-relaxed">
              Namah Siddham Corporation Private Limited operates across two complementary business domains. We combine engineering excellence for custom digital solutions with the strategic development of focused online marketplaces and aggregator networks.
            </p>
          </div>

          {/* Two Professional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Card 1: IT Services */}
            <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200 hover:border-royal-500/40 hover:shadow-soft-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-royal-50 border border-royal-200 text-royal-600 flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-navy-900">
                  1. IT Services and Digital Solutions
                </h3>
                <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
                  Tailored corporate websites, business management systems, custom software, ERP, mobile apps, and search marketing built for business efficiency and modern digital visibility.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-200">
                <Link
                  to="/services"
                  className="inline-flex items-center text-xs font-bold text-royal-600 hover:text-royal-700 group"
                >
                  <span>Explore IT Services &amp; Capabilities</span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 2: Digital Products & Aggregators */}
            <div className="bg-surface-100 rounded-2xl p-8 border border-surface-200 hover:border-orange-500/40 hover:shadow-soft-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-navy-900">
                  2. Digital Products and Aggregator Platforms
                </h3>
                <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
                  Specialized multi-sided platforms connecting consumers with vetted home technicians, mobility fleet hosts, authentic satvik merchants, and multi-category e-commerce sellers.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-200">
                <Link
                  to="/products"
                  className="inline-flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 group"
                >
                  <span>Explore Digital Products Ecosystem</span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: IT SERVICES (Database-driven) */}
      {/* ========================================================================= */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
              Vertical 1: IT Services
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-navy-900">
              IT Services and Digital Solutions
            </h2>
            <p className="text-sm sm:text-base text-surface-500 max-w-2xl">
              Engineered with modern full-stack architectures to solve real business operational requirements.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-royal-600 hover:text-royal-700"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.slug || service._id}
                className="bg-white rounded-2xl p-7 border border-surface-200 shadow-soft-sm hover:shadow-soft-md hover:border-royal-500/40 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center group-hover:bg-royal-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-navy-900 group-hover:text-royal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-200">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-royal-600 hover:text-royal-700 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: OUR DIGITAL PRODUCTS (Database-driven) */}
      {/* ========================================================================= */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-serif">
              Vertical 2: Digital Marketplaces
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-navy-900">
              Our Digital Products &amp; Aggregator Platforms
            </h2>
            <p className="text-sm sm:text-base text-surface-500 max-w-2xl">
              Specialized platforms in home repair, mobility, community commerce, and consumer marketplaces.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            <span>View All Platforms</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => {
            const isLive = platform.status === 'Live';
            const isUnderDev = platform.status === 'Under Development';
            const isComingSoon = platform.status === 'Coming Soon';

            return (
              <div
                key={platform.slug || platform._id}
                className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-surface-500 uppercase tracking-wider truncate">
                      {platform.category}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 font-mono ${
                        isLive
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isUnderDev
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}
                    >
                      {platform.status}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-navy-900">
                    <Link to={`/products/${platform.slug}`} className="hover:text-royal-600 transition-colors">
                      {platform.name}
                    </Link>
                  </h3>

                  <p className="text-xs text-surface-500 line-clamp-3 leading-relaxed">
                    {platform.shortDescription}
                  </p>

                  {/* Key Features Pill list */}
                  {platform.keyFeatures && platform.keyFeatures.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {platform.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start text-[11px] text-navy-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-royal-500 mr-1.5 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-surface-200 flex items-center justify-between gap-2">
                  <Link
                    to={`/products/${platform.slug}`}
                    className="text-xs font-bold text-navy-900 hover:text-royal-600"
                  >
                    View Details
                  </Link>

                  {platform.websiteUrl && (
                    <a
                      href={platform.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                        isLive
                          ? 'bg-royal-500 hover:bg-royal-600 text-white'
                          : 'bg-surface-200 hover:bg-surface-300 text-navy-800'
                      }`}
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: WHY CHOOSE US */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
            Our Approach &amp; Capabilities
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-4xl text-navy-900">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-surface-500">
            A structured, engineering-first methodology focused on technical scalability, partner viability, and dependable operational standards.
          </p>
        </div>

        {/* Six Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-7 border border-surface-200 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-900">Technology-Driven Approach</h3>
            <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
              We leverage modern frameworks (React, Node.js, MongoDB, microservices) to ensure responsive performance, clean code architecture, and high data reliability.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-surface-200 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-900">Business-Focused Solutions</h3>
            <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
              Every system is engineered to solve concrete operational requirements, eliminate manual errors, streamline booking workflows, and improve commercial turnaround.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-surface-200 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-900">Custom Development Capabilities</h3>
            <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
              From tailored administrative management dashboards to multi-sided aggregator engines, we build bespoke software fitted to exact business specifications.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-surface-200 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-900">Multiple Digital Business Verticals</h3>
            <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
              Operating both client software engineering and dedicated digital marketplaces provides real-world domain insights into customer journeys and vendor management.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-surface-200 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-900">Scalable Platform Architecture</h3>
            <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
              Our platforms are built with modular schemas, secure REST APIs, role-based authorization, and indexed databases ready to accommodate growing catalog and booking volumes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-surface-200 shadow-soft-sm space-y-3 hover:shadow-soft-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Handshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-navy-900">Focus on Customer and Partner Experience</h3>
            <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
              We design transparent onboarding, upfront service guidelines, verified merchant relationships, and clear communication channels across every user touchpoint.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: HOW OUR BUSINESS MODEL WORKS */}
      {/* ========================================================================= */}
      <section className="bg-navy-950 text-white py-20 border-y border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Operational Framework
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-white">
              How Our Business Model Works
            </h2>
            <p className="text-xs sm:text-sm text-surface-300">
              A structured digital flow connecting everyday needs with specialized platform solutions and verified providers.
            </p>
          </div>

          {/* Visual Step-by-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-navy-900/90 border border-navy-800 rounded-2xl p-5 space-y-2 text-center relative">
              <div className="w-8 h-8 rounded-full bg-royal-500/20 border border-royal-400 text-royal-300 font-bold text-xs mx-auto flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-sm text-white">Customer Need</h4>
              <p className="text-[11px] text-surface-400">
                A customer identifies a requirement for home appliance repair, mobility rental, satvik groceries, or retail products.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-navy-900/90 border border-navy-800 rounded-2xl p-5 space-y-2 text-center relative">
              <div className="w-8 h-8 rounded-full bg-royal-500/20 border border-royal-400 text-royal-300 font-bold text-xs mx-auto flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-sm text-white">Specialized Digital Platform</h4>
              <p className="text-[11px] text-surface-400">
                Access through dedicated platform properties (HomeServixo, Carrento, Jainamshree, SuperiorMart).
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-navy-900/90 border border-navy-800 rounded-2xl p-5 space-y-2 text-center relative">
              <div className="w-8 h-8 rounded-full bg-royal-500/20 border border-royal-400 text-royal-300 font-bold text-xs mx-auto flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-sm text-white">Discovery, Booking or Ordering</h4>
              <p className="text-[11px] text-surface-400">
                Intuitive search, transparent pricing estimates, schedule selection, or digital cart checkout.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-navy-900/90 border border-navy-800 rounded-2xl p-5 space-y-2 text-center relative">
              <div className="w-8 h-8 rounded-full bg-royal-500/20 border border-royal-400 text-royal-300 font-bold text-xs mx-auto flex items-center justify-center">
                4
              </div>
              <h4 className="font-bold text-sm text-white">Relevant Seller or Partner</h4>
              <p className="text-[11px] text-surface-400">
                Matched with verified local technicians, car fleet hosts, or verified retail vendor partners.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-navy-900/90 border border-navy-800 rounded-2xl p-5 space-y-2 text-center relative">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400 text-gold-300 font-bold text-xs mx-auto flex items-center justify-center">
                5
              </div>
              <h4 className="font-bold text-sm text-white">Fulfillment &amp; Support</h4>
              <p className="text-[11px] text-surface-400">
                Service fulfilled according to the platform’s distinct operating guidelines and partner arrangements.
              </p>
            </div>
          </div>

          {/* Operational Clarity Disclosure */}
          <div className="bg-navy-900 border border-navy-800 rounded-2xl p-6 text-xs text-surface-300 space-y-2 max-w-4xl mx-auto flex items-start space-x-3">
            <Info className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-1">Operational Model Notice:</span>
              Individual platforms utilize different transaction, payment, fulfillment, and customer support arrangements based on industry sector. Namah Siddham Corporation Private Limited provides the holding, technological, and architectural framework; payments and fulfillment follow each platform’s documented operating agreement.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: PORTFOLIO */}
      {/* ========================================================================= */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
              Engineering Showcase
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-navy-900">
              Selected Projects &amp; Case Studies
            </h2>
            <p className="text-sm sm:text-base text-surface-500 max-w-2xl">
              Completed software architectures, digital platform demonstrations, and internal technology implementations.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-royal-600 hover:text-royal-700"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolio.map((proj) => (
            <div
              key={proj.slug || proj._id}
              className="bg-white rounded-2xl overflow-hidden border border-surface-200 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-royal-600 uppercase tracking-wider font-mono">
                    {proj.industry}
                  </span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-surface-200 text-surface-600 font-mono">
                    {proj.projectType}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-navy-900 hover:text-royal-600 transition-colors">
                  <Link to={`/portfolio/${proj.slug}`}>{proj.name}</Link>
                </h3>

                <p className="text-xs text-surface-500 line-clamp-3 leading-relaxed">
                  {proj.shortDescription}
                </p>

                {/* Technologies */}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-surface-100 text-surface-600 border border-surface-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 py-3.5 bg-surface-50 border-t border-surface-200 flex items-center justify-between text-xs">
                <Link
                  to={`/portfolio/${proj.slug}`}
                  className="font-bold text-royal-600 hover:underline flex items-center"
                >
                  <span>Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>

                {proj.projectUrl && (
                  <a
                    href={proj.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-surface-500 hover:text-navy-900 inline-flex items-center"
                  >
                    <span>Visit Link</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H: PARTNER WITH US */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 sm:p-14 text-white border border-navy-800 shadow-soft-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Collaboration &amp; Network
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-white">
              Partner With Us
            </h2>
            <p className="text-sm sm:text-base text-surface-300 leading-relaxed font-light">
              We invite certified professionals, vehicle owners, retail distributors, and business enterprises to join our digital growth initiatives.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-xs">
            <div className="bg-navy-900/90 border border-navy-800 rounded-xl p-3.5 text-center space-y-1">
              <span className="font-bold text-white block">Home Service Pros</span>
              <span className="text-[10px] text-surface-400">Technicians &amp; HVAC</span>
            </div>
            <div className="bg-navy-900/90 border border-navy-800 rounded-xl p-3.5 text-center space-y-1">
              <span className="font-bold text-white block">Car Owners</span>
              <span className="text-[10px] text-surface-400">Fleet Hosts &amp; Rentals</span>
            </div>
            <div className="bg-navy-900/90 border border-navy-800 rounded-xl p-3.5 text-center space-y-1">
              <span className="font-bold text-white block">E-commerce Vendors</span>
              <span className="text-[10px] text-surface-400">Retail &amp; Utilities</span>
            </div>
            <div className="bg-navy-900/90 border border-navy-800 rounded-xl p-3.5 text-center space-y-1">
              <span className="font-bold text-white block">Product Sellers</span>
              <span className="text-[10px] text-surface-400">Satvik Goods &amp; Puja</span>
            </div>
            <div className="bg-navy-900/90 border border-navy-800 rounded-xl p-3.5 text-center space-y-1">
              <span className="font-bold text-white block">Technology Partners</span>
              <span className="text-[10px] text-surface-400">API &amp; Cloud Infra</span>
            </div>
            <div className="bg-navy-900/90 border border-navy-800 rounded-xl p-3.5 text-center space-y-1">
              <span className="font-bold text-white block">Business Partners</span>
              <span className="text-[10px] text-surface-400">Regional Outreach</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/partners"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION I: COMPANY VISION AND MISSION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-surface-200 shadow-soft-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 border-b lg:border-b-0 lg:border-r border-surface-200 pb-8 lg:pb-0 lg:pr-8">
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif flex items-center">
              <Compass className="w-4 h-4 mr-1.5" />
              Company Vision
            </span>
            <h3 className="font-serif font-bold text-2xl text-navy-900">
              Accessible Digital Opportunity
            </h3>
            <p className="text-sm sm:text-base text-surface-600 leading-relaxed font-light italic">
              "To build accessible and scalable digital platforms that simplify everyday needs and create opportunities for people and businesses."
            </p>
          </div>

          <div className="space-y-4 lg:pl-4">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-serif flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5" />
              Company Mission
            </span>
            <h3 className="font-serif font-bold text-2xl text-navy-900">
              Technology &amp; Specialized Platforms
            </h3>
            <p className="text-sm sm:text-base text-surface-600 leading-relaxed font-light italic">
              "To combine technology, practical business solutions, and specialized online platforms to improve digital access, convenience, and collaboration."
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION J: LATEST UPDATES (Database-driven) */}
      {/* ========================================================================= */}
      {news && news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
                Corporate Communications
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-navy-900">
                Latest Updates &amp; Announcements
              </h2>
            </div>
            <Link
              to="/news"
              className="text-xs sm:text-sm font-bold text-royal-600 hover:text-royal-700"
            >
              All Updates →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm flex flex-col justify-between space-y-4 hover:shadow-soft-md transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-surface-400">
                    <span className="font-semibold text-royal-600">{item.category}</span>
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-navy-900 hover:text-royal-600 transition-colors">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-xs text-surface-500 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="text-xs font-bold text-royal-600 inline-flex items-center group pt-2"
                >
                  <span>Read Announcement</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION K: FINAL CTA */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-900 rounded-3xl p-8 sm:p-14 text-white border border-navy-800 shadow-soft-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Get Started
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-white">
              Have a Digital Idea? Let's Build It Together.
            </h2>
            <p className="text-xs sm:text-base text-surface-300 leading-relaxed font-light">
              Connect with our team to discuss software development, mobile applications, digital marketing, or opportunities across our digital platforms.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold text-sm text-center shadow-md transition-all"
            >
              Discuss Your Project
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl border border-navy-700 hover:bg-navy-800 text-surface-200 font-semibold text-sm text-center transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
