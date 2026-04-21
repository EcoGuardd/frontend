import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SatelliteTimeline from '../components/SatelliteTimeline';
import { getDashboardStats, getMapData } from '../utils/api';
import { FiTrendingDown, FiActivity, FiGlobe, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default || CountUpModule;
import gsap from 'gsap';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import RiskZoneLayer from '../components/RiskZoneLayer';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topRiskRegion, setTopRiskRegion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [statsData, regionsData] = await Promise.all([
        getDashboardStats(),
        getMapData()
      ]);
      setStats(statsData);
      setRegions(regionsData || []);
      if (regionsData && regionsData.length > 0) {
        const highRisk = regionsData.find(r => r.riskLevel === 'high') || regionsData[0];
        setTopRiskRegion(highRisk);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.from('.dash-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
    }
  }, [loading]);

  const getColor = (risk) => {
    if (risk === 'high') return '#ef4444';
    if (risk === 'medium') return '#f97316';
    return '#22c55e';
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const updates = [
    { id: 1, type: 'alert', text: 'New Fire Alert detected in Amazon Basin', time: '2 hours ago', icon: <FiAlertCircle className="text-red-500" /> },
    { id: 2, type: 'success', text: '1,200 Saplings successfully planted in Northern Valley', time: '5 hours ago', icon: <FiCheckCircle className="text-green-500" /> },
    { id: 3, type: 'update', text: 'Satellite Scan: Vegetation health increased in Congo Basin', time: '1 day ago', icon: <FiActivity className="text-blue-500" /> },
    { id: 4, type: 'alert', text: 'High Risk Alert: Unusually dry conditions in Australian Outback', time: '1 day ago', icon: <FiAlertCircle className="text-orange-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-8 pt-12 space-y-12">

        {/* HEADER */}
        <div className="dash-card flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-green-950 tracking-tighter">Global Impact Dashboard</h1>
            <p className="text-gray-500 font-medium mt-2 uppercase tracking-widest text-xs flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Live Environmental Intelligence Monitoring
            </p>
          </div>
          <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-3 border-r border-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Nodes</p>
              <p className="text-xl font-black text-green-900">{stats?.totalRegions || 0}</p>
            </div>
            <div className="px-6 py-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Health</p>
              <p className="text-xl font-black text-green-600">Stable</p>
            </div>
          </div>
        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="dash-card bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl group hover:scale-[1.02] transition-all">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
              <FiTrendingDown className="text-red-500" size={24} />
            </div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Deforestation Risk</h3>
            <div className="text-4xl font-black text-gray-900 leading-none">
              <CountUp end={stats?.highRiskCount || 0} duration={2} />
              <span className="text-sm font-normal text-gray-400 ml-2">High-Risk Zones</span>
            </div>
          </div>

          <div className="dash-card bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl group hover:scale-[1.02] transition-all">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
              <FiGlobe className="text-blue-500" size={24} />
            </div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">CO2 Absorption Gap</h3>
            <div className="text-4xl font-black text-gray-900 leading-none">
              <CountUp end={Math.round(stats?.co2Impact || 0)} duration={2} separator="," />
              <span className="text-sm font-normal text-gray-400 ml-2">K Tons</span>
            </div>
          </div>

          <div className="dash-card bg-green-900 p-10 rounded-[40px] shadow-2xl group hover:scale-[1.02] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <FiActivity size={120} className="text-white" />
            </div>
            <div className="w-14 h-14 bg-green-800 rounded-2xl flex items-center justify-center mb-6">
              <FiActivity className="text-green-400" size={24} />
            </div>
            <h3 className="text-[10px] font-bold text-green-400 uppercase tracking-[0.2em] mb-2">Trees Required</h3>
            <div className="text-4xl font-black text-white leading-none">
              <CountUp end={stats?.treesNeeded || 0} duration={2.5} separator="," />
              <span className="text-sm font-normal opacity-50 ml-2">Saplings</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <div className="dash-card">
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl font-black text-green-950 tracking-tighter">Live Satellite Intelligence</h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Focus: {topRiskRegion?.name || 'Global'}</span>
              </div>
              {topRiskRegion && (
                <SatelliteTimeline
                  coordinates={topRiskRegion.coordinates}
                  areaHectares={topRiskRegion.forestLost || 500}
                />
              )}
            </div>

            {/* LIVE GLOBAL MAP */}
            <div className="dash-card bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-green-950 tracking-tighter uppercase">Global Coverage Map</h3>
                <a href="/map" className="text-xs font-bold text-green-600 hover:underline">View Full Map →</a>
              </div>
              {/* Legend */}
              <div className="flex items-center gap-4 mb-4 text-xs font-semibold text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Illegal Logging / High</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Medium</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Low</span>
              </div>
              <div className="h-[300px] rounded-3xl overflow-hidden border border-gray-100 shadow-inner">
                <MapContainer
                  center={[10, 20]}
                  zoom={2}
                  className="h-full w-full"
                  zoomControl={false}
                  attributionControl={false}
                  dragging={false}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {regions.map((zone, i) => (
                    <CircleMarker
                      key={zone.name + i}
                      center={[zone.coordinates?.lat || 0, zone.coordinates?.lng || 0]}
                      radius={8}
                      pathOptions={{
                        color: getColor(zone.riskLevel),
                        fillColor: getColor(zone.riskLevel),
                        fillOpacity: 0.7,
                        weight: 2,
                      }}
                    >
                      <Popup><span className="font-bold">{zone.name}</span> — {zone.riskLevel} risk</Popup>
                    </CircleMarker>
                  ))}
                  <RiskZoneLayer />
                </MapContainer>
              </div>
            </div>
          </div>

          {/* SIDEBAR: UPDATES & ACTIVITY */}
          <div className="space-y-8">
            <div className="dash-card bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl h-full">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <FiClock className="text-gray-400" />
                </div>
                <h2 className="text-xl font-black text-green-950 tracking-tighter uppercase">Latest Activity</h2>
              </div>
              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="flex space-x-4 p-4 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-110 transition-transform">
                      {update.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-snug">{update.text}</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-1">{update.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all">
                Load More Intelligence
              </button>
            </div>

            <div className="dash-card bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-[40px] shadow-xl text-white">
              <h3 className="text-lg font-black uppercase tracking-tighter mb-4 leading-tight">AI Strategy Insight</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">
                "Based on current satellite trends, focusing reforestation efforts in the Congo Basin will yield 40% higher carbon efficiency over the next 5 years."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <FiActivity size={14} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">EcoAgent AI Alpha</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
