'use client';

import React from 'react';

const DELHI_DISTRICTS_MATRIX = [
  { name: 'North Delhi', evs: 29400, growth: '+31.8%', chargers: 38, ratio: '773.6 EVs/charger', score: 96, topCorridor: 'Ring Road & GT Road ISBT Corridor' },
  { name: 'West Delhi', evs: 38500, growth: '+35.2%', chargers: 52, ratio: '740.3 EVs/charger', score: 94, topCorridor: 'Najafgarh Road & Janakpuri District Centre' },
  { name: 'South East Delhi', evs: 36200, growth: '+42.1%', chargers: 68, ratio: '532.3 EVs/charger', score: 92, topCorridor: 'Outer Ring Road Nehru Place & Okhla' },
  { name: 'East Delhi', evs: 31200, growth: '+36.9%', chargers: 44, ratio: '709.0 EVs/charger', score: 90, topCorridor: 'Vikas Marg & Anand Vihar Border' },
  { name: 'North West Delhi', evs: 32000, growth: '+33.4%', chargers: 46, ratio: '695.6 EVs/charger', score: 89, topCorridor: 'Outer Ring Road Rohini Sector 10' },
  { name: 'South Delhi', evs: 42800, growth: '+38.5%', chargers: 94, ratio: '455.3 EVs/charger', score: 86, topCorridor: 'Press Enclave Road Saket' },
  { name: 'South West Delhi', evs: 44100, growth: '+40.2%', chargers: 88, ratio: '501.1 EVs/charger', score: 82, topCorridor: 'Aerocity Hospitality & Dwarka Sector 21' },
  { name: 'Central Delhi', evs: 24800, growth: '+29.4%', chargers: 62, ratio: '400.0 EVs/charger', score: 72, topCorridor: 'Connaught Place Radial Corridors' }
];

export const DistrictAnalytics: React.FC<{ activeDistrict?: string }> = ({ activeDistrict }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-slate-900">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Delhi NCT District Infrastructure Gap Matrix</h2>
          <p className="text-xs text-slate-500">Official MoHUA Urban Planning Benchmark (Target 1 Public Charger per 25 EVs)</p>
        </div>
        {activeDistrict && (
          <span className="bg-sky-50 text-[#0099ff] border border-sky-100 text-xs px-2.5 py-1 rounded-md font-bold">
            Target Zone: {activeDistrict}
          </span>
        )}
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 uppercase text-[10px] text-slate-500 border-b border-slate-200">
            <tr>
              <th className="p-3">District</th>
              <th className="p-3">Registered EVs</th>
              <th className="p-3">YoY Growth</th>
              <th className="p-3">Public Chargers</th>
              <th className="p-3">EV / Charger Ratio</th>
              <th className="p-3">Deficit Score</th>
              <th className="p-3">Key Priority Corridor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {DELHI_DISTRICTS_MATRIX.map((d, i) => {
              const isTargetDistrict = activeDistrict && d.name.toLowerCase() === activeDistrict.toLowerCase();
              return (
                <tr key={i} className={`transition ${isTargetDistrict ? 'bg-sky-50/90 font-bold border-l-4 border-l-[#0099ff]' : 'hover:bg-slate-50'}`}>
                  <td className="p-3 font-bold text-slate-900">
                    {d.name} {isTargetDistrict && <span className="ml-1 text-[10px] bg-[#0099ff] text-white px-1.5 py-0.5 rounded">Target Zone</span>}
                  </td>
                  <td className="p-3 font-mono font-black text-slate-950">{d.evs.toLocaleString()}</td>
                  <td className="p-3 font-mono font-black text-slate-950">{d.growth}</td>
                  <td className="p-3 font-mono font-black text-slate-950">{d.chargers}</td>
                  <td className="p-3 font-mono font-black text-slate-950">{d.ratio}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-950 border border-slate-200 px-2 py-0.5 rounded font-mono font-black">
                      {d.score} / 100
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 text-[11px]">{d.topCorridor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
