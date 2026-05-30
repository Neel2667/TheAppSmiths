import React from 'react';
import { motion } from 'motion/react';
import { mockTenants } from '../mockData';
import { Search, Filter, MoreVertical, Mail, Phone } from 'lucide-react';

export const Tenants: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Tenants</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage tenant communications and leases.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
          + Add Tenant
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-soft border border-outline-variant/20 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/20 flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface w-full">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input 
              type="text" 
              placeholder="Search tenants..." 
              className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-sm outline-none focus:ring-2 focus:ring-secondary/50"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm font-medium hover:bg-surface-container text-on-surface-variant w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead className="bg-surface text-on-surface-variant font-medium border-b border-outline-variant/20">
              <tr>
                <th className="px-6 py-4">Tenant</th>
                <th className="px-6 py-4">Property & Unit</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Rent</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {mockTenants.map((tenant, idx) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={tenant.id} 
                  className="hover:bg-surface-container/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={tenant.avatar} alt={tenant.name} className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" />
                      <div>
                        <div className="font-medium text-on-surface">{tenant.name}</div>
                        <div className="text-xs text-on-surface-variant">Lease ends: {tenant.leaseEnd}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-on-surface">{tenant.property}</div>
                    <div className="text-xs text-on-surface-variant">{tenant.unit}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-secondary-container/50 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-secondary-container/50 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-on-surface">
                    ${tenant.rentAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      tenant.status === 'Paid' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' :
                      tenant.status === 'Overdue' ? 'bg-error-container text-on-error-container' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-outline hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
