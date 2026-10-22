import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

const routeTitles = {
  '/admin/dashboard': 'Dashboard Overview',
  '/admin/platforms': 'Ecosystem Platform Management',
  '/admin/pages': 'Page Content Management (CMS)',
  '/admin/team': 'Leadership & Team Management',
  '/admin/news': 'News & Corporate Announcements',
  '/admin/careers': 'Job Openings & Vacancies',
  '/admin/inquiries': 'Corporate Contact Inquiries',
  '/admin/partner-inquiries': 'Partnership Inquiries',
  '/admin/applications': 'Recruitment Applications',
  '/admin/legal': 'Legal Policies & Compliance CMS',
  '/admin/settings': 'Company & Identity Settings',
  '/admin/profile': 'Admin Profile & Security',
};

export const AdminLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-sage-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-forest-900 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const currentTitle = routeTitles[location.pathname] || 'Administration Portal';

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex text-charcoal-900">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <AdminHeader setMobileOpen={setMobileOpen} pageTitle={currentTitle} />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
