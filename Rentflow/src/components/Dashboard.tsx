import React from 'react';
import { motion } from 'motion/react';
import { 
  Building, Users, DollarSign, Wrench, 
  TrendingUp, ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockProperties, mockTickets, mockRentPayments } from '../mockData';

const data = [
  { name: 'Jan', revenue: 40000 },
  { name: 'Feb', revenue: 45000 },
  { name: 'Mar', revenue: 42000 },
  { name: 'Apr', revenue: 50000 },
  { name: 'May', revenue: 48000 },
  { name: 'Jun', revenue: 55000 },
  { name: 'Jul', revenue: 62000 },
];

export const Dashboard: React.FC = () => {
  const totalRevenue = mockProperties.reduce((acc, p) => acc + p.monthlyIncome, 0);
  const totalOccupancy = Math.round(mockProperties.reduce((acc, p) => acc + p.occupancy, 0) / mockProperties.length);
  const openTickets = mockTickets.filter(t => t.status !== 'Resolved').length;

  const stats = [
    { title: 'Total Properties', value: mockProperties.length, icon: Building, change: '+2', trend: 'up' },
    { title: 'Avg Occupancy', value: `${totalOccupancy}%`, icon: Users, change: '+5%', trend: 'up' },
    { title: 'Monthly Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, change: '+12%', trend: 'up' },
    { title: 'Open Maintenance', value: openTickets, icon: Wrench, change: '-3', trend: 'down' }
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-tertiary-container' : 'text-error'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-on-surface mb-1">{stat.value}</div>
            <div className="text-sm text-on-surface-variant">{stat.title}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-on-surface">Revenue Overview</h2>
            <button className="text-sm text-secondary font-medium hover:underline">View Report</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4b41e1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4b41e1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5eeff" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#76777d' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#76777d' }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '14px' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4b41e1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-on-surface">Recent Payments</h2>
          </div>
          <div className="space-y-5 flex-1">
            {mockRentPayments.slice(0, 4).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-outline">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-on-surface">Invoice #{payment.id}</div>
                    <div className="text-xs text-on-surface-variant flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {payment.dueDate}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm text-on-surface">${payment.amount.toLocaleString()}</div>
                  <div className={`text-xs font-medium ${payment.status === 'Paid' ? 'text-tertiary-container' : payment.status === 'Pending' ? 'text-secondary' : 'text-error'}`}>
                    {payment.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-outline-variant/50 rounded-lg text-sm font-medium hover:bg-surface-container transition-colors">
            View All Payments
          </button>
        </motion.div>
      </div>
    </div>
  );
};
