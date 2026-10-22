import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';
import { Button } from '../../components/common/Button';

export const ContactPage = () => {
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Corporate Inquiry',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessData(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, email, and message.');
      return;
    }

    setLoading(true);
    try {
      const res = await publicApi.submitContact(formData);
      if (res.data?.success) {
        setSuccessData({
          message: res.data.message,
          referenceId: res.data.referenceId,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'General Corporate Inquiry',
          subject: '',
          message: '',
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to submit message. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Contact Corporate Headquarters"
        description="Official contact details, registered office address, and contact form for Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 mr-1" />
            <span>Corporate Communications</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Contact Namah Siddham Corporation
          </h1>
          <p className="text-base sm:text-lg text-sage-200 max-w-3xl leading-relaxed font-light">
            Connect directly with our corporate management, media communications team, or investor relations.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-sage-200 shadow-soft-sm space-y-6">
              <h3 className="font-serif font-bold text-2xl text-forest-950">
                Registered Office
              </h3>

              <div className="space-y-5 text-sm text-charcoal-700">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-forest-950">
                      Postal Address
                    </h5>
                    <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5 leading-relaxed">
                      {settings.registeredOffice?.fullAddress ||
                        'Registered Office: Madhya Pradesh, India. CIN: U77100MP2026PTC087531'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-forest-950">
                      Official Corporate Email
                    </h5>
                    <a
                      href={`mailto:${settings.officialEmail}`}
                      className="text-xs sm:text-sm text-forest-900 font-semibold hover:underline block mt-0.5"
                    >
                      {settings.officialEmail}
                    </a>
                    {settings.grievanceEmail && (
                      <span className="text-[11px] text-charcoal-500 block">
                        Grievances: {settings.grievanceEmail}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-forest-950">
                      Corporate Telephone
                    </h5>
                    <a
                      href={`tel:${settings.officialPhone}`}
                      className="text-xs sm:text-sm text-forest-900 font-semibold hover:underline block mt-0.5"
                    >
                      {settings.officialPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-forest-950">
                      Business Hours
                    </h5>
                    <p className="text-xs text-charcoal-600 mt-0.5">
                      Monday to Friday: 09:30 AM – 06:30 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Corporate Legal Identity */}
              <div className="pt-4 border-t border-sage-200 text-xs font-mono text-charcoal-500 space-y-1">
                <div>Company Name: {settings.companyName}</div>
                <div>CIN: {settings.cin}</div>
                <div>Type: {settings.companyType}</div>
              </div>
            </div>

            {/* Map Embed or Placeholder */}
            {settings.mapEmbedUrl ? (
              <div className="rounded-2xl overflow-hidden border border-sage-200 shadow-soft-sm h-64">
                <iframe
                  title="Office Location Map"
                  src={settings.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-sage-200 shadow-soft-sm space-y-6">
            <h3 className="font-serif font-bold text-2xl text-forest-950">
              Send a Corporate Message
            </h3>

            {/* Success */}
            {successData && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Message Sent Successfully</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  {successData.message}
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-950">
                  Reference ID: <span className="font-bold">{successData.referenceId}</span>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-xs text-red-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Phone / Mobile
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Inquiry Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-medium"
                  >
                    <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                    <option value="Business Partnership">Business Partnership</option>
                    <option value="Platform Vendor Inquiry">Platform Vendor Inquiry</option>
                    <option value="Media & Press">Media & Press</option>
                    <option value="Grievance / Support Escalation">Grievance / Support Escalation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your communication"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How may our team assist you?"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon={Send}
                  className="w-full sm:w-auto px-8 py-3"
                >
                  Send Corporate Inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
