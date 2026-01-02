
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, Github } from 'lucide-react';

interface LoginProps {
  onLogin: (role?: 'PLATFORM_ADMIN' | 'TENANT_ADMIN') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      onLogin(email.includes('admin') ? 'PLATFORM_ADMIN' : 'TENANT_ADMIN');
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-white font-inter">
      {/* Left Panel: Branding & Marketing */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <ShieldCheck size={32} />
            </div>
            <span className="text-2xl font-black tracking-tight">NGOFFICE</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-black text-white leading-tight tracking-tight mb-6">
            Institutional <span className="text-indigo-500">Intelligence</span> for the modern enterprise.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Provision staff, manage multi-tenant infrastructures, and monitor organizational health from a single high-fidelity control plane.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-widest">
          <span>v2.4 Stable</span>
          <div className="w-1 h-1 rounded-full bg-slate-800" />
          <span>ISO 27001 Certified</span>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-24 animate-in fade-in slide-in-from-right-8 duration-700">
        <div className="w-full max-w-md space-y-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Sign in</h2>
            <p className="text-slate-500 font-medium">Access your institutional control panel.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Forgot password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="remember" className="text-xs font-bold text-slate-600 select-none cursor-pointer">Stay logged in for 30 days</label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : (
                <>
                  Enter Dashboard <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-white px-4 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-xs font-bold text-slate-700">
              <Github size={18} /> Github
            </button>
            <button className="flex items-center justify-center gap-2 py-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-xs font-bold text-slate-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Google
            </button>
          </div>

          <p className="text-center text-sm font-medium text-slate-500">
            Don't have an instance yet? <Link to="/register" className="text-indigo-600 font-black hover:underline">Provision Organization</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
