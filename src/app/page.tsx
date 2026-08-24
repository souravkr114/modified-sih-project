'use client';

import React, { useState } from 'react';
import { UserRole, CandidateLocation } from '../types/ev';
import { StationService } from '../services/stationService';
import { AnalyticsService } from '../services/analyticsService';
import { Navbar } from '../components/Navbar';
import { GISMap } from '../components/GISMap';
import { CandidateCard } from '../components/CandidateCard';
import { FinancialSimulator } from '../components/FinancialSimulator';
import { DistrictAnalytics } from '../components/DistrictAnalytics';

// Delhi Pincodes Master Dataset
const DELHI_PINCODES: Record<string, { name: string; district: string; lat: number; lng: number; evBase: number; traffic: number; supplyGap: number }> = {
  '110006': { name: 'Kashmiri Gate & Chandni Chowk', district: 'North Delhi', lat: 28.6698, lng: 77.2285, evBase: 29400, traffic: 145000, supplyGap: 92.5 },
  '110019': { name: 'Nehru Place & Kalkaji', district: 'South East Delhi', lat: 28.5481, lng: 77.2530, evBase: 36200, traffic: 128000, supplyGap: 88.0 },
  '110058': { name: 'Janakpuri & Posangipur', district: 'West Delhi', lat: 28.6288, lng: 77.0812, evBase: 38500, traffic: 110000, supplyGap: 91.0 },
  '110092': { name: 'Anand Vihar & Laxmi Nagar', district: 'East Delhi', lat: 28.6475, lng: 77.3150, evBase: 31200, traffic: 138000, supplyGap: 84.0 },
  '110017': { name: 'Saket & Malviya Nagar', district: 'South Delhi', lat: 28.5284, lng: 77.2189, evBase: 42800, traffic: 120000, supplyGap: 86.0 },
  '110001': { name: 'Connaught Place & Barakhamba', district: 'Central Delhi', lat: 28.6315, lng: 77.2167, evBase: 24800, traffic: 160000, supplyGap: 72.0 },
  '110037': { name: 'Aerocity & IGI Airport Hub', district: 'South West Delhi', lat: 28.5492, lng: 77.1215, evBase: 44100, traffic: 175000, supplyGap: 68.0 },
  '110085': { name: 'Rohini Sector 10 & Pitampura', district: 'North West Delhi', lat: 28.7112, lng: 77.1189, evBase: 32000, traffic: 95000, supplyGap: 89.0 }
};

// Dynamic Candidate Generation Logic
function generateDynamicCandidates(pincode: string, radiusKm: string, poisText: string): CandidateLocation[] {
  const pinData = DELHI_PINCODES[pincode] || DELHI_PINCODES['110006'];
  const rad = parseFloat(radiusKm) || 5;
  const poiList = poisText.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);

  const hasHotel = poiList.some(p => p.includes('hotel') || p.includes('lodging'));
  const hasMall = poiList.some(p => p.includes('mall') || p.includes('store') || p.includes('market'));
  const hasMetro = poiList.some(p => p.includes('metro') || p.includes('station') || p.includes('bus'));

  const poiBonus = (hasHotel ? 4.5 : 0) + (hasMall ? 5.2 : 0) + (hasMetro ? 6.0 : 0);

  return [
    {
      id: `CAND-${pincode}-01`,
      rank: 1,
      name: `${pinData.name} Primary Transit & Commercial Hub`,
      district: pinData.district,
      latitude: pinData.lat,
      longitude: pinData.lng,
      address: `Main Arterial Corridor, Pincode ${pincode}, ${pinData.district}`,
      score: Math.min(99.4, parseFloat((88.0 + poiBonus + (rad * 0.4)).toFixed(1))),
      demandScore: Math.min(99, parseFloat((89 + poiBonus).toFixed(1))),
      supplyGapScore: pinData.supplyGap,
      evDensityScore: Math.min(98, parseFloat((85 + (pinData.evBase / 1000)).toFixed(1))),
      trafficScore: Math.min(99, parseFloat((80 + (pinData.traffic / 3000)).toFixed(1))),
      dwellScore: Math.min(98, parseFloat((82 + poiBonus * 1.2).toFixed(1))),
      accessibilityScore: 92.0,
      futureGrowthScore: 90.0,
      gridFeasibilityScore: 90.0,
      predictedSessionsPerDay: Math.round(52 + (poiBonus * 3.5) + (rad * 2)),
      predictedKwhPerDay: Math.round((52 + (poiBonus * 3.5) + (rad * 2)) * 24),
      nearestStationDistanceKm: 2.4,
      chargersWithin2Km: 2,
      dailyTrafficVolume: pinData.traffic,
      evShareInZonePercent: 14.5,
      shapFeatures: [
        { feature: `High POI Density (${poiList.join(', ') || 'Commercial Hub'})`, weight: Math.min(28, parseFloat((18 + poiBonus).toFixed(1))), impact: 'positive', description: `Presence of ${poiList.join(', ') || 'key commercial POIs'} generates sustained daily charging sessions.` },
        { feature: `Traffic Exposure (${pinData.traffic.toLocaleString()} vehicles/day)`, weight: Math.min(25, parseFloat((15 + pinData.traffic/10000).toFixed(1))), impact: 'positive', description: `Arterial road exposure within ${rad}km radius.` },
        { feature: `District EV Fleet Base (${pinData.evBase.toLocaleString()} EVs)`, weight: 14.2, impact: 'positive', description: `High baseline EV adoption in ${pinData.district}.` }
      ],
      parkingSpotsAvailable: Math.round(18 + poiBonus * 1.5),
      gridSubstationDistanceMeters: 120,
      transformerCapacityKva: 1250,
      siteFeasibilityStatus: 'Ready',
      landType: 'Commercial Complex',
      estPaybackMonths: Math.max(14, Math.round(24 - (poiBonus * 0.8))),
      estRoiPercent: parseFloat((24.0 + poiBonus * 1.2).toFixed(1))
    },
    {
      id: `CAND-${pincode}-02`,
      rank: 2,
      name: `${pinData.name} Sector 2 Retail & Office Corridor`,
      district: pinData.district,
      latitude: pinData.lat + 0.012,
      longitude: pinData.lng - 0.014,
      address: `Ring Feeder Road, Near Pincode ${pincode}`,
      score: Math.min(96.0, parseFloat((84.0 + poiBonus + (rad * 0.3)).toFixed(1))),
      demandScore: Math.min(96, parseFloat((85 + poiBonus).toFixed(1))),
      supplyGapScore: Math.max(70, pinData.supplyGap - 4),
      evDensityScore: 88.0,
      trafficScore: 90.0,
      dwellScore: 89.0,
      accessibilityScore: 88.0,
      futureGrowthScore: 87.0,
      gridFeasibilityScore: 86.0,
      predictedSessionsPerDay: Math.round(44 + (poiBonus * 2.8) + (rad * 1.5)),
      predictedKwhPerDay: Math.round((44 + (poiBonus * 2.8) + (rad * 1.5)) * 23),
      nearestStationDistanceKm: 1.8,
      chargersWithin2Km: 4,
      dailyTrafficVolume: pinData.traffic - 15000,
      evShareInZonePercent: 12.8,
      shapFeatures: [
        { feature: 'Workplace & Retail Dwell Time', weight: 20.5, impact: 'positive', description: 'Sustained daytime parking dwell duration.' }
      ],
      parkingSpotsAvailable: 26,
      gridSubstationDistanceMeters: 210,
      transformerCapacityKva: 1000,
      siteFeasibilityStatus: 'Ready',
      landType: 'Retail Hub',
      estPaybackMonths: Math.max(16, Math.round(26 - (poiBonus * 0.7))),
      estRoiPercent: parseFloat((21.5 + poiBonus * 1.1).toFixed(1))
    }
  ];
}

export default function Home() {
  const [activeRole, setActiveRole] = useState<UserRole>('investor');

  // Form state
  const [formCity, setFormCity] = useState('Delhi');
  const [formState, setFormState] = useState('Delhi');
  const [formPincode, setFormPincode] = useState('110006');
  const [formRadius, setFormRadius] = useState('5');
  const [formPois, setFormPois] = useState('Hotel, Metro Station, Grocery Store');

  const [candidates, setCandidates] = useState<CandidateLocation[]>(() => generateDynamicCandidates('110006', '5', 'Hotel, Metro Station, Grocery Store'));
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateLocation>(candidates[0]);
  const [activeTab, setActiveTab] = useState<'intelligence' | 'simulator' | 'district'>('intelligence');
  const [isPredictorModalOpen, setIsPredictorModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const existingStations = StationService.getStations();
  const summaryStats = AnalyticsService.getSummaryStats();

  const handleSelectCandidate = (candidate: CandidateLocation) => {
    setSelectedCandidate(candidate);
  };

  const handleLaunchSimulator = (candidate: CandidateLocation) => {
    setSelectedCandidate(candidate);
    setActiveTab('simulator');
  };

  // Run dynamic calculation on form submit
  const handleRunPrediction = (e: React.FormEvent) => {
    e.preventDefault();
    const newCandidates = generateDynamicCandidates(formPincode, formRadius, formPois);
    setCandidates(newCandidates);
    setSelectedCandidate(newCandidates[0]);
    setIsPredictorModalOpen(false);

    const pinInfo = DELHI_PINCODES[formPincode] ? DELHI_PINCODES[formPincode].name : `Pincode ${formPincode}`;
    setToastMsg(`✅ Predictions updated for ${pinInfo} (${formRadius} km radius)`);
    setTimeout(() => setToastMsg(''), 4500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 right-6 z-[2000] bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-bounce">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        activeRole={activeRole}
        onRoleChange={(role) => {
          setActiveRole(role);
          if (role === 'planner') setActiveTab('district');
          if (role === 'investor') setActiveTab('intelligence');
        }}
        onOpenPredictorModal={() => setIsPredictorModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Metric Cards Row - ALL NUMBERS ARE BLACK AND BOLD */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Total Delhi EVs</span>
            <span className="text-xl font-black text-slate-950 font-mono mt-0.5 block">246,000</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Public Charger Supply</span>
            <span className="text-xl font-black text-slate-950 font-mono mt-0.5 block">2,480</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">EV / Charger Ratio</span>
            <span className="text-xl font-black text-slate-950 font-mono mt-0.5 block">99.2</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <span className="text-xs text-slate-500 font-medium block">Top Site ROI Potential</span>
            <span className="text-xl font-black text-slate-950 font-mono mt-0.5 block">{selectedCandidate?.estRoiPercent || 32.4}% / yr</span>
          </div>
        </div>

        {/* Map & Ranked List Split View */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Candidate List (4 cols) */}
          <div className="col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-3 h-[560px] flex flex-col shadow-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Optimal Candidate Sites</h3>
              <span className="text-[10px] text-slate-500 font-mono">Pincode: {formPincode}</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {candidates.map((cand) => {
                const isSelected = cand.id === selectedCandidate.id;
                return (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedCandidate(cand)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-sky-50 border-[#0099ff] shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">#{cand.rank} {cand.name}</span>
                      {/* Black Bold Number */}
                      <span className="text-xs font-black font-mono text-slate-950 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {cand.score}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {cand.district} • <strong className="text-slate-950 font-black">{cand.predictedSessionsPerDay}</strong> sessions/day
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GIS Map View (8 cols) */}
          <div className="col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden relative h-[560px] shadow-xs">
            <GISMap
              candidates={candidates}
              existingStations={existingStations}
              selectedCandidateId={selectedCandidate?.id}
              onSelectCandidate={handleSelectCandidate}
            />
          </div>

        </div>

        {/* Section Tabs */}
        <div className="space-y-4 pt-2">
          
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab('intelligence')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'intelligence'
                  ? 'bg-[#0099ff] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              Location Intelligence & Drivers
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-[#0099ff] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              Investor Financial Simulator
            </button>

            <button
              onClick={() => setActiveTab('district')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'district'
                  ? 'bg-[#0099ff] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              District Deficit Matrix
            </button>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'intelligence' && selectedCandidate && (
            <CandidateCard
              candidate={selectedCandidate}
              onSimulateInvestment={handleLaunchSimulator}
            />
          )}

          {activeTab === 'simulator' && selectedCandidate && (
            <FinancialSimulator
              selectedCandidate={selectedCandidate}
            />
          )}

          {activeTab === 'district' && (
            <DistrictAnalytics />
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <p>© 2026 EV Charging Station Predictor • SIH Problem ID BV806 • Delhi NCT</p>
      </footer>

      {/* Predictor Form Modal matching mentor UI video screenshot */}
      {isPredictorModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[1000] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 space-y-4 text-slate-900 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-xl text-[#0099ff]">EV Charging Station Predictor</h3>
              <button onClick={() => setIsPredictorModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold text-base">✕</button>
            </div>
            
            <form onSubmit={handleRunPrediction} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">City</label>
                <input type="text" value={formCity} onChange={e => setFormCity(e.target.value)} className="w-full border border-slate-300 p-2 rounded-md font-medium focus:border-[#0099ff] focus:outline-none" />
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">State</label>
                <input type="text" value={formState} onChange={e => setFormState(e.target.value)} className="w-full border border-slate-300 p-2 rounded-md font-medium focus:border-[#0099ff] focus:outline-none" />
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Pincode</label>
                <input type="text" value={formPincode} onChange={e => setFormPincode(e.target.value)} className="w-full border border-slate-300 p-2 rounded-md font-medium focus:border-[#0099ff] focus:outline-none" placeholder="e.g. 110006, 110019, 110058, 110092, 110017" />
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Radius (miles/km)</label>
                <input type="text" value={formRadius} onChange={e => setFormRadius(e.target.value)} className="w-full border border-slate-300 p-2 rounded-md font-medium focus:border-[#0099ff] focus:outline-none" />
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Points of Interest (comma-separated)</label>
                <input type="text" value={formPois} onChange={e => setFormPois(e.target.value)} className="w-full border border-slate-300 p-2 rounded-md font-medium focus:border-[#0099ff] focus:outline-none" placeholder="e.g. Hotel, Fast Food, Grocery Store, Metro" />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md text-xs font-bold bg-[#0099ff] text-white hover:bg-[#0284c7] transition shadow-xs cursor-pointer"
                >
                  Predict
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
