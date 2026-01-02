
export enum TenantStatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  SUSPENDED = 'suspended'
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  staffCount: number;
  isHeadquarters: boolean;
}

export interface Division {
  id: string;
  name: string;
  headId?: string;
  officeLocation?: string;
}

export interface Department {
  id: string;
  name: string;
  headId?: string;
  description: string;
  divisions: Division[];
  iconName: string; // Key for icon mapping
}

export interface Module {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  features?: string[];
  isRequired: boolean;
  status: 'Enabled' | 'Disabled';
  icon: any; // Lucide icon
  price: number;
  subscriberCount: number;
  category: string;
  rating?: number;
  reviews?: Review[];
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain: string;
  status: TenantStatus;
  createdAt: string;
  modules: string[]; // IDs of enabled modules
  branches?: Branch[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'PLATFORM_ADMIN' | 'TENANT_ADMIN' | 'STAFF';
  tenantId?: string;
}

export interface Staff {
  id: string;
  name: string;
  departmentId: string;
  divisionId?: string;
  role: string;
  email: string;
  branchId: string;
  status: string;
  performance: number;
  joiningDate: string;
}
