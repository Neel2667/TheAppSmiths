import React from 'react';
import { motion } from 'motion/react';
import { mockTickets } from '../mockData';
import { AlertCircle, Clock, CheckCircle2, ChevronDown } from 'lucide-react';

export const Maintenance: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Maintenance</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage service requests and repairs.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
          + New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 p-1 bg-surface-container-lowest rounded-lg border border-outline-variant/30 w-fit mb-4">
            {['All', 'New', 'In Progress', 'Resolved'].map(tab => (
              <button key={tab} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === 'All' ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}`}>
                {tab}
              </button>
            ))}
          </div>

          {mockTickets.map((ticket, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={ticket.id}
              className="bg-surface-container-lowest rounded-xl p-5 shadow-soft border border-outline-variant/20 flex flex-col md:flex-row gap-4 justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    ticket.priority === 'Emergency' ? 'bg-error text-on-error' :
                    ticket.priority === 'High' ? 'bg-error-container text-on-error-container' :
                    'bg-surface-container border border-outline-variant/30 text-on-surface-variant'
                  }`}>{ticket.priority}</span>
                  <span className="text-sm font-medium text-outline">{ticket.id}</span>
                  <span className="text-sm text-on-surface-variant flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {ticket.date}</span>
                </div>
                <h4 className="text-base font-bold text-on-surface mb-1">{ticket.title}</h4>
                <p className="text-sm text-on-surface-variant mb-3">{ticket.property} - {ticket.unit}</p>
                <div className="text-sm text-on-surface-variant line-clamp-1">{ticket.description}</div>
              </div>
              
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 md:pl-5 md:min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  {ticket.status === 'Resolved' ? (
                    <CheckCircle2 className="w-5 h-5 text-tertiary-container" />
                  ) : ticket.status === 'In Progress' ? (
                    <Clock className="w-5 h-5 text-secondary" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-error" />
                  )}
                  <span className="font-medium text-sm text-on-surface">{ticket.status}</span>
                </div>
                {ticket.estimate && (
                  <div className="text-sm font-semibold text-on-surface">Est: ${ticket.estimate}</div>
                )}
                {ticket.assignedTo && (
                  <div className="text-xs text-on-surface-variant mt-1">Assigned: {ticket.assignedTo}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-soft border border-outline-variant/20">
            <h3 className="font-bold text-on-surface mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 text-on-surface-variant">
                  <span>Open Tickets</span>
                  <span className="font-bold text-on-surface">12</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-3/4 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-on-surface-variant">
                  <span>Emergency</span>
                  <span className="font-bold text-error">2</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-error w-1/6 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-container rounded-2xl p-6 shadow-soft text-on-primary-container">
            <h3 className="font-bold text-on-primary-container mb-2">Need an external vendor?</h3>
            <p className="text-sm mb-4">Browse our directory of approved contractors and maintenance services.</p>
            <button className="w-full bg-surface-container-lowest text-on-surface px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-surface transition-colors flex items-center justify-between">
              Find Contractors <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
