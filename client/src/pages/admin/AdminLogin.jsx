import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/admin/dashboard';

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Invalid administrator credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        {/* Brand Logo */}
        <div className="flex justify-center">
          <img
            src="/assets/namah-siddham-logo.png"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/logo-white.svg';
            }}
            alt="Namah Siddham Corporation Logo"
            className="h-12 w-auto object-contain mx-auto"
          />
        </div>

        <div>
          <p className="text-xs text-gold-400 font-mono tracking-widest uppercase mt-1">
            Secure Administrative Management Portal
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-surface-200 space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-navy-900">
              Authorized Personnel Login
            </h3>
            <p className="text-xs text-surface-500">
              Sign in with your configured administrative credentials.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start space-x-2.5 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                Admin Email Identifier
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@namahsiddham.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
                Secret Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-surface-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-navy-900 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full py-3 text-xs sm:text-sm font-bold shadow-md bg-royal-500 hover:bg-royal-600 text-white rounded-xl"
              >
                Authenticate &amp; Access Dashboard
              </Button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-surface-200 text-center space-y-2">
            <div className="inline-flex items-center text-[11px] text-navy-900 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              <span>TLS Encrypted Session &amp; Rate-Limited Authentication</span>
            </div>
            <p className="text-[10px] text-surface-400">
              Corporate Administrative System for Namah Siddham Corporation Private Limited (CIN: U77100MP2026PTC087531).
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-surface-400 hover:text-gold-400 transition-colors inline-flex items-center"
          >
            <span>← Return to Public Corporate Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
