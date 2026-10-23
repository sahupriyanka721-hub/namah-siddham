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
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Send,
  Building,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const [platform, setPlatform] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Partnership inquiry modal / form state for under-development platforms
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    category: 'Product Partnership',
    message: '',
    consent: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

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

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (
      !partnerForm.name ||
      !partnerForm.businessName ||
      !partnerForm.email ||
      !partnerForm.phone ||
      !partnerForm.city ||
      !partnerForm.message
    ) {
      setSubmitError('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...partnerForm,
        state: partnerForm.state || 'Madhya Pradesh',
        platform: platform?.name || 'General Platform Inquiry',
      };
      const res = await publicApi.submitPartnerInquiry(payload);
      if (res.data?.success) {
        setSubmitSuccess({
          message: res.data.message || 'Partnership inquiry registered.',
          referenceId: res.data.referenceId,
        });
        setPartnerForm({
          name: '',
          businessName: '',
          email: '',
          phone: '',
          city: '',
          state: '',
          category: 'Product Partnership',
          message: '',
          consent: true,
        });
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-surface-500">Loading product details...</p>
      </div>
    );
  }

  if (error || !platform) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <Layers className="w-7 h-7" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-navy-900">Platform Not Found</h2>
        <p className="text-xs sm:text-sm text-surface-500 max-w-md mx-auto">{error}</p>
        <div>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 text-xs font-bold rounded-lg bg-royal-500 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products Ecosystem
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
    problemSolved,
    websiteUrl,
    keyFeatures = [],
    targetAudience,
    useCases = [],
    howItWorks = [],
    partnerOpportunities,
    status = 'Under Development',
    seoTitle,
    seoDescription,
  } = platform;

  const isLive = status === 'Live';
  const isUnderDev = status === 'Under Development';
  const isComingSoon = status === 'Coming Soon';

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title={seoTitle || `${name} — ${category}`}
        description={seoDescription || shortDescription}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 text-white py-14 sm:py-18 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs text-surface-400">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-white">
              Our Products
            </Link>
            <span>/</span>
            <span className="text-gold-400 font-semibold">{name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-white">
                  {name}
                </h1>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono ${
                    isLive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : isUnderDev
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}
                >
                  {status}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gold-400 uppercase tracking-wider font-serif">
                {category}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${
                    isLive
                      ? 'bg-royal-500 hover:bg-royal-600 text-white'
                      : 'bg-navy-800 hover:bg-navy-700 text-surface-200 border border-navy-700'
                  }`}
                >
                  <span>Visit Official Website</span>
                  <ExternalLink className="w-4 h-4 ml-1.5" />
                </a>
              )}

              {isUnderDev && (
                <button
                  onClick={() => setPartnerModalOpen(true)}
                  className="inline-flex items-center px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>Partner Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Status Notice if Under Development */}
            {isUnderDev && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start space-x-3 text-xs text-amber-900">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">Platform Under Active Development</span>
                  {name} is currently undergoing technical engineering and partner network onboarding. The platform is scheduled for deployment following integration milestones. Inquiries regarding pilot participation and merchant partnerships are currently welcome.
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-4">
              <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
                Overview
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-navy-900">
                About {name}
              </h2>
              <p className="text-xs sm:text-sm text-surface-600 leading-relaxed whitespace-pre-line">
                {detailedDescription || shortDescription}
              </p>
            </div>

            {/* Problem It Aims to Solve */}
            {problemSolved && (
              <div className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-3">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-serif flex items-center">
                  <Target className="w-4 h-4 mr-1.5" />
                  Problem It Aims to Solve
                </span>
                <h3 className="font-serif font-bold text-lg text-navy-900">
                  Marketplace Inefficiencies We Address
                </h3>
                <p className="text-xs sm:text-sm text-surface-600 leading-relaxed">
                  {problemSolved}
                </p>
              </div>
            )}

            {/* Key Features */}
            {keyFeatures && keyFeatures.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-5">
                <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
                  Platform Features
                </span>
                <h3 className="font-serif font-bold text-lg text-navy-900">
                  Key Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-50 rounded-xl p-4 border border-surface-200 flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-royal-500 mt-0.5 shrink-0" />
                      <span className="text-xs font-medium text-navy-900">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How The Platform Works */}
            {howItWorks && howItWorks.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-5">
                <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
                  Operational Workflow
                </span>
                <h3 className="font-serif font-bold text-lg text-navy-900">
                  How {name} Works
                </h3>
                <div className="space-y-3">
                  {howItWorks.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-50 rounded-xl p-4 border border-surface-200 flex items-start space-x-4"
                    >
                      <div className="w-7 h-7 rounded-full bg-royal-500 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-surface-600 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Intended Users & Partner Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {targetAudience && (
                <div className="bg-white rounded-3xl p-7 border border-surface-200 shadow-soft-sm space-y-3">
                  <div className="flex items-center space-x-2 text-royal-600 font-bold text-xs uppercase tracking-wider font-serif">
                    <Users className="w-4 h-4" />
                    <span>Intended Users</span>
                  </div>
                  <p className="text-xs text-surface-600 leading-relaxed">{targetAudience}</p>
                </div>
              )}

              {partnerOpportunities && (
                <div className="bg-white rounded-3xl p-7 border border-surface-200 shadow-soft-sm space-y-3">
                  <div className="flex items-center space-x-2 text-orange-600 font-bold text-xs uppercase tracking-wider font-serif">
                    <Sparkles className="w-4 h-4" />
                    <span>Partner Opportunities</span>
                  </div>
                  <p className="text-xs text-surface-600 leading-relaxed">
                    {partnerOpportunities}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Meta & Related */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-soft-sm space-y-5">
              <h4 className="font-serif font-bold text-sm text-navy-900 border-b border-surface-200 pb-3">
                Platform Information
              </h4>

              <div className="space-y-3 text-xs text-surface-600">
                <div>
                  <span className="font-bold text-navy-900 block">Operating Domain:</span>
                  <span>{category}</span>
                </div>
                <div>
                  <span className="font-bold text-navy-900 block">Development Status:</span>
                  <span className="inline-block mt-0.5 font-mono text-[10px] px-2 py-0.5 rounded bg-surface-100 border border-surface-200 font-bold">
                    {status}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-navy-900 block">Corporate Operating Entity:</span>
                  <span>Namah Siddham Corporation Private Limited</span>
                </div>
                <div>
                  <span className="font-bold text-navy-900 block">Location:</span>
                  <span>Bhopal, Madhya Pradesh, India</span>
                </div>
              </div>

              {websiteUrl && (
                <div className="pt-2">
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-navy-900 text-white font-bold text-xs hover:bg-navy-800 shadow-sm transition-all"
                  >
                    <span>Visit {name} Website</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Related Platforms */}
            {related && related.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-soft-sm space-y-4">
                <h4 className="font-serif font-bold text-sm text-navy-900 border-b border-surface-200 pb-3">
                  Related Platforms
                </h4>
                <div className="space-y-3">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug || rel._id}
                      to={`/products/${rel.slug}`}
                      className="block p-3.5 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors border border-surface-200/80"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs text-navy-900">
                          {rel.name}
                        </span>
                        <span className="text-[9px] text-surface-500 font-mono">
                          {rel.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-surface-500 line-clamp-1 mt-1">
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

      {/* Partnership Inquiry Modal */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 border border-surface-200 shadow-soft-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-surface-200 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-navy-900">
                  Partner with {name}
                </h3>
                <p className="text-[11px] text-surface-500">
                  Register your interest for pilot onboarding or merchant partnerships.
                </p>
              </div>
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="text-surface-400 hover:text-navy-900 p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                <div className="flex items-center font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Inquiry Submitted Successfully</span>
                </div>
                <p>{submitSuccess.message}</p>
                <div className="font-mono text-[10px] pt-1">
                  Reference: <span className="font-bold">{submitSuccess.referenceId}</span>
                </div>
              </div>
            )}

            {submitError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center space-x-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {!submitSuccess && (
              <form onSubmit={handlePartnerSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="businessName"
                      value={partnerForm.businessName}
                      onChange={(e) =>
                        setPartnerForm({ ...partnerForm, businessName: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={partnerForm.city}
                      onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={partnerForm.state}
                      onChange={(e) => setPartnerForm({ ...partnerForm, state: e.target.value })}
                      placeholder="Madhya Pradesh"
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-navy-900 mb-1">
                    Business / Partnership Scope <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    name="message"
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    placeholder={`Describe your service or goods offering for ${name}...`}
                    className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="consentModal"
                    checked={partnerForm.consent}
                    onChange={(e) =>
                      setPartnerForm({ ...partnerForm, consent: e.target.checked })
                    }
                    className="mt-1 rounded text-royal-600 focus:ring-royal-500"
                  />
                  <label htmlFor="consentModal" className="text-[11px] text-surface-500 leading-tight">
                    I consent to Namah Siddham Corporation processing these details for partnership evaluation.
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setPartnerModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-surface-200 text-surface-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-royal-500 hover:bg-royal-600 text-white font-bold"
                  >
                    {submitting ? 'Submitting...' : 'Submit Partner Inquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
