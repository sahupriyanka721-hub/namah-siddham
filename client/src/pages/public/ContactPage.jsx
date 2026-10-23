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
  Check,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';
import { Button } from '../../components/common/Button';

export const ContactPage = () => {
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    serviceRequired: 'Website Development',
    budgetRange: '',
    projectDescription: '',
    preferredContactMethod: 'Email',
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessData(null);

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim() ||
      !formData.projectDescription.trim()
    ) {
      setError('Please provide your name, email, mobile number, city, and project description.');
      return;
    }

    if (!formData.consent) {
      setError('Please provide consent to proceed with your inquiry.');
      return;
    }

    setLoading(true);
    try {
      const res = await publicApi.submitContact(formData);
      if (res.data?.success) {
        setSuccessData({
          message: res.data.message || 'Inquiry submitted successfully.',
          referenceId: res.data.referenceId,
        });
        setFormData({
          name: '',
          businessName: '',
          email: '',
          phone: '',
          city: '',
          serviceRequired: 'Website Development',
          budgetRange: '',
          projectDescription: '',
          preferredContactMethod: 'Email',
          consent: true,
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to submit inquiry. Please check details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Contact Us — Corporate Inquiries"
        description="Official contact details, registered office address in Bhopal MP, and project inquiry form for Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-navy-950 to-navy-900 text-white py-16 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-royal-400/30 text-royal-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 mr-1" />
            <span>Corporate Communications &amp; Project Inquiries</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-tight">
            Contact Namah Siddham Corporation
          </h1>
          <p className="text-base sm:text-lg text-surface-300 max-w-3xl leading-relaxed font-light">
            Connect directly with our engineering team, management, or partnership representatives in Bhopal, Madhya Pradesh, India.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-6">
              <h3 className="font-serif font-bold text-2xl text-navy-900">
                Registered Office
              </h3>

              <div className="space-y-5 text-sm text-surface-600">
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-navy-900">
                      Corporate Address
                    </h5>
                    <p className="text-xs sm:text-sm text-surface-500 mt-0.5 leading-relaxed">
                      {settings.registeredOffice?.fullAddress ||
                        'Registered Office: Bhopal, Madhya Pradesh, India. CIN: U77100MP2026PTC087531'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-navy-900">
                      Official Email
                    </h5>
                    <a
                      href={`mailto:${settings.officialEmail || 'contact@namahsiddham.com'}`}
                      className="text-xs sm:text-sm text-royal-600 font-semibold hover:underline block mt-0.5"
                    >
                      {settings.officialEmail || 'contact@namahsiddham.com'}
                    </a>
                    {settings.grievanceEmail && (
                      <span className="text-[11px] text-surface-400 block">
                        Grievances: {settings.grievanceEmail}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-navy-900">
                      Corporate Telephone
                    </h5>
                    <a
                      href={`tel:${settings.officialPhone || '+917550000000'}`}
                      className="text-xs sm:text-sm text-royal-600 font-semibold hover:underline block mt-0.5"
                    >
                      {settings.officialPhone || '+91 755 0000000'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-navy-900">
                      Operating Hours
                    </h5>
                    <p className="text-xs text-surface-500 mt-0.5">
                      Monday to Friday: 09:30 AM – 06:30 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Corporate Legal Identity */}
              <div className="pt-4 border-t border-surface-200 text-xs font-mono text-surface-500 space-y-1">
                <div>Entity: {settings.companyName}</div>
                <div>CIN: {settings.cin || 'U77100MP2026PTC087531'}</div>
                <div>Jurisdiction: Ministry of Corporate Affairs, MP, India</div>
              </div>
            </div>
          </div>

          {/* Right: Contact & Project Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-surface-200 shadow-soft-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
                Project &amp; Corporate Inquiry
              </span>
              <h3 className="font-serif font-bold text-2xl text-navy-900 mt-1">
                Let's Discuss Your Project
              </h3>
              <p className="text-xs sm:text-sm text-surface-500 mt-1">
                Please complete the form below. Your request will be directly logged into our database and reviewed by our engineering management.
              </p>
            </div>

            {/* Success Message */}
            {successData && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Inquiry Confirmed &amp; Stored Successfully</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  {successData.message}
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-950">
                  Reference Tracking ID: <span className="font-bold">{successData.referenceId}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-xs text-red-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
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
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Amit Jain"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Jain Traders"
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
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="amit@company.com"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
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
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Bhopal"
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Inquiry Category / Service Required <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 font-medium text-navy-900"
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Mobile Application Development">Mobile Application Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Product Partnership">Product Partnership</option>
                    <option value="Vendor / Service Partner Registration">Vendor / Service Partner Registration</option>
                    <option value="Other Business Inquiry">Other Business Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Budget Range (Optional)
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900 font-medium"
                  >
                    <option value="">Select Estimated Range</option>
                    <option value="Under ₹50,000">Under ₹50,000</option>
                    <option value="₹50,000 – ₹1,50,000">₹50,000 – ₹1,50,000</option>
                    <option value="₹1,50,000 – ₹5,00,000">₹1,50,000 – ₹5,00,000</option>
                    <option value="₹5,00,000+">₹5,00,000+</option>
                    <option value="Enterprise / To be discussed">Enterprise / To be discussed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-navy-900 uppercase tracking-wider">
                    Preferred Contact Method
                  </label>
                  <select
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900 font-medium"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-navy-900 uppercase tracking-wider">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Please describe your requirements, business goals, or digital project ideas..."
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                />
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="consentMain"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 rounded text-royal-600 focus:ring-royal-500"
                />
                <label htmlFor="consentMain" className="text-[11px] text-surface-500 leading-tight">
                  I agree to allow Namah Siddham Corporation Private Limited to record and process these submitted details for the purpose of communicating regarding this business inquiry.
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
                  Submit Project Inquiry
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
