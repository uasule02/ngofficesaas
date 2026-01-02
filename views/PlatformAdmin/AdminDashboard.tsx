
import React, { useEffect, useState, useMemo } from 'react';
import { 
  Building2, Users, CreditCard, Activity, Sparkles, LayoutGrid, 
  Plus, MoreVertical, ShieldAlert, Zap, Globe, 
  BarChart3, RefreshCw, Search, Filter, Settings2, PieChart as PieIcon,
  Package, Truck, Briefcase, FileText, Cpu, Layers
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, PieChart, Pie
} from 'recharts';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import DashboardCard from '../../components/DashboardCard';
import { getDashboardInsights } from '../../services/geminiService';
import { Module } from '../../types';

const MOCK_REVENUE_DATA = [
  { month: 'Jan', revenue: 4500, activeModules: 2 },
  { month: 'Feb', revenue: 5200, activeModules: 2 },
  { month: 'Mar', revenue: 6100, activeModules: 3 },
  { month: 'Apr', revenue: 5800, activeModules: 3 },
  { month: 'May', revenue: 7200, activeModules: 3 },
  { month: 'Jun', revenue: 8500, activeModules: 4 },
];

const MOCK_MODULES: Partial<Module>[] = [
  { id: 'org', name: 'Organisation Core', status: 'Enabled', subscriberCount: 124, price: 0, category: 'Core' },
  { id: 'hr', name: 'HR Management', status: 'Enabled', subscriberCount: 88, price: 29, category: 'Workforce' },
  { id: 'finance', name: 'Finance & Budget', status: 'Enabled', subscriberCount: 42, price: 49, category: 'Operations' },
  { id: 'project', name: 'Project Monitoring', status: 'Enabled', subscriberCount: 38, price: 59, category: 'Strategy' },
  { id: 'inventory', name: 'Inventory & Supply', status: 'Enabled', subscriberCount: 22, price: 45, category: 'Logistics' },
  { id: 'payroll', name: 'Payroll Engine', status: 'Enabled', subscriberCount: 56, price: 39, category: 'Finance' },
  { id: 'asset', name: 'Asset Management', status: 'Disabled', subscriberCount: 15, price: 25, category: 'Admin' },
  { id: 'procurement', name: 'Procurement Hub', status: 'Enabled', subscriberCount: 18, price: 55, category: 'Operations' },
];

const MOCK_TENANTS = [
  { id: '1', name: 'Acme Corp', status: 'Active', plan: 'Enterprise', mrr: '$2,400', activeModules: ['org', 'hr', 'finance', 'project'] },
  { id: '2', name: 'Globex Inc', status: 'Trial', plan: 'Professional', mrr: '$0', activeModules: ['org', 'hr', 'inventory'] },
  { id: '3', name: 'Initech', status: 'Active', plan: 'Professional', mrr: '$850', activeModules: ['org', 'hr', 'payroll'] },
  { id: '4', name: 'Soylent Corp', status: 'Suspended', plan: 'Starter', mrr: '$0', activeModules: ['org'] },
  { id: '5', name: 'Umbrella Corp', status: 'Active', plan: 'Enterprise', mrr: '$5,250', activeModules: ['org', 'hr', 'finance', 'project', 'payroll', 'procurement'] },
];

const AdminDashboard: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<string>('Analyzing platform architecture...');
  const [activeTab, setActiveTab] = useState<'tenants' | 'modules' | 'system'>('tenants');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      const context = "Platform Control Center. Tenants: 124. Active Modules: 8. Revenue: $8.5k MRR. HR and Payroll are highly utilized.";
      const insights = await getDashboardInsights(context);
      setAiInsights(insights || 'No insights available.');
    };
    fetchInsights();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const moduleDistributionData = useMemo(() => 
    MOCK_MODULES.map(m => ({ name: m.name, value: m.subscriberCount })), 
  []);

  const PIE_COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#f1f5f9', '#94a3b8'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Control Center</h1>
          <p className="text-slate-500 font-medium">Global governance and multi-tenant management infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className={`p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Global Instances" value="124" trend={12.5} icon={Globe} color="bg-indigo-600" />
        <StatCard title="Active Modules" value="8" trend={2.1} icon={Layers} color="bg-blue-600" />
        <StatCard title="Platform MRR" value="$12,850" trend={14.1} icon={CreditCard} color="bg-emerald-600" />
        <StatCard title="System Health" value="OPTIMAL" icon={Activity} color="bg-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DashboardCard 
          title="Ecosystem Growth" 
          subtitle="Revenue trajectory by monthly cycle" 
          className="lg:col-span-2"
        >
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Market Adoption" icon={PieIcon} subtitle="Distribution by subscribers">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moduleDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {moduleDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-1.5 overflow-y-auto max-h-40 pr-2 custom-scrollbar">
            {MOCK_MODULES.map((m, i) => (
              <div key={m.id} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-slate-500">{m.name}</span>
                </div>
                <span className="text-slate-800">{m.subscriberCount}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Governance Section */}
      <DashboardCard 
        className="p-0 overflow-hidden min-h-[600px]"
        headerAction={
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Lookup organization..." 
                className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 shadow-sm"
              />
            </div>
            {activeTab === 'modules' && (
              <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 uppercase">
                <Plus size={18} /> New Component
              </button>
            )}
          </div>
        }
      >
        <div className="p-8 border-b border-slate-100 flex p-1.5 bg-slate-50 w-full mb-0">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('tenants')}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all tracking-widest ${activeTab === 'tenants' ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >TENANT NODES</button>
            <button 
              onClick={() => setActiveTab('modules')}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all tracking-widest ${activeTab === 'modules' ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >GLOBAL MODULES</button>
          </div>
        </div>

        {activeTab === 'tenants' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="px-10 py-6">ORGANIZATION</th>
                  <th className="px-10 py-6">OPERATIONAL STATUS</th>
                  <th className="px-10 py-6">TIER & REVENUE</th>
                  <th className="px-10 py-6">MODULE STACK</th>
                  <th className="px-10 py-6 text-right">MGMT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_TENANTS.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          {tenant.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-lg tracking-tight">{tenant.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID: {tenant.id.padStart(6, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <Badge 
                        variant={tenant.status === 'Active' ? 'success' : tenant.status === 'Trial' ? 'info' : 'error'} 
                        dot pulse={tenant.status === 'Active'}
                      >
                        {tenant.status}
                      </Badge>
                    </td>
                    <td className="px-10 py-7">
                      <p className="text-sm font-black text-slate-800">{tenant.plan}</p>
                      <p className="text-sm font-black text-emerald-500">{tenant.mrr}</p>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {tenant.activeModules.map(mId => (
                          <span key={mId} className="px-2 py-0.5 rounded-md bg-slate-100 text-[9px] font-black text-slate-400 uppercase border border-slate-200">
                            {mId}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <button className="text-slate-300 hover:text-indigo-600 p-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all">
                        <Settings2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="px-10 py-6">MODULE NAME</th>
                  <th className="px-10 py-6">CATEGORY</th>
                  <th className="px-10 py-6">PRICING</th>
                  <th className="px-10 py-6">SUBSCRIBERS</th>
                  <th className="px-10 py-6 text-right">GLOBAL STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_MODULES.map((module) => (
                  <tr key={module.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                          <Layers size={16} />
                        </div>
                        <p className="font-bold text-slate-800">{module.name}</p>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <Badge variant="neutral">{module.category}</Badge>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-sm font-black text-slate-700">{module.price === 0 ? 'FREE' : `$${module.price}/mo`}</p>
                    </td>
                    <td className="px-10 py-6">
                       <div className="flex items-center gap-2">
                         <Users size={14} className="text-slate-400" />
                         <span className="text-sm font-bold text-slate-600">{module.subscriberCount} nodes</span>
                       </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <Badge variant={module.status === 'Enabled' ? 'success' : 'neutral'}>{module.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default AdminDashboard;
