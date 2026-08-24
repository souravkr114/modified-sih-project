'use client';

import React from 'react';
import { UserRole } from '../types/ev';

interface NavbarProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenPredictorModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  onRoleChange,
  onOpenPredictorModal
}) => {
  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-50 px-8 py-3.5 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#0096ff] flex items-center justify-center text-white font-bold text-lg shadow-xs">
            ⚡
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-slate-900">
              EV Charging Station Predictor
            </h1>
            <p className="text-xs text-slate-500">
              SIH BV806 • Delhi NCT Decision Platform
            </p>
          </div>
        </div>

        {/* Center Role Switcher */}
        <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center gap-1 text-xs">
          <button
            onClick={() => onRoleChange('investor')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeRole === 'investor'
                ? 'bg-[#0096ff] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Investor
          </button>

          <button
            onClick={() => onRoleChange('operator')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeRole === 'operator'
                ? 'bg-[#0096ff] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Operator
          </button>

          <button
            onClick={() => onRoleChange('planner')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeRole === 'planner'
                ? 'bg-[#0096ff] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            MoHUA Planner
          </button>
        </div>

        {/* Right Single Primary Action Button matching video */}
        {onOpenPredictorModal && (
          <button
            onClick={onOpenPredictorModal}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0096ff] text-white hover:bg-[#0284c7] transition shadow-xs"
          >
            Predict Station Site
          </button>
        )}

      </div>
    </header>
  );
};
