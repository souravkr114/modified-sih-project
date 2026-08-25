'use client';

import React from 'react';
import { AnalyticsService } from '../services/analyticsService';
import { ShieldCheck, X, Database, CheckCircle2 } from 'lucide-react';

interface DataLineageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataLineageModal: React.FC<DataLineageModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const lineage = AnalyticsService.getDataLineage();

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 text-slate-900 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Data Lineage & Provenance Register</h2>
              <p className="text-xs text-slate-500">SIH SIH25-806 • Strict Data Quality & Source Provenance</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Rule 2 Compliance Note */}
        <div className="bg-sky-50/60 border border-sky-200 p-3.5 rounded-xl flex items-start gap-3 text-xs">
          <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-sky-900">Rule 2 Compliance Guarantee</p>
            <p className="text-slate-600 leading-relaxed">
              Every dataset powering this decision platform is explicitly categorized. Ground truth charging station locations and vehicle registrations stem from official Delhi government feeds. Secondary layers utilize OpenStreetMap GIS geometries and calibrated synthetic ML demand proxies.
            </p>
          </div>
        </div>

        {/* Dataset Table */}
        <div className="space-y-3">
          {lineage.map((ds) => (
            <div key={ds.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-600" />
                  <span className="font-bold text-sm text-slate-900">{ds.datasetName}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-700 border border-sky-200">
                  {ds.type}
                </span>
              </div>

              <p className="text-xs text-slate-600">{ds.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-500 pt-1">
                <div>Source: <span className="text-slate-900 font-semibold">{ds.organization}</span></div>
                <div>Updated: <span className="text-slate-900 font-mono">{ds.lastUpdated}</span></div>
                <div>Volume: <span className="text-slate-900 font-mono">{ds.recordCount}</span></div>
                <div>Confidence: <span className="text-sky-700 font-bold">{ds.confidenceScore}%</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all shadow-xs"
          >
            Close Provenance Register
          </button>
        </div>

      </div>
    </div>
  );
};
