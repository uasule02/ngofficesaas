
import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Rocket, 
  History, 
  Server, 
  Activity, 
  ShieldCheck, 
  Plus, 
  MoreVertical, 
  Terminal,
  Zap,
  RefreshCw,
  GitMerge,
  Cpu,
  Globe,
  Database,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_TRAFFIC_DATA = [
  { time: '00:00', load: 32, latency: 12 },
  { time: '04:00', load: 18, latency: 15 },
  { time: '08:00', load: 64, latency: 28 },
  { time: '12:00', load: 85, latency: 22 },
  { time: '16:00', load: 72, latency: 19 },
  { time: '20:00', load: 45, latency: 14 },
];

const DeploymentControl: React.FC = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [activeBranch, setActiveBranch] = useState('main');

  const startDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header Context */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
            <GitBranch size={14} />
            CI/CD Orchestration Engine
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Deployment Control</h2>
          <p className="text-slate-500 font-medium max-w-xl mt-1">
            Manage global platform versions, canary releases, and regional cluster sync states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3.5 rounded-2xl font-black text-xs tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <History size={18} />
            RELEASE HISTORY
          </button>
          <button 
            onClick={startDeploy}
            disabled={isDeploying}
            className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 active:scale-95"
          >
            {isDeploying ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                BUILDING...
              </>
            ) : (
              <>
                <Rocket size={18} />
                TRIGGER DEPLOY
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Branch Monitor */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="font-black text-slate-800 text-xl tracking-tight">Active Cluster Load</h3>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">Branch: production-stable</p>
               </div>
               <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  REAL-TIME
               </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_TRAFFIC_DATA}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '800'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '800'}} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="load" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-50">
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Latency</p>
                  <p className="text-2xl font-black text-slate-800">18ms</p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Pods</p>
                  <p className="text-2xl font-black text-slate-800">24/24</p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Uptime</p>
                  <p className="text-2xl font-black text-emerald-500">99.99%</p>
               </div>
            </div>
          </div>

          {/* Terminal / Logs View */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white font-mono shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Node Logs: us-east-1</span>
              </div>
              <Terminal size={16} className="text-slate-700" />
            </div>
            
            <div className="space-y-1.5 text-xs text-slate-400 leading-relaxed max-h-48 overflow-y-auto custom-scrollbar">
              <p className="text-emerald-400">[08:42:11] Bootstrapping environment 'main'...</p>
              <p>[08:42:12] Validating security handshake... <span className="text-emerald-500">OK</span></p>
              <p>[08:42:15] Provisioning 12 tenant isolation containers...</p>
              <p>[08:42:18] Syncing module manifest for 'hr-management-v2'</p>
              <p className="text-indigo-400">[08:42:20] Deployment starting on node-cluster-alpha</p>
              <p className="text-slate-600 italic">-- Monitoring heartbeats --</p>
              <p>[08:43:01] Health check passed for 48/48 endpoints.</p>
            </div>

            <div className="absolute bottom-4 right-8 group-hover:translate-x-1 transition-transform cursor-pointer flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              Open Full Shell <ArrowRight size={12} />
            </div>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-8">
           {/* Active Node Cards */}
           <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Globe size={16} className="text-indigo-600" />
                Regional Status
              </h4>
              <div className="space-y-6">
                {[
                  { name: 'North America', status: 'Healthy', load: '42%', icon: '🇺🇸' },
                  { name: 'Europe Central', status: 'Healthy', load: '18%', icon: '🇪🇺' },
                  { name: 'Asia Pacific', status: 'Scaling', load: '89%', icon: '🇸🇬' },
                ].map((region, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="text-xl grayscale group-hover:grayscale-0 transition-all">{region.icon}</div>
                      <div>
                        <p className="text-xs font-black text-slate-800">{region.name}</p>
                        <p className="text-[10px] font-bold text-slate-400">{region.load} Load</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      region.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                    }`}>
                      {region.status}
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Infrastructure Health */}
           <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Database size={80} />
              </div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">Global Health Index</p>
                    <h5 className="text-4xl font-black">99.98%</h5>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                       <span>Memory Utilization</span>
                       <span>4.2 GB / 12 GB</span>
                    </div>
                    <div className="h-1.5 bg-indigo-500 rounded-full overflow-hidden">
                       <div className="h-full bg-white w-[35%]" />
                    </div>
                 </div>

                 <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs tracking-widest hover:bg-indigo-50 transition-all shadow-lg">
                    RESOURCE ALLOCATION
                 </button>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="bg-slate-50 rounded-[2rem] border border-slate-200 p-6 space-y-3">
              <button className="w-full flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-600 hover:text-indigo-600 hover:border-indigo-600 transition-all uppercase tracking-widest group">
                 <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                    <GitMerge size={14} />
                 </div>
                 Merge Staging to Main
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-600 hover:text-rose-600 hover:border-rose-600 transition-all uppercase tracking-widest group">
                 <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-rose-50 transition-colors">
                    <Zap size={14} />
                 </div>
                 Panic Switch (Kill All)
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentControl;
