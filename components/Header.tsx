
import React from 'react';
import { Menu, MapPin, ChevronDown, Terminal } from 'lucide-react';
import { User, Branch } from '../types';

interface HeaderProps {
  user: User;
  onMobileMenuOpen: () => void;
  isPlatform: boolean;
  currentBranch: Branch;
  availableBranches: Branch[];
  onBranchChange: (branch: Branch) => void;
  isBranchMenuOpen: boolean;
  onToggleBranchMenu: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onMobileMenuOpen, 
  isPlatform, 
  currentBranch, 
  availableBranches, 
  onBranchChange,
  isBranchMenuOpen,
  onToggleBranchMenu
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500" onClick={onMobileMenuOpen}>
          <Menu size={24} />
        </button>
        
        {!isPlatform && (
          <div className="relative">
            <button 
              onClick={() => onToggleBranchMenu(!isBranchMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all bg-white shadow-sm"
            >
              <div className="p-1 rounded bg-indigo-50 text-indigo-600">
                <MapPin size={14} />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Active Location</span>
                <span className="text-sm font-bold text-slate-700">{currentBranch.name}</span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 ml-1 transition-transform ${isBranchMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isBranchMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => onToggleBranchMenu(false)} />
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95">
                  <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Select Branch</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {availableBranches.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => {
                          onBranchChange(item);
                          onToggleBranchMenu(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${
                          currentBranch.id === item.id ? 'bg-indigo-50/50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin size={14} className={item.isHeadquarters ? 'text-indigo-600' : 'text-slate-400'} />
                          <div>
                            <p className="text-sm font-bold text-slate-800">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{item.location}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Status: Optimal</span>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Terminal size={20} />
        </button>
        <div className="h-6 w-px bg-slate-200" />
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            {user.name[0]}
          </div>
          <span className="text-sm font-bold text-slate-700 hidden sm:block group-hover:text-indigo-600 transition-colors">{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
