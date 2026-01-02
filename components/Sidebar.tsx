
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CreditCard, 
  Settings, 
  Store, 
  PieChart, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Sparkles,
  Network
} from 'lucide-react';
import { User } from '../types';

const SidebarItem = ({ to, icon: Icon, label, active, isCollapsed }: { to: string, icon: any, label: string, active: boolean, isCollapsed: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative group ${
      active ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    <Icon size={20} className="shrink-0" />
    <span className={`font-medium whitespace-nowrap transition-all duration-300 ${
      isCollapsed ? 'opacity-0 translate-x-[-10px] pointer-events-none absolute' : 'opacity-100 translate-x-0'
    }`}>
      {label}
    </span>
    {isCollapsed && (
      <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap border border-slate-700">
        {label}
      </div>
    )}
  </Link>
);

interface SidebarProps {
  user: User;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleView: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, isCollapsed, onToggleCollapse, onToggleView }) => {
  const location = useLocation();
  const isPlatform = user.role === 'PLATFORM_ADMIN';

  return (
    <aside className={`hidden md:flex flex-col bg-slate-950 border-r border-slate-800 p-4 transition-all duration-300 ease-in-out relative ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Toggle Button */}
      <button 
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 bg-indigo-600 text-white rounded-full p-1 border-4 border-slate-900 shadow-xl z-20 hover:scale-110 transition-transform active:scale-95"
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <div className={`flex items-center gap-2 mb-10 transition-all duration-300 ${isCollapsed ? 'px-1' : 'px-2'}`}>
        <div className="bg-indigo-600 p-1.5 rounded-lg shrink-0">
          <ShieldCheck className="text-white" size={24} />
        </div>
        {!isCollapsed && (
          <span className="text-white font-bold text-xl tracking-tight transition-all duration-300">
            NGOFFICE
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-2 overflow-x-hidden">
        {isPlatform ? (
          <>
            <SidebarItem to="/" label="Admin Home" icon={LayoutDashboard} active={location.pathname === '/'} isCollapsed={isCollapsed} />
            <SidebarItem to="/deployments" label="Deployments" icon={GitBranch} active={location.pathname === '/deployments'} isCollapsed={isCollapsed} />
            <SidebarItem to="/tenants" label="Tenants" icon={Building2} active={location.pathname === '/tenants'} isCollapsed={isCollapsed} />
            <SidebarItem to="/billing" label="Platform Revenue" icon={CreditCard} active={location.pathname === '/billing'} isCollapsed={isCollapsed} />
            <SidebarItem to="/settings" label="Global Settings" icon={Settings} active={location.pathname === '/settings'} isCollapsed={isCollapsed} />
          </>
        ) : (
          <>
            <SidebarItem to="/" label="Dashboard" icon={LayoutDashboard} active={location.pathname === '/'} isCollapsed={isCollapsed} />
            <SidebarItem to="/org-structure" label="Org Structure" icon={Network} active={location.pathname === '/org-structure'} isCollapsed={isCollapsed} />
            <SidebarItem to="/staff" label="Staff Directory" icon={Users} active={location.pathname === '/staff'} isCollapsed={isCollapsed} />
            <SidebarItem to="/marketplace" label="Marketplace" icon={Store} active={location.pathname === '/marketplace'} isCollapsed={isCollapsed} />
            <SidebarItem to="/finance" label="Finance" icon={PieChart} active={location.pathname === '/finance'} isCollapsed={isCollapsed} />
            <SidebarItem to="/settings" label="Settings" icon={Settings} active={location.pathname === '/settings'} isCollapsed={isCollapsed} />
          </>
        )}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
         <button 
          onClick={onToggleView}
          className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-indigo-400 hover:bg-indigo-950 rounded-lg mb-4 transition-all ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Sparkles size={16} className="shrink-0" />
          {!isCollapsed && <span>Switch View</span>}
        </button>
        <div className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed ? 'px-1 justify-center' : 'px-2'}`}>
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold shrink-0 shadow-inner">
            {user.name[0]}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-slate-500 text-xs truncate">{user.role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
