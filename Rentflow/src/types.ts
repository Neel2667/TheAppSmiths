export type ViewState = 
  | 'login'
  | 'dashboard'
  | 'properties'
  | 'tenants'
  | 'rent'
  | 'maintenance'
  | 'leases'
  | 'reports'
  | 'notifications'
  | 'settings';

export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'Residential' | 'Commercial';
  status: 'Fully Leased' | 'Vacant' | 'Maintenance';
  monthlyIncome: number;
  image: string;
  units: number;
  occupancy: number;
}

export interface Tenant {
  id: string;
  name: string;
  property: string;
  unit: string;
  leaseEnd: string;
  rentAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Negotiating' | 'Not Renewing';
  avatar: string;
  email: string;
  phone: string;
}

export interface RentPayment {
  id: string;
  tenantId: string;
  amount: number;
  dueDate: string;
  method: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  property: string;
  unit: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'New' | 'In Progress' | 'Resolved';
  assignedTo?: string;
  estimate?: number;
  date: string;
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'alert' | 'message' | 'maintenance' | 'rent';
  read: boolean;
}
