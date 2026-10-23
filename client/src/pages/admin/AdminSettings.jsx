import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, AlertCircle, Upload, ShieldCheck, Globe, Building2, PhoneCall, Sparkles } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { useSettings } from '../../context/SettingsContext';
import { Button } from '../../components/common/Button';

export const AdminSettings = () => {
  const { refreshSettings } = useSettings();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await adminApi.getSettings();
        setFormData(res.data.data || {});
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      await adminApi.updateSettings(formData);
      await refreshSettings();
      setStatusMessage({ type: 'success', text: 'Company settings updated successfully across the website.' });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update settings.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-black text-2xl text-navy-900 tracking-tight flex items-center">
            <Settings className="w-6 h-6 mr-2.5 text-royal-500" />
            Company & Identity Settings
          </h1>
          <p className="text-xs text-navy-600 mt-1">
            Manage legal disclosures, Bhopal registered office address, official emails, CTA buttons, and global meta settings.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center space-x-2.5 mb-6 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading company settings...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            {/* Section 1: Corporate Legal Identity */}
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-base text-navy-900 border-b border-slate-200 pb-2 flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-royal-500" />
                Legal Entity Identifiers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Company Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData?.companyName || ''}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-medium text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Corporate Identification Number (CIN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData?.cin || ''}
                    onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono text-navy-900 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Company Type
                  </label>
                  <input
                    type="text"
                    value={formData?.companyType || ''}
                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Business Positioning Statement
                  </label>
                  <input
                    type="text"
                    value={formData?.businessPositioning || ''}
                    onChange={(e) => setFormData({ ...formData, businessPositioning: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact & Registered Office */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-heading font-bold text-base text-navy-900 border-b border-slate-200 pb-2 flex items-center">
                <PhoneCall className="w-4 h-4 mr-2 text-royal-500" />
                Official Communication & Registered Office
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Official Corporate Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData?.officialEmail || ''}
                    onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Grievance Officer Email
                  </label>
                  <input
                    type="email"
                    value={formData?.grievanceEmail || ''}
                    onChange={(e) => setFormData({ ...formData, grievanceEmail: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Official Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData?.officialPhone || ''}
                    onChange={(e) => setFormData({ ...formData, officialPhone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Full Registered Office Address (Bhopal, MP) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={formData?.registeredOffice?.fullAddress || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registeredOffice: { ...formData.registeredOffice, fullAddress: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Google Map Embed URL
                </label>
                <input
                  type="text"
                  value={formData?.mapEmbedUrl || ''}
                  onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
                  placeholder="https://www.google.com/maps/embed?..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono text-navy-900 text-xs"
                />
              </div>
            </div>

            {/* Section 3: Call-To-Action (CTA) Config */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-heading font-bold text-base text-navy-900 border-b border-slate-200 pb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-gold-500" />
                Global Call-To-Action (CTA) Configuration
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    CTA Section Headline
                  </label>
                  <input
                    type="text"
                    value={formData?.ctaSettings?.title || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ctaSettings: { ...formData?.ctaSettings, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    CTA Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData?.ctaSettings?.subtitle || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ctaSettings: { ...formData?.ctaSettings, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={formData?.ctaSettings?.primaryButtonText || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ctaSettings: { ...formData?.ctaSettings, primaryButtonText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    value={formData?.ctaSettings?.primaryButtonLink || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ctaSettings: { ...formData?.ctaSettings, primaryButtonLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={formData?.ctaSettings?.secondaryButtonText || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ctaSettings: { ...formData?.ctaSettings, secondaryButtonText: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    value={formData?.ctaSettings?.secondaryButtonLink || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ctaSettings: { ...formData?.ctaSettings, secondaryButtonLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Social Links */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-heading font-bold text-base text-navy-900 border-b border-slate-200 pb-2 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-royal-500" />
                Social Media Profiles
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData?.socialLinks?.linkedin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData?.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Twitter / X Profile URL
                  </label>
                  <input
                    type="url"
                    value={formData?.socialLinks?.twitter || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData?.socialLinks, twitter: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Footer & SEO */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-heading font-bold text-base text-navy-900 border-b border-slate-200 pb-2">
                Footer Disclosures & SEO Defaults
              </h3>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Footer Summary Text
                </label>
                <textarea
                  rows={2}
                  value={formData?.footerContent?.aboutText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      footerContent: { ...formData?.footerContent, aboutText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Footer Copyright Line
                </label>
                <input
                  type="text"
                  value={formData?.footerContent?.copyrightText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      footerContent: { ...formData?.footerContent, copyrightText: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900 font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <Button type="submit" variant="primary" loading={saving} icon={Save}>
                Save Company Settings
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;