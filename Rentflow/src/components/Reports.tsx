import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Printer, TrendingUp, TrendingDown } from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 40, expenses: 24 },
  { name: 'Feb', revenue: 45, expenses: 28 },
  { name: 'Mar', revenue: 42, expenses: 26 },
  { name: 'Apr', revenue: 50, expenses: 30 },
  { name: 'May', revenue: 48, expenses: 29 },
  { name: 'Jun', revenue: 55, expenses: 32 },
  { name: 'Jul', revenue: 62, expenses: 35 },
];

const maintenanceData = [
  { name: 'Plumbing', value: 35 },
  { name: 'HVAC', value: 25 },
  { name: 'Electrical', value: 20 },
  { name: 'Appliance', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#4b41e1', '#009668', '#ba1a1a', '#565e74', '#c6c6cd'];

export const Reports: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Financial Reports</h2>
          <p className="text-sm text-on-surface-variant mt-1">Detailed breakdown of income and expenses.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="border border-outline-variant/40 hover:bg-surface-container text-on-surface px-4 py-2 rounded-lg text-sm font-medium transition-colors flex flex-1 sm:flex-none justify-center items-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors flex flex-1 sm:flex-none justify-center items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-on-surface">Revenue vs Expenses</h3>
              <p className="text-xs text-on-surface-variant mt-1">Past 7 months (in thousands)</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-secondary"></span> Revenue
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim"></span> Expenses
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5eeff" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#76777d' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#76777d' }} tickFormatter={(val) => `$${val}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '14px' }}
                  cursor={{ fill: '#eff4ff' }}
                />
                <Bar dataKey="revenue" fill="#4b41e1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expenses" fill="#c3c0ff" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-on-surface">Maintenance Costs by Type</h3>
              <p className="text-xs text-on-surface-variant mt-1">Current Year</p>
            </div>
          </div>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={maintenanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {maintenanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value}%`]}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-on-surface">$12.4k</div>
                <div className="text-xs text-on-surface-variant mt-1">Total Spent</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
