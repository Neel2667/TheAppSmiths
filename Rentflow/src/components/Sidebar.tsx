import React from 'react';
import { 
  Building2, Users, CreditCard, Wrench, 
  FileText, BarChart3, Settings, Bell, Home,
  LogOut
} from 'lucide-react';
import { ViewState } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { view: 'dashboard' as ViewState, icon: Home, label: 'Dashboard' },
  { view: 'properties' as ViewState, icon: Building2, label: 'Properties' },
  { view: 'tenants' as ViewState, icon: Users, label: 'Tenants' },
  { view: 'rent' as ViewState, icon: CreditCard, label: 'Rent Collection' },
  { view: 'maintenance' as ViewState, icon: Wrench, label: 'Maintenance' },
  { view: 'leases' as ViewState, icon: FileText, label: 'Lease Management' },
  { view: 'reports' as ViewState, icon: BarChart3, label: 'Reports' },
  { view: 'settings' as ViewState, icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 lg:static",
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-outline-variant/30">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Building2 className="w-6 h-6 text-secondary" />
            <span>RentFlow</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                onChangeView(item.view);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                currentView === item.view 
                  ? "bg-secondary-container text-on-secondary-container" 
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )}
            >
              <item.icon className={cn("w-5 h-5", currentView === item.view ? "text-secondary" : "text-outline")} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-outline-variant/30">
          <button 
            onClick={() => onChangeView('login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error-container/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
