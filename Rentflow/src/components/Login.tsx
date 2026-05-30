import React from 'react';
import { motion } from 'motion/react';
import { Building2, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface-container-lowest p-8 rounded-2xl shadow-soft border border-outline-variant/20"
      >
        <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6">
          <Building2 className="w-6 h-6 text-on-secondary-container" />
        </div>
        
        <h1 className="text-2xl font-bold text-on-surface mb-2">Welcome to RentFlow</h1>
        <p className="text-on-surface-variant text-sm mb-8">Please sign in to manage your properties and tenants.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">Email</label>
            <input 
              type="email" 
              defaultValue="demo@rentflow.com"
              className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">Password</label>
            <input 
              type="password" 
              defaultValue="password"
              className="w-full px-4 py-2.5 bg-surface rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm py-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-secondary border-outline-variant" defaultChecked />
              <span className="text-on-surface-variant">Remember me</span>
            </label>
            <a href="#" className="text-secondary hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-container text-on-primary font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 group"
          >
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant/20 text-center space-y-4">
          <p className="text-sm text-on-surface-variant">
            This is a demo application. Click 'Sign In' to enter.
          </p>
          <div className="p-4 bg-surface-container rounded-xl text-left border border-outline-variant/30 shadow-sm">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Built by The Appsmiths</span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              We design and build custom business software, mobile apps, and SaaS dashboards. 
              <a href="https://theappsmiths.qzz.io/#contact" target="_blank" rel="noreferrer" className="text-secondary hover:underline font-semibold ml-1 inline-flex items-center gap-0.5">
                Let's discuss your project ↗
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
