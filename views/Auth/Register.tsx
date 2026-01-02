
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, User, Building, Phone, ArrowRight, Users } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orgName: '',
    phone: '',
    companySize: '1-5'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1200);
  };

  const sizes = ['1-5', '5-10', '10-20'];

  return (
    <div className="min-h-screen flex bg-white font-inter">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/3 bg-indigo-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-indigo-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-white rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white p-2 rounded-xl text-indigo-600 shadow-xl">
              <ShieldCheck size={32} />
            </div>
            <span className="text-2xl font-black tracking-tight">NGOFFICE</span>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white leading-tight mb-6">
            Begin Your <span className="text-indigo-900/50">Digital Transformation</span>.
          </h1>
          <div className="space-y-6">
            {[
              "Multi-tenant data isolation",
              "Automated compliance logs",
              "Modular ERP capabilities"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80 font-bold text-sm">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><ArrowRight size={12} /></div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/40 text-[10px] font-black uppercase tracking-widest">
          Provisioned by Rahza Technology
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8 md:p-12 lg:p-20 overflow-y-auto animate-in fade-in slide-in-from-left-8 duration-700">
        <div className="w-full max-w-2xl">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Initialize Instance</h2>
            <p className="text-slate-500 font-medium">Create your high-fidelity organizational environment.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lead Admin Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Alex Johnson"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Corporate Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="alex@acme.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Organization Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Organization Name</label>
              <div className="relative group">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.orgName}
                  onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                  placeholder="Acme Corporation"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Direct Phone</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Company Size */}
            <div className="md:col-span-2 space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Workforce Scale (People)</label>
              <div className="grid grid-cols-3 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({...formData, companySize: size})}
                    className={`py-5 rounded-2xl text-sm font-black transition-all border-2 flex flex-col items-center gap-1 ${
                      formData.companySize === size 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100' 
                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white'
                    }`}
                  >
                    <Users size={16} />
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <p className="text-xs text-slate-400 leading-relaxed mb-8">
                By clicking "Provision Environment", you agree to NGOFFICE's <a href="#" className="text-indigo-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 font-bold hover:underline">Data Processing Addendum</a>.
              </p>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-sm tracking-[0.2em] uppercase hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'Allocating Resources...' : (
                  <>
                    Provision Environment <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm font-medium text-slate-500 mt-12">
            Already have an instance? <Link to="/login" className="text-indigo-600 font-black hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
