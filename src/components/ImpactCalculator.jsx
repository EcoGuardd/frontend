import React, { useState } from 'react';
import { calculateImpactGrowth } from '../utils/api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';

const REGIONS = ['Global', 'India', 'Amazon', 'Congo', 'Southeast Asia'];

const StatCard = ({ icon, label, value, unit, color, delay }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-5 shadow-lg border border-white/20 flex flex-col gap-2`}
    style={{
      background: `linear-gradient(135deg, ${color}22, ${color}44)`,
      borderColor: `${color}44`,
      animationDelay: `${delay}ms`
    }}
  >
    <div className="text-3xl">{icon}</div>
    <p className="text-xs font-black uppercase tracking-widest text-gray-500">{label}</p>
    <p className="text-3xl font-black text-gray-900 leading-none">
      {typeof value === 'number' ? value.toLocaleString() : value}
      {unit && <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>}
    </p>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xl text-sm">
        <p className="font-bold text-gray-700 mb-1">Month {label}</p>
        <p className="text-green-700 font-semibold">CO₂: {payload[0]?.value?.toLocaleString()} kg</p>
        {payload[1] && <p className="text-blue-600 font-semibold">Growth: {payload[1]?.value?.toFixed(1)}%</p>}
      </div>
    );
  }
  return null;
};

function ImpactCalculator() {
  const [form, setForm] = useState({ areaHectares: '', region: 'India', monthsElapsed: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.areaHectares || !form.monthsElapsed) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await calculateImpactGrowth({
        areaHectares: parseFloat(form.areaHectares),
        region: form.region,
        monthsElapsed: parseInt(form.monthsElapsed),
      });
      if (!data) throw new Error('No data returned');
      setResult(data);
    } catch (err) {
      setError('Failed to calculate impact. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* --- Input Form --- */}
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-green-100 p-8 mb-8">
        <h2 className="text-2xl font-black text-green-900 mb-1">🌱 Growth Tracker & CO₂ Calculator</h2>
        <p className="text-gray-500 text-sm mb-6">Enter your reforestation data to calculate environmental impact and carbon offset.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Area (Hectares)</label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              placeholder="e.g. 10"
              value={form.areaHectares}
              onChange={e => setForm(f => ({ ...f, areaHectares: e.target.value }))}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition text-sm font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Region</label>
            <select
              value={form.region}
              onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition text-sm font-semibold"
            >
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Months Elapsed</label>
            <input
              type="number"
              min="1"
              max="120"
              placeholder="e.g. 18"
              value={form.monthsElapsed}
              onChange={e => setForm(f => ({ ...f, monthsElapsed: e.target.value }))}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition text-sm font-semibold"
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-3 bg-green-900 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-green-800 transition-all shadow-lg shadow-green-900/20 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Calculating...</>
              ) : '📊 Calculate Impact'}
            </button>
          </div>
        </form>

        {error && <p className="mt-4 text-red-600 text-sm font-semibold">{error}</p>}
      </div>

      {/* --- Results --- */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard icon="🌳" label="Trees Planted" value={result.treesPlanted} color="#16a34a" delay={0} />
            <StatCard icon="✅" label="Surviving Trees" value={result.activeTrees} color="#22c55e" delay={100} />
            <StatCard icon="🌫️" label="CO₂ Absorbed" value={result.co2AbsorbedKg} unit="kg" color="#3b82f6" delay={200} />
            <StatCard icon="🌍" label="Area Restored" value={result.areaRestored} unit="ha" color="#f59e0b" delay={300} />
          </div>

          {/* Growth Progress Bar */}
          <div className="bg-white/80 rounded-3xl shadow-xl border border-green-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-black text-green-900">📈 Growth Progress</h3>
                <p className="text-sm text-gray-500">Progress towards 24-month maturity milestone</p>
              </div>
              <span className="text-3xl font-black text-green-800">{result.growthPct}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className="h-4 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${result.growthPct}%`,
                  background: 'linear-gradient(90deg, #16a34a, #4ade80, #bbf7d0)'
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1.5 font-semibold">
              <span>Month 0</span>
              <span>Month 12</span>
              <span>Month 24</span>
            </div>
          </div>

          {/* CO₂ Growth Chart */}
          {result.monthlyData && result.monthlyData.length > 0 && (
            <div className="bg-white/80 rounded-3xl shadow-xl border border-green-100 p-6">
              <h3 className="text-lg font-black text-green-900 mb-1">CO₂ Absorption Over Time</h3>
              <p className="text-sm text-gray-500 mb-6">Monthly cumulative CO₂ absorbed by your reforestation site in {result.region}</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={result.monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} label={{ value: 'Month', position: 'insideBottom', offset: -2, style: { fontSize: 11, fill: '#9ca3af' } }} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="co2Kg" stroke="#16a34a" strokeWidth={2.5} fill="url(#co2Gradient)" />
                  <Line type="monotone" dataKey="growthPct" stroke="#3b82f6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-4 justify-center text-xs font-semibold text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-green-700 rounded" /> CO₂ Absorbed (kg)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 rounded border-dashed" /> Growth % (dashed)</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImpactCalculator;
