import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader = ({ setMobileOpen, pageTitle }) => {
  const { admin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-surface-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-surface-600 hover:bg-surface-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-serif font-bold text-lg text-navy-900 capitalize">
            {pageTitle || 'Portal Dashboard'}
          </h2>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {admin && (
          <div className="hidden sm:flex items-center space-x-3 text-right">
            <div>
              <div className="text-xs font-bold text-navy-900">{admin.name}</div>
              <div className="text-[10px] text-surface-500 capitalize">{admin.role || 'Administrator'}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-royal-500 text-white flex items-center justify-center font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
          </div>
        )}

        <button
          onClick={logout}
          title="Sign Out"
          className="p-2 rounded-xl text-surface-500 hover:text-red-700 hover:bg-red-50 transition-colors inline-flex items-center text-xs font-semibold"
        >
          <LogOut className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
