import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return <div className={`animate-pulse bg-sage-200/70 rounded ${className}`} />;
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-sage-200 shadow-soft-sm space-y-4 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-sage-200 rounded-lg" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-sage-200 rounded w-1/3" />
          <div className="h-3 bg-sage-200 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-sage-200 rounded w-full" />
        <div className="h-3 bg-sage-200 rounded w-5/6" />
      </div>
      <div className="h-8 bg-sage-200 rounded w-full pt-4" />
    </div>
  );
};
