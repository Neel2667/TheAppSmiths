import React from 'react';
import { motion } from 'motion/react';
import { mockProperties } from '../mockData';
import { MapPin, Users, DollarSign, Home } from 'lucide-react';

export const Properties: React.FC = () => {
  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Properties</h2>
          <p className="text-sm text-on-surface-variant mt-1">Manage your real estate portfolio.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
          + Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProperties.map((property, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={property.id}
            className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-soft border border-outline-variant/20 hover:border-outline-variant/50 transition-colors group cursor-pointer"
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-1 pb-1.5 rounded-full text-xs font-semibold shadow-sm">
                <span className={property.status === 'Maintenance' ? 'text-error' : property.status === 'Fully Leased' ? 'text-tertiary-container' : 'text-on-surface-variant'}>
                  {property.status}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-on-surface mb-1 truncate">{property.name}</h3>
              <div className="flex items-center gap-1.5 text-sm text-on-surface-variant mb-4 truncate">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="truncate">{property.address}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-5 p-3 bg-surface rounded-xl">
                <div>
                  <div className="text-xs text-on-surface-variant mb-1 flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Units</div>
                  <div className="font-semibold text-sm">{property.units}</div>
                </div>
                <div>
                  <div className="text-xs text-on-surface-variant mb-1 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Occupancy</div>
                  <div className="font-semibold text-sm">{property.occupancy}%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <div className="text-xs text-on-surface-variant">Monthly Income</div>
                <div className="text-lg font-bold text-secondary flex items-center">
                  <DollarSign className="w-4 h-4" />{property.monthlyIncome.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
