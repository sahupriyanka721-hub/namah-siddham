import React from 'react';

export const Badge = ({ children, status = 'default', className = '' }) => {
  const statusStyles = {
    Published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Live: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Coming Soon': 'bg-amber-50 text-amber-700 border-amber-200',
    Draft: 'bg-slate-100 text-slate-700 border-slate-200',
    Archived: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    Closed: 'bg-red-50 text-red-700 border-red-200',
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
    Contacted: 'bg-purple-50 text-purple-700 border-purple-200',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    default: 'bg-sage-100 text-forest-800 border-sage-200',
  };

  const style = statusStyles[status] || statusStyles.default;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}
    >
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current opacity-70"></span>
      {children || status}
    </span>
  );
};

export default Badge;
