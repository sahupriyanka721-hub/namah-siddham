import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export const PlatformCard = ({ platform }) => {
  const {
    name,
    slug,
    category,
    shortDescription,
    websiteUrl,
    keyFeatures = [],
    status = 'Published',
    logoUrl,
    isFeatured,
  } = platform;

  // Clean initials emblem generator if logo image is not uploaded
  const getInitials = (str) => {
    return str
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const isLive = status === 'Published';

  return (
    <div className="bg-white rounded-2xl border border-sage-200/90 shadow-soft-md hover:shadow-soft-xl transition-all duration-300 flex flex-col h-full overflow-hidden group hover:border-forest-600/40">
      {/* Top Banner & Status */}
      <div className="p-6 pb-4 border-b border-sage-100 flex items-start justify-between">
        <div className="flex items-center space-x-3.5">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="w-12 h-12 rounded-xl object-contain border border-sage-200 p-1 bg-white"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-12 h-12 rounded-xl bg-forest-900 text-gold-300 flex items-center justify-center font-serif font-black text-lg shadow-sm ${
              logoUrl ? 'hidden' : 'flex'
            }`}
          >
            {getInitials(name)}
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-forest-950 group-hover:text-forest-800 transition-colors">
              {name}
            </h3>
            <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider">
              {category}
            </span>
          </div>
        </div>

        <Badge status={isLive ? 'Live' : status}>
          {isLive ? 'Active Platform' : status}
        </Badge>
      </div>

      {/* Description */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <p className="text-sm text-charcoal-600 leading-relaxed">
            {shortDescription}
          </p>

          {/* Key Features */}
          {keyFeatures && keyFeatures.length > 0 && (
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-bold text-forest-900 uppercase tracking-wider font-serif">
                Core Capabilities:
              </h4>
              <ul className="space-y-1.5">
                {keyFeatures.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs text-charcoal-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-sage-100 flex items-center justify-between gap-3">
          <Link
            to={`/ecosystem/${slug}`}
            className="text-xs font-bold text-forest-900 hover:text-forest-700 inline-flex items-center group/link py-2"
          >
            <span>Platform Overview</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
          </Link>

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-lg bg-forest-900 text-white hover:bg-forest-800 shadow-sm transition-all"
            >
              <span>Visit Platform</span>
              <ExternalLink className="w-3 h-3 ml-1.5 opacity-80" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
