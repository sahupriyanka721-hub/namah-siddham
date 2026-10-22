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
  'Strategic Business Partners',
  'Corporate Collaboration',
  'Other Business Inquiries',
];

const categoryIcons = {
  'Home Service Professionals': Wrench,
  'Car Owners and Rental Partners': Car,
  'E-commerce Vendors': ShoppingBag,
  'Product Sellers': Store,
  'Strategic Business Partners': Briefcase,
  'Corporate Collaboration': Building,
  'Other Business Inquiries': Users,
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
    consent: false,
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
          consent: false,
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
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Handshake className="w-3.5 h-3.5 mr-1" />
            <span>Commercial Partnerships</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Partner With Us
          </h1>
          <p className="text-base sm:text-lg text-sage-200 max-w-3xl leading-relaxed font-light">
            Grow your business, expand client discovery, and monetize services through our ecosystem of focused aggregator platforms.
          </p>
        </div>
      </section>

      {/* Partnership Categories Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-serif">
              Collaboration Channels
            </span>
            <h2 className="font-serif font-black text-2xl text-forest-950">
              Partnership Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnershipCategories.map((cat, idx) => {
              const Icon = categoryIcons[cat] || Handshake;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-sage-200 shadow-soft-sm flex items-center space-x-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-forest-950 leading-tight">
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
        <div className="bg-white rounded-3xl border border-sage-200 shadow-soft-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left info column */}
          <div className="lg:col-span-4 bg-forest-900 text-white p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-2xl text-white">
                Partner Onboarding Process
              </h3>
              <p className="text-xs sm:text-sm text-sage-200 leading-relaxed font-light">
                Submit your business credentials below. Our partner onboarding specialists will verify your requirements and connect with tailored terms.
              </p>

              <div className="space-y-4 pt-4 border-t border-forest-800">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-forest-800 text-gold-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Inquiry Submission</h5>
                    <p className="text-[11px] text-sage-300">Submit verified credentials and service capacity</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-forest-800 text-gold-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Document Verification</h5>
                    <p className="text-[11px] text-sage-300">Compliance check and commercial agreement</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-forest-800 text-gold-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Live Platform Integration</h5>
                    <p className="text-[11px] text-sage-300">Catalog activation and order dispatch begins</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-sage-300 pt-6 border-t border-forest-800 font-mono">
              Inquiry Records Protected & Encrypted in MongoDB
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-8 p-8 sm:p-10 space-y-6">
            <h3 className="font-serif font-bold text-2xl text-forest-950">
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950"
                  />
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Business / Enterprise Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Trading or firm name"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@business.com"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950"
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* City */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Indore, Bhopal, Mumbai"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950"
                  />
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Madhya Pradesh"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Partnership Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950 font-medium"
                  >
                    {partnershipCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Relevant Platform */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Relevant Platform <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950 font-medium"
                  >
                    <option value="HomeServixo">HomeServixo (Home Services & Appliance Repair)</option>
                    <option value="Carrento">Carrento (Car Rental & Mobility)</option>
                    <option value="Jainamshree">Jainamshree (Community E-commerce)</option>
                    <option value="SuperiorMart">SuperiorMart (Multi-Category Marketplace)</option>
                    <option value="General / Multiple Platforms">Corporate / Multiple Platforms</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  Inquiry Details / Value Proposition <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your service capacity, fleet size, product catalog, or collaboration proposal..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 text-forest-950"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="partner-consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-sage-300 text-forest-900 focus:ring-forest-600 cursor-pointer"
                />
                <label htmlFor="partner-consent" className="text-xs text-charcoal-600 leading-normal cursor-pointer">
                  I consent to Namah Siddham Corporation Private Limited collecting and processing the submitted corporate data to evaluate business partnership viability in accordance with company policies.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon={Send}
                  className="w-full sm:w-auto px-8 py-3"
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
