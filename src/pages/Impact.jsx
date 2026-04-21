import React from "react";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const growthData = [
  { month: "Jan", trees: 2000 },
  { month: "Feb", trees: 4000 },
  { month: "Mar", trees: 6500 },
  { month: "Apr", trees: 9000 },
  { month: "May", trees: 12000 },
];

const regionImpact = [
  { name: "India", value: 5000 },
  { name: "Amazon", value: 4000 },
  { name: "Africa", value: 3000 },
];

function Impact() {
  return (
    <div className="min-h-screen bg-[#f4f7f5]">

      <Navbar />

      <div className="p-6 md:p-10">

        {/* ===== HEADER ===== */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-green-900">
            🌍 Environmental Impact
          </h1>
          <p className="text-gray-600 mt-2">
            Real-world impact of EcoGuard’s reforestation efforts
          </p>
        </div>

        {/* ===== MAIN IMPACT CARDS ===== */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
            <h3 className="text-gray-500">🌳 Trees Planted</h3>
            <p className="text-3xl font-bold text-green-700">12,000+</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
            <h3 className="text-gray-500">🌫 CO₂ Reduced</h3>
            <p className="text-3xl font-bold text-blue-600">850 tons</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
            <h3 className="text-gray-500">📉 Forest Recovery</h3>
            <p className="text-3xl font-bold text-green-800">+18%</p>
          </div>

        </div>

        {/* ===== GROWTH CHART ===== */}
        <div className="bg-white p-6 rounded-2xl shadow mb-10">
          <h3 className="font-bold mb-4 text-lg">
            📈 Tree Plantation Growth
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="trees"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ===== REGION IMPACT ===== */}
        <div className="bg-white p-6 rounded-2xl shadow mb-10">
          <h3 className="font-bold mb-4 text-lg">
            🌍 Region-wise Impact
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionImpact}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ===== AI INSIGHT ===== */}
        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-2 text-green-900">
            🤖 AI Insight
          </h3>
          <p className="text-gray-700">
            Reforestation efforts in Central India are showing the highest
            recovery rate. Expanding similar plantation models in Africa
            could improve global forest recovery by +10%.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Impact;