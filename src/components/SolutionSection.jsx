import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function SolutionSection() {

  const cards = [
    {
      title: "AI-Powered Detection",
      desc: "AI analyzes satellite images to detect forest loss instantly.",
      points: [
        "Detect illegal logging",
        "Real-time alerts",
        "ML-based monitoring"
      ],
      icon: "🛰️",
      color: "from-[#d4c4b5] to-[#bfae9f]",
    },
    {
      title: "GIS Forest Monitoring",
      desc: "Track forest changes with interactive maps & geospatial data.",
      points: [
        "Live forest tracking",
        "Region-wise insights",
        "Satellite data analysis"
      ],
      icon: "🌍",
      color: "from-[#b8c6d6] to-[#aab7c4]",
    },
    {
      title: "Smart Reforestation",
      desc: "Plan and monitor reforestation using data-driven insights.",
      points: [
        "Best planting zones",
        "Growth tracking",
        "Impact measurement"
      ],
      icon: "🌱",
      color: "from-[#cfe3c0] to-[#b9d6a8]",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      const wrapper = document.querySelector(".scroll-wrapper");
      const totalWidth = wrapper.scrollWidth;

      // HORIZONTAL SCROLL
      gsap.to(".scroll-wrapper", {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-section",
          start: "top top",
          end: () => `+=${totalWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
        },
      });

  

      //  TEXT ANIMATION
      gsap.from(".scroll-text", {
        x: 400,
        opacity: 0,
        scrollTrigger: {
          trigger: ".scroll-text",
          start: "left center",
          end: "left center",
          scrub: 1,
        },
      });

          gsap.to(".eco-sticker", {
  y: -10,
  repeat: -1,
  yoyo: true,
  duration: 2,
  ease: "power1.inOut",
});

gsap.to(".rotating-icon", {
  rotation: 360,
  repeat: -1,
  duration: 2,
  ease: "linear",
});

      //  MINI BOXES
      gsap.from(".mini-box", {
        x: 200,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".mini-box",
          start: "left center",
        },
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-section overflow-hidden bg-[#f6f6f4] py-20 min-h-screen">

      {/* ===== HEADING ===== */}
      <div className="text-center mb-20 px-6">
        <h2 className="text-3xl md:text-5xl font-bold">
          How <span className="text-green-900">EcoGuard Works</span>
        </h2>
        <p className="text-gray-600 mt-3">
          From detecting illegal activities to restoring forests — how EcoGuard works step by step.
        </p>
      </div>

      {/* ===== HORIZONTAL FLOW ===== */}
      <div className="scroll-wrapper flex items-center gap-32 px-20">

        {/* ===== CARDS ===== */}
        <div className="flex gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`w-[300px] min-h-[360px] rounded-3xl p-6 text-center
              bg-gradient-to-br ${card.color}
              shadow-xl flex flex-col`}
            >
              {/* ICON */}
              <div className="text-5xl mb-4">{card.icon}</div>

              {/* TITLE */}
              <h3 className="text-lg font-bold mb-2">
                {card.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-700 mb-4">
                {card.desc}
              </p>

              {/* POINTS */}
              <ul className="text-xs text-gray-800 space-y-1 text-left mx-auto">
                {card.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== TEXT ===== */}
        <div className="flex flex-col items-start gap-6">

 
<div className="scroll-text flex items-center gap-6 text-[60px] font-bold text-gray-800 whitespace-nowrap">
<span className="relative inline-flex flex-col items-center">

 <img
  src="https://cdn-icons-png.flaticon.com/256/14321/14321252.png"
  alt="eco top sticker"
  className="top-sticker absolute left-1/4 -translate-x-1/2 bottom-full mb-2 w-40 h-40 object-contain"
/>

  {/*  ARROW */}
  <img
    src="https://cdn-icons-png.flaticon.com/128/2268/2268536.png"
    alt="arrow"
    className="top-arrow absolute left-3 -translate-x-1/2 bottom-full mb-2 w-12 h-12 rotate-90 opacity-80"
  />

  {/* TEXT */}
  Protect Forests 🌳

</span>
  <span className="relative inline-block">

  Detect Illegal Logging 🚨

  {/*  IMAGE  */}
  <img
    src="https://img.freepik.com/premium-vector/tree-felled-forest-with-ax-its-stump_353206-552.jpg"
    alt="deforestation"
    className="illegal-img absolute left-1/3 -translate-x-1/2 top-full mt-6 w-[90vw] h-40 object-cover rounded-xl shadow-lg"
  />

</span>

  

  {/*  KEEP TEXT INLINE */}
 <span className="relative inline-block">

  Restore Nature 🌱

  {/*  ARROW */}
  <img
    src="https://cdn-icons-png.flaticon.com/128/2268/2268536.png"
    alt="arrow"
    className="arrow absolute left-1/2 -translate-x-1/2 top-full mt-2 w-10 h-10 rotate-90 opacity-80"
  />

  {/*  STICKER */}
  <img
    src="https://cdn-icons-png.flaticon.com/256/14321/14321246.png"
    alt="eco sticker"
    className="eco-sticker absolute left-1/2 -translate-x-4 top-full mt-16 w-50 h-50 object-contain"
  />

</span>

</div>
</div>

       <div className="flex flex-col items-center ml-20">

  {/*  ROTATING ICON */}
  <img
  src="https://cdn-icons-png.flaticon.com/128/7235/7235428.png"
  alt="eco rotate"
  className="rotating-icon w-16 h-16 mb-1 -translate-x-[280px]"
/>

  {/* MINI BOXES */}
  <div className="flex gap-6">
    <div className="mini-box bg-white px-4 py-2 rounded-full shadow">
      🛰️ AI Detection
    </div>
    <div className="mini-box bg-white px-4 py-2 rounded-full shadow">
      🌍 GIS Mapping
    </div>
    <div className="mini-box bg-white px-4 py-2 rounded-full shadow">
      🌱 Reforestation
    </div>
  </div>

</div>

      </div>
    </div>
  );
}

export default SolutionSection;