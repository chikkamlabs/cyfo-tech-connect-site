"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";

export default function HeroPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { image: "/hero1.png", alt: "Cyber Security Threat Intelligence Hub" },
    { image: "/hero2.png", alt: "Ethical Hacking hands-on laboratory" },
    { image: "/hero3.png", alt: "Digital Defense and Operations Operations Centre" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500); // Transitions every 5.5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      {/* Base Background color */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Sliding Background Images Panel */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute inset-0 flex transition-transform duration-[1200ms] ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="relative min-w-full h-full shrink-0 select-none">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover opacity-25"
                referrerPolicy="no-referrer"
              />
              {/* Radial mask overlay for focus concentration & contrast */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050816]/75 to-[#050816]" />
            </div>
          ))}
        </div>
      </div>

      {/* Linear overlays to blend the edges cleanly into Header and Main layouts */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-transparent to-[#050816] pointer-events-none z-1" />

      {/* Cyber Grid Pattern Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-1 pointer-events-none" />
      
      {/* Cyber Glow Spots */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-[#00E5FF]/10 to-[#2563EB]/5 blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-[#8B5CF6]/10 to-[#00E5FF]/5 blur-[120px] pointer-events-none z-1" />
      
      {/* Tech line accents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-[1px] bg-gradient-to-r from-[#00E5FF]/30 to-transparent hidden xl:block z-1" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-[1px] bg-gradient-to-l from-[#8B5CF6]/30 to-transparent hidden xl:block z-1" />

      {/* Content Container */}
      <div className="relative max-w-5xl mx-auto text-center space-y-6 md:space-y-8 z-10">
        
        {/* Cyber Security Badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-[#00E5FF] animate-pulse" />
          <span>CYBER DEFENSE INTELLIGENCE LABS</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Master <span className="bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">Cybersecurity Skills</span> <br className="hidden sm:inline" />
          for the Real World
        </h1>

        {/* Sub Heading */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#CBD5E1] font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(5,8,22,0.8)]">
          ST7 Tech Connect conducts highly practical offline workshops, immersive cybersecurity workshops for students, professionals, and tech enthusiasts. Gain hands-on exposure under direct mentoring from industry certified defense specialists.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Primary Premium Action Link */}
          <Link
            href="/workshop"
            className="w-full sm:w-auto relative group p-[1px] rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6] text-white font-bold text-base tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer inline-block"
          >
            <div className="px-8 py-3.5 bg-zinc-950/90 rounded-[11px] group-hover:bg-transparent transition-all duration-300 flex items-center justify-center gap-2">
              <span className="relative z-10 flex items-center gap-2 text-white font-bold">
                Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Secondary Premium Action Link to Gallery */}
          <Link
            href="/gallery"
            className="w-full sm:w-auto relative group p-[1px] rounded-xl bg-white/[0.08] hover:bg-gradient-to-r hover:from-[#00E5FF]/50 hover:to-[#2563EB]/50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer inline-block text-center"
          >
            <div className="px-8 py-3.5 bg-[#050816]/95 hover:bg-[#050816]/60 rounded-[11px] flex items-center justify-center gap-2 text-[#FFFFFF] font-semibold text-base transition-all duration-300">
              <ImageIcon className="w-5 h-5 text-[#00E5FF] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <span>View Gallery</span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
