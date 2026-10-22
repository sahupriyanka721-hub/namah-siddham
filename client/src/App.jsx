import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import EcosystemPage from './pages/public/EcosystemPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import BusinessModelPage from './pages/public/BusinessModelPage';
import PartnerPage from './pages/public/PartnerPage';
import TeamPage from './pages/public/TeamPage';
import NewsPage from './pages/public/NewsPage';
import NewsDetailPage from './pages/public/NewsDetailPage';
import CareersPage from './pages/public/CareersPage';
import ContactPage from './pages/public/ContactPage';
import LegalPage from './pages/public/LegalPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Admin Components & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPlatforms from './pages/admin/AdminPlatforms';
import AdminPages from './pages/admin/AdminPages';
import AdminTeam from './pages/admin/AdminTeam';
import AdminNews from './pages/admin/AdminNews';
import AdminCareers from './pages/admin/AdminCareers';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminPartnerInquiries from './pages/admin/AdminPartnerInquiries';
import AdminApplications from './pages/admin/AdminApplications';
import AdminLegal from './pages/admin/AdminLegal';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProfile from './pages/admin/AdminProfile';

// Layout wrapper for public pages with sticky navbar and rich footer
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDFB]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/ecosystem/:slug" element={<ProductDetailPage />} />
        <Route path="/business-model" element={<BusinessModelPage />} />
        <Route path="/partners" element={<PartnerPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-use" element={<LegalPage />} />
        <Route path="/cookie-policy" element={<LegalPage />} />
        <Route path="/grievance" element={<LegalPage />} />
        <Route path="/disclaimer" element={<LegalPage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="platforms" element={<AdminPlatforms />} />
        <Route path="pages" element={<AdminPages />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="careers" element={<AdminCareers />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="partner-inquiries" element={<AdminPartnerInquiries />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="legal" element={<AdminLegal />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
