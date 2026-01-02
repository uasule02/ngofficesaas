
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AdminDashboard from './views/PlatformAdmin/AdminDashboard';
import DeploymentControl from './views/PlatformAdmin/DeploymentControl';
import TenantDashboard from './views/Tenant/TenantDashboard';
import ModuleMarketplace from './views/Tenant/ModuleMarketplace';
import StaffManagement from './views/Tenant/StaffManagement';
import OrgStructure from './views/Tenant/OrgStructure';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import { User, Branch } from './types';

// Mock Data
const MOCK_PLATFORM_USER: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'admin@ngoffice.io',
  role: 'PLATFORM_ADMIN'
};

const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'London HQ', location: 'UK', staffCount: 24, isHeadquarters: true },
  { id: 'b2', name: 'New York Office', location: 'USA', staffCount: 18, isHeadquarters: false },
  { id: 'b3', name: 'Berlin Hub', location: 'Germany', staffCount: 6, isHeadquarters: false },
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Start unauthenticated
  const [currentBranch, setCurrentBranch] = useState<Branch>(MOCK_BRANCHES[0]);

  // Handle Login
  const handleLogin = (role: 'PLATFORM_ADMIN' | 'TENANT_ADMIN' = 'TENANT_ADMIN') => {
    if (role === 'PLATFORM_ADMIN') {
      setUser(MOCK_PLATFORM_USER);
    } else {
      setUser({
        id: '2',
        name: 'Sarah Miller',
        email: 'sarah@acme-corp.com',
        role: 'TENANT_ADMIN',
        tenantId: 'tenant-1'
      });
    }
  };

  return (
    <HashRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected App Routes */}
        {user ? (
          <Route 
            path="/*" 
            element={
              <AppLayout 
                user={user} 
                setUser={(u: any) => setUser(u)} 
                currentBranch={currentBranch} 
                setCurrentBranch={setCurrentBranch}
                availableBranches={MOCK_BRANCHES}
              >
                <Routes>
                  {user.role === 'PLATFORM_ADMIN' ? (
                    <>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/deployments" element={<DeploymentControl />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<TenantDashboard />} />
                      <Route path="/staff" element={<StaffManagement />} />
                      <Route path="/org-structure" element={<OrgStructure />} />
                      <Route path="/marketplace" element={<ModuleMarketplace />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                  )}
                </Routes>
              </AppLayout>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;
