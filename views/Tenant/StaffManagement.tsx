
import React, { useState } from 'react';
import { 
  Search, Plus, Filter, MoreHorizontal, Mail, Shield, 
  UserPlus, Download, UserCheck, Clock, Hash, Activity,
  ChevronRight, Edit3, Trash2
} from 'lucide-react';

const STAFF_DATA = [
  { id: 1, name: 'Alice Cooper', role: 'CTO', dept: 'Engineering', email: 'alice@acme.com', status: 'Active', joiningDate: '2023-01-15', performance: 94 },
  { id: 2, name: 'Bob Wilson', role: 'Sr. Frontend', dept: 'Engineering', email: 'bob@acme.com', status: 'Active', joiningDate: '2023-03-10', performance: 88 },
  { id: 3, name: 'Charlie Davis', role: 'Product Lead', dept: 'Marketing', email: 'charlie@acme.com', status: 'On Leave', joiningDate: '2022-11-20', performance: 91 },
  { id: 4, name: 'Diana Ross', role: 'HR Director', dept: 'HR', email: 'diana@acme.com', status: 'Active', joiningDate: '2023-05-01', performance: 98 },
  { id: 5, name: 'Edward Norton', role: 'Accountant', dept: 'Finance', email: 'edward@acme.com', status: 'Inactive', joiningDate: '2021-08-12', performance: 76 },
];

const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Dynamic Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
            <Activity size={14} />
            Workforce Orchestration
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Organization Staff</h2>
          <p className="text-slate-500 font-medium max-w-xl mt-1">
            Global view of your human capital. Assign roles, monitor performance, and manage node access across your instance.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3.5 rounded-2xl font-black text-xs tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} />
            EXPORT DATA
          </button>
          <button className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200">
            <UserPlus size={18} />
            PROVISION STAFF
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Personnel', val: '42', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Average Tenure', val: '1.4 yrs', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Platform Utilization', val: '92%', icon: Hash, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-5 shadow-sm">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-8 border-b border-slate-100 flex flex-col lg:flex-row gap-6 bg-slate-50/30">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, role, department or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-500 hover:text-indigo-600 transition-all tracking-widest shadow-sm">
              <Filter size={18} />
              FILTER
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-500 hover:text-indigo-600 transition-all tracking-widest shadow-sm">
              <Shield size={18} />
              PERMISSIONS
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-10 py-6">IDENTIFIER & ROLE</th>
                <th className="px-10 py-6">SEGMENT</th>
                <th className="px-10 py-6">OPERATIONAL STATUS</th>
                <th className="px-10 py-6">PERFORMANCE SCORE</th>
                <th className="px-10 py-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {STAFF_DATA.map((person) => (
                <tr key={person.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg shadow-inner group-hover:scale-110 transition-transform">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-lg tracking-tight">{person.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{person.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-4 py-2 bg-white border border-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {person.dept}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        person.status === 'Active' ? 'bg-emerald-500 animate-pulse' :
                        person.status === 'On Leave' ? 'bg-amber-400' : 'bg-slate-300'
                      }`} />
                      <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{person.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            person.performance > 90 ? 'bg-emerald-500' : person.performance > 80 ? 'bg-indigo-500' : 'bg-amber-500'
                          }`} 
                          style={{ width: `${person.performance}%` }} 
                        />
                      </div>
                      <span className="text-sm font-black text-slate-800">{person.performance}%</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button className="p-3 text-slate-300 hover:text-rose-600 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-3 text-slate-300 hover:text-slate-600 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Telemetry: 48 NODE ACCESS POINTS ACTIVE</p>
           <div className="flex gap-2">
             <button className="px-6 py-3 border border-slate-200 rounded-xl text-xs font-black bg-white text-slate-400 cursor-not-allowed uppercase tracking-widest">Previous</button>
             <button className="px-6 py-3 border border-slate-200 rounded-xl text-xs font-black bg-white text-slate-800 hover:bg-slate-50 shadow-sm uppercase tracking-widest">Next Page</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
