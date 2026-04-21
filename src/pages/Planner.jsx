import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getRegionDetails, getReforestationSuggestions, chatWithAgent } from '../utils/api';
import { FiCpu, FiSend, FiMinimize2, FiMaximize2, FiWind, FiDroplet, FiActivity, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default || CountUpModule;
import gsap from 'gsap';
import SatelliteTimeline from '../components/SatelliteTimeline';


function Planner() {
  const location = useLocation();
  const navigate = useNavigate();
  const regionId = location.state?.regionId;

  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [area, setArea] = useState(100); // Default Hectares
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [manualForm, setManualForm] = useState({
    name: '',
    soilType: 'loam',
    climate: 'temperate',
    currentTemperature: 25
  });
  const chatEndRef = useRef(null);

  useEffect(() => {
    const initPlanner = async () => {
      setLoading(true);
      let data = null;

      // Prioritize analysis object if passed directly (from search)
      if (location.state?.analysis) {
        data = location.state.analysis;
      } else if (regionId && regionId !== 'searched') {
        data = await getRegionDetails(regionId);
      }

      setRegion(data);

      if (data) {
        // Fetch initial Suggestions first so AI has the data
        const sug = await getReforestationSuggestions({
          soilType: data.soilType || 'loam',
          climate: data.climate || (data.currentTemperature > 25 ? 'tropical' : 'temperate'),
          areaToRestore: area
        });
        setSuggestions(sug);

        // AI Initial Intelligence Scan - Powered by real LLM
        const scanMessage = `Provide a very brief 2-sentence site briefing for ${data.name}. Mention climate ${data.climate}, that we will plant ${sug.treesRequired} saplings, and offset ${sug.cumulativeCO2} tons of CO2.`;
        const aiBriefing = await chatWithAgent(scanMessage, { regionData: data });

        const initialMsg = {
          role: 'agent',
          text: aiBriefing || `EcoAgent system online. Analyzing ${data.name}... Climate: ${data.climate || 'Stable'}. Risk: ${data.riskLevel.toUpperCase()}.`
        };
        addMessage(initialMsg);
      }
      setLoading(false);
    };

    initPlanner();
  }, [regionId]);

  // Debounced update for area changes
  useEffect(() => {
    const updateStats = async () => {
      if (!region) return;
      const sug = await getReforestationSuggestions({
        soilType: region.soilType || 'loam',
        climate: region.climate || (region.currentTemperature > 25 ? 'tropical' : 'temperate'),
        areaToRestore: area
      });
      setSuggestions(sug);
    };
    const debounce = setTimeout(updateStats, 400);
    return () => clearTimeout(debounce);
  }, [area, region]);

  // GSAP Entry Animations
  useEffect(() => {
    if (!loading && region) {
      gsap.from(".planner-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      });
    }
  }, [loading, region]);

  const addMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const input = e.target.elements.message.value;
    if (!input.trim()) return;

    addMessage({ role: 'user', text: input });
    e.target.reset();

    setIsTyping(true);

    // Real AI Chat Call
    chatWithAgent(input, { regionData: region }).then(reply => {
      console.log("EcoAgent Response Received:", reply);
      setIsTyping(false);
      addMessage({ role: 'agent', text: reply });
    });
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const manualRegion = {
      ...manualForm,
      riskLevel: 'medium',
      coordinates: null,
      isManual: true
    };
    
    setRegion(manualRegion);
    
    // Fetch initial Suggestions first
    const sug = await getReforestationSuggestions({
      soilType: manualRegion.soilType,
      climate: manualRegion.climate,
      areaToRestore: area
    });
    setSuggestions(sug);

    // AI Initial Intelligence Scan for manual entry
    const scanMessage = `Provide a very brief 2-sentence site briefing for a manual site named ${manualRegion.name}. Mention climate ${manualRegion.climate}, soil ${manualRegion.soilType}, and that we will plant ${sug.treesRequired} saplings offsetting ${sug.cumulativeCO2} tons of CO2.`;
    const aiBriefing = await chatWithAgent(scanMessage, { regionData: manualRegion });
    console.log("Initial Site Briefing Received:", aiBriefing);

    const initialMsg = {
      role: 'agent',
      text: aiBriefing || `EcoAgent system online. Analyzing manual site ${manualRegion.name}... Climate: ${manualRegion.climate}.`
    };
    addMessage(initialMsg);

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="relative">
          <FiCpu className="text-green-600 animate-spin" size={64} />
          <div className="absolute inset-0 bg-green-200 blur-2xl opacity-40"></div>
        </div>
        <p className="text-green-800 font-bold tracking-[0.2em] uppercase mt-8 animate-pulse text-xs text-center">Synchronizing EcoAgent Intelligence...</p>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <Navbar />
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          
          {/* Left: Map Redirection */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-50 rounded-[30%] flex items-center justify-center mb-8 shadow-sm">
              <FiMinimize2 className="text-green-600" size={32} />
            </div>
            <h2 className="text-3xl font-black text-green-900 mb-2 uppercase tracking-tighter">Satellite Select</h2>
            <p className="text-gray-500 mb-10 text-sm font-medium">
              Use our global real-time map to identify high-risk deforestation hotspots.
            </p>
            <button onClick={() => navigate('/map')} className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 active:scale-95">
              Go to Global Map
            </button>
          </div>

          {/* Right: Manual Entry */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                <FiCpu className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-black text-green-950 uppercase tracking-tighter">Manual Intelligence</h2>
            </div>
            
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Site Identification</label>
                <input 
                  required
                  placeholder="e.g. Northern Valley Project"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium focus:border-green-500 outline-none transition-all"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({...manualForm, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Soil Matrix</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium focus:border-green-500 outline-none transition-all appearance-none"
                    value={manualForm.soilType}
                    onChange={(e) => setManualForm({...manualForm, soilType: e.target.value})}
                  >
                    <option value="loam">Loam</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="silt">Silt</option>
                    <option value="peaty">Peaty</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Climate Biome</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium focus:border-green-500 outline-none transition-all appearance-none"
                    value={manualForm.climate}
                    onChange={(e) => setManualForm({...manualForm, climate: e.target.value})}
                  >
                    <option value="temperate">Temperate</option>
                    <option value="tropical">Tropical</option>
                    <option value="arid">Arid</option>
                    <option value="boreal">Boreal</option>
                    <option value="mediterranean">Mediterranean</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Avg Temperature (°C)</label>
                <input 
                  type="number"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium focus:border-green-500 outline-none transition-all"
                  value={manualForm.currentTemperature}
                  onChange={(e) => setManualForm({...manualForm, currentTemperature: parseInt(e.target.value)})}
                />
              </div>

              <button type="submit" className="w-full py-4 bg-green-950 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95 mt-4">
                Initialize Planning
              </button>
            </form>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-900 font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {/* ===== LEFT: ECO-AGENT (The Agent) ===== */}
        <div className="w-[420px] border-r border-gray-200 flex flex-col bg-white relative shadow-2xl z-20">
          <div className="p-8 border-b border-gray-100 bg-gradient-to-b from-green-50/50 to-transparent">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/30">
                <FiCpu className="text-white" size={24} />
              </div>
              <div>
                <h2 className="font-black text-sm tracking-[0.1em] uppercase text-green-900">EcoAgent Alpha</h2>
                <div className="flex items-center text-[10px] text-green-600 font-bold tracking-widest mt-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-ping"></span>
                  OPERATIONAL
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar scrollbar-hide bg-gray-50/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-5 rounded-3xl text-sm leading-relaxed font-medium shadow-sm ${msg.role === 'user'
                    ? 'bg-green-600 text-white rounded-tr-none'
                    : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-none flex space-x-2 shadow-sm">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-8 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="relative group">
              <input
                name="message"
                placeholder="Talk to the strategy agent..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-6 pr-14 text-sm outline-none focus:border-green-500 transition-all font-medium text-gray-700"
              />
              <button className="absolute right-2 top-2 w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center hover:bg-green-700 transition-all shadow-lg text-white">
                <FiSend size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* ===== RIGHT: STRATEGIC PLAN (Impact) ===== */}
        <div className="flex-1 overflow-y-auto p-16 scrollbar-hide bg-gradient-to-br from-white to-green-50/30">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Context Header */}
            <div className="flex items-start justify-between">
              <div className="planner-card">
                <span className="text-green-600 font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Strategic Objective</span>
                <h1 className="text-6xl font-black tracking-tighter text-green-950 mb-4">{region.name}</h1>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <FiDroplet className="mr-2 text-blue-500" /> {region.climate || 'Temperate'} Biome
                  </div>
                  <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <FiWind className="mr-2 text-orange-500" /> {region.soilType || 'Loam'} Soil
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-white border border-gray-100 rounded-3xl flex flex-col items-end shadow-xl planner-card">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Risk Index</span>
                <span className={`text-2xl font-black uppercase tracking-tighter ${region.riskLevel === 'high' ? 'text-red-500' : region.riskLevel === 'medium' ? 'text-orange-500' : 'text-green-600'
                  }`}>
                  {region.riskLevel}
                </span>
              </div>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "New Saplings", icon: <FiWind className="text-green-600" />, value: suggestions?.treesRequired || 0, unit: "Units" },
                { label: "CO2 Offset /10yr", icon: <FiActivity className="text-blue-500" />, value: suggestions?.cumulativeCO2 || 0, unit: "Tons" },
                { label: "Survival Odds", icon: <FiTrendingUp className="text-orange-500" />, value: suggestions?.estimatedSurvivalRate || 0, unit: "%" }
              ].map((stat, i) => (
                <div key={i} className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-xl planner-card group hover:scale-[1.02] transition-all duration-500">
                  <div className="mb-6 w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-green-50 transition-colors">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-black text-green-950 mb-2 leading-none">
                    <CountUp end={Number(stat.value) || 0} duration={3} decimals={stat.unit === '%' ? 1 : 0} separator="," />
                    <span className="text-xs font-bold text-gray-400 ml-2 uppercase">{stat.unit}</span>
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Area Control Panel */}
            <div className="p-12 rounded-[50px] bg-white border border-gray-100 shadow-2xl planner-card relative overflow-hidden group">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-green-950 flex items-center tracking-tighter">
                  <FiMaximize2 className="mr-4 text-green-600" />
                  Operation Area
                </h3>
                <div className="px-8 py-3 bg-green-600 rounded-2xl text-white font-black text-2xl shadow-xl shadow-green-600/20">
                  {area.toLocaleString()} <span className="text-sm font-normal opacity-70">ha</span>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="10000"
                step="10"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-green-600 hover:accent-green-500 transition-all"
              />
              <div className="flex justify-between mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                <span>Local Plot</span>
                <span className="text-green-600">Mass Scale</span>
                <span>Industrial Sector</span>
              </div>
            </div>

            {/* Satellite Analysis Timeline */}
            <div className="planner-card">
              <SatelliteTimeline coordinates={region.coordinates} areaHectares={area} />
            </div>

            {/* Species Section */}
            <div className="space-y-8 planner-card">
              <div className="flex items-center justify-between flex-wrap gap-4 px-2">
                <h3 className="text-2xl font-black text-green-950 flex items-center tracking-tighter">
                  <FiDroplet className="mr-4 text-blue-500" />
                  AI Selected Species
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Optimized for Biosphere</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestions?.suggestedTrees?.map((tree, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-white border border-gray-100 flex items-center justify-between group hover:border-green-200 hover:shadow-2xl transition-all shadow-sm">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-6 transition-transform">
                        🌳
                      </div>
                      <div className="text-left">
                        <h4 className="font-black text-xl text-green-900 group-hover:text-green-600 transition-colors uppercase truncate max-w-[120px] md:max-w-none">{tree.name}</h4>
                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                          <span className="text-green-600 mr-2">{tree.growthRate} growth</span>
                          <span className="mx-2 opacity-30">•</span>
                          <span className="ml-2">~{tree.co2AbsorptionPerTree}kg/yr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Action */}
            <div className="pt-8 flex flex-col md:flex-row gap-6 planner-card pb-12">
              <div className="flex-1 bg-green-50 p-8 rounded-[40px] border border-green-100 flex items-center justify-center text-center">
                <p className="text-green-800 text-sm font-bold uppercase tracking-widest">
                  Plan generated successfully. Consult with EcoAgent for field execution details.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button className="w-24 h-24 rounded-3xl border border-gray-100 bg-white flex items-center justify-center hover:bg-gray-50 transition-all text-gray-400 group shadow-lg">
                  <FiSend size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-green-600" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Planner;
