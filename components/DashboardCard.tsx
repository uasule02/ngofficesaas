
import React from 'react';

interface DashboardCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: any;
  className?: string;
  headerAction?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  children, 
  title, 
  subtitle, 
  icon: Icon, 
  className = "", 
  headerAction 
}) => {
  return (
    <div className={`bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                <Icon size={20} />
              </div>
            )}
            <div>
              {title && <h3 className="font-black text-slate-800 text-xl tracking-tight leading-none">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">{subtitle}</p>}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
