"use client";

import { Award, Briefcase, BookOpen, Shield, Users, Target, ArrowRight, Sparkles, Star, ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import HeaderPage from "../header/page";
import FooterPage from "../footer/page";

const TIMELINE = [
  {
    year: "2020",
    title: "The Genesis",
    description: "Started with a highly passionate group of security research enthusiasts driven to make digital workspaces resilient against evolving threat vectors.",
    icon: Users,
    color: "from-blue-500 to-indigo-500",
  },
  {
    year: "2021",
    title: "First Breakthrough",
    description: "Successfully secured our first enterprise-grade digital auditing and defense project, establishing rigorous baseline testing frameworks.",
    icon: Briefcase,
    color: "from-[#00E5FF] to-blue-500",
  },
  {
    year: "2023",
    title: "Presidential Gold Medal",
    description: "Awarded the prestigious Gold Medal for outstanding contribution to Cybersecurity services and student alignment programs at Parul University.",
    icon: Award,
    color: "from-[#8B5CF6] to-[#00E5FF]",
    badge: "Milestone Achievement"
  },
  {
    year: "2024",
    title: "Cyfo Anti Hack App",
    description: "Released the custom-built Cyfo Anti Hack App suite to the public, gathering exceptional feedback for simplifying complex threat prevention.",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
    badge: "Product Launch"
  },
  {
    year: "2025",
    title: "Cyfo Edu Platform",
    description: "Launched the modern Cyfo Edu portal to provide specialized, structured, practical hands-on curriculum in web application testing and digital defense.",
    icon: BookOpen,
    color: "from-[#2563EB] to-purple-600",
  },
  {
    year: "2026",
    title: "ST7 Tech Connect",
    description: "Our landmark initiative (You are here!) hosting live interactive workshops, physical labs, and authorized weekend cyber security seminars.",
    icon: Sparkles,
    color: "from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]",
    badge: "Active Ecosystem",
    isCurrent: true
  },
];

export default function OurStoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-[#E2E8F0] overflow-x-hidden">
      {/* Header */}
      <HeaderPage />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.04]">
          {/* Ambient light spots */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[30rem] rounded-full bg-gradient-to-tr from-[#00E5FF]/5 to-[#8B5CF6]/5 blur-[130px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-[#00E5FF]/20" />
              Our Corporate Heritage
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-white leading-tight">
              Securing Tomorrow, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]">
                One Mind at a Time
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
              ST7 Tech Connect is proudly powered by <span className="text-white font-bold">ST7 Group</span>, a pioneering tech conglomerate with a massive footprint in cybersecurity solutions, deep software engineering, and community-empowering digital products.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-[#CBD5E1]">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Founded in 2020
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                Powered by ST7 Group
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                100% Trust & Practical Focus
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                71st Global Ranked Company Among 800+ Competitors
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Trust Badge */}
        <section className="py-12 bg-[#0A0D1E]/40 border-b border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#00E5FF]">Corporate Stewardship</h2>
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0F172A]/90 to-[#0A0D1E]/95 border border-white/[0.06] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#00E5FF] p-0.5 shrink-0">
                  <div className="w-full h-full bg-[#050816] rounded-[14px] flex items-center justify-center text-[#00E5FF] font-bold text-2xl tracking-tighter">
                    ST7
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">About ST7 Group</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    ST7 Group stands at the forefront of digital defense, product design, and next-generation educational technologies. By driving engineering excellence and ethical hacking mentorship, ST7 group protects enterprise infrastructures while preparing the next wave of defense technicians.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Timeline Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
          
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-bold text-white">The Journey So Far</h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
              Follow our evolution from a compact, dedicated group of ethical hacker researchers to a national-scale cyber-defense training provider.
            </p>
          </div>

          {/* Vertical Timeline Track Line */}
          <div className="absolute left-4 sm:left-1/2 top-[180px] bottom-[100px] w-0.5 bg-gradient-to-b from-[#00E5FF]/20 via-[#2563EB]/20 to-[#8B5CF6]/5 -translate-x-[1px]" />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16 relative">
            {TIMELINE.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`flex flex-col sm:flex-row items-stretch ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } relative`}
                >
                  {/* Outer Timeline Dot Marker */}
                  <div className="absolute left-0 sm:left-1/2 w-10 h-10 -translate-x-[19px] sm:-translate-x-5 flex items-center justify-center z-10">
                    <div className={`w-9 h-9 rounded-full bg-[#050816] border-2 flex items-center justify-center ${
                      item.isCurrent ? "border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] animate-pulse" : "border-white/10"
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        item.isCurrent ? "text-[#00E5FF]" : "text-[#94A3B8]"
                      }`} />
                    </div>
                  </div>

                  {/* Left Side (Content Card) */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-10 flex">
                    <div className={`w-full p-6 rounded-2xl bg-[#0F172A]/70 hover:bg-[#0F172A]/90 border transition-all duration-300 group ${
                      item.isCurrent 
                        ? "border-[#00E5FF]/40 hover:border-[#00E5FF]/70 shadow-[0_0_25px_rgba(0,229,255,0.1)]" 
                        : "border-white/[0.05] hover:border-white/[0.12]"
                    }`}>
                      
                      {/* Year badge & Custom label */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-md text-sm font-bold bg-gradient-to-r ${item.color} text-white`}>
                          {item.year}
                        </span>
                        {item.badge && (
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                            item.isCurrent 
                              ? "bg-[#00E5FF]/10 text-[#00E5FF]" 
                              : "bg-white/[0.04] text-[#94A3B8]"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors duration-200">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-[#94A3B8] leading-relaxed mt-2.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Side (Empty spacing block on desktop to balance out layout) */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing trust metrics or actions */}
        <section className="max-w-4xl mx-auto px-4 pb-24 text-center space-y-8">
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-b from-[#0F172A]/80 to-[#0A0D1E]/95 border border-white/[0.08] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-2xl font-bold text-white mb-3">Learn with full confidence.</h2>
            <p className="text-[#94A3B8] text-sm md:text-base max-w-xl mx-auto mb-8">
              We started small, built robust defense products, and got authorized credentials. Let our industry security leaders guide your dynamic path.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Action */}
              <a
                // href="https://wa.me/918341330784"
                // target="_blank"
                // rel="noopener noreferrer"
                href="/workshop"
                className="w-full sm:w-auto relative group p-[1px] rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6] text-white font-bold text-base tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <div className="px-8 py-3.5 bg-zinc-950/90 rounded-[11px] group-hover:bg-transparent transition-all duration-300 flex items-center justify-center gap-2">
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    Register Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>

              {/* Secondary Action */}
              <a
                href="https://wa.me/918341330784"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative group p-[1px] rounded-xl bg-white/[0.08] hover:bg-gradient-to-r hover:from-[#00E5FF]/50 hover:to-[#2563EB]/50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <div className="px-8 py-3.5 bg-[#050816]/95 hover:bg-[#050816]/60 rounded-[11px] flex items-center justify-center gap-2 text-white font-semibold text-base transition-all duration-300">
                  <MessageSquare className="w-5 h-5 text-[#22C55E] fill-[#22C55E]/10 group-hover:scale-110 transition-transform duration-300" />
                  <span>Enquiry</span>
                </div>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
