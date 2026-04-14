import React from "react";
import { FaTree, FaMapMarkedAlt, FaChartLine } from "react-icons/fa";

function StatsSection() {
  return (
    <div className="bg-white py-20 px-6 md:px-20 text-black">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          See Ecoguard in Action !
        </h2>
        <p className="text-black mt-3">
          Real-time impact of EcoGuard in protecting forests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">

        {/* Card 1 */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 w-72 text-center shadow-lg hover:-translate-y-2 hover:shadow-green-500/30 transition-all duration-300">

          <FaTree className="text-4xl text-green-400 mx-auto mb-4" />

          <h3 className="text-3xl font-bold">
            12,450+
          </h3>

          <p className="text-gray-300 mt-2">
            Trees Saved
          </p>
        </div>

        {/* Card 2 */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 w-72 text-center shadow-lg hover:-translate-y-2 hover:shadow-green-500/30 transition-all duration-300">

          <FaMapMarkedAlt className="text-4xl text-green-400 mx-auto mb-4" />

          <h3 className="text-3xl font-bold">
            725+
          </h3>

          <p className="text-gray-300 mt-2">
            Hectares Restored
          </p>
        </div>

        {/* Card 3 */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 w-72 text-center shadow-lg hover:-translate-y-2 hover:shadow-green-500/30 transition-all duration-300">

          <FaChartLine className="text-4xl text-green-400 mx-auto mb-4" />

          <h3 className="text-3xl font-bold">
            19%
          </h3>

          <p className="text-gray-300 mt-2">
            Deforestation Reduced
          </p>
        </div>

      </div>

    </div>
  );
}

export default StatsSection;