import React from 'react';
import { motion } from 'motion/react';
import { mockTenants } from '../mockData';
import { FileText, Calendar, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';

export const Leases: React.FC = () => {
  // Calculate lease metrics for the UI based on mockTenants
  const expiringSoon = mockTenants.filter(t => t.leaseEnd.includes('2024')).length;
  const totalActive = mockTenants.length;

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Lease Management</h2>
          <p className="text-sm text-on-surface-variant mt-1">Track terms, renewals, and expiring leases.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" /> Create New Lease
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary-fixed-dim">
            <CheckCircle className="w-6 h-6 text-on-tertiary-fixed-variant" />
          </div>
          <div>
            <div className="text-sm text-on-surface-variant">Active Leases</div>
            <div className="text-2xl font-bold text-on-surface">{totalActive}</div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-error" />
          </div>
          <div>
            <div className="text-sm text-on-surface-variant">Expiring within 90 days</div>
            <div className="text-2xl font-bold text-on-surface">{expiringSoon}</div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-on-surface-variant">Processing Renewals</div>
            <div className="text-2xl font-bold text-on-surface">2</div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-soft border border-outline-variant/20 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/20 flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface w-full">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input 
              type="text" 
              placeholder="Search by tenant or property..." 
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
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Lease Ends</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {mockTenants.map((tenant, idx) => {
                const isExpiring = tenant.leaseEnd.includes('2024');
                return (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={tenant.id} 
                    className="hover:bg-surface-container/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-on-surface">{tenant.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-on-surface">{tenant.property}</div>
                      <div className="text-xs text-on-surface-variant">{tenant.unit}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        isExpiring ? 'bg-error-container text-on-error-container' : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                      }`}>
                        {isExpiring ? 'Expiring Soon' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {tenant.leaseEnd}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-medium text-secondary hover:underline px-2">Renew</button>
                      <button className="text-sm font-medium text-on-surface-variant hover:text-on-surface px-2">View</button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
