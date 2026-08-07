"use client";

import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function FooterPage() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Workshops", href: "/workshop" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Story", href: "/ourstory" },
    { label: "Speakers", href: "/speakers" },
    { label: "Contact Us", href: "/contactus" },
  ];

  return (
    <footer className="w-full bg-[#0F172A] border-t border-white/[0.08] text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Core Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Left Column: Brand Description */}
          <div className="col-span-1 md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 overflow-hidden">
                <img
                  src="/cyfo-tech-connect-logo.PNG"
                  alt="Logo"
                  className="w-full h-full object-contain absolute inset-0 opacity-0 transition-opacity duration-300"
                  onLoad={(e) => {
                    e.currentTarget.classList.remove("opacity-0");
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <svg
                  className="w-5 h-5 text-[#00E5FF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-white">
                ST7 <span className="text-[#00E5FF]">Tech Connect</span>
              </span>
            </div>
            
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Empowering the next generation of digital defenders through deep-dive practical cyber defense modules, ethical hacking workshops, and career readiness certifications.
            </p>

            {/* Newsletter Sign Up Concept (Pure UI) */}
            {/* <div className="space-y-2 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-white">Security Bulletins</p>
              <div className="flex max-w-xs rounded-lg overflow-hidden border border-white/[0.08] bg-[#050816]">
                <input 
                  type="email" 
                  placeholder="Your secure email" 
                  className="px-3.5 py-2 w-full text-xs text-white bg-transparent outline-none focus:placeholder-white" 
                  disabled 
                />
                <button className="px-3 bg-gradient-to-r from-[#2563EB] to-[#00E5FF] text-white flex items-center justify-center opacity-80" type="button" disabled>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div> */}
            <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/st7surveillancesolution/" target="_blank" className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-[#00E5FF]/40 text-[#94A3B8] hover:text-[#00E5FF] bg-white/[0.02] flex items-center justify-center transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/st7_group?igsh=Z2lxNXFjN2FlY2dx&utm_source=qr" target="_blank" className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-[#00E5FF]/40 text-[#94A3B8] hover:text-[#00E5FF] bg-white/[0.02] flex items-center justify-center transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-[#00E5FF]/40 text-[#94A3B8] hover:text-[#00E5FF] bg-white/[0.02] flex items-center justify-center transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087-1.839-.498-9.215-.498-9.215-.498s-7.376 0-9.215.498c-1.016.272-1.815 1.071-2.087 2.087-.498 1.839-.498 5.663-.498 5.663s0 3.824.498 5.663c.272 1.016 1.071 1.815 2.087 2.087 1.839.498 9.215.498 9.215.498s7.376 0 9.215-.498c1.016-.272 1.815-1.071 2.087-2.087.498-1.839.498-5.663.498-5.663s0-3.824-.498-5.663zm-13.882 7.747v-7.82l6.818 3.91-6.818 3.91z"/>
              </svg>
            </a>
          </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="col-span-1 sm:col-span-6 md:col-span-3 space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Quick Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Contact info */}
          <div className="col-span-1 sm:col-span-6 md:col-span-4 space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Contact & Support</h4>
            <ul className="space-y-4">
              {/* WhatsApp */}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#00E5FF]/10 flex items-center justify-center border border-[#00E5FF]/20 text-[#00E5FF] shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 fill-current text-[#00E5FF]"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.413 9.863-9.832.002-2.623-1.011-5.09-2.855-6.938C16.438 1.986 13.977 1.96 12.01 1.96c-5.44 0-9.865 4.416-9.867 9.835-.001 1.91.493 3.461 1.431 5.034l-.993 3.624 3.731-.97c-.1.01-.17.02-.25.01zm11.386-7.393c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.199.3-.774.979-.949 1.179-.175.2-.349.224-.65.074-.3-.15-1.265-.467-2.41-1.487-.89-.794-1.49-1.775-1.665-2.074-.175-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.3.3-.499.1-.2.05-.374-.025-.524-.075-.15-.675-1.625-.925-2.225-.244-.588-.493-.507-.675-.516-.174-.008-.374-.01-.574-.01s-.525.075-.8.374c-.275.299-1.05 1.024-1.05 2.5s1.075 2.9 1.225 3.1c.15.199 2.113 3.227 5.125 4.527.715.31 1.273.495 1.709.634.719.229 1.374.196 1.89.12.575-.085 1.78-.728 2.03-1.429.25-.699.25-1.299.175-1.429-.075-.13-.275-.23-.575-.38z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">WhatsApp Helpline</p>
                  <a
                    href="https://wa.me/918019002701"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white hover:text-[#00E5FF] transition-colors"
                  >
                    80190 02701
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#2563EB]/10 flex items-center justify-center border border-[#2563EB]/20 text-[#2563EB] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Email Inquiry</p>
                  <a
                    href="mailto:st7surveillancesolutions@gmail.com"
                    className="text-sm font-semibold text-white hover:text-[#00E5FF] transition-colors"
                  >
                    st7surveillancesolutions@gmail.com
                  </a>
                </div>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#8B5CF6]/10 flex items-center justify-center border border-[#8B5CF6]/20 text-[#8B5CF6] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">Regional Office</p>
                  <p className="text-sm font-semibold text-white">India</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-[1px] w-full bg-white/[0.08]" />

        {/* Bottom Bar: Copyright and Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-xs text-[#94A3B8]">
            © 2026 ST7 Tech Connect. All Rights Reserved.
          </p>
          
          {/* Social Icons (UI Only) */}
          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/st7surveillancesolution/" target="_blank" className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-[#00E5FF]/40 text-[#94A3B8] hover:text-[#00E5FF] bg-white/[0.02] flex items-center justify-center transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/st7_group?igsh=Z2lxNXFjN2FlY2dx&utm_source=qr" target="_blank" className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-[#00E5FF]/40 text-[#94A3B8] hover:text-[#00E5FF] bg-white/[0.02] flex items-center justify-center transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="w-8 h-8 rounded-full border border-white/[0.08] hover:border-[#00E5FF]/40 text-[#94A3B8] hover:text-[#00E5FF] bg-white/[0.02] flex items-center justify-center transition-all duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087-1.839-.498-9.215-.498-9.215-.498s-7.376 0-9.215.498c-1.016.272-1.815 1.071-2.087 2.087-.498 1.839-.498 5.663-.498 5.663s0 3.824.498 5.663c.272 1.016 1.071 1.815 2.087 2.087 1.839.498 9.215.498 9.215.498s7.376 0 9.215-.498c1.016-.272 1.815-1.071 2.087-2.087.498-1.839.498-5.663.498-5.663s0-3.824-.498-5.663zm-13.882 7.747v-7.82l6.818 3.91-6.818 3.91z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
