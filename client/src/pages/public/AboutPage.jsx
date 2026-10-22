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
    content?.heroHeadline || 'Building Scalable Digital Marketplaces For India';
  const heroDesc =
    content?.heroDescription ||
    'Namah Siddham Corporation Private Limited operates a portfolio of digital platforms that empower local service experts, mobility hosts, and retail merchants while offering unmatched convenience to everyday consumers.';

  const visionText =
    content?.sections?.vision ||
    'To build accessible, scalable digital platforms that simplify everyday needs and create meaningful opportunities for customers, service providers, and businesses.';

  const missionText =
    content?.sections?.mission ||
    'To develop and operate specialized online platforms that make discovering services, booking mobility solutions, and accessing digital commerce more convenient.';

  return (
    <div className="space-y-20 pb-20">
      <SeoMeta
        title="About Us"
        description="Learn about Namah Siddham Corporation Private Limited, our mission, vision, operating philosophy, and multi-platform digital business ecosystem."
      />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-20 border-b border-forest-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <span>Corporate Overview</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            {heroHeadline}
          </h1>
          <p className="text-base sm:text-lg text-sage-200 max-w-3xl leading-relaxed font-light">
            {heroDesc}
          </p>
        </div>
      </section>

      {/* Company Story & Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
              Our Story & Founding Purpose
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
              Transforming Fragmented Service & Retail Sectors
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-charcoal-700 leading-relaxed">
              <p>
                <strong>Namah Siddham Corporation Private Limited</strong> (CIN: {settings.cin}) was incorporated to solve a persistent friction in India’s everyday consumer economy: the fragmentation between regional service providers and households seeking reliable, quality-assured assistance.
              </p>
              <p>
                Rather than treating all commerce under an undifferentiated single banner, our corporate strategy builds focused marketplace platforms tailored specifically to individual sectors. Whether it is home appliance repairs via <strong>HomeServixo</strong>, seamless car rentals via <strong>Carrento</strong>, authentic community-tailored satvik commerce through <strong>Jainamshree</strong>, or everyday multi-category shopping on <strong>SuperiorMart</strong>, each brand addresses specialized user requirements with deep operational rigor.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <div className="border-l-2 border-gold-500 pl-4 py-1">
                <div className="text-xs text-charcoal-500 font-medium">Corporate Registration</div>
                <div className="text-sm font-bold text-forest-950 font-mono">{settings.cin}</div>
              </div>
              <div className="border-l-2 border-gold-500 pl-4 py-1">
                <div className="text-xs text-charcoal-500 font-medium">Corporate Structure</div>
                <div className="text-sm font-bold text-forest-950">{settings.companyType}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-sage-50 border border-sage-200 rounded-3xl p-8 space-y-6">
            <h3 className="font-serif font-bold text-xl text-forest-950 flex items-center">
              <Building className="w-5 h-5 mr-2 text-forest-800" />
              Corporate Identity
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-charcoal-700">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mr-2 mt-0.5 shrink-0" />
                <span>Incorporated under the Indian Companies Act, 2013</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mr-2 mt-0.5 shrink-0" />
                <span>Headquartered with registered presence in Madhya Pradesh, India</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mr-2 mt-0.5 shrink-0" />
                <span>Strict statutory, consumer, and digital privacy compliance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mr-2 mt-0.5 shrink-0" />
                <span>Independent platform governance with transparent operational models</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-forest-900 rounded-3xl p-8 sm:p-10 text-white border border-forest-800 shadow-soft-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-800 flex items-center justify-center text-gold-400">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest font-serif">
              Our Corporate Vision
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Accessible Digital Opportunity
            </h3>
            <p className="text-base text-sage-200 leading-relaxed font-light italic">
              "{visionText}"
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sage-200 shadow-soft-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
              Our Corporate Mission
            </span>
            <h3 className="font-serif font-bold text-2xl text-forest-950">
              Reliable, Sector-Specific Value
            </h3>
            <p className="text-base text-charcoal-700 leading-relaxed font-light italic">
              "{missionText}"
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars: Philosophy, Tech, Convenience, Ethics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
            Operating Fundamentals
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
            How We Build And Operate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest-950">
              Technology-Driven
            </h4>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              We leverage cloud microservices, reactive UI frameworks, and automated matching workflows to give customers and vendors responsive real-time platform experiences.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-forest-50 text-gold-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest-950">
              Customer Convenience
            </h4>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Eliminating guesswork with upfront estimates, verified technicians, and clear communication channels to ensure dependable customer satisfaction.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center">
              <Users2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest-950">
              Partner Ecosystem
            </h4>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Treating technicians, drivers, vehicle hosts, and merchants as strategic partners by offering them fair economics and verified booking demand.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-forest-50 text-gold-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest-950">
              Responsible & Transparent
            </h4>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Committed to responsible data handling, compliance with Indian regulatory frameworks, and honest communications without deceptive practices.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-sage-100 rounded-3xl p-10 space-y-4">
          <h3 className="font-serif font-bold text-2xl text-forest-950">
            Want to Collaborate with Namah Siddham Corporation?
          </h3>
          <p className="text-sm text-charcoal-600 max-w-xl mx-auto">
            Explore our ecosystem platforms or connect directly with our corporate team to discuss partnerships.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/ecosystem"
              className="px-6 py-2.5 rounded-lg bg-forest-900 text-white font-bold text-sm hover:bg-forest-800"
            >
              Our Platforms
            </Link>
            <Link
              to="/partners"
              className="px-6 py-2.5 rounded-lg border border-forest-800 text-forest-900 font-bold text-sm hover:bg-white"
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
