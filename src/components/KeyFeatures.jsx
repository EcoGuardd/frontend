import React from "react";
import { FaBrain, FaMapMarkedAlt, FaSeedling, FaArrowRight } from "react-icons/fa";

function KeyFeatures() {
  return (
    <div className="bg-[#7d8c79] py-20 px-6 md:px-20 text-white">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          Key Features
        </h2>
        <p className="text-gray-300 mt-3">
          Explore EcoGuard's Capabilities
        </p>
      </div>

      {/* Flow Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">

        {/* Card 1 */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 w-72 text-center shadow-lg hover:scale-105 transition duration-300">

          <FaBrain className="text-4xl text-green-400 mx-auto mb-4" />

          <h3 className="font-semibold text-lg mb-2">
            AI-Powered Detection
          </h3>

          <p className="text-sm text-gray-300">
            Detect illegal logging and deforestation in near real-time.
          </p>
        </div>

        {/* Animated Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <FaArrowRight className="text-3xl text-green-400 animate-pulse" />
        </div>

        {/* Card 2 */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 w-72 text-center shadow-lg hover:scale-105 transition duration-300">

          <FaMapMarkedAlt className="text-4xl text-green-400 mx-auto mb-4" />

          <h3 className="font-semibold text-lg mb-2">
            GIS Monitoring
          </h3>

          <p className="text-sm text-gray-300">
            Visualize forest changes with interactive satellite maps.
          </p>
        </div>

        {/* Animated Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <FaArrowRight className="text-3xl text-green-400 animate-pulse" />
        </div>

        {/* Card 3 */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 w-72 text-center shadow-lg hover:scale-105 transition duration-300">

          <FaSeedling className="text-4xl text-green-400 mx-auto mb-4" />

          <h3 className="font-semibold text-lg mb-2">
            Smart Reforestation
          </h3>

          <p className="text-sm text-gray-300">
            Generate AI-based plans to restore ecosystems efficiently.
          </p>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-14">

        <button className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600 transition">
          Explore Map
        </button>

        <button className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition">
          View Dashboard
        </button>

        <button className="bg-green-700 px-6 py-3 rounded-lg hover:bg-green-800 transition">
          Plan Reforestation
        </button>

      </div>

    </div>
  );
}

export default KeyFeatures;