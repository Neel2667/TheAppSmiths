import React from 'react';
import { motion } from 'motion/react';
import { mockRentPayments } from '../mockData';
import { Download, CreditCard, ChevronRight } from 'lucide-react';

export const RentCollection: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Rent Collection</h2>
          <p className="text-sm text-on-surface-variant mt-1">Track incoming rent and payment history.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20">
          <div className="text-sm text-on-surface-variant mb-1">Expected Revenue (Oct)</div>
          <div className="text-3xl font-bold text-on-surface">$28,450</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-border/20 border-l-4 border-l-tertiary-container">
          <div className="text-sm text-on-surface-variant mb-1">Collected</div>
          <div className="text-3xl font-bold text-tertiary-container">$24,000</div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-outline-variant/20 border-l-4 border-l-error">
          <div className="text-sm text-on-surface-variant mb-1">Outstanding</div>
          <div className="text-3xl font-bold text-error">$4,450</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-on-surface mb-4">Recent Invoices</h3>
      <div className="bg-surface-container-lowest rounded-2xl shadow-soft border border-outline-variant/20 overflow-hidden divide-y divide-outline-variant/20">
        {mockRentPayments.map((payment, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={payment.id}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container/30 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-on-surface">Invoice #{payment.id}</div>
                <div className="text-sm text-on-surface-variant">Due: {payment.dueDate}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
              <div className="text-left sm:text-right">
                <div className="font-bold text-on-surface">${payment.amount.toLocaleString()}</div>
                <div className="text-xs text-on-surface-variant">{payment.method}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  payment.status === 'Paid' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' :
                  payment.status === 'Overdue' ? 'bg-error-container text-on-error-container' :
                  'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {payment.status}
                </span>
                <ChevronRight className="w-5 h-5 text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
