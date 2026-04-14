import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop")',
          filter: 'brightness(0.3)' 
        }}
      />

      {/* Glassmorphic Overlay */}
      <div className="relative z-10 w-full px-6 py-10 bg-black/50 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Main Footer Row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            
            {/* Logo Section */}
                <div
            className="flex items-center gap-2 px-4 py-2 rounded-full mr-4 shrink-0"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(180,220,180,0.6)",
            }}
          >
            <span className="font-bold text-base tracking-wide" style={{ color: "#1a5c28" }}>
              <span className="font-black">ECO</span>
              <span className="font-light">GUARD</span>
            </span>
          </div>
          
            {/* Navigation & Contact Row */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <nav className="flex gap-8">
                {['Home', 'About', 'Features'].map((item) => (
                  <Link
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </nav>

              <Link
                to="/contact"
                className="px-7 py-2.5 bg-green-800/60 hover:bg-green-700 text-white text-[10px] font-black uppercase tracking-widest rounded-md border border-green-500/30 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="w-full pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-[10px] font-medium tracking-widest uppercase">
              © {new Date().getFullYear()} EcoGuard. All rights reserved.
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;