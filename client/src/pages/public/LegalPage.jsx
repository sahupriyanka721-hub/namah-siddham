import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

const pathToSlug = {
  '/privacy-policy': 'legal-privacy',
  '/terms-of-use': 'legal-terms',
  '/cookie-policy': 'legal-cookie',
  '/grievance': 'legal-grievance',
  '/disclaimer': 'legal-disclaimer',
};

const defaultTitles = {
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-use': 'Terms of Use',
  '/cookie-policy': 'Cookie Policy',
  '/grievance': 'Grievance & Contact Information',
  '/disclaimer': 'Website Disclaimer',
};

export const LegalPage = () => {
  const location = useLocation();
  const slug = pathToSlug[location.pathname] || 'legal-privacy';
  const fallbackTitle = defaultTitles[location.pathname] || 'Legal Information';

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLegalContent = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getPageBySlug(slug);
        if (res.data?.data) {
          setPage(res.data.data);
        }
      } catch (err) {
        console.warn('Loading fallback legal page');
      } finally {
        setLoading(false);
      }
    };
    fetchLegalContent();
  }, [slug]);

  const title = page?.title || fallbackTitle;
  const heroHeadline = page?.heroHeadline || title;
  const heroDesc =
    page?.heroDescription ||
    'Statutory terms, compliance disclosures, and operational policies for Namah Siddham Corporation Private Limited.';
  const bodyContent = page?.bodyContent || '';

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta title={title} description={heroDesc} />

      {/* Header Banner */}
      <section className="bg-forest-950 text-white py-16 border-b border-forest-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-800 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 mr-1" />
            <span>Corporate Governance & Compliance</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-white tracking-tight">
            {heroHeadline}
          </h1>
          <p className="text-xs sm:text-sm text-sage-200 leading-relaxed font-light">
            {heroDesc}
          </p>
        </div>
      </section>

      {/* Main Legal Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Statutory Legal Notice Alert */}
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-5 flex items-start space-x-3.5 text-xs text-amber-950">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900">
              Legal Notice & Review Draft
            </span>
            <p className="leading-relaxed text-amber-900/90">
              This document represents corporate draft policies for Namah Siddham Corporation Private Limited (CIN: U77100MP2026PTC087531). Specific operational agreements, cancellation clauses, and privacy notices for individual marketplace brands (HomeServixo, Carrento, Jainamshree, SuperiorMart) are maintained independently on each platform.
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sage-200 shadow-soft-sm space-y-6">
          {loading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-3 border-forest-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
              <p className="text-xs text-charcoal-400 mt-2">Loading document content...</p>
            </div>
          ) : (
            <div className="prose prose-forest max-w-none text-xs sm:text-sm text-charcoal-700 leading-relaxed whitespace-pre-line space-y-4">
              {bodyContent || (
                <p>
                  Legal content is undergoing formal review. Please refer to statutory corporate filings under CIN: U77100MP2026PTC087531.
                </p>
              )}
            </div>
          )}

          {/* Platform Specific Terms Links */}
          <div className="pt-8 border-t border-sage-200 space-y-3">
            <h4 className="font-serif font-bold text-sm text-forest-950">
              Platform-Specific Terms & Policies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href="https://homeservixo.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-between hover:bg-sage-100 transition-colors"
              >
                <span className="font-semibold text-forest-950">HomeServixo Terms & Privacy</span>
                <ExternalLink className="w-3.5 h-3.5 text-forest-800" />
              </a>
              <a
                href="https://carrento.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-between hover:bg-sage-100 transition-colors"
              >
                <span className="font-semibold text-forest-950">Carrento Mobility Terms</span>
                <ExternalLink className="w-3.5 h-3.5 text-forest-800" />
              </a>
              <a
                href="https://jainamshree.online"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-between hover:bg-sage-100 transition-colors"
              >
                <span className="font-semibold text-forest-950">Jainamshree Community Guidelines</span>
                <ExternalLink className="w-3.5 h-3.5 text-forest-800" />
              </a>
              <a
                href="https://superiormart.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-between hover:bg-sage-100 transition-colors"
              >
                <span className="font-semibold text-forest-950">SuperiorMart Buyer & Seller Terms</span>
                <ExternalLink className="w-3.5 h-3.5 text-forest-800" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
