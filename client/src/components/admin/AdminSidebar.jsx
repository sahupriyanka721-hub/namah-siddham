import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
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
  { name: 'Platforms', path: '/admin/platforms', icon: Layers },
  { name: 'Page CMS', path: '/admin/pages', icon: FileCode },
  { name: 'Leadership & Team', path: '/admin/team', icon: Users2 },
  { name: 'News & Updates', path: '/admin/news', icon: Newspaper },
  { name: 'Job Openings', path: '/admin/careers', icon: Briefcase },
  { name: 'Contact Inquiries', path: '/admin/inquiries', icon: Mail },
  { name: 'Partner Inquiries', path: '/admin/partner-inquiries', icon: Handshake },
  { name: 'Job Applications', path: '/admin/applications', icon: UserCheck },
  { name: 'Legal CMS', path: '/admin/legal', icon: Scale },
  { name: 'Company Settings', path: '/admin/settings', icon: Settings },
  { name: 'Admin Profile', path: '/admin/profile', icon: UserCircle },
];

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-forest-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-forest-950 text-sage-200 border-r border-forest-900 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-forest-900 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md">
              <span className="text-forest-950 font-serif font-black text-sm">NS</span>
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-white uppercase tracking-wider block">
                Namah Siddham
              </span>
              <span className="text-[9px] text-gold-400 font-mono tracking-widest uppercase block">
                Admin Management Portal
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-sage-400 hover:text-white p-1"
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
                      ? 'bg-forest-900 text-gold-300 border-l-4 border-gold-400 font-bold'
                      : 'text-sage-300 hover:bg-forest-900/60 hover:text-white'
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
        <div className="p-4 border-t border-forest-900 bg-forest-950">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-gold-300 text-xs font-semibold transition-colors"
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
