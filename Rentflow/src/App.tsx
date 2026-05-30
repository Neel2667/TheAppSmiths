import React, { useState } from 'react';
import { ViewState } from './types';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Dashboard } from './components/Dashboard';
import { Properties } from './components/Properties';
import { Tenants } from './components/Tenants';
import { RentCollection } from './components/RentCollection';
import { Maintenance } from './components/Maintenance';
import { Leases } from './components/Leases';
import { Reports } from './components/Reports';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle successful login
  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  // Switch views and close mobile sidebar
  const handleChangeView = (view: ViewState) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  if (currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  // Render the appropriate main content based on the current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <Properties />;
      case 'tenants':
        return <Tenants />;
      case 'rent':
        return <RentCollection />;
      case 'maintenance':
        return <Maintenance />;
      case 'leases':
        return <Leases />;
      case 'reports':
        return <Reports />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Extract the title for the Topbar
  const getTitle = () => {
    if (currentView === 'rent') return 'Rent Collection';
    return currentView;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar 
        currentView={currentView} 
        onChangeView={handleChangeView} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar 
          title={getTitle()}
          onOpenSidebar={() => setSidebarOpen(true)} 
          onChangeView={handleChangeView} 
        />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
