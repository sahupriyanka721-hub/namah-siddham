import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Users,
  Target,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';
import { Badge } from '../../components/common/Badge';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const [platform, setPlatform] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlatform = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await publicApi.getPlatformBySlug(slug);
        if (res.data?.data) {
          setPlatform(res.data.data);
          setRelated(res.data.related || []);
        } else {
          setError('Platform details not found.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Platform not found or currently unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlatform();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-forest-900 border-t-gold-400 rounded-full animate-spin mx-auto" />
        <p className="text-sm text-charcoal-500">Loading platform details...</p>
      </div>
    );
  }

  if (error || !platform) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-forest-950">Platform Unavailable</h2>
        <p className="text-sm text-charcoal-600 max-w-md mx-auto">{error}</p>
        <div>
          <Link
            to="/ecosystem"
            className="inline-flex items-center px-4 py-2 text-xs font-bold rounded-lg bg-forest-900 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ecosystem
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    category,
    shortDescription,
    detailedDescription,
    websiteUrl,
    keyFeatures = [],
    targetAudience,
    useCases = [],
    howItWorks = [],
    status,
    seoTitle,
    seoDescription,
  } = platform;

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title={seoTitle || name}
        description={seoDescription || shortDescription}
      />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-sage-300">
            <Link to="/ecosystem" className="hover:text-gold-300 transition-colors">
              Ecosystem
            </Link>
            <span>/</span>
            <span className="text-gold-400">{name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
                  {name}
                </h1>
                <Badge status={status}>{status}</Badge>
              </div>
              <p className="text-sm font-semibold text-gold-400 uppercase tracking-wider font-serif">
                {category}
              </p>
            </div>

            {websiteUrl && (
              <div>
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <span>Visit Official Website</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Detailed Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Introduction */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
                Platform Overview
              </span>
              <h2 className="font-serif font-bold text-2xl text-forest-950">
                About {name}
              </h2>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed whitespace-pre-line">
                {detailedDescription || shortDescription}
              </p>
            </div>

            {/* Platform Features */}
            {keyFeatures && keyFeatures.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-sage-200">
                <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
                  Value Proposition
                </span>
                <h3 className="font-serif font-bold text-xl text-forest-950">
                  Key Capabilities & Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 border border-sage-200 shadow-soft-sm flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-forest-700 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-forest-950">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How It Works */}
            {howItWorks && howItWorks.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-sage-200">
                <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
                  Workflow Flow
                </span>
                <h3 className="font-serif font-bold text-xl text-forest-950">
                  How {name} Operates
                </h3>
                <div className="space-y-3">
                  {howItWorks.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-sage-50 rounded-xl p-4 border border-sage-200 flex items-start space-x-4"
                    >
                      <div className="w-7 h-7 rounded-full bg-forest-900 text-gold-300 font-serif font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Use Cases */}
            {useCases && useCases.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-sage-200">
                <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
                  Applications
                </span>
                <h3 className="font-serif font-bold text-xl text-forest-950">
                  Primary Use Cases
                </h3>
                <ul className="space-y-2">
                  {useCases.map((uc, idx) => (
                    <li key={idx} className="flex items-start text-xs sm:text-sm text-charcoal-700">
                      <Target className="w-4 h-4 text-gold-600 mr-2.5 mt-0.5 shrink-0" />
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar Meta & Related */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Summary Card */}
            <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm space-y-5">
              <h4 className="font-serif font-bold text-base text-forest-950 border-b border-sage-200 pb-3">
                Platform Summary
              </h4>

              {targetAudience && (
                <div className="space-y-1">
                  <div className="text-xs font-bold text-forest-900 flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-gold-600" />
                    Target Audience
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{targetAudience}</p>
                </div>
              )}

              <div className="space-y-1">
                <div className="text-xs font-bold text-forest-900">Parent Entity</div>
                <p className="text-xs text-charcoal-600">Namah Siddham Corporation Pvt Ltd</p>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-forest-900">Governance & Compliance</div>
                <p className="text-xs text-charcoal-600">Standard verified merchant & vendor agreements</p>
              </div>

              {websiteUrl && (
                <div className="pt-2">
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-forest-900 text-white font-bold text-xs hover:bg-forest-800 shadow-sm transition-all"
                  >
                    <span>Open {name} Website</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Related Platforms */}
            {related && related.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm space-y-4">
                <h4 className="font-serif font-bold text-base text-forest-950 border-b border-sage-200 pb-3">
                  Other Ecosystem Platforms
                </h4>
                <div className="space-y-3">
                  {related.map((rel) => (
                    <Link
                      key={rel._id}
                      to={`/ecosystem/${rel.slug}`}
                      className="block p-3 rounded-xl bg-sage-50 hover:bg-sage-100 transition-colors border border-sage-200/70"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs text-forest-950">
                          {rel.name}
                        </span>
                        <span className="text-[10px] text-gold-600 font-semibold uppercase">
                          {rel.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-charcoal-500 line-clamp-1 mt-1">
                        {rel.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
