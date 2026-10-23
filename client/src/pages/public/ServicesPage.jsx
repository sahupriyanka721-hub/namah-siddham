import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Code2,
  Smartphone,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

const getServiceIcon = (icon) => {
  switch (icon) {
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

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicApi.getServices();
        setServices(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      <SeoMeta
        title="IT Services & Digital Solutions"
        description="Comprehensive IT services including Website Development, Custom Software, Mobile Applications, and Digital Marketing by Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 to-navy-900 text-white py-16 sm:py-20 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-royal-400/30 text-royal-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 mr-1" />
            <span>Vertical 1: IT Services and Digital Solutions</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            IT Services &amp; Digital Solutions
          </h1>
          <p className="text-base sm:text-lg text-surface-300 max-w-3xl leading-relaxed font-light">
            We engineer high-performance web applications, tailored ERP software, mobile apps, and search marketing architectures designed to solve business bottlenecks.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.slug || service._id}
                className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm hover:shadow-soft-md hover:border-royal-500/40 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-surface-400">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif font-bold text-2xl text-navy-900 hover:text-royal-600 transition-colors">
                      <Link to={`/services/${service.slug}`}>{service.title}</Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-surface-500 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {service.keyFeatures && (
                    <div className="space-y-2 pt-2 border-t border-surface-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-royal-600 font-serif block">
                        Key Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-navy-800">
                        {service.keyFeatures.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle2 className="w-3.5 h-3.5 text-royal-500 mr-1.5 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-surface-200 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-royal-600 hover:text-royal-700"
                  >
                    <span>Full Service Specifications</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>

                  <Link
                    to="/contact"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-navy-800 transition-colors"
                  >
                    Request Proposal
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 rounded-3xl p-8 sm:p-12 text-white border border-navy-800 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-white">Full-Stack Capability</h3>
            <p className="text-xs sm:text-sm text-surface-400 leading-relaxed">
              We own the full stack — from componentized React frontends and Tailwind styling to robust Node.js APIs and optimized MongoDB database schemas.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-white">Data Security &amp; RBAC</h3>
            <p className="text-xs sm:text-sm text-surface-400 leading-relaxed">
              Strict server-side validation, role-based authorization, bcrypt encryption, and sanitized inputs ensure confidentiality of sensitive business records.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-white">Production Deliverables</h3>
            <p className="text-xs sm:text-sm text-surface-400 leading-relaxed">
              Every deliverable includes clean documentation, source repository handover, responsive testing on multiple viewports, and administrative training.
            </p>
          </div>
        </div>
      </section>

      {/* Project CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-surface-200 shadow-soft-sm max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-navy-900">
            Have a Specific Software or Website Requirement?
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-xl mx-auto">
            Our technology team in Bhopal evaluates scope, prepares technical architecture plans, and delivers production-oriented digital assets.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>Submit Project Requirements</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
