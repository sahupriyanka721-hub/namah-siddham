import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-forest-900 text-white hover:bg-forest-800 focus:ring-forest-700 shadow-soft-sm',
    gold:
      'bg-gold-500 text-forest-950 font-semibold hover:bg-gold-400 focus:ring-gold-400 shadow-soft-sm',
    secondary:
      'bg-sage-100 text-forest-900 hover:bg-sage-200 focus:ring-forest-600',
    outline:
      'border border-forest-800 text-forest-900 hover:bg-forest-50 focus:ring-forest-700',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-soft-sm',
    ghost:
      'text-forest-800 hover:bg-forest-50 hover:text-forest-950',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
