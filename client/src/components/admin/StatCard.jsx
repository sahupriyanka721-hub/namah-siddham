import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, badge, color = 'forest', linkText, onAction }) => {
  const colorStyles = {
    forest: 'bg-forest-50 text-forest-800 border-forest-100',
    gold: 'bg-gold-50 text-gold-700 border-gold-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
            {title}
          </span>
          <div className="font-serif font-black text-3xl text-forest-950 mt-1">
            {value !== undefined ? value : '—'}
          </div>
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colorStyles[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between text-xs">
        {badge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-100 text-forest-900">
            {badge}
          </span>
        )}
        {linkText && onAction && (
          <button
            onClick={onAction}
            className="text-forest-900 font-bold hover:text-gold-600 inline-flex items-center ml-auto group"
          >
            <span>{linkText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatCard;
