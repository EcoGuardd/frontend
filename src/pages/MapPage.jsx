import React, { useState } from "react";
import Navbar from "../components/Navbar"; // reuse your navbar
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapPage() {

  const [region, setRegion] = useState("India");
  const [risk, setRisk] = useState("All");

  // dummy data (we can later connect backend)
  const zones = [
    { lat: 23.5, lng: 80, type: "high" },   // red
    { lat: 19, lng: 75, type: "low" },      // green
    { lat: 21, lng: 78, type: "medium" },   // yellow
  ];

  const getColor = (type) => {
    if (type === "high") return "red";
    if (type === "medium") return "orange";
    return "green";
  };

  return (
    <div className="h-screen flex flex-col">

      {/* ===== NAVBAR ===== */}
      <Navbar />

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex flex-1">

        {/* ===== SIDEBAR ===== */}
        <div className="w-[280px] bg-[#eef2f1] p-6 shadow-lg">

          <h2 className="text-xl font-bold mb-6 text-green-900">
            Map Controls
          </h2>

          {/* REGION SELECT */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Select Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-2 rounded-lg border"
            >
              <option>India</option>
              <option>Amazon</option>
              <option>Africa</option>
            </select>
          </div>

          {/* RISK FILTER */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Risk Level
            </label>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="w-full p-2 rounded-lg border"
            >
              <option>All</option>
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>

          {/* BUTTON */}
          <button className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Suggest Reforestation
          </button>

        </div>

        {/* ===== MAP AREA ===== */}
        <div className="flex-1">

          <MapContainer
            center={[20, 78]}
            zoom={5}
            className="h-full w-full"
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* ZONES */}
            {zones
              .filter((z) => risk === "All" || z.type === risk)
              .map((zone, i) => (
                <Circle
                  key={i}
                  center={[zone.lat, zone.lng]}
                  radius={50000}
                  pathOptions={{
                    color: getColor(zone.type),
                    fillColor: getColor(zone.type),
                    fillOpacity: 0.5,
                  }}
                />
              ))}

          </MapContainer>

        </div>

      </div>
    </div>
  );
}

export default MapPage;
