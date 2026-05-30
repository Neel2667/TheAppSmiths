import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Building, CreditCard, Sliders, Save, Settings as SettingsIcon } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="w-full p-4 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-on-surface">Settings</h2>
        <p className="text-sm text-on-surface-variant mt-1">Manage your account preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <User className="w-5 h-5" /> Profile Settings
            </button>
            <button 
              onClick={() => setActiveTab('company')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'company' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <Building className="w-5 h-5" /> Company Information
            </button>
            <button 
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'billing' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <CreditCard className="w-5 h-5" /> Billing & Invoices
            </button>
            <button 
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === 'preferences' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <Sliders className="w-5 h-5" /> Preferences
            </button>
          </nav>
        </div>

        <div className="flex-1 min-w-0 bg-surface-container-lowest rounded-2xl shadow-soft border border-outline-variant/20 p-6 md:p-8">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl w-full">
              <div>
                <h3 className="text-lg font-semibold text-on-surface mb-4">Personal Information</h3>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-surface-container overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button className="px-4 py-2 bg-surface text-on-surface text-sm font-medium border border-outline-variant/40 rounded-lg shadow-sm hover:bg-surface-container transition-colors">
                    Change Avatar
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">First Name</label>
                    <input type="text" defaultValue="John" className="w-full px-4 py-2 bg-surface-container-low rounded-lg border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full px-4 py-2 bg-surface-container-low rounded-lg border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Email Address</label>
                    <input type="email" defaultValue="john.doe@rentflow.com" className="w-full px-4 py-2 bg-surface-container-low rounded-lg border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/20">
                <h3 className="text-lg font-semibold text-on-surface mb-4">Security</h3>
                <p className="text-sm text-on-surface-variant mb-4">Change your password and manage two-factor authentication.</p>
                <button className="text-sm font-medium text-secondary hover:underline">Change Password</button>
              </div>

              <div className="pt-6 flex justify-end">
                <button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab !== 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-outline mb-4">
                <SettingsIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-on-surface mb-2">Coming Soon</h3>
              <p className="text-sm text-on-surface-variant max-w-md">This section is currently under development in the demo application.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
