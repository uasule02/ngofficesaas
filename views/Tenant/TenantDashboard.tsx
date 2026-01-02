
import React, { useEffect, useState } from 'react';
import { Users, LayoutGrid, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import StatCard from '../../components/StatCard';
import { getDashboardInsights } from '../../services/geminiService';

const MOCK_DEPT_DATA = [
  { name: 'Engineering', value: 45, color: '#4f46e5' },
  { name: 'Marketing', value: 25, color: '#0ea5e9' },
  { name: 'Operations', value: 20, color: '#8b5cf6' },
  { name: 'Finance', value: 10, color: '#f59e0b' },
];

const TenantDashboard: React.FC = () => {
  const [aiInsights, setAiInsights] = useState<string>('Fetching org insights...');

  useEffect(() => {
    const fetchInsights = async () => {
      const context = "Tenant: Acme Corp. Module Status: Organisation (Required), HR (Enabled), Finance (Disabled). Staff Count: 48. Hiring Goal: 5 new engineers. Last month expense: $12k.";
      const insights = await getDashboardInsights(context);
      setAiInsights(insights || 'No insights available.');
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Acme Corp Dashboard</h2>
          <p className="text-slate-500">Welcome back. Here's what's happening in your organization today.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold">
          <TrendingUp size={18} />
          <span>Active Subscription: Enterprise Plan</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Staff" value="48" trend={5.2} icon={Users} color="bg-indigo-600" />
        <StatCard title="Active Modules" value="2 / 4" trend={0} icon={LayoutGrid} color="bg-blue-600" />
        <StatCard title="Pending Approvals" value="7" trend={-2} icon={CheckCircle2} color="bg-emerald-600" />
        <StatCard title="Hiring Quota" value="85%" icon={TrendingUp} color="bg-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Staff Distribution by Department</h3>
          <div className="h-64 flex items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_DEPT_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {MOCK_DEPT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3 pl-6">
              {MOCK_DEPT_DATA.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-sm text-slate-600">{dept.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{dept.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={120} />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-indigo-200" size={24} />
              <h3 className="font-bold text-xl tracking-tight">AI Management Assistant</h3>
            </div>
            <div className="flex-1 text-indigo-100 leading-relaxed italic border-l-4 border-indigo-400 pl-6 my-4">
              "{aiInsights}"
            </div>
            <div className="mt-auto pt-6 flex gap-4">
               <button className="flex-1 bg-white text-indigo-700 hover:bg-indigo-50 transition-colors py-2 rounded-lg font-bold text-sm">
                 Optimize Roles
               </button>
               <button className="flex-1 bg-indigo-500/30 hover:bg-indigo-500/50 transition-colors py-2 rounded-lg font-bold text-sm">
                 Full Report
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { msg: 'New employee onboarded to Engineering', time: '2h ago', icon: '👤' },
            { msg: 'Q3 Budget proposal submitted for review', time: '5h ago', icon: '💰' },
            { msg: 'HR Module successfully updated to v2.4', time: 'Yesterday', icon: '⚡' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{item.msg}</p>
                <p className="text-xs text-slate-400">{item.time}</p>
              </div>
              <button className="text-slate-300 hover:text-slate-500">•••</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
