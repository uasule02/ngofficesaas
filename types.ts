
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
  department: string;
  role: string;
  email: string;
}
