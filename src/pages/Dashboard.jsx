import React from "react";
import Navbar from "../components/Navbar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Jan", loss: 30 },
  { name: "Feb", loss: 45 },
  { name: "Mar", loss: 60 },
  { name: "Apr", loss: 50 },
  { name: "May", loss: 80 },
];

const pieData = [
  { name: "High", value: 40 },
  { name: "Medium", value: 35 },
  { name: "Low", value: 25 },
];

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f4f7f5]">

      <Navbar />

      <div className="p-6 md:p-10">

        {/* ===== OVERVIEW ===== */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Region</h3>
            <p className="text-xl font-bold">India 🇮🇳</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Risk Level</h3>
            <p className="text-xl font-bold text-red-500">HIGH</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Deforestation</h3>
            <p className="text-xl font-bold text-green-600">+18%</p>
          </div>

        </div>

        {/* ===== CHARTS ===== */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">

          {/* LINE CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="mb-4 font-bold">Deforestation Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="loss" stroke="#16a34a" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="mb-4 font-bold">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={80}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* ===== ALERTS ===== */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h3 className="font-bold mb-4">🚨 Live Alerts</h3>

          <div className="space-y-2 text-sm">
            <p>🚨 Illegal logging detected - Madhya Pradesh</p>
            <p>⚠️ Forest density dropped - Amazon</p>
            <p>🌱 Reforestation suggested - Assam</p>
          </div>
        </div>

        {/* ===== AI SUGGESTION ===== */}
        <div className="bg-green-100 p-6 rounded-xl shadow mb-10">
          <h3 className="font-bold mb-2">🌱 AI Recommendation</h3>
          <p>
            Plant Neem & Bamboo in high-risk zones of Central India.
            Expected recovery: +12% in 6 months.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;