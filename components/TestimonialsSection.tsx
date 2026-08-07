"use client";

import { Quote, Star, UserCheck, ShieldCheck, Award } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  category: "Student Founder" | "Professional" | "Student";
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  // Founders (5)
  // Student Founders (5)
{
  name: "Aditya Reddy",
  role: "Student Founder, SecureByte Labs, Hyderabad",
  category: "Student Founder",
  content: "The workshop gave me a clear understanding of cybersecurity fundamentals for startups. The practical sessions helped us strengthen our MVP before approaching potential investors.",
  rating: 5,
},
{
  name: "Harsh Patel",
  role: "Co-Founder, CyberHive, Vadodara",
  category: "Student Founder",
  content: "The sessions were practical and focused on real business challenges. We implemented several security best practices directly into our product development process.",
  rating: 5,
},
{
  name: "Sneha Ramesh",
  role: "Founder, SafeStack Campus Initiative, Hyderabad",
  category: "Student Founder",
  content: "I appreciated how every concept was explained with live demonstrations. It gave our team the confidence to build security into our project from day one.",
  rating: 5,
},
{
  name: "Karan Shah",
  role: "Founder, NexShield, Vadodara",
  category: "Student Founder",
  content: "The workshop balanced technical depth with startup practicality. The threat modeling exercises were especially valuable for our early-stage product.",
  rating: 5,
},
{
  name: "Pranav Goud",
  role: "Student Entrepreneur, Hyderabad",
  category: "Student Founder",
  content: "ST7 Tech Connect helped me understand how cybersecurity fits into modern startups. Every session was interactive, practical, and immediately applicable.",
  rating: 5,
},

// Professionals (Aspirants) (5)
{
  name: "Ritika Joshi",
  role: "Cybersecurity Aspirant, Vadodara",
  category: "Professional",
  content: "The hands-on labs were exactly what I was looking for. Instead of only theory, we solved practical security challenges that improved my confidence.",
  rating: 5,
},
{
  name: "Mohammed Faizan",
  role: "Cloud & Security Enthusiast, Hyderabad",
  category: "Professional",
  content: "The instructors explained complex topics like network security and threat analysis in a very approachable way. Great learning experience.",
  rating: 5,
},
{
  name: "Priyansh Desai",
  role: "SOC Analyst Aspirant, Vadodara",
  category: "Professional",
  content: "One of the few workshops that focused on practical scenarios rather than slides. The live demonstrations made every concept easier to understand.",
  rating: 5,
},
{
  name: "Ayesha Fatima",
  role: "DevSecOps Learner, Hyderabad",
  category: "Professional",
  content: "The sessions introduced industry practices that I could immediately explore on my own lab setup. Highly recommended for anyone starting in cybersecurity.",
  rating: 5,
},
{
  name: "Nirav Trivedi",
  role: "Ethical Hacking Aspirant, Vadodara",
  category: "Professional",
  content: "Excellent workshop with a good balance of fundamentals and practical exercises. The mentors encouraged questions and provided clear explanations throughout.",
  rating: 5,
},

// Students (5)
{
  name: "Sai Charan",
  role: "B.Tech CSE Student, Hyderabad",
  category: "Student",
  content: "This workshop introduced me to cybersecurity in a very practical way. The live exercises made learning enjoyable and easy to follow.",
  rating: 5,
},
{
  name: "Krisha Patel",
  role: "Computer Engineering Student, Vadodara",
  category: "Student",
  content: "The sessions were interactive and beginner-friendly. I now have much better clarity on career opportunities in cybersecurity.",
  rating: 5,
},
{
  name: "Rohit Yadav",
  role: "B.Tech Student, Hyderabad",
  category: "Student",
  content: "I enjoyed the hands-on approach and real-world examples. The workshop motivated me to start building my own cybersecurity lab at home.",
  rating: 5,
},
{
  name: "Dhwani Shah",
  role: "IT Student, Vadodara",
  category: "Student",
  content: "The mentors explained every topic patiently and encouraged active participation. It was one of the most engaging technical workshops I've attended.",
  rating: 5,
},
{
  name: "Abhinav Reddy",
  role: "Cybersecurity Student, Hyderabad",
  category: "Student",
  content: "From networking basics to security concepts, everything was explained clearly with practical demonstrations. I left with valuable knowledge and resources.",
  rating: 5,
},
];

export default function TestimonialsSection() {
  // Let's divide them into two sets for offset scroll rows
  const firstRow = TESTIMONIALS.slice(0, 8);
  const secondRow = TESTIMONIALS.slice(8, 15);

  // Duplicate arrays to create continuous infinite loops
  const scrollRow1 = [...firstRow, ...firstRow];
  const scrollRow2 = [...secondRow, ...secondRow, ...secondRow.slice(0, 1)];

  return (
    <section id="testimonials" className="relative py-24 bg-[#050816] overflow-hidden border-t border-white/[0.04] select-none">
      {/* Background neon ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-[#00E5FF]/5 to-[#2563EB]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest mb-4">
          <UserCheck className="w-3.5 h-3.5" />
          Unbiased Feedback
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-4">
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6]">Over 5,000+ Attendees</span>
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          See what tech founders, working enterprise cybersecurity professionals, and university students have to say about our practical workshops and training formats.
        </p>
      </div>

      {/* Marquee Row 1 - Scrolling Left */}
      <div className="relative w-full overflow-hidden flex gap-6 pb-6">
        {/* Soft fade masks on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 shrink-0 animate-marquee-left hover:[animation-play-state:paused] cursor-pointer">
          {scrollRow1.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[300px] sm:w-[350px] shrink-0 p-6 rounded-2xl bg-[#0A0D1E]/80 border border-white/[0.04] hover:border-[#00E5FF]/20 hover:bg-[#0F172A]/85 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              {/* Category indicator pill */}
              <div className="absolute top-6 right-6">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  item.category === 'Student' 
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    : item.category === 'Professional'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {item.category}
                </span>
              </div>

              <div>
                <Quote className="w-8 h-8 text-[#00E5FF]/20 mb-3" />
                <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-normal">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors duration-200">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#64748B] font-medium leading-tight">
                    {item.role}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Scrolling Right */}
      <div className="relative w-full overflow-hidden flex gap-6 mt-2">
        {/* Soft fade masks on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 shrink-0 animate-marquee-right hover:[animation-play-state:paused] cursor-pointer">
          {scrollRow2.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[300px] sm:w-[350px] shrink-0 p-6 rounded-2xl bg-[#0A0D1E]/80 border border-white/[0.04] hover:border-[#2563EB]/20 hover:bg-[#0F172A]/85 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              {/* Category indicator pill */}
              <div className="absolute top-6 right-6">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  item.category === 'Student' 
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    : item.category === 'Professional'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {item.category}
                </span>
              </div>

              <div>
                <Quote className="w-8 h-8 text-[#2563EB]/20 mb-3" />
                <p className="text-sm text-[#CBD5E1] leading-relaxed mb-6 font-normal">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#2563EB] transition-colors duration-200">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#64748B] font-medium leading-tight">
                    {item.role}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
