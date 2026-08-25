'use client';

import React from 'react';
import { CandidateLocation } from '../types/ev';
import { X, Printer, Zap } from 'lucide-react';

interface ReportExporterProps {
  candidate: CandidateLocation;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportExporter: React.FC<ReportExporterProps> = ({ candidate, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-8 shadow-2xl space-y-6 text-slate-900 max-h-[90vh] overflow-y-auto print:bg-white print:text-black print:p-0">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-bold text-slate-900">Executive EV Site Investment Report</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="space-y-6">
          
          {/* Document Header */}
          <div className="border-b-2 border-sky-600 pb-4 flex justify-between items-start">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-sky-700 font-bold">
                MoHUA Decision Support Proposal • Problem ID SIH25-806
              </span>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">
                EV Charging Infrastructure Feasibility Dossier
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Target Location: {candidate.name}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block font-mono">Date Generated</span>
              <span className="text-xs font-bold text-slate-700 font-mono">August 24, 2026</span>
            </div>
          </div>

          {/* Key Executive Highlights */}
          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Overall AI Recommendation Rank</span>
              <span className="text-xl font-black text-sky-700 font-mono">Rank #{candidate.rank} (Score {candidate.score}/100)</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Projected Daily Energy Demand</span>
              <span className="text-xl font-black text-slate-900 font-mono">{candidate.predictedKwhPerDay} kWh / day</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Estimated Annual ROI</span>
              <span className="text-xl font-black text-sky-700 font-mono">{candidate.estRoiPercent}% ({candidate.estPaybackMonths} mo payback)</span>
            </div>
          </div>

          {/* Location & Site Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1">
              1. Site Location & District Profile
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <p>Address: <span className="font-semibold text-slate-900">{candidate.address}</span></p>
                <p>District: <span className="font-semibold text-slate-900">{candidate.district}</span></p>
                <p>GPS Coordinates: <span className="font-mono text-sky-700 font-semibold">{candidate.latitude}, {candidate.longitude}</span></p>
              </div>
              <div>
                <p>Daily Corridor Traffic: <span className="font-semibold text-slate-900">{candidate.dailyTrafficVolume.toLocaleString()} vehicles/day</span></p>
                <p>Nearby Fast Chargers (2km): <span className="font-semibold text-slate-900">{candidate.chargersWithin2Km} units</span></p>
                <p>Unserved Demand Radius: <span className="font-semibold text-slate-900">{candidate.nearestStationDistanceKm} km distance</span></p>
              </div>
            </div>
          </div>

          {/* AI Score Breakdown & SHAP Explanation */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1">
              2. Key AI Drivers & Model Rationale
            </h3>
            <div className="space-y-2 text-xs">
              {candidate.shapFeatures.map((feat, i) => (
                <div key={i} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
                  <span className="text-sky-700 font-bold font-mono text-[10px] mt-0.5">+{feat.weight}</span>
                  <div>
                    <p className="font-bold text-slate-900">{feat.feature}</p>
                    <p className="text-slate-600 text-[11px]">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Feasibility & Grid */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1">
              3. Grid Connection & Land Feasibility
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>Site Feasibility: <span className="font-bold text-sky-700">{candidate.siteFeasibilityStatus}</span></div>
              <div>Grid Substation Distance: <span className="font-semibold text-slate-900">{candidate.gridSubstationDistanceMeters}m</span></div>
              <div>Transformer Capacity: <span className="font-semibold text-slate-900">{candidate.transformerCapacityKva} kVA</span></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
