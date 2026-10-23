import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  Layers,
  FolderGit2,
  FileCode,
  Users2,
  Newspaper,
  Briefcase,
  Mail,
  Handshake,
  UserCheck,
  Scale,
  Settings,
  UserCircle,
  X,
  ExternalLink,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'IT Services', path: '/admin/services', icon: Code2 },
  { name: 'Digital Platforms', path: '/admin/platforms', icon: Layers },
  { name: 'Portfolio Projects', path: '/admin/portfolio', icon: FolderGit2 },
  { name: 'Page CMS', path: '/admin/pages', icon: FileCode },
  { name: 'Leadership & Team', path: '/admin/team', icon: Users2 },
  { name: 'News & Updates', path: '/admin/news', icon: Newspaper },
  { name: 'Job Openings', path: '/admin/careers', icon: Briefcase },
  { name: 'Contact Inquiries', path: '/admin/inquiries', icon: Mail },
  { name: 'Partner Inquiries', path: '/admin/partner-inquiries', icon: Handshake },
  { name: 'Job Applications', path: '/admin/applications', icon: UserCheck },
  { name: 'Legal Policies CMS', path: '/admin/legal', icon: Scale },
  { name: 'Company Settings', path: '/admin/settings', icon: Settings },
  { name: 'Admin Profile', path: '/admin/profile', icon: UserCircle },
];

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-950 text-surface-300 border-r border-navy-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src="/assets/namah-siddham-logo.png"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/logo-white.svg';
              }}
              alt="Namah Siddham Logo"
              className="h-8 w-auto object-contain"
            />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-surface-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-royal-500 text-white font-bold shadow-soft-sm'
                      : 'text-surface-300 hover:bg-navy-900 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Link to Public Website */}
        <div className="p-4 border-t border-navy-800 bg-navy-950">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-400 text-xs font-semibold transition-colors border border-navy-800"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
