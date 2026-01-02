
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  CreditCard, 
  CheckCircle, 
  Settings, 
  ShieldCheck, 
  PieChart, 
  Briefcase,
  AlertCircle,
  Loader2,
  Store,
  ArrowLeft,
  Star,
  Zap,
  Check,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Package,
  Truck,
  FileText,
  Activity,
  Cpu,
  Workflow
} from 'lucide-react';
import { Module, Review } from '../../types';

const INITIAL_MODULES: Module[] = [
  {
    id: 'org',
    name: 'Organisation Core',
    description: 'Manage staff, departments, roles, and basic company structure.',
    longDescription: 'The Organisation Core module is the central nervous system of your NGOFFICE environment. It provides the fundamental infrastructure required to represent your corporate hierarchy, manage user access, and define departmental boundaries.',
    features: ['Hierarchical Org Chart', 'Custom Role Definitions', 'Departmental Segmentation', 'Global Search & Audit Logs'],
    icon: ShieldCheck,
    status: 'Enabled',
    isRequired: true,
    category: 'Core',
    price: 0,
    subscriberCount: 1240,
    rating: 4.9,
    reviews: [
      { id: '1', author: 'Jane Doe', rating: 5, comment: 'Essential for any setup. Very intuitive.', date: '2024-03-01' }
    ]
  },
  {
    id: 'hr',
    name: 'HR Management',
    description: 'Recruiting, performance assessments, and employee onboarding workflows.',
    longDescription: 'Automate your entire human resources lifecycle. From the moment a candidate applies to their final exit interview, the HR Management module ensures compliance, boosts engagement, and saves hundreds of administrative hours.',
    features: ['ATS (Applicant Tracking System)', 'Performance Review Cycles', 'Leave & Attendance Tracking', 'Digital Onboarding Toolkits'],
    icon: Briefcase,
    status: 'Enabled',
    isRequired: false,
    category: 'Workforce',
    price: 29,
    subscriberCount: 840,
    rating: 4.7,
    reviews: [
      { id: '2', author: 'Mike Ross', rating: 4, comment: 'Great onboarding tools, saved us tons of time.', date: '2024-02-15' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Budget',
    description: 'Budgets, expense approvals, payment processing, and detailed financial reporting.',
    longDescription: 'Gain full visibility into your organizations financial health. The Finance & Budget module provides real-time tracking of expenses, automated approval workflows for departments, and high-fidelity reporting for stakeholders.',
    features: ['Automated Expense Approvals', 'Multi-currency Support', 'Budget Forecasting', 'Detailed P&L Reporting'],
    icon: PieChart,
    status: 'Disabled',
    isRequired: false,
    category: 'Operations',
    price: 49,
    subscriberCount: 320,
    rating: 4.5,
    reviews: [
      { id: '4', author: 'Harvey Specter', rating: 5, comment: 'The forecasting is surprisingly accurate.', date: '2024-01-10' }
    ]
  },
  {
    id: 'project',
    name: 'Project Monitoring',
    description: 'Track KPIs, milestones, and real-time project health across your organization.',
    longDescription: 'Directly integrated with the NGOFFICE project monitoring logic, this module allows project managers to define multi-level objectives, monitor field progress, and generate automated stakeholder reports.',
    features: ['KPI Tracking & Visualization', 'Gantt Chart Integration', 'Milestone Dependencies', 'Field Data Collection Sync'],
    icon: Activity,
    status: 'Disabled',
    isRequired: false,
    category: 'Strategy',
    price: 59,
    subscriberCount: 412,
    rating: 4.8,
    reviews: []
  },
  {
    id: 'inventory',
    name: 'Inventory & Supply',
    description: 'Warehouse management, stock tracking, and automated procurement alerts.',
    longDescription: 'Full control over your physical assets and consumable stocks. Monitor movement across regional branches, set low-stock triggers, and manage supply chain logistics with ease.',
    features: ['Multi-warehouse Sync', 'Batch & Serial Tracking', 'Low-stock Alerts', 'Transfer Reconciliation'],
    icon: Package,
    status: 'Disabled',
    isRequired: false,
    category: 'Logistics',
    price: 45,
    subscriberCount: 215,
    rating: 4.4,
    reviews: []
  },
  {
    id: 'payroll',
    name: 'Payroll Engine',
    description: 'Automated salary calculations, tax filings, and benefit disbursements.',
    longDescription: 'Remove the complexity from compensation. The Payroll Engine handles tax laws, benefit deductions, and direct deposit integration, ensuring your workforce is paid accurately and on time.',
    features: ['Automated Tax Filings', 'Direct Deposit API', 'Benefit Plan Management', 'Payslip Self-service Portal'],
    icon: FileText,
    status: 'Disabled',
    isRequired: false,
    category: 'Finance',
    price: 39,
    subscriberCount: 560,
    rating: 4.6,
    reviews: []
  },
  {
    id: 'procurement',
    name: 'Procurement Hub',
    description: 'Manage vendor relationships, purchase orders, and tender workflows.',
    longDescription: 'Streamline how your organization acquires goods and services. Manage your vendor database, track purchase orders from request to fulfillment, and run competitive tender processes.',
    features: ['Vendor Scorecarding', 'PO Approval Workflows', 'Electronic Tendering', 'Budget Commitments Tracking'],
    icon: Truck,
    status: 'Disabled',
    isRequired: false,
    category: 'Operations',
    price: 55,
    subscriberCount: 188,
    rating: 4.2,
    reviews: []
  },
  {
    id: 'crm',
    name: 'Customer Relations',
    description: 'Track client interactions, leads, and manage customer support requests.',
    longDescription: 'Build lasting relationships with your clients. Our CRM module integrates sales tracking with support ticketing, ensuring that every customer interaction is logged and actionable for your team.',
    features: ['Lead Pipeline Management', 'Support Ticket System', 'Customer Interaction History', 'Email Marketing Integration'],
    icon: Users,
    status: 'Disabled',
    isRequired: false,
    category: 'Sales',
    price: 35,
    subscriberCount: 510,
    rating: 4.3,
    reviews: []
  }
];

const ModuleMarketplace: React.FC = () => {
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const toggleModule = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProcessingId(id);
    
    setTimeout(() => {
      setModules(prev => prev.map(m => {
        if (m.id === id && !m.isRequired) {
          const newStatus = m.status === 'Enabled' ? 'Disabled' : 'Enabled';
          return { ...m, status: newStatus as 'Enabled' | 'Disabled' };
        }
        return m;
      }));
      setProcessingId(null);
    }, 800);
  };

  const selectedModule = useMemo(() => 
    modules.find(m => m.id === selectedModuleId), 
  [modules, selectedModuleId]);

  const relatedModules = useMemo(() => 
    modules.filter(m => m.id !== selectedModuleId).slice(0, 3),
  [modules, selectedModuleId]);

  const enabledModulesCount = useMemo(() => 
    modules.filter(m => m.status === 'Enabled').length, 
  [modules]);
  
  const totalPrice = useMemo(() => 
    modules.filter(m => m.status === 'Enabled').reduce((sum, m) => sum + m.price, 0), 
  [modules]);

  const progressPercentage = (enabledModulesCount / modules.length) * 100;

  if (selectedModule) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
        <button 
          onClick={() => setSelectedModuleId(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`p-8 rounded-[2rem] shadow-lg ${selectedModule.status === 'Enabled' ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-slate-100 text-slate-400'}`}>
                  <selectedModule.icon size={48} />
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-slate-100 text-slate-500">
                      {selectedModule.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-black">
                      <Star size={16} fill="currentColor" />
                      <span>{selectedModule.rating || 'New'}</span>
                      <span className="text-slate-300 text-xs font-bold ml-1">({selectedModule.subscriberCount} users)</span>
                    </div>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedModule.name}</h2>
                  <p className="text-slate-500 text-lg leading-relaxed">{selectedModule.longDescription}</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100">
                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <Zap size={20} className="text-indigo-600" />
                  Core Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedModule.features?.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 transition-all">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
                <MessageSquare size={20} className="text-indigo-600" />
                Community Feedback
              </h3>
              <div className="space-y-6">
                {selectedModule.reviews && selectedModule.reviews.length > 0 ? (
                  selectedModule.reviews.map((review: Review) => (
                    <div key={review.id} className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="font-black text-slate-800">{review.author}</p>
                        <div className="flex gap-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{review.date}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <Users size={32} className="mx-auto text-slate-200 mb-2" />
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No reviews yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Action Bar */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-8 border border-slate-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Store size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">Subscription Price</p>
                  <p className="text-4xl font-black">
                    {selectedModule.price === 0 ? 'FREE' : `$${selectedModule.price}`}
                    {selectedModule.price > 0 && <span className="text-sm text-slate-500 ml-1">/ mo</span>}
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-medium text-slate-300 leading-relaxed">
                  Usage-based billing applies. You only pay for the days this module is active in your workspace.
                </div>

                <button 
                  disabled={selectedModule.isRequired || processingId === selectedModule.id}
                  onClick={() => toggleModule(selectedModule.id)}
                  className={`w-full py-5 rounded-[1.2rem] font-black text-sm tracking-widest transition-all ${
                    selectedModule.isRequired 
                      ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                      : selectedModule.status === 'Enabled'
                        ? 'bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-900/20'
                        : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/40'
                  }`}
                >
                  {processingId === selectedModule.id ? (
                    <Loader2 size={20} className="animate-spin mx-auto" />
                  ) : (
                    <>
                      {selectedModule.status === 'Enabled' 
                        ? (selectedModule.isRequired ? 'SYSTEM PROTECTED' : 'CANCEL SUBSCRIPTION') 
                        : 'SUBSCRIBE NOW'
                      }
                    </>
                  )}
                </button>

                {selectedModule.status === 'Enabled' && (
                  <button className="w-full flex items-center justify-center gap-2 py-4 rounded-[1.2rem] font-black text-xs tracking-widest border border-white/10 hover:bg-white/5 transition-all text-slate-400">
                    <Settings size={16} />
                    MODULE CONFIGURATION
                  </button>
                )}
              </div>
            </div>

            {/* Related Modules */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] px-2">Related Tools</h4>
              <div className="space-y-4">
                {relatedModules.map(m => (
                  <button 
                    key={m.id}
                    onClick={() => setSelectedModuleId(m.id)}
                    className="w-full p-4 bg-white rounded-2xl border border-slate-200 flex items-center gap-4 hover:border-indigo-600 hover:shadow-lg transition-all text-left group"
                  >
                    <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <m.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-slate-800 text-sm">{m.name}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase">{m.category}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 w-fit rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100">
            <Store className="w-3 h-3" /> Marketplace
          </div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Expand Possibilities</h2>
          <p className="text-slate-500 text-lg max-w-xl">Enable specialized tools to streamline your organization's unique operational needs.</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50">
             <div className="px-2">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Modules</p>
               <p className="text-2xl font-black text-slate-800">{enabledModulesCount} <span className="text-slate-300 font-medium">/ {modules.length}</span></p>
             </div>
             <div className="w-px h-12 bg-slate-100" />
             <div className="px-2">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Bill</p>
               <p className="text-2xl font-black text-emerald-600 transition-all duration-300">${totalPrice}<span className="text-xs text-slate-300 font-bold ml-1">/MO</span></p>
             </div>
          </div>
          {/* Capability Bar */}
          <div className="px-2">
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
              <span>Capability Reach</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-700 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Alert */}
      <div className="bg-indigo-900 rounded-[2rem] p-6 flex items-start gap-4 border border-indigo-800 shadow-lg shadow-indigo-900/10">
        <div className="p-2 bg-indigo-500/20 rounded-xl">
          <AlertCircle className="text-indigo-300" size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Billing Transparency</p>
          <p className="text-xs text-indigo-200 mt-1 leading-relaxed">NGOFFICE operates on a prorated daily billing model. When you subscribe or unsubscribe, your next invoice will automatically adjust based on exact usage time.</p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module) => (
          <div 
            key={module.id} 
            onClick={() => setSelectedModuleId(module.id)}
            className={`group relative bg-white p-8 rounded-[3rem] border-2 transition-all duration-500 h-full flex flex-col cursor-pointer ${
            module.status === 'Enabled' 
              ? 'border-indigo-600 shadow-[0_32px_64px_-12px_rgba(79,70,229,0.12)]' 
              : 'border-slate-100 hover:border-slate-300 hover:shadow-2xl'
          }`}>
            <div className="flex items-start justify-between mb-8">
              <div className={`p-4 rounded-[1.5rem] transition-all duration-500 shadow-sm ${
                module.status === 'Enabled' ? 'bg-indigo-600 text-white rotate-2 scale-105' : 'bg-slate-50 text-slate-400'
              }`}>
                <module.icon size={28} />
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-3 shadow-sm ${
                  module.isRequired ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-100'
                }`}>
                  {module.category}
                </span>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Base Rate</p>
                  <p className={`text-xl font-black ${module.price === 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                    {module.price === 0 ? 'INCLUDED' : `$${module.price}`}
                    {module.price > 0 && <span className="text-xs text-slate-300 ml-1">/mo</span>}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{module.name}</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-8 line-clamp-2">
              {module.description}
            </p>

            <div className="flex items-center gap-3 mt-auto">
              <button 
                disabled={module.isRequired || processingId === module.id}
                onClick={(e) => toggleModule(module.id, e)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-black text-[10px] tracking-widest transition-all ${
                  module.isRequired 
                    ? 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'
                    : module.status === 'Enabled'
                      ? 'bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-200'
                      : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-slate-200'
                }`}
              >
                {processingId === module.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    {module.status === 'Enabled' 
                      ? (module.isRequired ? 'CORE' : 'CANCEL') 
                      : 'SUBSCRIBE'
                    }
                  </>
                )}
              </button>
              
              {module.status === 'Enabled' && (
                <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl border border-slate-100 transition-all active:scale-90">
                  <Settings size={18} />
                </button>
              )}
            </div>
            
            {module.status === 'Enabled' && (
              <div className="absolute -top-3 -right-3 bg-indigo-600 text-white p-1.5 rounded-full border-[4px] border-slate-50 shadow-lg animate-in zoom-in-50 duration-300">
                <CheckCircle size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleMarketplace;
