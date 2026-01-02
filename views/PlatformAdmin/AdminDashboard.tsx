
import React, { useEffect, useState, useMemo } from 'react';
import { 
  Building2, Users, CreditCard, Activity, Sparkles, LayoutGrid, 
  Plus, MoreVertical, ExternalLink, ShieldAlert, Zap, Globe, 
  BarChart3, RefreshCw, Search, Filter, Settings2, PieChart as PieIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, PieChart, Pie
} from 'recharts';
import StatCard from '../../components/StatCard';
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

// Fixed status strings to match Module type definition ('Enabled' | 'Disabled')
const MOCK_MODULES: Partial<Module>[] = [
  { id: 'org', name: 'Organisation Core', status: 'Enabled', subscriberCount: 124, price: 0, category: 'Core' },
  { id: 'hr', name: 'HR Management', status: 'Enabled', subscriberCount: 88, price: 29, category: 'Workforce' },
  { id: 'finance', name: 'Finance & Budget', status: 'Enabled', subscriberCount: 42, price: 49, category: 'Operations' },
  { id: 'crm', name: 'Customer Relations', status: 'Disabled', subscriberCount: 12, price: 35, category: 'Sales' },
  { id: 'analytics', name: 'Advanced Insights', status: 'Enabled', subscriberCount: 15, price: 99, category: 'Intelligence' },
];

// Added MOCK_TENANTS to fix missing definition error at line 218
const MOCK_TENANTS = [
  { id: '1', name: 'Acme Corp', status: 'Active', plan: 'Enterprise', mrr: '$2,400', activeModules: ['org', 'hr', 'finance'] },
  { id: '2', name: 'Globex Inc', status: 'Trial', plan: 'Professional', mrr: '$0', activeModules: ['org', 'hr'] },
  { id: '3', name: 'Initech', status: 'Active', plan: 'Professional', mrr: '$850', activeModules: ['org', 'hr'] },
  { id: '4', name: 'Soylent Corp', status: 'Suspended', plan: 'Starter', mrr: '$0', activeModules: ['org'] },
  { id: '5', name: 'Umbrella Corp', status: 'Active', plan: 'Enterprise', mrr: '$5,250', activeModules: ['org', 'hr', 'finance', 'analytics'] },
];

const AdminDashboard: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<string>('Analyzing platform architecture...');
  const [activeTab, setActiveTab] = useState<'tenants' | 'modules' | 'system'>('tenants');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      const context = "Platform Control Center. Tenants: 124. Active Modules: 4. Revenue: $8.5k MRR. HR module is most popular. CRM is undergoing maintenance.";
      const insights = await getDashboardInsights(context);
      setAiInsights(insights || 'No insights available.');
    };
    fetchInsights();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Data for Module Distribution Chart
  const moduleDistributionData = useMemo(() => 
    MOCK_MODULES.map(m => ({ name: m.name, value: m.subscriberCount })), 
  []);

  const PIE_COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#e0e7ff', '#f1f5f9'];

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
          <div className="h-10 w-px bg-slate-200 mx-2" />
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                U{i}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-slate-50 bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
              +12
            </div>
          </div>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Global Instances" value="124" trend={12.5} icon={Globe} color="bg-indigo-600" />
        <StatCard title="Module Adoption" value="74%" trend={5.2} icon={LayoutGrid} color="bg-blue-600" />
        <StatCard title="Platform MRR" value="$8,500" trend={14.1} icon={CreditCard} color="bg-emerald-600" />
        <StatCard title="System Health" value="OPTIMAL" icon={Activity} color="bg-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ecosystem Performance */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-800 text-xl tracking-tight">Ecosystem Growth</h3>
              <p className="text-sm text-slate-400 font-medium">Revenue trajectory by monthly cycle</p>
            </div>
          </div>
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
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Module Distribution Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <PieIcon size={20} />
            </div>
            <h3 className="font-black text-slate-800 tracking-tight">Module Popularity</h3>
          </div>
          <div className="flex-1 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moduleDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
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
          <div className="mt-4 space-y-2">
            {MOCK_MODULES.slice(0, 3).map((m, i) => (
              <div key={m.id} className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-slate-500">{m.name}</span>
                </div>
                <span className="text-slate-800">{m.subscriberCount} users</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Governance Tabs */}
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('tenants')}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all tracking-widest ${activeTab === 'tenants' ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              TENANT NODES
            </button>
            <button 
              onClick={() => setActiveTab('modules')}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all tracking-widest ${activeTab === 'modules' ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              GLOBAL MODULES
            </button>
          </div>

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
              <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-100">
                <Plus size={18} />
                NEW COMPONENT
              </button>
            )}
          </div>
        </div>

        <div className="p-0">
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
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">TENANT_ID: {tenant.id.padStart(6, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-7">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border ${
                          tenant.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          tenant.status === 'Trial' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${tenant.status === 'Active' ? 'bg-emerald-500 animate-pulse' : tenant.status === 'Trial' ? 'bg-blue-500' : 'bg-rose-500'}`} />
                          {tenant.status}
                        </span>
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
                        <button className="text-slate-300 hover:text-indigo-600 p-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all active:scale-95">
                          <Settings2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'modules' ? (
            <div className="p-10 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {MOCK_MODULES.map((mod) => (
                  <div key={mod.id} className="group bg-white border border-slate-200 rounded-[2.5rem] p-10 flex flex-col shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-5">
                        <div className={`p-5 rounded-[1.8rem] transition-all duration-500 ${mod.status === 'Enabled' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-400'}`}>
                          <LayoutGrid size={28} />
                        </div>
                        <div>
                          <h5 className="font-black text-slate-800 text-xl tracking-tight">{mod.name}</h5>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{mod.category}</p>
                        </div>
                      </div>
                      <button className="p-2 text-slate-300 hover:text-slate-600">
                        <MoreVertical size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">GLOBAL USERS</p>
                        <p className="text-4xl font-black text-slate-800">{mod.subscriberCount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">UNIT PRICE</p>
                        <p className="text-4xl font-black text-emerald-500">${mod.price}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${mod.status === 'Enabled' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{mod.status}</span>
                      </div>
                      <div className="flex gap-4">
                        <button className="text-xs font-black text-indigo-600 hover:underline tracking-widest">MANIFEST</button>
                        <button className={`text-xs font-black ${mod.status === 'Enabled' ? 'text-rose-600' : 'text-emerald-600'} hover:underline tracking-widest`}>
                          {mod.status === 'Enabled' ? 'KILL SWITCH' : 'PROVISION'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-slate-300 hover:border-indigo-400 hover:text-indigo-400 transition-all hover:bg-indigo-50/30 group">
                  <div className="p-6 bg-slate-50 rounded-[1.8rem] group-hover:bg-indigo-100 transition-colors mb-4">
                    <Plus size={40} />
                  </div>
                  <p className="font-black text-xs tracking-[0.2em] uppercase">Register Component</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-20 text-center flex flex-col items-center justify-center space-y-8">
              <div className="p-8 bg-slate-50 rounded-[2.5rem]">
                <BarChart3 size={64} className="text-slate-200" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Global System Telemetry</h3>
                <p className="text-slate-400 max-w-md mx-auto font-medium">Monitoring cluster health, edge-node latency, and cross-tenant resource isolation protocols.</p>
              </div>
              <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-indigo-100 hover:scale-105 transition-transform uppercase">Initialize Deep Audit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
