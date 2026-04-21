import React, { useEffect, useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import { getDetectionZones } from '../utils/api';
import { useGlobalContext } from '../context/GlobalContext';

function RiskZoneLayer() {
  const [zones, setZones] = useState([]);
  const { selectedRegion } = useGlobalContext();

  const fetchZones = async () => {
    try {
      const data = await getDetectionZones();
      setZones(data);
    } catch (error) {
      console.error("Failed to fetch detection zones:", error);
    }
  };

  useEffect(() => {
    fetchZones();
    const interval = setInterval(fetchZones, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredZones = selectedRegion === 'All' 
    ? zones 
    : zones.filter(z => z.region === selectedRegion);

  const getMarkerColor = (risk) => {
    switch(risk) {
      case 'illegal_logging': return '#ef4444';
      case 'high':            return '#ef4444';
      case 'medium':          return '#f97316';
      case 'low':             return '#22c55e';
      default:                return '#3b82f6';
    }
  };

  return (
    <>
      {filteredZones.map((zone) => (
        <CircleMarker
          key={zone._id || `${zone.lat}-${zone.lng}`}
          center={[zone.lat, zone.lng]}
          pathOptions={{
            color: getMarkerColor(zone.risk),
            fillColor: getMarkerColor(zone.risk),
            fillOpacity: 0.6,
            weight: 2
          }}
          radius={zone.risk === 'illegal_logging' || zone.risk === 'high' ? 12 : 8}
        >
          <Popup>
            <div className="p-1 min-w-[150px]">
              <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">{zone.label || zone.region}</h3>
              <p className="text-sm mb-1">
                <strong>Risk:</strong> <span style={{ color: getMarkerColor(zone.risk), fontWeight: 'bold' }}>{zone.risk.replace('_', ' ').toUpperCase()}</span>
              </p>
              <p className="text-sm mb-1">
                <strong>Tree Loss:</strong> {zone.treeLossPct?.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Coords: {zone.lat.toFixed(4)}, {zone.lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}

export default RiskZoneLayer;
