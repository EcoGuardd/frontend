import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Planner() {
  const [region, setRegion] = useState("India");
  const [area, setArea] = useState("");
  const [soil, setSoil] = useState("Loamy");
  const [result, setResult] = useState(null);

  const handlePlan = () => {
    if (!area) return;

    // dummy AI logic (replace later with ML/API)
    let treesPerHectare = 1000;
    let trees = area * treesPerHectare;

    let recommendation = "";

    if (region === "India") {
      recommendation = "Neem, Bamboo, Peepal";
    } else if (region === "Amazon") {
      recommendation = "Mahogany, Rubber Tree";
    } else {
      recommendation = "Acacia, Baobab";
    }

    setResult({
      trees,
      co2: trees * 0.02, // dummy CO2 absorption
      plants: recommendation,
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f7f5]">

      {/* NAVBAR */}
      <Navbar />

      <div className="p-6 md:p-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900">
            🌱 Reforestation Planner
          </h1>
          <p className="text-gray-600 mt-2">
            Plan smart tree plantation using AI-based recommendations
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8 grid md:grid-cols-3 gap-6">

          {/* REGION */}
          <div>
            <label className="block mb-2 font-semibold">Region</label>
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

          {/* AREA */}
          <div>
            <label className="block mb-2 font-semibold">
              Area (hectares)
            </label>
            <input
              type="number"
              placeholder="Enter area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-2 rounded-lg border"
            />
          </div>

          {/* SOIL */}
          <div>
            <label className="block mb-2 font-semibold">Soil Type</label>
            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              className="w-full p-2 rounded-lg border"
            >
              <option>Loamy</option>
              <option>Sandy</option>
              <option>Clay</option>
            </select>
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={handlePlan}
          className="bg-green-800 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition mb-10"
        >
          Generate Plan
        </button>

        {/* RESULT */}
        {result && (
          <div className="grid md:grid-cols-3 gap-6">

            {/* TREES */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">Trees Needed</h3>
              <p className="text-2xl font-bold text-green-700">
                {result.trees.toLocaleString()}
              </p>
            </div>

            {/* CO2 */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">CO₂ Impact (tons)</h3>
              <p className="text-2xl font-bold text-green-700">
                {result.co2.toFixed(2)}
              </p>
            </div>

            {/* RECOMMENDATION */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">Recommended Plants</h3>
              <p className="text-lg font-semibold">
                {result.plants}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Planner;