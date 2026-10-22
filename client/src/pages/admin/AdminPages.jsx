import React, { useState, useEffect } from 'react';
import { FileCode, Save, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const editablePages = [
  { slug: 'home', label: 'Home Page' },
  { slug: 'about', label: 'About Us Page' },
  { slug: 'business-model', label: 'Business Model Page' },
  { slug: 'partner', label: 'Partner With Us Page' },
  { slug: 'contact', label: 'Contact Us Page' },
];

export const AdminPages = () => {
  const [selectedSlug, setSelectedSlug] = useState('about');
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchPage = async (slug) => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await adminApi.getPageBySlug(slug);
      setPageData(res.data?.data || {});
    } catch (err) {
      console.error('Error fetching page:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(selectedSlug);
  }, [selectedSlug]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      await adminApi.updatePageContent(selectedSlug, pageData);
      setStatusMessage({ type: 'success', text: `Page content for '${selectedSlug}' updated successfully.` });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to save page changes.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest-950">
            Page Content Management (CMS)
          </h1>
          <p className="text-xs text-charcoal-500">
            Edit live corporate page headings, mission, vision, and descriptive copy.
          </p>
        </div>

        {pageData?.pageSlug && (
          <a
            href={pageData.pageSlug === 'home' ? '/' : `/${pageData.pageSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-sage-100 hover:bg-sage-200 text-forest-950 text-xs font-semibold"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            <span>Preview Live Page</span>
          </a>
        )}
      </div>

      {/* Page Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-sage-200 pb-3">
        {editablePages.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSelectedSlug(p.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSlug === p.slug
                ? 'bg-forest-900 text-gold-300 shadow-sm'
                : 'bg-white text-charcoal-600 hover:bg-sage-50 border border-sage-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Editor Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-200 shadow-soft-sm">
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
          <div className="py-20 text-center text-xs text-charcoal-500">Loading page content...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  Page Title
                </label>
                <input
                  type="text"
                  required
                  value={pageData?.title || ''}
                  onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  Status
                </label>
                <select
                  value={pageData?.status || 'Published'}
                  onChange={(e) => setPageData({ ...pageData, status: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-medium"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Hero Headline
              </label>
              <input
                type="text"
                value={pageData?.heroHeadline || ''}
                onChange={(e) => setPageData({ ...pageData, heroHeadline: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                Hero Description
              </label>
              <textarea
                rows={3}
                value={pageData?.heroDescription || ''}
                onChange={(e) => setPageData({ ...pageData, heroDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            {/* Special Section Fields for About Page (Vision / Mission) */}
            {selectedSlug === 'about' && (
              <div className="pt-4 border-t border-sage-200 space-y-4">
                <h4 className="font-serif font-bold text-sm text-forest-950">
                  Mission & Vision Statements
                </h4>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Company Vision
                  </label>
                  <textarea
                    rows={2}
                    value={pageData?.sections?.vision || ''}
                    onChange={(e) =>
                      setPageData({
                        ...pageData,
                        sections: { ...pageData.sections, vision: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                    Company Mission
                  </label>
                  <textarea
                    rows={2}
                    value={pageData?.sections?.mission || ''}
                    onChange={(e) =>
                      setPageData({
                        ...pageData,
                        sections: { ...pageData.sections, mission: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>
            )}

            {/* SEO Metadata */}
            <div className="pt-4 border-t border-sage-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  value={pageData?.seoTitle || ''}
                  onChange={(e) => setPageData({ ...pageData, seoTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  SEO Meta Description
                </label>
                <input
                  type="text"
                  value={pageData?.seoDescription || ''}
                  onChange={(e) => setPageData({ ...pageData, seoDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-sage-200 flex justify-end">
              <Button type="submit" variant="primary" loading={saving} icon={Save}>
                Save Page Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPages;
