
import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Plus, 
  ChevronRight, 
  Briefcase, 
  MapPin, 
  UserCircle, 
  Trash2, 
  Settings2,
  LayoutGrid,
  ShieldCheck,
  Search,
  ArrowRight
} from 'lucide-react';
import DashboardCard from '../../components/DashboardCard';
import Badge from '../../components/Badge';
import { Department, Division } from '../../types';

const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'dept-1',
    name: 'Engineering',
    description: 'Hardware, software, and systems architecture.',
    headId: 'staff-1',
    iconName: 'Cpu',
    divisions: [
      { id: 'div-1', name: 'Core Infrastructure', headId: 'staff-2', officeLocation: 'London HQ' },
      { id: 'div-2', name: 'Mobile Systems', headId: 'staff-3', officeLocation: 'Berlin Hub' }
    ]
  },
  {
    id: 'dept-2',
    name: 'Growth & Marketing',
    description: 'Brand presence and customer acquisition.',
    headId: 'staff-4',
    iconName: 'Zap',
    divisions: [
      { id: 'div-3', name: 'Digital Ad Operations', headId: 'staff-5', officeLocation: 'New York Office' }
    ]
  }
];

const OrgStructure: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'roles'>('hierarchy');

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
            <Building2 size={14} />
            Institutional Architecture
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Organization Structure</h2>
          <p className="text-slate-500 font-medium max-w-xl mt-1">
            Define the skeleton of your company. Manage departments, nested divisions, and operational nodes.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => setActiveTab('hierarchy')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all tracking-widest ${activeTab === 'hierarchy' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >DEPARTMENTS</button>
            <button 
              onClick={() => setActiveTab('roles')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all tracking-widest ${activeTab === 'roles' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >ROLE LIBRARY</button>
          </div>
        </div>
      </div>

      {activeTab === 'hierarchy' ? (
        <div className="grid grid-cols-1 gap-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Global Hierarchy Nodes</h3>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-100 uppercase">
              <Plus size={18} /> New Department
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {departments.map((dept) => (
              <DashboardCard 
                key={dept.id}
                title={dept.name}
                subtitle={dept.description}
                className="hover:border-indigo-200 transition-colors group relative"
                headerAction={
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                      <Settings2 size={18} />
                    </button>
                    <button className="p-2 text-slate-300 hover:text-rose-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                }
              >
                <div className="space-y-6">
                  {/* Department Head */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-600">
                        <UserCircle size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Head of Department</p>
                        <p className="text-sm font-bold text-slate-800">Assign Manager</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Change</button>
                  </div>

                  {/* Divisions Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Divisions / Offices ({dept.divisions.length})</h4>
                      <button className="text-indigo-600 hover:text-indigo-700">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {dept.divisions.map((div) => (
                        <div key={div.id} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all flex items-center justify-between group/div">
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-indigo-400 group-hover/div:scale-125 transition-transform" />
                            <div>
                              <p className="text-sm font-bold text-slate-700">{div.name}</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <MapPin size={10} className="text-slate-300" />
                                <span className="text-[10px] text-slate-400 font-bold">{div.officeLocation}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-slate-200 group-hover/div:text-indigo-400 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DashboardCard>
            ))}

            {/* Empty State / Add New Placeholder */}
            <div className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center group hover:border-indigo-300 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all mb-4">
                <LayoutGrid size={32} />
              </div>
              <h4 className="text-lg font-black text-slate-400 group-hover:text-indigo-600">Add New Org Node</h4>
              <p className="text-slate-400 text-sm mt-1">Scale your organization with a new department</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardCard title="Title Registry" subtitle="Global roles available for assignment">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['General Manager', 'Technical Lead', 'Associate', 'Project Coordinator', 'Executive Director'].map((role, i) => (
                  <div key={i} className="p-5 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                        <Briefcase size={18} />
                      </div>
                      <span className="font-bold text-slate-700">{role}</span>
                    </div>
                    <Badge variant="neutral">System</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <button className="flex items-center gap-2 text-indigo-600 font-black text-xs tracking-widest uppercase group">
                   Manage Custom Definitions <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </DashboardCard>
          </div>

          <div className="space-y-8">
            <DashboardCard title="Role Security" icon={ShieldCheck}>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Roles are linked to platform permissions. Changing a role definition will affect the access levels of all assigned personnel globally.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Usage Intensity</span>
                  <span>High</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 w-[78%]" />
                </div>
              </div>
            </DashboardCard>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Users size={80} />
               </div>
               <div className="relative z-10">
                 <h5 className="text-xl font-black mb-2">Flexible Governance</h5>
                 <p className="text-sm text-indigo-100/60 leading-relaxed mb-6">
                   Your organization is unique. Use Divisions to represent regional offices, project teams, or functional silos.
                 </p>
                 <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs tracking-widest hover:bg-indigo-50 transition-all shadow-lg uppercase">
                    Define Office Matrix
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgStructure;
