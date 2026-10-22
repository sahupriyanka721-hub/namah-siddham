import React, { useState, useEffect } from 'react';
import { Scale, Save, AlertCircle, CheckCircle2, Eye } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { Button } from '../../components/common/Button';

const legalDocs = [
  { slug: 'legal-privacy', title: 'Privacy Policy', path: '/privacy-policy' },
  { slug: 'legal-terms', title: 'Terms of Use', path: '/terms-of-use' },
  { slug: 'legal-cookie', title: 'Cookie Policy', path: '/cookie-policy' },
  { slug: 'legal-grievance', title: 'Grievance & Redressal', path: '/grievance' },
  { slug: 'legal-disclaimer', title: 'Website Disclaimer', path: '/disclaimer' },
];

export const AdminLegal = () => {
  const [selectedSlug, setSelectedSlug] = useState('legal-privacy');
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchDocument = async (slug) => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await adminApi.getPageBySlug(slug);
      setPageData(res.data?.data || {});
    } catch (err) {
      console.error('Failed to load legal document:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocument(selectedSlug);
  }, [selectedSlug]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      await adminApi.updatePageContent(selectedSlug, pageData);
      setStatusMessage({
        type: 'success',
        text: `Legal document for '${selectedSlug}' updated successfully.`,
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update legal document.',
      });
    } finally {
      setSaving(false);
    }
  };

  const activeDoc = legalDocs.find((d) => d.slug === selectedSlug);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-forest-950">
            Legal & Compliance CMS
          </h1>
          <p className="text-xs text-charcoal-500">
            Edit statutory terms, privacy disclosures, and grievance officer notices.
          </p>
        </div>

        {activeDoc && (
          <a
            href={activeDoc.path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-sage-100 hover:bg-sage-200 text-forest-950 text-xs font-semibold"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            <span>Preview Public Legal Page</span>
          </a>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-sage-200 pb-3">
        {legalDocs.map((doc) => (
          <button
            key={doc.slug}
            onClick={() => setSelectedSlug(doc.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSlug === doc.slug
                ? 'bg-forest-900 text-gold-300 shadow-sm'
                : 'bg-white text-charcoal-600 hover:bg-sage-50 border border-sage-200'
            }`}
          >
            {doc.title}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Statutory Compliance Notice:</strong> Content published here constitutes corporate policy representations under Indian jurisdiction. Ensure all edits are legally vetted by company secretarial or legal advisors before publication.
        </p>
      </div>

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
          <div className="py-20 text-center text-xs text-charcoal-500">Loading legal document...</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider">
                  Document Title
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
                  Publication Status
                </label>
                <select
                  value={pageData?.status || 'Published'}
                  onChange={(e) => setPageData({ ...pageData, status: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-sage-50 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 font-medium"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft (Internal Review)</option>
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
                Document Body Content (Markdown Supported)
              </label>
              <textarea
                rows={16}
                value={pageData?.bodyContent || ''}
                onChange={(e) => setPageData({ ...pageData, bodyContent: e.target.value })}
                className="w-full p-4 text-xs sm:text-sm font-mono bg-sage-50 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-600 leading-relaxed"
              />
            </div>

            <div className="pt-4 border-t border-sage-200 flex justify-end">
              <Button type="submit" variant="primary" loading={saving} icon={Save}>
                Save Legal Document
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLegal;
