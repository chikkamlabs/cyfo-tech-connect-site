"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Workshop",
    message: "",
  });

  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const interestOptions = [
    "Workshop",
    "Workshop volunteer",
    "general cyber security enquiry",
    "Cyfo anti hack app",
    "ST7 member"
  ];

  const getCompiledWhatsAppUrl = () => {
    const formattedMessage = encodeURIComponent(
      `*New ST7 Tech Connect Enquiry*\n\n` +
      `👤 *Name:* ${formData.name.trim()}\n` +
      `📧 *Email:* ${formData.email.trim()}\n` +
      `📞 *WhatsApp:* ${formData.phone.trim()}\n` +
      `🎯 *Interest:* ${formData.interest}\n` +
      `💬 *Message:* ${formData.message.trim() || "No message provided."}`
    );
    return `https://wa.me/918019002701?text=${formattedMessage}`;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your name.";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      return "Please enter a valid email address.";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      return "Please enter a valid phone/WhatsApp number.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const generatedUrl = getCompiledWhatsAppUrl();
    setWhatsappUrl(generatedUrl);
    setIsSuccess(true);

    try {
      window.open(generatedUrl, "_blank");
    } catch (err) {
      console.warn("Auto-open blocked, relying on manual button click:", err);
    }
  };

  const handleLinkSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setError("");
    const validationError = validateForm();
    if (validationError) {
      e.preventDefault();
      setError(validationError);
      return;
    }

    setWhatsappUrl(getCompiledWhatsAppUrl());
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "Workshop",
      message: "",
    });
    setError("");
    setIsSuccess(false);
  };

  return (
    <div className="w-full">
      {isSuccess ? (
        <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] mx-auto shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white font-sans">Enquiry Compiling Complete!</h3>
            <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
              Your secure inquiry details have been successfully formatted. A WhatsApp window was triggered to open.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#22C55E] text-black font-bold text-sm hover:bg-[#1eb052] transition-colors flex items-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto justify-center"
            >
              <MessageSquare className="w-4 h-4" />
              Not Opened? Re-open WhatsApp
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#E2E8F0] font-semibold text-sm hover:bg-white/[0.08] transition-colors cursor-pointer w-full sm:w-auto"
            >
              Submit New Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="embed-name" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Full Name *</label>
              <input
                id="embed-name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-[#00E5FF]/40 focus:bg-white/[0.04] focus:outline-none text-[#F1F5F9] text-sm transition-all duration-300"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="embed-email" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Email Address *</label>
              <input
                id="embed-email"
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-[#00E5FF]/40 focus:bg-white/[0.04] focus:outline-none text-[#F1F5F9] text-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Phone & Interest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="embed-phone" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">WhatsApp Number *</label>
              <input
                id="embed-phone"
                type="tel"
                required
                placeholder="e.g. +91 8341330784"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-[#00E5FF]/40 focus:bg-white/[0.04] focus:outline-none text-[#F1F5F9] text-sm transition-all duration-300"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="embed-interest" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Interested in *</label>
              <div className="relative">
                <select
                  id="embed-interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0F172A] border border-white/[0.08] focus:border-[#00E5FF]/40 focus:outline-none text-[#F1F5F9] text-sm appearance-none cursor-pointer transition-all duration-300"
                >
                  {interestOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0F172A] text-[#F1F5F9]">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#00E5FF]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label htmlFor="embed-message" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Detailed Message (Optional)</label>
            <textarea
              id="embed-message"
              rows={3}
              placeholder="Tell us more about your cyber security learning objectives..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-[#00E5FF]/40 focus:bg-white/[0.04] focus:outline-none text-[#F1F5F9] text-sm transition-all duration-300 resize-none"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full relative block group p-[1px] rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#8B5CF6] text-white font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer text-left"
          >
            <div className="px-6 py-3.5 bg-zinc-950/90 group-hover:bg-transparent rounded-[11px] transition-all duration-300 flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#22C55E] fill-[#22C55E]/10" />
              <span>Submit & Open WhatsApp</span>
              <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-[#00E5FF]" />
            </div>
          </button>
        </form>
      )}
    </div>
  );
}
