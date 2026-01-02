
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { User, Branch } from '../types';

interface AppLayoutProps {
  children?: React.ReactNode;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  currentBranch: Branch;
  setCurrentBranch: (branch: Branch) => void;
  availableBranches: Branch[];
}

const AppLayout = ({ children, user, setUser, currentBranch, setCurrentBranch, availableBranches }: AppLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);

  const toggleUser = () => {
    const mockTenantUser: User = {
      id: '2',
      name: 'Sarah Miller',
      email: 'sarah@acme-corp.com',
      role: 'TENANT_ADMIN',
      tenantId: 'tenant-1'
    };
    const mockPlatformUser: User = {
      id: '1',
      name: 'Alex Johnson',
      email: 'admin@ngoffice.io',
      role: 'PLATFORM_ADMIN'
    };
    setUser(user.role === 'PLATFORM_ADMIN' ? mockTenantUser : mockPlatformUser);
    setIsBranchMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar 
        user={user} 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onToggleView={toggleUser}
      />

      <main className="flex-1 flex flex-col bg-slate-50 min-w-0">
        <Header 
          user={user}
          isPlatform={user.role === 'PLATFORM_ADMIN'}
          onMobileMenuOpen={() => {}} // Placeholder for future mobile navigation
          currentBranch={currentBranch}
          availableBranches={availableBranches}
          onBranchChange={setCurrentBranch}
          isBranchMenuOpen={isBranchMenuOpen}
          onToggleBranchMenu={setIsBranchMenuOpen}
        />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
