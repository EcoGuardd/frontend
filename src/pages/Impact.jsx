import React from 'react';
import Navbar from '../components/Navbar';
import ImpactCalculator from '../components/ImpactCalculator';

function Impact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 font-sans">
      <Navbar />
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-900 via-emerald-800 to-teal-900 text-white">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #22d3ee 0%, transparent 50%)`
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live Environmental Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Environmental<br />
            <span className="text-green-400">Impact</span> Dashboard
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Calculate the real carbon offset, tree survival rates, and growth progress 
            of your reforestation projects using live environmental models.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <ImpactCalculator />
      </div>
    </div>
  );
}

export default Impact;
