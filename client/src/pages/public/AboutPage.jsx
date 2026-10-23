import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Compass,
  Lightbulb,
  Users2,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  Building,
  Code2,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';

export const AboutPage = () => {
  const { settings } = useSettings();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await publicApi.getPageBySlug('about');
        if (res.data?.data) {
          setContent(res.data.data);
        }
      } catch (err) {
        console.warn('Using default about page content');
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const heroHeadline =
    content?.heroHeadline || 'One Company. Two Digital Growth Verticals.';
  const heroDesc =
    content?.heroDescription ||
    'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.';

  const visionText =
    content?.sections?.vision ||
    'To build accessible and scalable digital platforms that simplify everyday needs and create opportunities for people and businesses.';

  const missionText =
    content?.sections?.mission ||
    'To combine technology, practical business solutions, and specialized online platforms to improve digital access, convenience, and collaboration.';

  return (
    <div className="space-y-20 pb-20">
      <SeoMeta
        title="About Us"
        description="Learn about Namah Siddham Corporation Private Limited, our mission, vision, Bhopal registered office, and two growth verticals across IT solutions and aggregator platforms."
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 to-navy-900 text-white py-20 border-b border-navy-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-royal-400/30 text-royal-300 text-xs font-semibold">
            <span>Corporate Information • CIN: {settings.cin || 'U77100MP2026PTC087531'}</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            {heroHeadline}
          </h1>
          <p className="text-base sm:text-lg text-surface-300 max-w-3xl leading-relaxed font-light">
            {heroDesc}
          </p>
        </div>
      </section>

      {/* Company Story & Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
              Corporate Background &amp; Focus
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-navy-900">
              Building Sustainable Digital Infrastructure in India
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-surface-600 leading-relaxed">
              <p>
                <strong>Namah Siddham Corporation Private Limited</strong> (CIN: {settings.cin || 'U77100MP2026PTC087531'}) is an Indian corporate enterprise headquartered in Bhopal, Madhya Pradesh. The company is structured across two distinct business verticals designed to foster digital growth:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 space-y-2">
                  <div className="flex items-center space-x-2 text-royal-600 font-bold text-xs uppercase font-serif">
                    <Code2 className="w-4 h-4" />
                    <span>Vertical 1: IT Services</span>
                  </div>
                  <p className="text-xs text-surface-500">
                    Bespoke website development, enterprise software, custom CRM/ERP systems, mobile applications, and search engine optimization.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 space-y-2">
                  <div className="flex items-center space-x-2 text-orange-600 font-bold text-xs uppercase font-serif">
                    <Layers className="w-4 h-4" />
                    <span>Vertical 2: Digital Marketplaces</span>
                  </div>
                  <p className="text-xs text-surface-500">
                    Category-specific aggregator platforms: HomeServixo (home repair), Carrento (mobility), Jainamshree (satvik commerce), and SuperiorMart (multi-category).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="border-l-2 border-royal-500 pl-4 py-1">
                <div className="text-xs text-surface-400 font-medium">Corporate Registration</div>
                <div className="text-xs sm:text-sm font-bold text-navy-900 font-mono">{settings.cin || 'U77100MP2026PTC087531'}</div>
              </div>
              <div className="border-l-2 border-royal-500 pl-4 py-1">
                <div className="text-xs text-surface-400 font-medium">Headquarters</div>
                <div className="text-xs sm:text-sm font-bold text-navy-900">Bhopal, Madhya Pradesh, India</div>
              </div>
              <div className="border-l-2 border-royal-500 pl-4 py-1">
                <div className="text-xs text-surface-400 font-medium">Structure</div>
                <div className="text-xs sm:text-sm font-bold text-navy-900">Private Limited Company</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-surface-100 border border-surface-200 rounded-3xl p-8 space-y-6">
            <h3 className="font-serif font-bold text-xl text-navy-900 flex items-center">
              <Building className="w-5 h-5 mr-2 text-royal-600" />
              Corporate Identity &amp; Governance
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-surface-600">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-royal-500 mr-2 mt-0.5 shrink-0" />
                <span>Incorporated under the Indian Companies Act, 2013</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-royal-500 mr-2 mt-0.5 shrink-0" />
                <span>Registered office situated in Bhopal, Madhya Pradesh</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-royal-500 mr-2 mt-0.5 shrink-0" />
                <span>Strict statutory data protection and consumer privacy standards</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-royal-500 mr-2 mt-0.5 shrink-0" />
                <span>Transparent platform partner terms and documented service commitments</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-navy-900 rounded-3xl p-8 sm:p-10 text-white border border-navy-800 shadow-soft-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center text-gold-400">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Corporate Vision
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Accessible Digital Opportunity
            </h3>
            <p className="text-sm sm:text-base text-surface-300 leading-relaxed font-light italic">
              "{visionText}"
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-surface-200 shadow-soft-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-royal-50 border border-royal-100 flex items-center justify-center text-royal-600">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
              Corporate Mission
            </span>
            <h3 className="font-serif font-bold text-2xl text-navy-900">
              Technology &amp; Practical Solutions
            </h3>
            <p className="text-sm sm:text-base text-surface-600 leading-relaxed font-light italic">
              "{missionText}"
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
            Operating Fundamentals
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-navy-900">
            How We Build and Operate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-navy-900">Technology-Driven</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              We leverage cloud microservices, reactive UI frameworks, and automated matching workflows to give customers and partners dependable software.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-navy-900">Customer Value</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Eliminating friction with upfront estimates, verified technicians, and clear communication channels across every service interaction.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Users2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-navy-900">Partner Viability</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Treating technicians, vehicle hosts, and retail merchants as long-term collaborators by offering transparent economics and booking demand.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-navy-900">Responsible Governance</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Committed to responsible data handling, compliance with Indian regulatory frameworks, and honest communications without misleading claims.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-surface-100 rounded-3xl p-10 space-y-4">
          <h3 className="font-serif font-bold text-2xl text-navy-900">
            Collaborate With Namah Siddham Corporation
          </h3>
          <p className="text-xs sm:text-sm text-surface-500 max-w-xl mx-auto">
            Connect with our corporate office in Bhopal to discuss software development, mobile solutions, or marketplace partnerships.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/services"
              className="px-6 py-2.5 rounded-xl bg-royal-500 text-white font-bold text-xs sm:text-sm hover:bg-royal-600 shadow-sm"
            >
              Explore IT Services
            </Link>
            <Link
              to="/partners"
              className="px-6 py-2.5 rounded-xl border border-navy-800 text-navy-900 font-bold text-xs sm:text-sm hover:bg-white"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
