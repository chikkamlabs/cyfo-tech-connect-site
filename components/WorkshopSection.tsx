"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  AlertCircle,
  Mail,
  UserCheck
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { mockWorkshop, WorkshopData } from "../lib/workshopMock";

export default function WorkshopSection() {
  const [workshop, setWorkshop] = useState<WorkshopData>(mockWorkshop);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // If supabase is not configured, fall back to mock data immediately without delay
      if (!supabase) {
        setWorkshop(mockWorkshop);
        setLoading(false);
        return;
      }

      try {
        // Fast-resolving Supabase fetch with an 8-second hard timeout
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Supabase request timed out")), 8000)
        );

        const fetchPromise = supabase
          .from("workshops")
          .select("*")
          .eq("status", true)
          .limit(1);

        const { data, error } = (await Promise.race([fetchPromise, timeoutPromise])) as any;

        if (error) {
          console.warn("Error fetching from Supabase workshops:", error.message);
          setWorkshop(mockWorkshop);
        } else if (data && data.length > 0) {
          const row = data[0];
          
          // Helper to parse potential string/JSON fields for topics & speakers
          let topics: string[] = [];
          const rawTopics = row.topics;
          if (Array.isArray(rawTopics)) {
            topics = rawTopics;
          } else if (typeof rawTopics === "string") {
            try {
              const parsed = JSON.parse(rawTopics);
              topics = Array.isArray(parsed) ? parsed : rawTopics.split(",").map(t => t.trim());
            } catch {
              topics = rawTopics.split(",").map(t => t.trim());
            }
          }

          let speakers: string[] = [];
          const rawSpeakers = row.speakers || row.speaker_names || row['Speaker names'] || row.Speakers;
          if (Array.isArray(rawSpeakers)) {
            speakers = rawSpeakers;
          } else if (typeof rawSpeakers === "string") {
            try {
              const parsed = JSON.parse(rawSpeakers);
              speakers = Array.isArray(parsed) ? parsed : rawSpeakers.split(",").map(s => s.trim());
            } catch {
              speakers = rawSpeakers.split(",").map(s => s.trim());
            }
          }

          setWorkshop({
            id: row.workshop_id || row.id || "1",
            title: row.title || "No Title",
            description: row.description || "",
            topics: topics.length > 0 ? topics : [],
            venue: row.venue || "-",
            dateTime: row.date_time || "-",
            slots: row.slots !== undefined ? row.slots : "-",
            speakers: speakers.length > 0 ? speakers : [],
            poster: row.poster_url || "/workshopmock1.png",
            duration: row.duration || "-",
            actualPrice: row.actual_price !== undefined ? row.actual_price : "-",
            offerPrice: row.offer_price !== undefined ? row.offer_price : "-",
            status: row.status === true
          });
        } else {
          // If Supabase is connected but no active workshops found (status=true), 
          // create a custom "all-dashes" state to satisfy the status=false request requirement.
          setWorkshop({
            id: "empty",
            title: "-",
            description: "-",
            topics: ["-"],
            venue: "-",
            dateTime: "-",
            slots: "-",
            speakers: ["-"],
            poster: "/workshopmock1.png",
            duration: "-",
            actualPrice: "-",
            offerPrice: "-",
            status: false
          });
        }
      } catch (err) {
        console.error("Failed to fetch workshop from Supabase (using mock fallback):", err);
        setWorkshop(mockWorkshop);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <section id="workshops" className="relative py-20 bg-[#050816] overflow-hidden border-t border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[250px]">
            <div className="w-10 h-10 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin" />
            <p className="mt-4 text-xs font-mono text-[#00E5FF] tracking-wider uppercase animate-pulse">
              Syncing with ST7 Network...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const isActive = workshop.status;

  const title = isActive ? workshop.title : "-";
  const description = isActive ? workshop.description : "-";
  const topics = isActive ? workshop.topics : ["-"];
  const venue = isActive ? workshop.venue : "-";
  const dateTime = isActive ? workshop.dateTime : "-";
  const slots = isActive ? workshop.slots : "-";
  const speakers = isActive ? workshop.speakers : ["-"];
  const poster = isActive ? workshop.poster : "/workshopmock1.png";
  const duration = isActive ? workshop.duration : "-";
  const actualPrice = isActive ? workshop.actualPrice : "-";
  const offerPrice = isActive ? workshop.offerPrice : "-";

  return (
    <section id="workshops" className="relative py-24 bg-[#050816] overflow-hidden border-t border-b border-white/[0.05]">
      {/* Background Cyber Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#00E5FF]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-[#2563EB]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 uppercase">
            ⚡ Specialized Training
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-sans font-bold tracking-tight text-white">
            Upskill at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#2563EB]">ST7 Workshops</span>
          </h2>
          <p className="mt-4 text-base text-[#94A3B8]">
            Accelerate your career with industry-proven, high-impact technology bootcamps designed by domain experts.
          </p>
        </div>

        {/* Workshop Card */}
        <div className="bg-gradient-to-b from-[#0B1528]/80 to-[#050816]/95 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Poster / Image Column */}
            <div className="lg:col-span-5 bg-slate-950 flex flex-col justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08]">
              <div className="relative w-full aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent z-10" />
                <img 
                  src={poster} 
                  alt={isActive ? `${title} Poster` : "No Workshop Available"} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/workshopmock1.png";
                  }}
                />
                
                {/* Overlay Badges */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between h-full">
                  <div>
                    {isActive ? (
                      <span className="px-3 py-1 rounded bg-[#EF4444]/90 text-white text-xs font-mono font-bold uppercase tracking-wider inline-block border border-[#EF4444]">
                        🔴 Live Session
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded bg-white/10 text-white/70 text-xs font-mono uppercase tracking-wider inline-block border border-white/20">
                        Inactive
                      </span>
                    )}
                  </div>
                  
                  {isActive && (
                    <div className="bg-[#050816]/90 backdrop-blur-md p-4 rounded-xl border border-[#00E5FF]/20 shadow-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#94A3B8] font-mono uppercase">Limited Slots Left</span>
                        <span className="text-sm text-[#00E5FF] font-bold font-mono">{slots} seats remaining</span>
                      </div>
                      {/* Simple Slots Progress Bar */}
                      <div className="mt-2 w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#00E5FF] to-[#2563EB] rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.min(100, Math.max(15, (Number(slots) || 0) * 2))}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#00E5FF] mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {duration}</span>
                  </div>
                  {isActive && <span className="text-white/20">•</span>}
                  {isActive && (
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Users className="w-4 h-4" />
                      <span>By: {speakers.join(", ")}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
                  {title}
                </h3>

                {/* Description (below Title as requested) */}
                <p className="mt-3 text-sm md:text-base text-[#94A3B8] leading-relaxed">
                  {description}
                </p>

                {/* Topics Section (Put as list and tick) */}
                <div className="mt-6 pt-6 border-t border-white/[0.08]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#E2E8F0] mb-3">
                    What you will learn
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                        <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? "text-[#00E5FF]" : "text-white/20"}`} />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta Attributes Block */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/[0.04] text-[#00E5FF]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-[#64748B]">Date & Time</p>
                      <p className="text-xs font-semibold text-white">{dateTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/[0.04] text-[#00E5FF]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-[#64748B]">Venue / Mode</p>
                      <p className="text-xs font-semibold text-white">{venue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA Section */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <p className="text-xs font-mono uppercase text-[#64748B] mb-1">Registration Fee</p>
                  <div className="flex items-baseline gap-3">
                    {isActive ? (
                      <>
                        <span className="text-3xl font-bold font-sans text-white">
                          ₹{offerPrice}
                        </span>
                        {actualPrice && (
                          <span className="text-sm font-semibold text-white/40 line-through">
                            ₹{actualPrice}
                          </span>
                        )}
                        {actualPrice && Number(actualPrice) > Number(offerPrice) && (
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {Math.round((1 - (Number(offerPrice) / (Number(actualPrice) || 1))) * 100)}% OFF
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-3xl font-bold font-sans text-white/30">-</span>
                    )}
                  </div>
                </div>

                {isActive ? (
                  <Link
                    href="/workshop"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#2563EB] text-white text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.25)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,229,255,0.4)] hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Register Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <div className="flex flex-col sm:items-end gap-2">
                    <p className="text-xs font-semibold text-[#EF4444] flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Note: Contact us for upcoming workshops</span>
                    </p>
                    <Link
                      href="/contactus"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-sm font-semibold tracking-wide transition-all duration-200"
                    >
                      <Mail className="w-4 h-4 text-[#00E5FF]" />
                      <span>Contact Us</span>
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
