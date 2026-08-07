"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, Calendar, ArrowRight, Star, ShieldCheck, BadgeCheck } from "lucide-react";

export interface Speaker {
  name: string;
  designation: string;
  description: string;
  experience: string;
  sessionsConducted: string;
  accentColor: string;
  image: string;
}

export const SPEAKERS_DATA: Speaker[] = [
  {
    name: "Surya Teja",
    designation: "FOUNDER & CEO of ST7",
    description: "Entrepreneur with a strong thrive to contribute to the world. Pioneering modern cybersecurity frameworks, industry-aligned tech curriculum, and secure product mentorship at ST7 Group.",
    experience: "6+ years",
    sessionsConducted: "100+",
    accentColor: "from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]",
    image: "/surya-teja.png",
  },
  {
    name: "SANDU VINAY BHASKAR",
    designation: " CYBERSECURITY SPECIALIST IN ST7 GROUP.",
    description: "Expert in encryption models and safe ledger protocols. Passionate about teaching cryptographic fundamentals to tomorrow's cybersecurity specialists.",
    experience: "4+ years",
    sessionsConducted: "60+",
    accentColor: "from-[#38BDF8] to-[#0369A1]",
    image: "/vinay.png",
  },
  {
    name: "T. Chandu",
    designation: "South Zone Manager",
    description: "Responsible for leading and expanding ST7 Tech Connect's operations across South India by driving business growth, building strategic partnerships, and ensuring exceptional client satisfaction.",
    experience: "5+ years",
    sessionsConducted: "80+",
    accentColor: "from-[#F43F5E] to-[#BE123C]",
    image: "/chandhu.png",
  },
  {
    name: "Rohan Deshmukh",
    designation: "Incident Response Specialist",
    description: "Defense architecture veteran focusing on real-time malware analysis, active system telemetry, and proactive defense procedures during emergency mitigation.",
    experience: "5 years",
    sessionsConducted: "50+",
    accentColor: "from-[#10B981] to-[#047857]",
    image: "/speaker1.png",
  },
  {
    name: "Sarah Jenkins",
    designation: "Cloud Security Architect",
    description: "Guiding businesses through zero-trust cloud transitions. Expert in distributed container security, access controls, and compliance for public and hybrid cloud models.",
    experience: "7 years",
    sessionsConducted: "90+",
    accentColor: "from-[#F59E0B] to-[#B45309]",
    image: "/speaker1.png",
  },
  {
    name: "K. S. Srinivas",
    designation: "Director of Cybersecurity Operations",
    description: "Strategic consultant specializing in ISO 27001 implementation, risk assessments, and global standard alignment. Regular panelist on digital safety and system governance.",
    experience: "12 years",
    sessionsConducted: "150+",
    accentColor: "from-[#8B5CF6] to-[#6D28D9]",
    image: "/speaker1.png",
  }
];

export default function OurSpeakersSection() {
  // On the home page preview, we show the top 3 speakers (including Surya Teja)
  const featuredSpeakers = SPEAKERS_DATA.slice(0, 3);

  return (
    <section id="speakers" className="relative py-20 bg-[#050816] overflow-hidden border-t border-white/[0.04]">
      {/* Background visual cyber glow */}
      <div className="absolute top-10 left-10 w-[25rem] h-[25rem] rounded-full bg-[#00E5FF]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[25rem] h-[25rem] rounded-full bg-[#8B5CF6]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest">
              <Star className="w-3 h-3 fill-[#00E5FF]/20" />
              Expert Facilitators
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#2563EB]">Distinguished Speakers</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
              Learn directly from active industry consultants, corporate strategists, and cybersecurity pioneers who bring real-world defense models straight to you.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/speakers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#00E5FF]/30 text-white text-sm font-semibold transition-all duration-300"
            >
              <span>View All Speakers</span>
              <ArrowRight className="w-4 h-4 text-[#00E5FF]" />
            </Link>
          </div>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSpeakers.map((speaker, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#0F172A]/80 to-[#0A0D1E]/95 border border-white/[0.05] hover:border-[#00E5FF]/30 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Card visual hover highlight glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#00E5FF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Speaker Avatar / Visual representation */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden p-[1px] bg-gradient-to-tr from-[#00E5FF] to-[#2563EB] shrink-0">
                    <div className="relative w-full h-full bg-[#050816] rounded-[11px] overflow-hidden">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-sans font-bold text-lg text-white group-hover:text-[#00E5FF] transition-colors duration-200">
                        {speaker.name}
                      </h3>
                      {idx === 0 && (
                        <BadgeCheck className="w-4.5 h-4.5 text-[#00E5FF] fill-[#00E5FF]/10" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-[#94A3B8]">
                      {speaker.designation}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6">
                  {speaker.description}
                </p>
              </div>

              {/* Speaker Stats Row */}
              <div className="pt-4 border-t border-white/[0.04] grid grid-cols-2 gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#00E5FF]" />
                    Experience
                  </span>
                  <p className="text-sm font-bold text-white">
                    {speaker.experience}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#2563EB]" />
                    Sessions
                  </span>
                  <p className="text-sm font-bold text-white">
                    {speaker.sessionsConducted} Conducted
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
