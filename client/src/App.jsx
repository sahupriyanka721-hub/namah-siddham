import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import ServiceDetailPage from './pages/public/ServiceDetailPage';
import EcosystemPage from './pages/public/EcosystemPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import PortfolioPage from './pages/public/PortfolioPage';
import PortfolioDetailPage from './pages/public/PortfolioDetailPage';
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
import AdminServices from './pages/admin/AdminServices';
import AdminPortfolio from './pages/admin/AdminPortfolio';
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
    <div className="min-h-screen flex flex-col bg-surface-100 text-navy-800">
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

        {/* Vertical 1: IT Services */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />

        {/* Vertical 2: Digital Products & Aggregators */}
        <Route path="/products" element={<EcosystemPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/ecosystem/:slug" element={<ProductDetailPage />} />

        {/* Portfolio & Case Studies */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />

        {/* Business Model & Partnerships */}
        <Route path="/business-model" element={<BusinessModelPage />} />
        <Route path="/partners" element={<PartnerPage />} />
        <Route path="/partner" element={<PartnerPage />} />

        {/* Corporate Pages */}
        <Route path="/team" element={<TeamPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Legal Disclosures */}
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-use" element={<LegalPage />} />
        <Route path="/cookie-policy" element={<LegalPage />} />
        <Route path="/grievance" element={<LegalPage />} />
        <Route path="/disclaimer" element={<LegalPage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Workspace */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
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
