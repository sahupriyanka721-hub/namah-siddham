import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Mail,
  Handshake,
  Briefcase,
  Newspaper,
  PlusCircle,
  Clock,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertTriangle,
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
        <div className="w-10 h-10 border-4 border-forest-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
        <p className="text-xs text-charcoal-500">Aggregating database statistics...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recent = data?.recentActivity || {};
  const system = data?.system || {};

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar & Database Status */}
      <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl text-forest-950">
            Welcome to Portal Management
          </h1>
          <p className="text-xs text-charcoal-600 mt-0.5">
            Namah Siddham Corporation Private Limited — System Status & Performance Hub
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            <span className="capitalize">MongoDB: {system.databaseStatus || 'Online'}</span>
          </div>

          <Link
            to="/admin/platforms"
            className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-forest-900 text-white text-xs font-bold hover:bg-forest-800 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
            <span>Manage Platforms</span>
          </Link>
        </div>
      </div>

      {/* Aggregate Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard
          title="Published Platforms"
          value={stats.publishedPlatforms}
          icon={Layers}
          color="forest"
          badge={`Total: ${stats.totalPlatforms || 0}`}
        />
        <StatCard
          title="Contact Inquiries"
          value={stats.totalContactInquiries}
          icon={Mail}
          color="blue"
          badge={`${stats.newContactInquiries || 0} New`}
        />
        <StatCard
          title="Partner Inquiries"
          value={stats.totalPartnerInquiries}
          icon={Handshake}
          color="gold"
          badge={`${stats.newPartnerInquiries || 0} New`}
        />
        <StatCard
          title="Active Job Openings"
          value={stats.activeJobs}
          icon={Briefcase}
          color="purple"
          badge={`${stats.totalApplications || 0} Applicants`}
        />
        <StatCard
          title="Published News"
          value={stats.publishedNews}
          icon={Newspaper}
          color="emerald"
        />
      </div>

      {/* Recent Inquiries Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Partner Inquiries */}
        <div className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-sage-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Handshake className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif font-bold text-base text-forest-950">
                Recent Partner Inquiries
              </h3>
            </div>
            <Link
              to="/admin/partner-inquiries"
              className="text-xs font-bold text-forest-900 hover:text-gold-600"
            >
              View All ({stats.totalPartnerInquiries || 0}) →
            </Link>
          </div>

          <div className="divide-y divide-sage-100 flex-1">
            {recent.partners && recent.partners.length > 0 ? (
              recent.partners.map((item) => (
                <div key={item._id} className="p-4 flex items-center justify-between hover:bg-sage-50/50">
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-forest-950">{item.name}</div>
                    <div className="text-[11px] text-charcoal-500">
                      {item.businessName} • {item.city}, {item.state}
                    </div>
                    <div className="text-[10px] text-gold-700 font-semibold">{item.category}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge status={item.status}>{item.status}</Badge>
                    <div className="text-[10px] text-charcoal-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-charcoal-400">
                No partnership inquiries submitted yet.
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="bg-white rounded-2xl border border-sage-200 shadow-soft-sm overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-sage-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-forest-800" />
              <h3 className="font-serif font-bold text-base text-forest-950">
                Recent Contact Messages
              </h3>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-bold text-forest-900 hover:text-forest-700"
            >
              View All ({stats.totalContactInquiries || 0}) →
            </Link>
          </div>

          <div className="divide-y divide-sage-100 flex-1">
            {recent.contacts && recent.contacts.length > 0 ? (
              recent.contacts.map((item) => (
                <div key={item._id} className="p-4 flex items-center justify-between hover:bg-sage-50/50">
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-forest-950">{item.name}</div>
                    <div className="text-[11px] text-charcoal-500 truncate max-w-xs">{item.subject || item.message}</div>
                    <div className="text-[10px] text-forest-700 font-medium">{item.category}</div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge status={item.status}>{item.status}</Badge>
                    <div className="text-[10px] text-charcoal-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-charcoal-400">
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
