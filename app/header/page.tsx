"use client";

import { useState } from "react";
import { Menu, X, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function HeaderPage() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Workshops", href: "/workshop" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Story", href: "/ourstory" },
    { label: "Speakers", href: "/speakers" },
    { label: "Contact Us", href: "/contactus" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#050816]/75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 overflow-hidden transition-all duration-300 group-hover:border-[#00E5FF]/60 group-hover:bg-[#00E5FF]/20">
              <img
                src="/st7techconnect.PNG"
                alt="Logo"
                className="w-full h-full object-contain absolute inset-0 z-10 transition-opacity duration-300"
                onLoad={(e) => {
                  e.currentTarget.classList.remove("opacity-0");
                }}
                onError={(e) => {
                  // Fallback if logo not found
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Fallback Cyber Shield Icon */}
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
            <span className="font-sans font-bold text-lg md:text-xl tracking-tight text-[#FFFFFF] group-hover:text-[#00E5FF] transition-colors duration-200">
              ST7 <span className="text-[#00E5FF]">Tech Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation - Brightened up text from #94A3B8 to #E2E8F0 */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#E2E8F0] hover:text-[#00E5FF] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#00E5FF] after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* WhatsApp Action Button - Updated to Enquiry with a bright colored icon */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contactus"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#050816] border border-[#00E5FF]/30 text-white text-sm font-semibold tracking-wide overflow-hidden shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4.5 h-4.5 text-[#22C55E] fill-[#22C55E]/10 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[#FFFFFF] hover:text-white">Enquiry</span>
              {/* Highlight flash effect on hover */}
              <span className="absolute inset-0 w-full h-full bg-white/5 transform -skew-x-12 -translate-x-full group-hover:animate-none group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-[#E2E8F0] hover:text-[#00E5FF] hover:bg-white/[0.04] focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Brightened text colors */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/[0.08] bg-[#050816]/95 backdrop-blur-lg ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-[#F1F5F9] hover:text-[#00E5FF] hover:bg-white/[0.04] transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 px-3">
            <Link
              href="/contactus"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#050816] border border-[#00E5FF]/20 text-white text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(0,229,255,0.1)]"
            >
              <MessageSquare className="w-4.5 h-4.5 text-[#22C55E] fill-[#22C55E]/10" />
              <span>Enquiry</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
