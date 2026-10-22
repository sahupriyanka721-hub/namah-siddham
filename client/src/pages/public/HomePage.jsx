import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Users,
  Building2,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { PlatformCard } from '../../components/public/PlatformCard';
import { AggregatorFlow } from '../../components/public/AggregatorFlow';
import { SeoMeta } from '../../components/public/SeoMeta';
import { CardSkeleton } from '../../components/common/Skeleton';

export const HomePage = () => {
  const { settings } = useSettings();
  const [platforms, setPlatforms] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [platformsRes, newsRes] = await Promise.all([
          publicApi.getPlatforms(),
          publicApi.getNews(),
        ]);
        setPlatforms(platformsRes.data.data || []);
        setNews(newsRes.data.data?.slice(0, 3) || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      <SeoMeta
        title="Home"
        description="Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences."
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-forest-900 to-forest-900 text-white pt-16 pb-28 sm:pb-36 border-b border-forest-800">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span>Multi-Platform Digital Business Enterprise</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Building Digital Platforms for Everyday Needs
            </h1>

            <p className="text-base sm:text-xl text-sage-200 leading-relaxed font-normal">
              Namah Siddham Corporation Private Limited is building a portfolio of specialized digital platforms that connect people, services, sellers, and business opportunities through technology-enabled marketplace experiences.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/ecosystem"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-sm sm:text-base shadow-soft-md transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Our Platforms</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/partners"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-forest-800/80 hover:bg-forest-800 text-sage-100 border border-forest-700 font-semibold text-sm sm:text-base transition-colors"
              >
                <span>Partner With Us</span>
              </Link>
            </div>

            {/* Corporate Identification Badge */}
            <div className="pt-8 border-t border-forest-800/70 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-sage-300 font-mono">
              <div>
                <span className="text-gold-400 font-bold">CIN:</span> {settings.cin}
              </div>
              <div>
                <span className="text-gold-400 font-bold">Entity:</span> {settings.companyType}
              </div>
              <div>
                <span className="text-gold-400 font-bold">Jurisdiction:</span> Madhya Pradesh, India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sage-200 shadow-soft-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
              About The Corporate Group
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
              Purpose-Driven Marketplaces Engineered For Everyday Convenience
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              At Namah Siddham Corporation, we believe the next wave of India's digital transformation lies in category-focused depth rather than generic aggregation. By developing dedicated platforms tailored to home services, vehicle mobility, community-centered satvik commerce, and multi-category consumer retail, we ensure localized quality, verified merchants, and dependable customer satisfaction.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center text-sm font-bold text-forest-900 hover:text-forest-700 group"
              >
                <span>Discover our company philosophy & story</span>
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-forest-50 border border-forest-100 rounded-2xl p-5 text-center">
              <Building2 className="w-8 h-8 text-forest-800 mx-auto mb-2" />
              <div className="font-serif font-bold text-xl text-forest-950">4 Active</div>
              <div className="text-xs text-charcoal-600 mt-1">Ecosystem Brands</div>
            </div>
            <div className="bg-forest-50 border border-forest-100 rounded-2xl p-5 text-center">
              <ShieldCheck className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <div className="font-serif font-bold text-xl text-forest-950">100% Vetted</div>
              <div className="text-xs text-charcoal-600 mt-1">Partner Standards</div>
            </div>
            <div className="bg-forest-50 border border-forest-100 rounded-2xl p-5 text-center">
              <Zap className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <div className="font-serif font-bold text-xl text-forest-950">Agile Tech</div>
              <div className="text-xs text-charcoal-600 mt-1">Modern Microservices</div>
            </div>
            <div className="bg-forest-50 border border-forest-100 rounded-2xl p-5 text-center">
              <Target className="w-8 h-8 text-forest-800 mx-auto mb-2" />
              <div className="font-serif font-bold text-xl text-forest-950">Direct Impact</div>
              <div className="text-xs text-charcoal-600 mt-1">Consumer Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR DIGITAL ECOSYSTEM */}
      <section id="platforms" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
              Portfolio Ecosystem
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-forest-950">
              Our Digital Marketplace Platforms
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl">
              Explore our core digital operating brands, each built to solve unique accessibility and service challenges across India.
            </p>
          </div>
          <Link
            to="/ecosystem"
            className="inline-flex items-center text-sm font-bold text-forest-900 hover:text-forest-700"
          >
            <span>View All Platforms</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform) => (
              <PlatformCard key={platform._id} platform={platform} />
            ))}
          </div>
        )}
      </section>

      {/* 4. HOW OUR AGGREGATOR MODEL WORKS */}
      <section className="bg-forest-900 text-white py-20 border-y border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Operational Framework
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-white">
              How Our Aggregator Model Works
            </h2>
            <p className="text-sm sm:text-base text-sage-200">
              A transparent, reliable orchestration connecting consumer needs directly to certified independent professionals, vendors, and mobility operators.
            </p>
          </div>

          <AggregatorFlow />
        </div>
      </section>

      {/* 5. WHY CHOOSE OUR PLATFORMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
            The Namah Siddham Advantage
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-4xl text-forest-950">
            Why Choose Our Platforms
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600">
            Engineered from the ground up for consumer convenience, partner viability, and operational transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-forest-950">Vetted Partner Network</h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              We do not accept anonymous listings. Every service technician, vehicle host, and retail seller goes through verification checks and standard compliance protocols.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-gold-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-forest-950">Seamless Technology</h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Intuitive responsive web interfaces, rapid search, clear upfront pricing, and streamlined booking experiences tailored specifically to each sector.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-forest-950">Transparent Operations</h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Fair commission policies for partners, honest pricing with zero hidden surcharges for users, and a dedicated grievance resolution mechanism.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISION AND MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 rounded-3xl p-8 sm:p-14 text-white border border-forest-800 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 border-b lg:border-b-0 lg:border-r border-forest-800 pb-8 lg:pb-0 lg:pr-8">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Our Vision
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Accessible Digital Empowerment
            </h3>
            <p className="text-base text-sage-200 leading-relaxed font-light">
              "To build accessible, scalable digital platforms that simplify everyday needs and create meaningful opportunities for customers, service providers, and businesses."
            </p>
          </div>

          <div className="space-y-4 lg:pl-4">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Our Mission
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Convenient, Specialized Marketplaces
            </h3>
            <p className="text-base text-sage-200 leading-relaxed font-light">
              "To develop and operate specialized online platforms that make discovering services, booking mobility solutions, and accessing digital commerce more convenient."
            </p>
          </div>
        </div>
      </section>

      {/* 7. LATEST NEWS & ANNOUNCEMENTS */}
      {news && news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
                Corporate Communications
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
                Latest News & Announcements
              </h2>
            </div>
            <Link
              to="/news"
              className="text-xs sm:text-sm font-bold text-forest-900 hover:text-forest-700"
            >
              All News →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm flex flex-col justify-between space-y-4 hover:shadow-soft-md transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-charcoal-400">
                    <span>{item.category}</span>
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-forest-950 hover:text-forest-800">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-xs text-charcoal-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="text-xs font-bold text-forest-900 inline-flex items-center group pt-2"
                >
                  <span>Read Full Article</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. BUSINESS INQUIRY & COLLABORATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest-950 to-forest-900 rounded-3xl p-8 sm:p-12 text-white border border-forest-800 shadow-soft-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Collaborate With Us
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-white">
              Ready to Expand Your Reach With Our Ecosystem?
            </h2>
            <p className="text-sm sm:text-base text-sage-200 leading-relaxed font-light">
              We collaborate with home technicians, automobile fleet operators, certified community merchants, and strategic corporate partners across India.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/partners"
              className="px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-sm text-center shadow-md transition-all"
            >
              Submit Partner Inquiry
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl border border-forest-700 hover:bg-forest-800 text-sage-200 font-semibold text-sm text-center transition-colors"
            >
              Corporate Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
