'use client';

import React, { useState, useEffect } from 'react';
import { CandidateLocation, ChargingStation } from '../types/ev';
import { Layers } from 'lucide-react';

interface GISMapProps {
  candidates: CandidateLocation[];
  existingStations: ChargingStation[];
  selectedCandidateId: string | null;
  onSelectCandidate: (candidate: CandidateLocation) => void;
  onSelectStation?: (station: ChargingStation) => void;
}

export const GISMap: React.FC<GISMapProps> = ({
  candidates,
  existingStations,
  selectedCandidateId,
  onSelectCandidate,
  onSelectStation
}) => {
  const [activeLayer, setActiveLayer] = useState<'candidates' | 'stations' | 'density' | 'gap'>('candidates');
  const [isClient, setIsClient] = useState(false);
  const [LeafletComponents, setLeafletComponents] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    Promise.all([
      import('react-leaflet'),
      import('leaflet')
    ]).then(([ReactLeaflet, L]) => {
      setLeafletComponents({ ReactLeaflet, L });
    });
  }, []);

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs flex flex-col">
      
      {/* Top Map Layer Control Header */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-2 shadow-md flex items-center gap-2">
        <div className="text-xs text-slate-500 font-semibold px-2 flex items-center gap-1 border-r border-slate-200">
          <Layers className="w-3.5 h-3.5 text-sky-600" />
          <span>GIS Layers:</span>
        </div>

        <button
          onClick={() => setActiveLayer('candidates')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            activeLayer === 'candidates'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🎯 Top AI Candidates ({candidates.length})
        </button>

        <button
          onClick={() => setActiveLayer('stations')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            activeLayer === 'stations'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ⚡ Existing Supply ({existingStations.length})
        </button>

        <button
          onClick={() => setActiveLayer('gap')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            activeLayer === 'gap'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🔥 Demand-Supply Gap
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 z-[400] bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-3 shadow-lg text-xs space-y-2 max-w-xs">
        <div className="font-semibold text-slate-800 border-b border-slate-100 pb-1 flex items-center justify-between">
          <span>Map Legend</span>
          <span className="text-[10px] text-sky-700 font-mono">Delhi NCT</span>
        </div>
        
        {activeLayer === 'candidates' && (
          <div className="space-y-1.5 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-sky-600 flex items-center justify-center text-[9px] font-bold text-white">1</span>
              <span>Ranked Candidate Site (Blue Pin)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500 border border-white animate-ping" />
              <span>Selected Site Catchment</span>
            </div>
          </div>
        )}

        {activeLayer === 'stations' && (
          <div className="space-y-1 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>Existing Public EV Charger</span>
            </div>
          </div>
        )}
      </div>

      {/* Render Leaflet Map */}
      {!isClient || !LeafletComponents ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-3">
          <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Initializing Delhi GIS Map Engine...</span>
        </div>
      ) : (
        <LeafletMapView
          LeafletComponents={LeafletComponents}
          candidates={candidates}
          existingStations={existingStations}
          selectedCandidate={selectedCandidate}
          activeLayer={activeLayer}
          onSelectCandidate={onSelectCandidate}
        />
      )}
    </div>
  );
};

const LeafletMapView = ({
  LeafletComponents,
  candidates,
  existingStations,
  selectedCandidate,
  activeLayer,
  onSelectCandidate
}: any) => {
  const { ReactLeaflet, L } = LeafletComponents;
  const { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker } = ReactLeaflet;

  const createRankIcon = (rank: number, isSelected: boolean) => {
    return L.divIcon({
      className: 'custom-rank-pin',
      html: `
        <div class="relative group cursor-pointer">
          <div class="w-8 h-8 rounded-full ${
            isSelected
              ? 'bg-sky-700 text-white scale-110 ring-4 ring-sky-300 font-black shadow-lg'
              : 'bg-sky-600 text-white font-bold hover:scale-105'
          } flex items-center justify-center text-xs shadow border border-white">
            ${rank}
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
  };

  const createStationIcon = (operator: string) => {
    return L.divIcon({
      className: 'custom-station-pin',
      html: `
        <div class="w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white font-bold shadow text-[9px]">
          ⚡
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={11}
      scrollWheelZoom={true}
      className="w-full h-full z-10"
      style={{ background: '#f8fafc' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & Delhi GIS'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {/* Layer: Candidate Pins */}
      {(activeLayer === 'candidates' || activeLayer === 'gap') &&
        candidates.map((c: CandidateLocation) => {
          const isSelected = c.id === selectedCandidate.id;
          return (
            <React.Fragment key={c.id}>
              <Marker
                position={[c.latitude, c.longitude]}
                icon={createRankIcon(c.rank, isSelected)}
                eventHandlers={{
                  click: () => onSelectCandidate(c)
                }}
              >
                <Popup>
                  <div className="bg-white text-slate-900 p-2.5 rounded-xl border border-slate-200 space-y-1.5 min-w-[200px] shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="font-bold text-xs text-sky-700">Rank #{c.rank} Candidate</span>
                      <span className="bg-sky-50 text-sky-700 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold border border-sky-200">
                        {c.score} / 100
                      </span>
                    </div>
                    <p className="font-semibold text-xs text-slate-900">{c.name}</p>
                    <p className="text-[11px] text-slate-500">{c.district}</p>
                  </div>
                </Popup>
              </Marker>

              {isSelected && (
                <Circle
                  center={[c.latitude, c.longitude]}
                  radius={1500}
                  pathOptions={{
                    color: '#0284c7',
                    fillColor: '#0ea5e9',
                    fillOpacity: 0.15,
                    weight: 2,
                    dashArray: '4, 4'
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

      {/* Layer: Existing Stations */}
      {(activeLayer === 'stations' || activeLayer === 'candidates') &&
        existingStations.map((st: ChargingStation) => (
          <Marker
            key={st.id}
            position={[st.latitude, st.longitude]}
            icon={createStationIcon(st.operator)}
          >
            <Popup>
              <div className="bg-white text-slate-900 p-2 rounded border border-slate-200 space-y-1 min-w-[180px]">
                <p className="text-xs font-bold text-slate-900">{st.name}</p>
                <p className="text-[10px] text-slate-500">{st.operator} • {st.district}</p>
                <div className="text-[10px] text-slate-600">
                  <span>Chargers: {st.chargerCount} ({st.powerKw} kW)</span><br />
                  <span>Utilisation: {st.utilizationRate}%</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      {activeLayer === 'gap' && (
        <>
          <CircleMarker
            center={[28.6750, 77.2250]}
            radius={45}
            pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 }}
          />
          <CircleMarker
            center={[28.6320, 77.0850]}
            radius={40}
            pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.2 }}
          />
        </>
      )}
    </MapContainer>
  );
};
