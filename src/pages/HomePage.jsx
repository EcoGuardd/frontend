import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import SolutionSection from "../components/SolutionSection";
import KeyFeatures from "../components/KeyFeatures";
import StatsSection from "../components/StatsSection";
import ForestModel from "../components/ForestModel";
import Footer from "../components/Footer";


function HomePage() {
  return (
    <>
    {/* Home Section  */}
      <div className="relative w-full h-screen bg-gradient-to-br from-[#cfcfcf] via-[#bdbdbd] to-[#a8a8a8] text-white overflow-hidden">

 

        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>





        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-between h-full px-10 md:px-20">

          {/* LEFT TEXT */}
          <div className="w-full md:w-1/2 z-10">
            <h1 className="text-4xl text-green-900 md:text-6xl font-bold leading-tight mb-6">
              Protect Forests with AI & Satellite Intelligence
            </h1>

            <p className="text-green-700 mb-8 text-lg">
              EcoGuard monitors deforestation using satellite intelligence
              and helps plan smart reforestation to restore our planet.
            </p>

            <div className="flex gap-4">
              <Link to="/map">
                <button className="bg-yellow-400 px-6 py-3 rounded-lg text-green-900 hover:bg-yellow-500 transition">
                  Explore Map
                </button>
              </Link>

              <Link to="/dashboard">
                <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT 3D MODEL */}
          <div className="w-full md:w-1/2 h-full flex items-center justify-center pointer-events-none md:pointer-events-auto">
            <ForestModel />
          </div>

        </div>
      </div>

      <SolutionSection />
      <KeyFeatures />
      <StatsSection />
      <Footer />
    </>
  );
}

export default HomePage;