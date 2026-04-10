import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-black  font-semibold "
      : "hover:text-black ";

  return (
    <nav className="bg-green-700 text-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold">EcoGuard</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">

          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/map" className={linkStyle}>
            Map
          </NavLink>

          <NavLink to="/dashboard" className={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/planner" className={linkStyle}>
            Reforestation Planner
          </NavLink>

          <NavLink to="/impact" className={linkStyle}>
            Impact
          </NavLink>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 space-y-3 text-lg">

          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/map" className={linkStyle}>
            Map
          </NavLink>

          <NavLink to="/dashboard" className={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/planner" className={linkStyle}>
            Reforestation Planner
          </NavLink>

          <NavLink to="/impact" className={linkStyle}>
            Impact
          </NavLink>

        </div>
      )}

    </nav>
  );
}

export default Navbar;