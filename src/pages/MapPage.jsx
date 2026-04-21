import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getMapData, analyzeLocation } from "../utils/api";
import { FiSearch, FiTarget, FiX, FiMapPin, FiActivity } from "react-icons/fi";

// Component to handle map centering
function MapRecenter({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

function MapPage() {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Recommendations state
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const searchTimeout = useRef(null);

  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [center, setCenter] = useState([20, 78]); // Default center

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getMapData();
      setRegions(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter & Fetch Suggestions (Debounced)
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (searchQuery.length > 2 && showSuggestions) {
      setIsFetchingSuggestions(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`);
          const data = await res.json();
          const formatted = data.map(item => ({
            name: item.display_name,
            shortName: item.display_name.split(',')[0],
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            type: item.type || 'place'
          }));
          setSuggestions(formatted);
        } catch (err) {
          console.error("Failed to fetch suggestions", err);
        } finally {
          setIsFetchingSuggestions(false);
        }
      }, 500); // 500ms debounce
    } else {
      setSuggestions([]);
      setIsFetchingSuggestions(false);
    }

    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current); };
  }, [searchQuery, showSuggestions]);

  const getColor = (risk) => {
    if (risk === "high") return "#ef4444"; // Red 500
    if (risk === "medium") return "#f97316"; // Orange 500
    return "#22c55e"; // Green 500
  };

  const handleRegionSelect = (e) => {
    const regionName = e.target.value;
    if (!regionName) return;
    const region = regions.find(r => r.name === regionName);
    if (region) {
      setSelectedRegion(region);
      setCenter([region.coordinates.lat, region.coordinates.lng]);
    }
  };

  const performSearch = async (query, lat = null, lon = null) => {
    setSearching(true);
    setShowSuggestions(false);
    try {
      let latitude = lat;
      let longitude = lon;
      let displayName = query.split(',')[0];

      // If coordinates aren't provided (e.g. user pressed Enter without clicking a suggestion)
      if (latitude === null) {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
        const geoData = await geoRes.json();
        if (geoData.length > 0) {
          latitude = parseFloat(geoData[0].lat);
          longitude = parseFloat(geoData[0].lon);
          displayName = geoData[0].display_name.split(',')[0];
        }
      }

      if (latitude !== null) {
        const analysis = await analyzeLocation(latitude, longitude, displayName);

        if (analysis) {
          setSelectedRegion(analysis);
          setCenter([latitude, longitude]);
          if (!regions.find(r => r.name === analysis.name)) {
            setRegions(prev => [analysis, ...prev]);
          }
        }
      } else {
        alert("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    performSearch(searchQuery);
  };

  const handleSuggestionClick = (item) => {
    setSearchQuery(item.shortName);
    performSearch(item.name, item.lat, item.lon);
  };

  const zones = regions.filter(z => selectedRisk === "All" || z.riskLevel === selectedRisk);

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden bg-gray-50">
      <Navbar />

      <div className="flex flex-1 relative overflow-hidden">
        {/* ===== SIDEBAR ===== */}
        <div className="w-[360px] bg-white p-6 shadow-xl z-20 flex flex-col overflow-y-auto border-r border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-green-900 tracking-tight">
              EcoGuard Map
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => { window.location.reload(); }}
                className="p-2 text-gray-400 hover:text-green-700 transition-colors"
                title="Reset View"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* SEARCH BAR & SUGGESTIONS */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search countries, cities, landmarks..."
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all shadow-inner text-sm"
                />
                <FiSearch className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                {isFetchingSuggestions && (
                  <div className="absolute right-3.5 top-3.5">
                    <FiActivity className="text-green-600 animate-pulse" size={16} />
                  </div>
                )}
              </form>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl z-[1001] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {suggestions.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-800 flex items-start border-b border-gray-50 last:border-0 transition-colors group"
                    >
                      <FiMapPin className="mt-0.5 mr-3 text-green-600 shrink-0" size={14} />
                      <div className="overflow-hidden">
                        <p className="truncate text-gray-900 group-hover:text-green-900">{item.shortName}</p>
                        <p className="text-[10px] text-gray-400 truncate font-normal">{item.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <hr className="border-gray-100" />

            {/* SELECTED REGION DETAILS */}
            {selectedRegion ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-black text-green-900 leading-tight pr-2">
                      {selectedRegion.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {selectedRegion.coordinates.lat.toFixed(4)}, {selectedRegion.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter text-white shrink-0`} style={{ backgroundColor: getColor(selectedRegion.riskLevel) }}>
                    {selectedRegion.riskLevel} Risk
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200/50 shadow-sm">
                    <p className="text-[10px] text-green-700 font-black uppercase tracking-widest mb-1">Potential Carbon Impact</p>
                    <p className="text-3xl font-black text-green-900 leading-none">
                      {selectedRegion.co2Impact} <span className="text-sm font-normal text-green-700">Tons</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[9px] text-orange-500 font-black uppercase tracking-widest mb-1">Fire Alerts</p>
                      <p className="text-xl font-black text-gray-900 flex items-center">
                        {selectedRegion.alertCount || 0}
                        {selectedRegion.alertCount > 0 && <span className="ml-1.5 w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest mb-1">Avg Temp</p>
                      <p className="text-xl font-black text-gray-900">{selectedRegion.currentTemperature || "--"}°C</p>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2 text-center">AI Recommended Tree Species</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedRegion.suggestedTrees?.map(tree => (
                        <span key={tree} className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-green-800 shadow-sm hover:bg-green-50 transition-colors cursor-default text-center">
                          {tree}
                        </span>
                      )) || <p className="text-xs text-gray-400 italic">No recommendations yet</p>}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/planner', {
                      state: {
                        regionId: selectedRegion._id || 'searched',
                        analysis: selectedRegion
                      }
                    })}
                    className="w-full bg-green-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-800 transition-all shadow-xl shadow-green-900/20 active:scale-[0.98] mt-2 group flex items-center justify-center"
                  >
                    Start Restoration Plan
                    <FiTarget className="ml-2 group-hover:rotate-45 transition-transform" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center px-4">
                <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-100">
                  <FiSearch className="text-gray-300" size={32} />
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-2">Explore the Planet</h4>
                <p className="text-sm text-gray-400 font-medium">
                  Search for any ecosystem, forest, city, or landmark to analyze live environmental risks.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ===== MAP AREA ===== */}
        <div className="flex-1 relative z-10">
          {(loading || searching) && (
            <div className="absolute inset-0 z-[1000] bg-white/40 backdrop-blur-md flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-black text-green-900 uppercase tracking-widest">
                  {searching ? "Analyzing Location..." : "Loading Data..."}
                </p>
              </div>
            </div>
          )}

          <MapContainer
            center={center}
            zoom={4}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapRecenter center={center} />

            {zones.map((zone, i) => (
              <Circle
                key={zone.name + i}
                center={[zone.coordinates.lat, zone.coordinates.lng]}
                radius={zone._id ? 120000 : 80000} // searched markers are slightly smaller
                eventHandlers={{
                  click: () => {
                    setSelectedRegion(zone);
                    setCenter([zone.coordinates.lat, zone.coordinates.lng]);
                  },
                }}
                pathOptions={{
                  color: getColor(zone.riskLevel),
                  fillColor: getColor(zone.riskLevel),
                  fillOpacity: 0.6,
                  weight: zone._id ? 2 : 4, // border for searched
                  dashArray: zone._id ? "" : "5, 5" // dash for searched
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1">
                    <h4 className="font-bold text-green-900 border-b pb-1 mb-2">{zone.name}</h4>
                    <p className="text-xs mb-1"><strong>Status:</strong> <span className="capitalize">{zone.status}</span></p>
                    <p className="text-xs"><strong>AI Risk:</strong> <span className="uppercase font-bold" style={{ color: getColor(zone.riskLevel) }}>{zone.riskLevel}</span></p>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapPage;


