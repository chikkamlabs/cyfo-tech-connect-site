"use client";

import Link from "next/link";
import { ArrowRight, Award, Shield, Users, Sparkles } from "lucide-react";

export default function OurStorySection() {
  const milestones = [
    {
      year: "2020",
      title: "Started",
      desc: "Founded with a small group of cyber defense enthusiasts.",
      icon: Users,
    },
    {
      year: "2023",
      title: "Gold Medal",
      desc: "Cyber security honors.",
      icon: Award,
    },
    {
      year: "2024",
      title: "Cyfo Anti Hack App",
      desc: "High-impact public security release.",
      icon: Shield,
    },
    {
      year: "2026",
      title: "ST7 Tech Connect",
      desc: "Immersive live workshops & events.",
      icon: Sparkles,
    },
  ];

  return (
    <section id="our-story" className="relative py-20 bg-[#050816] overflow-hidden border-t border-white/[0.04]">
      {/* Background cyber accent glow */}
      <div className="absolute top-1/2 right-0 w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-[#8B5CF6]/5 to-[#00E5FF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
              Our Journey
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-white leading-tight">
              An Authentic Legacy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]">
                Powered by ST7 Group
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              ST7 Tech Connect is backed by the exceptional resources and industry prowess of <strong className="text-[#E2E8F0]">ST7 Group</strong>. From a compact team in 2020, we have secured critical platforms, developed security suites, and won academic acclaim across India.
            </p>

            <div className="pt-2">
              <Link
                href="/ourstory"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#00E5FF]/40 text-[#FFFFFF] font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Read Full Story & Timeline</span>
                <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
              </Link>
            </div>
          </div>

          {/* Right Cards/Timeline Column */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {milestones.map((milestone, idx) => {
                const IconComponent = milestone.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A]/70 to-[#0A0D1E]/90 border border-white/[0.05] hover:border-[#00E5FF]/30 transition-all duration-300 group/item hover:shadow-[0_0_20px_rgba(0,229,255,0.08)]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#2563EB]">
                        {milestone.year}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#94A3B8] group-hover/item:text-[#00E5FF] group-hover/item:bg-[#00E5FF]/10 group-hover/item:border-[#00E5FF]/30 transition-all duration-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{milestone.title}</h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{milestone.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
