import React from 'react';
import { motion } from 'motion/react';
import { mockNotifications } from '../mockData';
import { Bell, Info, AlertTriangle, Wrench, CheckCircle2, DollarSign } from 'lucide-react';

export const Notifications: React.FC = () => {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-error" />;
      case 'maintenance': return <Wrench className="w-5 h-5 text-secondary" />;
      case 'rent': return <DollarSign className="w-5 h-5 text-tertiary-container" />;
      default: return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getStyleForType = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-error-container/20 border-error/20';
      case 'maintenance': return 'bg-secondary-container/20 border-secondary/20';
      case 'rent': return 'bg-tertiary-fixed/20 border-tertiary-fixed-dim/20';
      default: return 'bg-surface-container-low border-outline-variant/20';
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Notifications</h2>
          <p className="text-sm text-on-surface-variant mt-1">View alerts and updates across all properties.</p>
        </div>
        <button className="text-sm text-secondary font-medium hover:underline flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={notification.id}
            className={`p-5 rounded-2xl border flex items-start gap-4 transition-colors hover:shadow-soft ${getStyleForType(notification.type)} ${
              !notification.read ? 'border-l-4 border-l-secondary bg-surface-container-lowest' : 'bg-surface-container-lowest/50'
            }`}
          >
            <div className="mt-1">
              {getIconForType(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between gap-4 mb-1">
                <h4 className={`font-semibold text-on-surface ${!notification.read ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                  {notification.title}
                </h4>
                <span className="text-xs text-on-surface-variant whitespace-nowrap">{notification.time}</span>
              </div>
              <p className={`text-sm ${!notification.read ? 'text-on-surface-variant' : 'text-outline'} line-clamp-2 md:line-clamp-none`}>
                {notification.description}
              </p>
            </div>
            {!notification.read && (
              <div className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0 mt-2"></div>
            )}
          </motion.div>
        ))}
        {mockNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4 text-outline">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-on-surface">You're all caught up!</h3>
            <p className="text-sm text-on-surface-variant">No new notifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
