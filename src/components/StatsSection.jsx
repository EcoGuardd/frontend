import React, { useEffect, useRef } from "react";
import { FaTree, FaMapMarkedAlt, FaChartLine } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function StatsSection() {

  const treeRef = useRef(null);
  const landRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {

    // ===== COUNT-UP ANIMATION =====
    const animateValue = (ref, end, suffix = "") => {
  let obj = { val: 0 };

  gsap.to(obj, {
    val: end,
    duration: 2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: ref.current,
      start: "top 85%",
      toggleActions: "restart none none none",
    },
    onUpdate: () => {
      if (ref.current) {
        ref.current.innerText =
          Math.floor(obj.val).toLocaleString() + suffix;
      }
    },
    onComplete: () => {
      //  FINAL BOUNCE EFFECT
      gsap.fromTo(
        ref.current,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    },
  });
};

    animateValue(treeRef, 12450, "+");
    animateValue(landRef, 725, "+");
    animateValue(percentRef, 19, "%");

  }, []);

  return (
    <div className="relative py-20 px-6 md:px-20 text-white overflow-hidden">

      {/*  BACKGROUND IMAGE */}
      <img
        src="https://www.green.earth/hubfs/080824_Reforestation-projects-around-the-world-success-stories-and-lessons-learnedVisual_Featured.png"
        alt="forest bg"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
      />

      {/*  OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20">

        {/* ===== HEADING (STATIC NOW) ===== */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            See Ecoguard in Action !
          </h2>
          <p className="mt-3 text-gray-200">
            Real-time impact of EcoGuard in protecting forests
          </p>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">

          {/* Card 1 */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 w-72 text-center shadow-lg hover:-translate-y-2 hover:shadow-green-500/30 transition-all duration-300">
            <FaTree className="text-4xl text-green-400 mx-auto mb-4" />
            <h3 ref={treeRef} className="text-3xl font-bold">0</h3>
            <p className="text-gray-300 mt-2">Trees Saved</p>
          </div>

          {/* Card 2 */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 w-72 text-center shadow-lg hover:-translate-y-2 hover:shadow-green-500/30 transition-all duration-300">
            <FaMapMarkedAlt className="text-4xl text-green-400 mx-auto mb-4" />
            <h3 ref={landRef} className="text-3xl font-bold">0</h3>
            <p className="text-gray-300 mt-2">Hectares Restored</p>
          </div>

          {/* Card 3 */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 w-72 text-center shadow-lg hover:-translate-y-2 hover:shadow-green-500/30 transition-all duration-300">
            <FaChartLine className="text-4xl text-green-400 mx-auto mb-4" />
            <h3 ref={percentRef} className="text-3xl font-bold">0</h3>
            <p className="text-gray-300 mt-2">Deforestation Reduced</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StatsSection;