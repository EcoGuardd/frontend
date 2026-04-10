import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Impact from "./pages/Impact";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/impact" element={<Impact />} />
      </Routes>
    </>
  )
}

export default App
