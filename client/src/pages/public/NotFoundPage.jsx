import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { SeoMeta } from '../../components/public/SeoMeta';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <SeoMeta title="Page Not Found (404)" />
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-sage-200 shadow-soft-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-forest-50 text-forest-900 font-serif font-black text-2xl flex items-center justify-center mx-auto border border-forest-100">
          404
        </div>
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-2xl text-forest-950">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            The corporate page or platform resource you are looking for does not exist or has been relocated.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-forest-900 text-white font-bold text-xs hover:bg-forest-800 shadow-sm"
          >
            <Home className="w-4 h-4 mr-1.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/ecosystem"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-forest-800 text-forest-900 font-semibold text-xs hover:bg-forest-50"
          >
            <span>Explore Ecosystem</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
