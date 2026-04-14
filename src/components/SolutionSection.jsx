import React from "react";

function SolutionSection() {
  const cards = [
    {
      title: "AI-Powered Detection",
      desc: "Detect illegal logging and deforestation using satellite imagery and real-time neural networks.",
      icon: "🛰️", 
      themeColor: "from-[#A78D78]/50 to- [#E1D4C2]/30",
      borderColor: "border- [#E1D4C2]/50",
      iconBg: "bg-emerald-50",
      textColor: "text-[#A78D78]"
    },
    {
      title: "GIS Forest Monitoring",
      desc: "Monitor forest health with an interactive satellite map and high-resolution spectral analysis.",
      icon: "🌍",
      themeColor: "from-blue-100/50 to-cyan-50/30",
      borderColor: "border-blue-200/50",
      iconBg: "bg-blue-50",
      textColor: "text-blue-900"
    },
    {
      title: "Smart Reforestation",
      desc: "Plan and track reforestation efforts to restore ecosystems with data-driven planting strategies.",
      icon: "🌱",
      themeColor: "from-lime-100/50 to-green-50/30",
      borderColor: "border-lime-200/50",
      iconBg: "bg-lime-50",
      textColor: "text-green-900"
    },
  ];

  return (
    <div className="bg-[#fcfdfd] py-24 px-6 md:px-20">
      
      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          EcoGuard: <span className="text-green-900">Our Solution</span>
        </h2>
        <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full" />
        <p className="text-gray-500 mt-6 max-w-xl mx-auto text-lg">
          Using AI and satellite data to protect forests in real time.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center text-center group bg-gradient-to-br ${card.themeColor} border ${card.borderColor} rounded-[3rem] p-10 pt-12 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden`}
          >
            {/* Glassmorphic Backdrop Blur */}
            <div className="absolute inset-0 backdrop-blur-[4px] -z-10" />

            {/* Icon */}
            <div className={`w-24 h-24 ${card.iconBg} rounded-[2rem] flex items-center justify-center text-5xl shadow-inner mb-8 border border-white/60 group-hover:rotate-12 transition-transform duration-500`}>
              {card.icon}
            </div>

            {/* Content */}
            <h3 className={`text-2xl font-extrabold mb-4 ${card.textColor}`}>
              {card.title}
            </h3>

            <p className="text-gray-600 font-medium leading-relaxed mb-8">
              {card.desc}
            </p>

            {/* Subtle glow effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionSection;