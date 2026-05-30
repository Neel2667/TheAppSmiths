import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { ViewState } from '../types';

interface TopbarProps {
  onOpenSidebar: () => void;
  onChangeView: (view: ViewState) => void;
  title: string;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenSidebar, onChangeView, title }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-outline-variant/30 bg-surface-container-lowest glass-card sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSidebar}
          className="p-2 rounded-md hover:bg-surface-container-high lg:hidden text-on-surface-variant flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-on-surface capitalize hidden sm:block">{title.replace(/([A-Z])/g, ' $1').trim()}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 pl-9 pr-4 py-2 bg-surface-container hover:bg-surface-container-high transition-colors text-sm rounded-full outline-none focus:ring-2 focus:ring-secondary/50 text-on-surface placeholder:text-outline"
          />
        </div>
        
        <button 
          onClick={() => onChangeView('notifications')}
          className="relative p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border border-surface-container-lowest" />
        </button>

        <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant/50 overflow-hidden cursor-pointer" onClick={() => onChangeView('settings')}>
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
