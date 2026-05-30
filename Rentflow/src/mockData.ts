import { Property, Tenant, RentPayment, MaintenanceTicket, Notification } from './types';

export const mockProperties: Property[] = [
  {
    id: 'p1',
    name: 'Sunset Heights',
    address: '1224 Skyview Terrace, Los Angeles',
    type: 'Residential',
    status: 'Fully Leased',
    monthlyIncome: 12450.00,
    units: 12,
    occupancy: 100,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p2',
    name: 'The Meridian Hub',
    address: '88 Financial Plaza, Manhattan',
    type: 'Commercial',
    status: 'Vacant',
    monthlyIncome: 45800.00,
    units: 50,
    occupancy: 85,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p3',
    name: 'Azure Lofts',
    address: '402 Bayfront Ave, San Francisco',
    type: 'Residential',
    status: 'Fully Leased',
    monthlyIncome: 8900.00,
    units: 8,
    occupancy: 100,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p4',
    name: 'Brick & Mortar Labs',
    address: '501 Industry Way, Austin',
    type: 'Commercial',
    status: 'Maintenance',
    monthlyIncome: 18200.00,
    units: 4,
    occupancy: 75,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  }
];

export const mockTenants: Tenant[] = [
  {
    id: 't1',
    name: 'Elena Rodriguez',
    property: 'Sunset Heights',
    unit: 'Unit 402B',
    leaseEnd: 'Oct 2024',
    rentAmount: 3200.00,
    status: 'Paid',
    email: 'elena@example.com',
    phone: '+1 (555) 012-3456',
    avatar: 'https://i.pravatar.cc/150?u=elena',
  },
  {
    id: 't2',
    name: 'Marcus Thompson',
    property: 'The Heritage Lofts',
    unit: 'Unit 402',
    leaseEnd: 'Jan 2025',
    rentAmount: 1850.00,
    status: 'Overdue',
    email: 'marcus@example.com',
    phone: '+1 (555) 987-6543',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
  },
  {
    id: 't3',
    name: 'Sarah Jenkins',
    property: 'Harbor View Condos',
    unit: 'Unit 9C',
    leaseEnd: 'Aug 2024',
    rentAmount: 2600.00,
    status: 'Pending',
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 't4',
    name: 'David Chen',
    property: 'Sunset Heights',
    unit: 'Unit 22A',
    leaseEnd: 'Dec 2024',
    rentAmount: 6400.00,
    status: 'Paid',
    email: 'david@example.com',
    phone: '+1 (555) 246-8101',
    avatar: 'https://i.pravatar.cc/150?u=david',
  }
];

export const mockRentPayments: RentPayment[] = [
  { id: 'inv1', tenantId: 't1', amount: 3200, dueDate: 'Oct 01, 2023', method: 'Bank Transfer', status: 'Paid' },
  { id: 'inv2', tenantId: 't2', amount: 1850, dueDate: 'Oct 05, 2023', method: 'Credit Card', status: 'Pending' },
  { id: 'inv3', tenantId: 't3', amount: 2600, dueDate: 'Sep 30, 2023', method: 'Invoice Unpaid', status: 'Overdue' },
];

export const mockTickets: MaintenanceTicket[] = [
  {
    id: 'TKT-4921',
    title: 'Water Leak in Bathroom',
    property: 'Sunset Heights',
    unit: 'Unit 402',
    priority: 'Emergency',
    status: 'New',
    estimate: 450,
    date: '2h ago',
    description: 'Pipe busted under the sink.'
  },
  {
    id: 'TKT-4890',
    title: 'Elevator Out of Service',
    property: 'The Meridian Hub',
    unit: 'Lobby',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Alex R.',
    estimate: 1200,
    date: '1d ago',
    description: 'Elevator 2 is stuck on floor 4.'
  },
  {
    id: 'TKT-4925',
    title: 'Broken HVAC Filter',
    property: 'Green View',
    unit: 'Unit 12B',
    priority: 'Medium',
    status: 'New',
    estimate: 120,
    date: '5h ago',
    description: 'AC is blowing warm air.'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Rent Payment Overdue',
    description: 'Tenant Marcus Thompson has not paid rent of $1,850.00',
    time: '2m ago',
    type: 'alert',
    read: false
  },
  {
    id: 'n2',
    title: 'Maintenance Resolved',
    description: 'HVAC repair at 122 Oak Street completed.',
    time: '1h ago',
    type: 'maintenance',
    read: true
  },
  {
    id: 'n3',
    title: 'Lease Expiring Soon',
    description: 'Lease for Sarah Connor expires in 30 days.',
    time: '4h ago',
    type: 'rent',
    read: false
  }
];
