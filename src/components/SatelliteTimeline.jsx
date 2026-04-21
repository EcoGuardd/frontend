import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FiClock, FiActivity, FiWind } from 'react-icons/fi';
import gsap from 'gsap';

// Helper to calculate radius from hectares
const calculateRadius = (hectares) => {
  const sqMeters = hectares * 10000;
  return Math.sqrt(sqMeters / Math.PI);
};

// Component to handle map centering and filter injection
function MapController({ center, phase }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && center[0] && center[1]) {
        map.setView(center, 14, { animate: true });
    }
  }, [center, map]);

  // Apply CSS filters to the tile layer pane based on phase
  useEffect(() => {
    const tilePane = map.getPane('tilePane');
    if (!tilePane) return;

    if (phase === '2015') {
      // Simulate barren/deforested land
      gsap.to(tilePane, {
        filter: 'sepia(0.6) contrast(1.4) brightness(0.9) saturate(0.5)',
        duration: 1.5
      });
    } else {
      // Normal satellite
      gsap.to(tilePane, {
        filter: 'sepia(0) contrast(1.1) brightness(1) saturate(1.2)',
        duration: 1.5
      });
    }
  }, [phase, map]);

  return null;
}

export default function SatelliteTimeline({ coordinates, areaHectares }) {
  const [phase, setPhase] = useState('2024'); // '2015', '2024', 'Projected'
  const center = coordinates ? [coordinates.lat, coordinates.lng] : [20, 78];
  const radius = calculateRadius(areaHectares || 100);

  const phases = [
    { id: '2015', label: 'Historical (2015)', icon: <FiClock /> },
    { id: '2024', label: 'Current Scan', icon: <FiActivity /> },
    { id: 'Projected', label: 'Reforestation Plan', icon: <FiWind /> }
  ];

  return (
    <div className="w-full bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden flex flex-col group planner-card">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white z-10">
        <div>
          <h3 className="text-2xl font-black text-green-950 flex items-center tracking-tighter">
            <span className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
              <FiActivity className="text-green-600" size={16} />
            </span>
            Temporal Analysis
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Satellite Intelligence System</p>
        </div>
        
        {/* Timeline Toggle */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          {phases.map((p) => (
            <button
              key={p.id}
              onClick={() => setPhase(p.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                phase === p.id 
                  ? 'bg-white text-green-700 shadow-sm border border-gray-100/50' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className={phase === p.id ? 'animate-pulse' : ''}>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[450px] w-full bg-gray-900">
        <MapContainer
          center={center}
          zoom={14}
          scrollWheelZoom={false}
          zoomControl={false}
          className="h-full w-full"
          attributionControl={false}
        >
          {/* Main Satellite Layer */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Esri World Imagery"
            maxZoom={19}
            maxNativeZoom={18}
          />

          
          <MapController center={center} phase={phase} />

          {/* Reforestation Overlay */}
          <Circle
            center={center}
            radius={radius}
            pathOptions={{
              color: '#22c55e',
              fillColor: '#22c55e',
              fillOpacity: phase === 'Projected' ? 0.4 : 0,
              weight: phase === 'Projected' ? 2 : 0,
              dashArray: '8, 8',
              opacity: phase === 'Projected' ? 0.8 : 0
            }}
            className="transition-all duration-1000"
          />
        </MapContainer>

        {/* HUD Elements */}
        <div className="absolute bottom-6 left-6 z-[1000] bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-white pointer-events-none">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-1">
            {phase === '2015' ? 'Archival Data' : phase === '2024' ? 'Live Sensor Data' : 'Predictive Model'}
          </p>
          <p className="text-xl font-bold tracking-tight">
            {phase === '2015' ? 'High Deforestation' : phase === '2024' ? 'Current Baseline' : `+${areaHectares}ha Growth`}
          </p>
        </div>

        <div className="absolute top-6 right-6 z-[1000] pointer-events-none">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-green-500 animate-spin flex items-center justify-center backdrop-blur-sm">
             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
