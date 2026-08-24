'use client';

import React, { useState } from 'react';
import { CandidateLocation, FinancialConfig } from '../types/ev';
import { FinancialService, DEFAULT_FINANCIAL_CONFIG } from '../services/financialService';

interface FinancialSimulatorProps {
  selectedCandidate: CandidateLocation;
}

export const FinancialSimulator: React.FC<FinancialSimulatorProps> = ({
  selectedCandidate
}) => {
  const [config, setConfig] = useState<FinancialConfig>({
    ...DEFAULT_FINANCIAL_CONFIG,
    candidateId: selectedCandidate.id
  });

  const result = FinancialService.simulate(config);

  const handleChargerQtyChange = (type: string, qty: number) => {
    setConfig(prev => ({
      ...prev,
      chargers: prev.chargers.map(c => c.type === type ? { ...c, quantity: Math.max(0, qty) } : c)
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6 text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="bg-sky-50 text-[#0099ff] border border-sky-100 font-bold text-xs px-2.5 py-0.5 rounded-md">
            Target Site: {selectedCandidate.name}
          </span>
          <h2 className="text-base font-bold text-slate-900 tracking-tight mt-1">
            Investor Financial & ROI Return Simulator
          </h2>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase text-slate-500 font-bold block">Estimated Capex</span>
          {/* Black and Bold Number */}
          <span className="text-xl font-black text-slate-950 font-mono">
            ₹{(result.totalCapexInr / 100000).toFixed(2)} Lakhs
          </span>
        </div>
      </div>

      {/* Simulator Inputs & Result Metrics */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column: Inputs */}
        <div className="col-span-5 bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 uppercase tracking-wider">Configuration Inputs</h3>
          
          <div className="space-y-1.5">
            <label className="text-slate-600 block">DC 50kW Dual Charger Qty</label>
            <div className="flex items-center gap-3">
              <button onClick={() => handleChargerQtyChange('DC_Fast_50kW', Math.max(0, config.chargers[0].quantity - 1))} className="w-7 h-7 rounded bg-white border border-slate-300 font-bold">-</button>
              <span className="font-mono font-black text-slate-950 text-sm">{config.chargers[0].quantity}</span>
              <button onClick={() => handleChargerQtyChange('DC_Fast_50kW', config.chargers[0].quantity + 1)} className="w-7 h-7 rounded bg-white border border-slate-300 font-bold">+</button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-600 block">Retail Selling Tariff (₹/kWh)</label>
            <input type="range" min="12" max="25" step="0.5" value={config.sellingTariffPerKwh} onChange={e => setConfig({ ...config, sellingTariffPerKwh: parseFloat(e.target.value) })} className="w-full accent-[#0099ff]" />
            <span className="font-mono text-slate-950 font-black">₹{config.sellingTariffPerKwh}/kWh</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-600 block">Target Utilization %</label>
            <input type="range" min="15" max="75" step="5" value={config.targetUtilizationPercent} onChange={e => setConfig({ ...config, targetUtilizationPercent: parseInt(e.target.value) })} className="w-full accent-[#0099ff]" />
            <span className="font-mono text-slate-950 font-black">{config.targetUtilizationPercent}%</span>
          </div>
        </div>

        {/* Right Column: Output Metrics - Numbers Black and Bold */}
        <div className="col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Annual ROI</span>
              <p className="text-xl font-black text-slate-950 font-mono mt-1">{result.roiPercent}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Payback Period</span>
              <p className="text-xl font-black text-slate-950 font-mono mt-1">{result.paybackPeriodMonths} mo</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Monthly Net Profit</span>
              <p className="text-lg font-black text-slate-950 font-mono mt-1">₹{(result.monthlyNetProfitInr / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
