
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CreditCard, 
  Settings, 
  LogOut, 
  Store, 
  Briefcase, 
  PieChart, 
  ShieldCheck,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import AdminDashboard from './views/PlatformAdmin/AdminDashboard';
import TenantDashboard from './views/Tenant/TenantDashboard';
import ModuleMarketplace from './views/Tenant/ModuleMarketplace';
import StaffManagement from './views/Tenant/StaffManagement';
import { User } from './types';

// Simple Mock Auth Context Replacement
const MOCK_USER: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'admin@ngoffice.io',
  role: 'PLATFORM_ADMIN'
};

const MOCK_TENANT_USER: User = {
  id: '2',
  name: 'Sarah Miller',
  email: 'sarah@acme-corp.com',
  role: 'TENANT_ADMIN',
  tenantId: 'tenant-1'
};

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

// Added explicit interface for AppLayout props to resolve children mapping issues in JSX
// Fixed: children marked as optional to prevent TS errors when component is used with nested JSX elements
interface AppLayoutProps {
  children?: React.ReactNode;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AppLayout = ({ children, user, setUser }: AppLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleUser = () => {
    setUser(user.role === 'PLATFORM_ADMIN' ? MOCK_TENANT_USER : MOCK_USER);
  };

  const isPlatform = user.role === 'PLATFORM_ADMIN';

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">NGOFFICE</span>
        </div>

        <nav className="flex-1 space-y-2">
          {isPlatform ? (
            <>
              <SidebarItem to="/" label="Admin Home" icon={LayoutDashboard} active={location.pathname === '/'} />
              <SidebarItem to="/tenants" label="Tenants" icon={Building2} active={location.pathname === '/tenants'} />
              <SidebarItem to="/billing" label="Platform Revenue" icon={CreditCard} active={location.pathname === '/billing'} />
              <SidebarItem to="/settings" label="Global Settings" icon={Settings} active={location.pathname === '/settings'} />
            </>
          ) : (
            <>
              <SidebarItem to="/" label="Dashboard" icon={LayoutDashboard} active={location.pathname === '/'} />
              <SidebarItem to="/staff" label="Organization" icon={Users} active={location.pathname === '/staff'} />
              <SidebarItem to="/marketplace" label="Marketplace" icon={Store} active={location.pathname === '/marketplace'} />
              <SidebarItem to="/finance" label="Finance" icon={PieChart} active={location.pathname === '/finance'} />
              <SidebarItem to="/settings" label="Settings" icon={Settings} active={location.pathname === '/settings'} />
            </>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
           <button 
            onClick={toggleUser}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-indigo-400 hover:bg-indigo-950 rounded-lg mb-4"
          >
            <Sparkles size={16} />
            Switch View (Demo)
          </button>
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
              {user.name[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-slate-500 text-xs truncate">{user.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-slate-50 min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <button className="md:hidden text-slate-500" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-slate-800 truncate">
            {isPlatform ? 'Platform Control Center' : 'Tenant Management'}
          </h1>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end mr-4">
                <span className="text-xs text-slate-400 font-medium">System Status</span>
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  All Systems Operational
                </span>
             </div>
             <button className="p-2 text-slate-400 hover:text-slate-600">
               <LogOut size={20} />
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-72 bg-slate-950 h-full p-6 shadow-2xl flex flex-col">
            <button className="absolute top-4 right-4 text-slate-400" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
            <div className="mb-10">
              <span className="text-white font-bold text-xl">NGOFFICE</span>
            </div>
            <nav className="flex-1 space-y-2">
               {/* Simplified mobile nav */}
               <SidebarItem to="/" label="Dashboard" icon={LayoutDashboard} active={true} />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);

  return (
    <HashRouter>
      <AppLayout user={currentUser} setUser={setCurrentUser}>
        <Routes>
          <Route path="/" element={currentUser.role === 'PLATFORM_ADMIN' ? <AdminDashboard /> : <TenantDashboard />} />
          <Route path="/marketplace" element={<ModuleMarketplace />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}
