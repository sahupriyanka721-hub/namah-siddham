import React, { useState } from 'react';
import {
  Handshake,
  CheckCircle2,
  AlertCircle,
  Send,
  Building,
  Wrench,
  Car,
  ShoppingBag,
  Store,
  Briefcase,
  Users,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';
import { Button } from '../../components/common/Button';

const partnershipCategories = [
  'Home Service Professionals',
  'Car Owners and Rental Partners',
  'E-commerce Vendors',
  'Product Sellers',
  'Technology Partners',
  'Business Collaboration Partners',
];

const categoryIcons = {
  'Home Service Professionals': Wrench,
  'Car Owners and Rental Partners': Car,
  'E-commerce Vendors': ShoppingBag,
  'Product Sellers': Store,
  'Technology Partners': Briefcase,
  'Business Collaboration Partners': Building,
};

export const PartnerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    mobile: '',
    city: '',
    state: '',
    category: 'Home Service Professionals',
    platform: 'HomeServixo',
    message: '',
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessData(null);

    // Frontend validation
    if (
      !formData.name.trim() ||
      !formData.businessName.trim() ||
      !formData.email.trim() ||
      !formData.mobile.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.message.trim()
    ) {
      setError('Please complete all required fields.');
      return;
    }

    if (!formData.consent) {
      setError('You must accept the terms of data submission to proceed.');
      return;
    }

    setLoading(true);
    try {
      const res = await publicApi.submitPartnerInquiry(formData);
      if (res.data?.success) {
        setSuccessData({
          referenceId: res.data.referenceId,
          message: res.data.message,
        });
        // Reset form
        setFormData({
          name: '',
          businessName: '',
          email: '',
          mobile: '',
          city: '',
          state: '',
          category: 'Home Service Professionals',
          platform: 'HomeServixo',
          message: '',
          consent: true,
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to submit inquiry. Please verify your details or try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Partner With Us"
        description="Partner with Namah Siddham Corporation across HomeServixo, Carrento, Jainamshree, and SuperiorMart. Submit your partnership inquiry today."
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 to-navy-900 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-royal-400/30 text-royal-300 text-xs font-semibold">
            <Handshake className="w-3.5 h-3.5 mr-1" />
            <span>Commercial Partnerships &amp; Platform Alliances</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Partner With Us
          </h1>
          <p className="text-base sm:text-lg text-surface-300 max-w-3xl leading-relaxed font-light">
            Grow your business, expand client reach, and collaborate through our digital platforms and enterprise technology capabilities.
          </p>
        </div>
      </section>

      {/* Partnership Categories Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
              Collaboration Channels
            </span>
            <h2 className="font-serif font-black text-2xl text-navy-900">
              Partnership Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnershipCategories.map((cat, idx) => {
              const Icon = categoryIcons[cat] || Handshake;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-surface-200 shadow-soft-sm flex items-center space-x-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-navy-900 leading-tight">
                    {cat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-surface-200 shadow-soft-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left info column */}
          <div className="lg:col-span-4 bg-navy-900 text-white p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-2xl text-white">
                Partner Onboarding Process
              </h3>
              <p className="text-xs sm:text-sm text-surface-300 leading-relaxed font-light">
                Submit your business credentials below. Our partner onboarding team in Bhopal evaluates each submission and initiates verified discussions.
              </p>

              <div className="space-y-4 pt-4 border-t border-navy-800">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-royal-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Inquiry Submission</h5>
                    <p className="text-[11px] text-surface-400">Submit verified credentials and business capability</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-royal-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Commercial Discussion</h5>
                    <p className="text-[11px] text-surface-400">Review terms, quality standards &amp; agreement</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Integration &amp; Activation</h5>
                    <p className="text-[11px] text-surface-400">Platform listing or joint development begins</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-surface-400 pt-6 border-t border-navy-800 font-mono">
              Inquiry Records Stored Securely in MongoDB
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-8 p-8 sm:p-10 space-y-6">
            <h3 className="font-serif font-bold text-2xl text-navy-900">
              Partnership Inquiry Form
            </h3>

            {/* Success Banner */}
            {successData && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Submission Confirmed</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  {successData.message}
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-950">
                  <span className="font-semibold">Reference ID:</span>{' '}
                  <span className="bg-emerald-100 px-2 py-1 rounded font-bold tracking-wider">
                    {successData.referenceId}
                  </span>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 text-xs sm:text-sm text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter contact person name"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Trading or firm name"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@business.com"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Mobile / Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Bhopal"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Madhya Pradesh"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Partnership Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900 font-medium"
                  >
                    {partnershipCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Relevant Platform <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900 font-medium"
                  >
                    <option value="HomeServixo">HomeServixo (Home Services &amp; Appliance Repair)</option>
                    <option value="Carrento">Carrento (Mobility &amp; Car Rental)</option>
                    <option value="Jainamshree">Jainamshree (Jain Community E-commerce)</option>
                    <option value="SuperiorMart">SuperiorMart (Multi-Category Marketplace)</option>
                    <option value="IT Services Collaboration">IT Services Collaboration</option>
                    <option value="General / Multiple Platforms">Corporate / Multiple Platforms</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-navy-900 uppercase tracking-wider">
                  Business Description / Collaboration Scope <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your service capacity, fleet size, product catalog, or technical collaboration proposal..."
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                />
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="partnerConsent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 rounded text-royal-600 focus:ring-royal-500"
                />
                <label htmlFor="partnerConsent" className="text-[11px] text-surface-500 leading-tight">
                  I agree to allow Namah Siddham Corporation Private Limited to collect and evaluate these submitted corporate details for business partnership viability.
                </label>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon={Send}
                  className="w-full sm:w-auto px-8 py-3 text-xs font-bold"
                >
                  Submit Partnership Inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerPage;
