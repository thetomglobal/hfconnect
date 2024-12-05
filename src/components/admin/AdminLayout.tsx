import React from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, DollarSign, Users } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/reports', icon: FileText, label: 'Reports' },
    { path: '/admin/offerings', icon: DollarSign, label: 'Offerings' },
    { path: '/admin/members', icon: Users, label: 'Members' },
  ];

  return (
    <div className="min-h-screen bg-black/95">
      <nav className="fixed top-0 left-0 h-screen w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 p-4">
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-8">
            <LayoutDashboard className="w-8 h-8 text-[#E50914]" />
            <span className="text-xl font-bold text-white">Admin Portal</span>
          </div>
          
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E50914] text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-auto">
            <Link
              to="/"
              className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white transition-colors"
            >
              <span>← Return to Main Site</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="ml-64 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}