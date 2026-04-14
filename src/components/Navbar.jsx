import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-green-700 font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-green-600"
      : "text-green-900 hover:text-green-600 transition-colors duration-200";

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
        <div
          className="w-full flex items-center rounded-full px-3 py-2 shadow-lg"
          style={{
            background: "rgba(220, 240, 220, 0.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(180, 220, 180, 0.5)",
          }}
        >
          {/* Logo pill */}
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

          {/* Divider wave */}
          <div className="w-[2px] h-8 mx-2 rounded-full" style={{ background: "linear-gradient(to bottom, transparent, #6abf7b, transparent)" }} />

          {/* Nav Links */}
          <div className="flex items-center gap-1 flex-1 justify-center text-sm font-semibold tracking-widest uppercase">
            <NavLink to="/" className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-200 ${isActive ? "bg-white/70 text-green-700 shadow-sm" : "text-green-900 hover:bg-white/40 hover:text-green-700"}`
            }>Home</NavLink>

            <NavLink to="/map" className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-200 ${isActive ? "bg-white/70 text-green-700 shadow-sm" : "text-green-900 hover:bg-white/40 hover:text-green-700"}`
            }>Map</NavLink>

            <NavLink to="/dashboard" className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-200 ${isActive ? "bg-white/70 text-green-700 shadow-sm" : "text-green-900 hover:bg-white/40 hover:text-green-700"}`
            }>Dashboard</NavLink>

            <NavLink to="/planner" className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-200 ${isActive ? "bg-white/70 text-green-700 shadow-sm" : "text-green-900 hover:bg-white/40 hover:text-green-700"}`
            }>Reforestation Planner</NavLink>

            <NavLink to="/impact" className={({ isActive }) =>
              `px-4 py-2 rounded-full transition-all duration-200 ${isActive ? "bg-white/70 text-green-700 shadow-sm" : "text-green-900 hover:bg-white/40 hover:text-green-700"}`
            }>Impact</NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 z-50 w-[92%]">
        <div
          className="w-full flex items-center justify-between px-4 py-3 rounded-full shadow-lg"
          style={{
            background: "rgba(220, 240, 220, 0.6)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(180, 220, 180, 0.5)",
          }}
        >
          <span className="font-bold text-sm tracking-wide" style={{ color: "#1a5c28" }}>
            <span className="font-black">ECO</span><span className="font-light">GUARD</span><span className="text-green-600 font-bold ml-1">AI</span>
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-green-800 text-xl p-1"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div
            className="mt-2 rounded-2xl px-4 py-4 flex flex-col gap-2 text-sm font-semibold tracking-widest uppercase shadow-lg"
            style={{
              background: "rgba(220, 240, 220, 0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(180, 220, 180, 0.5)",
            }}
          >
            {["/", "/map", "/dashboard", "/planner", "/impact"].map((path, i) => {
              const labels = ["Home", "Map", "Dashboard", "Reforestation Planner", "Impact"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition-all duration-200 ${isActive ? "bg-white/70 text-green-700" : "text-green-900 hover:bg-white/40"}`
                  }
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div className="h-20" />
    </>
  );
}

export default Navbar;