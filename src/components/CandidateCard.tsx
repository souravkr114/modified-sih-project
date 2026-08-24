'use client';

import React from 'react';
import { CandidateLocation } from '../types/ev';

interface CandidateCardProps {
  candidate: CandidateLocation;
  onSimulateInvestment: (candidate: CandidateLocation) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onSimulateInvestment
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6 text-slate-900">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-sky-50 text-[#0099ff] border border-sky-100 font-bold text-xs px-2.5 py-0.5 rounded-md uppercase tracking-wider">
              Rank #{candidate.rank} Location
            </span>
            <span className="text-xs font-mono text-slate-500">ID: {candidate.id}</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            {candidate.name}
          </h2>
          <p className="text-xs text-slate-500">
            {candidate.address}
          </p>
        </div>

        {/* Overall Score Badge - BLACK AND BOLD NUMBER */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center min-w-[120px]">
          <div className="text-[10px] uppercase font-bold text-slate-500">AI Score</div>
          <div className="text-2xl font-black text-slate-950 font-mono">
            {candidate.score}
          </div>
        </div>
      </div>

      {/* Grid of Key Operational Predictions - BLACK AND BOLD NUMBERS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
          <span className="text-[10px] text-slate-500 font-medium block">Est Daily Sessions</span>
          <p className="text-base font-black text-slate-950 font-mono mt-0.5">{candidate.predictedSessionsPerDay} / day</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
          <span className="text-[10px] text-slate-500 font-medium block">Est Energy Sold</span>
          <p className="text-base font-black text-slate-950 font-mono mt-0.5">{candidate.predictedKwhPerDay} kWh/day</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
          <span className="text-[10px] text-slate-500 font-medium block">Nearest Charger</span>
          <p className="text-base font-black text-slate-950 font-mono mt-0.5">{candidate.nearestStationDistanceKm} km away</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
          <span className="text-[10px] text-slate-500 font-medium block">Est Annual ROI</span>
          <p className="text-base font-black text-slate-950 font-mono mt-0.5">{candidate.estRoiPercent}% ({candidate.estPaybackMonths} mo)</p>
        </div>
      </div>

      {/* SHAP Feature Drivers */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Location Feature Drivers</h3>
        <div className="space-y-2 text-xs">
          {candidate.shapFeatures.map((feat, idx) => (
            <div key={idx} className="bg-white p-3 rounded-md border border-slate-200 flex items-start gap-3 shadow-xs">
              <div className="mt-0.5 text-xs font-mono font-black px-2 py-0.5 rounded bg-slate-100 text-slate-950 border border-slate-200">
                {feat.weight > 0 ? `+${feat.weight}` : feat.weight}
              </div>
              <div className="space-y-0.5 flex-1">
                <p className="text-xs font-semibold text-slate-900">{feat.feature}</p>
                <p className="text-[11px] text-slate-500 leading-snug">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feasibility & Action */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <p className="font-bold text-slate-900">Physical Feasibility: {candidate.siteFeasibilityStatus}</p>
          <p className="text-slate-600">
            Land Type: <span className="text-slate-900 font-semibold">{candidate.landType}</span> • Grid Substation: <span className="text-slate-900 font-semibold">{candidate.gridSubstationDistanceMeters}m</span>
          </p>
        </div>

        <button
          onClick={() => onSimulateInvestment(candidate)}
          className="w-full md:w-auto px-5 py-2.5 rounded-md font-bold text-xs text-white bg-[#0099ff] hover:bg-[#0080ff] transition shadow-xs shrink-0 cursor-pointer"
        >
          Simulate Investment ROI
        </button>
      </div>

    </div>
  );
};
