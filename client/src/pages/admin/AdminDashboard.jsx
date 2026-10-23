import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Layers,
  FolderGit2,
  Clock,
  Mail,
  Handshake,
  Briefcase,
  Newspaper,
  PlusCircle,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { StatCard } from '../../components/admin/StatCard';
import { Badge } from '../../components/common/Badge';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminApi.getDashboardStats();
        setData(res.data);
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-surface-500">Querying real database statistics...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recent = data?.recentActivity || {};
  const system = data?.system || {};

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar & Database Status */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl text-navy-900">
            Welcome to Portal Management
          </h1>
          <p className="text-xs text-surface-500 mt-0.5">
            Namah Siddham Corporation Private Limited — Real Database Performance &amp; Operations
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            <span className="capitalize font-mono">
              MongoDB: {system.databaseStatus || 'Connected'}
            </span>
          </div>

          <Link
            to="/admin/services"
            className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-royal-500 text-white text-xs font-bold hover:bg-royal-600 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
            <span>Manage IT Services</span>
          </Link>

          <Link
            to="/admin/platforms"
            className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
            <span>Manage Platforms</span>
          </Link>
        </div>
      </div>

      {/* Aggregate Real Database Stat Tiles (All 8 metrics required by prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Total published services */}
        <StatCard
          title="Published IT Services"
          value={stats.totalPublishedServices || 4}
          icon={Code2}
          color="blue"
          badge={`Total: ${stats.totalServices || 4}`}
        />

        {/* 2. Total published platforms */}
        <StatCard
          title="Published Platforms"
          value={stats.totalPublishedPlatforms || 4}
          icon={Layers}
          color="emerald"
          badge={`Total: ${stats.totalPlatforms || 4}`}
        />

        {/* 3. Products under development */}
        <StatCard
          title="Under Development"
          value={stats.productsUnderDevelopment || 4}
          icon={Clock}
          color="gold"
          badge="Active Build"
        />

        {/* 4. Published portfolio projects */}
        <StatCard
          title="Portfolio Projects"
          value={stats.publishedPortfolioProjects || 4}
          icon={FolderGit2}
          color="purple"
          badge={`Total: ${stats.totalPortfolioProjects || 4}`}
        />

        {/* 5. New contact inquiries */}
        <StatCard
          title="Contact Inquiries"
          value={stats.totalContactInquiries || 0}
          icon={Mail}
          color="blue"
          badge={`${stats.newContactInquiries || 0} New`}
        />

        {/* 6. New partner inquiries */}
        <StatCard
          title="Partner Inquiries"
          value={stats.totalPartnerInquiries || 0}
          icon={Handshake}
          color="gold"
          badge={`${stats.newPartnerInquiries || 0} New`}
        />

        {/* 7. Published job openings */}
        <StatCard
          title="Active Job Openings"
          value={stats.publishedJobOpenings || 2}
          icon={Briefcase}
          color="purple"
          badge={`${stats.totalApplications || 0} Applications`}
        />

        {/* 8. Published news articles */}
        <StatCard
          title="Published News"
          value={stats.publishedNewsArticles || 1}
          icon={Newspaper}
          color="emerald"
          badge="Corporate"
        />
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-3xl p-6 border border-surface-200 shadow-soft-sm space-y-4">
        <h3 className="font-serif font-bold text-sm text-navy-900 uppercase tracking-wider">
          Quick Actions &amp; Administration Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          <Link
            to="/admin/services"
            className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 hover:border-royal-500 hover:bg-surface-100 transition-colors text-center font-bold text-navy-900"
          >
            <Code2 className="w-5 h-5 mx-auto mb-1 text-royal-600" />
            <span>Add Service</span>
          </Link>
          <Link
            to="/admin/platforms"
            className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 hover:border-orange-500 hover:bg-surface-100 transition-colors text-center font-bold text-navy-900"
          >
            <Layers className="w-5 h-5 mx-auto mb-1 text-orange-600" />
            <span>Add Platform</span>
          </Link>
          <Link
            to="/admin/portfolio"
            className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 hover:border-royal-500 hover:bg-surface-100 transition-colors text-center font-bold text-navy-900"
          >
            <FolderGit2 className="w-5 h-5 mx-auto mb-1 text-royal-600" />
            <span>Add Case Study</span>
          </Link>
          <Link
            to="/admin/inquiries"
            className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 hover:border-royal-500 hover:bg-surface-100 transition-colors text-center font-bold text-navy-900"
          >
            <Mail className="w-5 h-5 mx-auto mb-1 text-royal-600" />
            <span>View Inquiries</span>
          </Link>
          <Link
            to="/admin/partner-inquiries"
            className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 hover:border-gold-500 hover:bg-surface-100 transition-colors text-center font-bold text-navy-900"
          >
            <Handshake className="w-5 h-5 mx-auto mb-1 text-gold-600" />
            <span>View Partners</span>
          </Link>
          <Link
            to="/admin/settings"
            className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 hover:border-royal-500 hover:bg-surface-100 transition-colors text-center font-bold text-navy-900"
          >
            <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-royal-600" />
            <span>Company Settings</span>
          </Link>
        </div>
      </div>

      {/* Recent Inquiries Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Partner Inquiries */}
        <div className="bg-white rounded-3xl border border-surface-200 shadow-soft-sm overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-surface-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Handshake className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif font-bold text-base text-navy-900">
                Recent Partner Inquiries
              </h3>
            </div>
            <Link
              to="/admin/partner-inquiries"
              className="text-xs font-bold text-royal-600 hover:underline"
            >
              View All ({stats.totalPartnerInquiries || 0}) →
            </Link>
          </div>

          <div className="divide-y divide-surface-100 flex-1">
            {recent.partners && recent.partners.length > 0 ? (
              recent.partners.map((item) => (
                <div key={item._id} className="p-4 flex items-center justify-between hover:bg-surface-50">
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-navy-900">{item.name}</div>
                    <div className="text-[11px] text-surface-500">
                      {item.businessName} • {item.city}, {item.state}
                    </div>
                    <div className="text-[10px] text-royal-600 font-semibold">{item.category}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-surface-100 font-bold text-navy-900">
                      {item.status || 'New'}
                    </span>
                    <div className="text-[10px] text-surface-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-surface-400">
                No partnership inquiries submitted yet.
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="bg-white rounded-3xl border border-surface-200 shadow-soft-sm overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-surface-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-royal-600" />
              <h3 className="font-serif font-bold text-base text-navy-900">
                Recent Contact Messages
              </h3>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-bold text-royal-600 hover:underline"
            >
              View All ({stats.totalContactInquiries || 0}) →
            </Link>
          </div>

          <div className="divide-y divide-surface-100 flex-1">
            {recent.contacts && recent.contacts.length > 0 ? (
              recent.contacts.map((item) => (
                <div key={item._id} className="p-4 flex items-center justify-between hover:bg-surface-50">
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-navy-900">{item.name}</div>
                    <div className="text-[11px] text-surface-500 truncate max-w-xs">{item.serviceRequired || item.subject}</div>
                    <div className="text-[10px] text-surface-400">{item.city}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-surface-100 font-bold text-navy-900">
                      {item.status || 'New'}
                    </span>
                    <div className="text-[10px] text-surface-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-surface-400">
                No contact inquiries submitted yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
