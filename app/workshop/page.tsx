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
  ArrowLeft, 
  AlertCircle,
  Mail,
  User,
  Phone,
  Briefcase,
  ShieldCheck,
  Sparkles,
  CreditCard,
  QrCode,
  Download,
  Share2
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import {  WorkshopData } from "../../lib/workshopMock";
import HeaderPage from "../header/page";
import FooterPage from "../footer/page";

export default function WorkshopDetailPage() {
  const [workshop, setWorkshop] = useState<WorkshopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  
  // Registration Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referBy, setReferBy] = useState("");
  const [role, setRole] = useState("Professional");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirectRegisterSubmitting, setIsDirectRegisterSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  
  // WhatsApp & Manual Retrieval State
  const [isWhatsappSubmitting, setIsWhatsappSubmitting] = useState(false);
  const [ticketSearchQuery, setTicketSearchQuery] = useState("");
  const [isSearchingTicket, setIsSearchingTicket] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
  async function loadData() {
    setLoading(true);
    setLoadError("");
    setWorkshop(null);

    if (!supabase) {
      setLoadError(
        "Supabase is not configured correctly. Please check the environment variables."
      );
      setLoading(false);
      return;
    }

    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Supabase request timed out after 8 seconds.")),
          8000
        )
      );

      const fetchPromise = supabase
        .from("workshops")
        .select("*")
        .eq("status", true)
        .limit(1);

      const { data, error } = (await Promise.race([
        fetchPromise,
        timeoutPromise,
      ])) as any;

      if (error) {
        throw new Error(
          `Unable to load workshop details from Supabase: ${error.message}`
        );
      }

      if (!data || data.length === 0) {
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
          status: false,
        });
        setLoading(false);
        return;
      }

      const row = data[0];

      let topics: string[] = [];
      const rawTopics = row.topics;

      if (Array.isArray(rawTopics)) {
        topics = rawTopics;
      } else if (typeof rawTopics === "string") {
        try {
          const parsed = JSON.parse(rawTopics);
          topics = Array.isArray(parsed)
            ? parsed
            : rawTopics.split(",").map((t: string) => t.trim());
        } catch {
          topics = rawTopics.split(",").map((t: string) => t.trim());
        }
      }

      let speakers: string[] = [];
      const rawSpeakers =
        row.speakers ||
        row.speaker_names ||
        row["Speaker names"] ||
        row.Speakers;

      if (Array.isArray(rawSpeakers)) {
        speakers = rawSpeakers;
      } else if (typeof rawSpeakers === "string") {
        try {
          const parsed = JSON.parse(rawSpeakers);
          speakers = Array.isArray(parsed)
            ? parsed
            : rawSpeakers.split(",").map((s: string) => s.trim());
        } catch {
          speakers = rawSpeakers.split(",").map((s: string) => s.trim());
        }
      }

      setWorkshop({
        id: row.workshop_id || row.id || "1",
        title: row.title || "No Title",
        description: row.description || "",
        topics,
        venue: row.venue || "-",
        dateTime: row.date_time || "-",
        slots: row.slots !== undefined ? row.slots : "-",
        speakers,
        poster: row.poster_url || "/workshopmock1.png",
        duration: row.duration || "-",
        actualPrice:
          row.actual_price !== undefined ? row.actual_price : "-",
        offerPrice:
          row.offer_price !== undefined ? row.offer_price : "-",
        status: row.status === true,
      });
    } catch (err: any) {
      console.error("Failed to load workshop details:", err);

      setWorkshop(null);

      setLoadError(
        err?.message ||
          "Unable to load workshop details. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  loadData();
}, []);

  // Load Cashfree SDK dynamically on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scriptId = "cashfree-js-sdk";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshop) {
  alert("Workshop details are not available. Please refresh the page and try again.");
  return;
}
    if (!fullName || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 1. Contact backend order creation API
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workshop_id: workshop?.id,
          name: fullName,
          mobile: phone,
          email: email,
          amount: offerPrice
        })
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        const errorMsg = resData.details 
          ? `${resData.error} (${resData.details})`
          : (resData.error || "Failed to initiate payment. Server replied with an error.");
        throw new Error(errorMsg);
      }

      const { payment_session_id, payment_mode } = resData;

      // 2. Handle Cashfree checkout trigger
      if (!(window as any).Cashfree) {
        throw new Error("Cashfree Checkout Web SDK is not loaded yet. Please wait a second and retry.");
      }

      const cashfree = (window as any).Cashfree({
        mode: payment_mode || "sandbox"
      });

      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_self"
      });

    } catch (err: any) {
      // console.error("Payment initiation failed:", err);
      
      // // Pre-config / local preview fallback simulation helper
      // const confirmSimulate = window.confirm(
      //   `Cashfree Initiation Failed: ${err.message}\n\nSince this might be due to unconfigured API keys, would you like to simulate a successful payment to preview the Ticket QR screen?`
      // );

      // if (confirmSimulate) {
      //   const generatedId = "Tckt-" + Math.floor(10000000 + Math.random() * 90000000);
      //   window.location.href = `/success?ticket_id=${generatedId}`;
      // }
      console.error("Payment initiation failed: Check either Mobile number or email Entered Wrongly", err);

      alert(err.message || "Payment initiation failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayViaWhatsapp = async () => {
    if (!workshop) {
    alert("Workshop details are not available. Please refresh the page and try again.");
    return;
  }
    if (!fullName || !email || !phone) {
      alert("Please fill in all required fields (Name, Email, Phone) first to register.");
      return;
    }

    setIsWhatsappSubmitting(true);
    try {
      if (!supabase) {
        throw new Error("Database is not connected. Fallback data used.");
      }

      // 1. Resolve workshop_id just like in the backend (resolvedWorkshopId)
      const resolvedWorkshopId = workshop.id;

      // 2. Insert into registrations table in Supabase. Let database generate UUID and ticket_id
      const { data: registration, error: regError } = await supabase
        .from("registrations")
        .insert({
          workshop_id: resolvedWorkshopId,
          name: fullName,
          mobile: phone,
          email: email,
          referral_code: referBy || null,
          attendance: false,
          status: "workshop register"
        })
        .select()
        .single();

      if (regError) {
        console.error("Database error inserting registration:", regError);
        throw new Error(`Registration failed: ${regError.message}`);
      }

      const ticketId = registration.ticket_id;

      // 3. Format message details
      const formattedMessage = `Hello Cyber Tech Connect, I would like to pay for the workshop. Here are my registration details:

🎫 *Ticket ID*: ${ticketId}
👤 *Name*: ${fullName}
📞 *Mobile/Phone*: ${phone}
📧 *Email*: ${email}
📚 *Workshop ID*: ${resolvedWorkshopId}
🎯 *Workshop Title*: ${title}
💰 *Amount*: ₹${offerPrice}

*Important*: I encountered issues with Cashfree payment. Please share UPI details/QR to complete payment and approve my ticket entry. Thank you!`;

      // 4. Open WhatsApp Link
      const whatsappUrl = `https://api.whatsapp.com/send?phone=918019002701&text=${encodeURIComponent(formattedMessage)}`;
      window.open(whatsappUrl, "_blank");

      // Set state to show the success view and display the generated ticket info
      setRegistrationId(ticketId);
      setRegistrationSuccess(true);
      
    } catch (err: any) {
      console.error("WhatsApp registration failed:", err);
      alert(err.message || "Something went wrong during registration. Please try again.");
    } finally {
      setIsWhatsappSubmitting(false);
    }
  };

  const handleDirectRegister = async () => {
  if (!workshop) {
    alert(
      "Workshop details are not available. Please refresh the page and try again."
    );
    return;
  }

  if (!fullName || !email || !phone) {
    alert("Please fill in all required fields (Name, Email, Phone) first.");
    return;
  }

  setIsDirectRegisterSubmitting(true);

  try {
    if (!supabase) {
      throw new Error("Database client is not available.");
    }

    const resolvedWorkshopId = workshop.id;

      const { data: registration, error: regError } = await supabase
        .from("registrations")
        .insert({
          workshop_id: resolvedWorkshopId,
          name: fullName,
          mobile: phone,
          email: email,
          referral_code: referBy || null,
          attendance: false,
          status: "Success"
        })
        .select()
        .single();

      if (regError) {
        console.error("Database error inserting registration:", regError);
        throw new Error(`Registration failed: ${regError.message}`);
      }

      const ticketId = registration.ticket_id;
      window.location.href = `/success?ticket_id=${ticketId}`;
    } catch (err: any) {
      console.error("Direct registration failed:", err);
      alert(err.message || "Something went wrong during registration. Please try again.");
    } finally {
      setIsDirectRegisterSubmitting(false);
    }
  };

  const handleSearchTicket = async () => {
    if (!workshop) {
    setSearchError(
      "Workshop details are not available. Please refresh the page and try again."
    );
    return;
  }
    if (!ticketSearchQuery.trim()) return;
    setIsSearchingTicket(true);
    setSearchResult(null);
    setSearchError("");

    try {
      if (!supabase) {
        throw new Error("Database client is not available.");
      }

      const queryVal = ticketSearchQuery.trim();
      const resolvedWorkshopId = workshop.id;

      // Determine if the search query is a Ticket ID or a Mobile Number.
      // Ticket IDs in the database start with "Tckt-".
      const isTicketSearch = queryVal.toLowerCase().startsWith("tckt-");

      if (isTicketSearch) {
        // Query by ticket_id and ensure workshop_id matches
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .eq("ticket_id", queryVal)
          .eq("workshop_id", resolvedWorkshopId);

        if (error) {
          console.error("Error searching ticket by ID:", error);
          throw new Error(error.message);
        }

        if (!data || data.length === 0) {
          setSearchError("No registration found with this Ticket ID for this workshop. Please check and try again.");
        } else {
          setSearchResult(data[0]);
        }
      } else {
        // Searching with mobile: Fetch all rows for the mobile number and workshop id.
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .eq("mobile", queryVal)
          .eq("workshop_id", resolvedWorkshopId);

        if (error) {
          console.error("Error searching ticket by mobile:", error);
          throw new Error(error.message);
        }

        if (!data || data.length === 0) {
          setSearchError("No registration found with this Mobile Number for this workshop. Please check and try again.");
        } else {
          // Check if any row has status === "Success"
          const successRow = data.find((row: any) => row.status === "Success");
          if (successRow) {
            setSearchResult(successRow);
          } else {
            // If no row is "Success", show the first found row so they can see the pending status.
            setSearchResult(data[0]);
          }
        }
      }
    } catch (err: any) {
      setSearchError(err.message || "Failed to search for registration. Please try again.");
    } finally {
      setIsSearchingTicket(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#050816]">
        <HeaderPage />
        <div className="flex-grow flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin" />
          <p className="mt-4 text-xs font-mono text-[#00E5FF] tracking-wider uppercase animate-pulse">
            Establishing Secure Connection...
          </p>
        </div>
        <FooterPage />
      </div>
    );
  }
  if (loadError) {
  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-white">
      <HeaderPage />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-b from-[#0B1528] to-[#050816] border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl">

            <div className="mx-auto w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertCircle className="w-7 h-7" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
              Unable to Load Workshop
            </h2>

            <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
              We could not retrieve the workshop details from our server.
              No dummy information has been displayed.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-left">
              <p className="text-[10px] font-mono uppercase text-red-400 mb-1">
                Reason
              </p>

              <p className="text-xs text-red-200/80 leading-relaxed break-words">
                {loadError}
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#2563EB] hover:from-[#00E5FF]/90 hover:to-[#2563EB]/90 text-white text-sm font-bold transition-all"
            >
              Try Again
            </button>

            <p className="mt-4 text-[10px] font-mono text-[#64748B]">
              If the problem continues, please try again later.
            </p>
          </div>
        </div>
      </main>

      <FooterPage />
    </div>
  );
}

const isActive = workshop?.status ?? false;

const title = isActive ? workshop?.title ?? "-" : "-";
const description = isActive ? workshop?.description ?? "-" : "-";
const topics = isActive ? workshop?.topics ?? ["-"] : ["-"];
const venue = isActive ? workshop?.venue ?? "-" : "-";
const dateTime = isActive ? workshop?.dateTime ?? "-" : "-";
const slots = isActive ? workshop?.slots ?? "-" : "-";
const speakers = isActive ? workshop?.speakers ?? ["-"] : ["-"];
const poster = isActive ? workshop?.poster ?? "/workshopmock1.png" : "/workshopmock1.png";
const duration = isActive ? workshop?.duration ?? "-" : "-";
const actualPrice = isActive ? workshop?.actualPrice ?? "-" : "-";
const offerPrice = isActive ? workshop?.offerPrice ?? "-" : "-";

  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-white">
      {/* Header */}
      <HeaderPage />

      {/* Main Content */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Registration Form / Status Card */}
          <div className="order-1 lg:order-1 lg:col-span-7 w-full">
            {isActive ? (
              <div className="bg-gradient-to-b from-[#0B1528]/90 to-[#050816]/98 border border-white/[0.1] rounded-2xl p-6 md:p-8 shadow-2xl relative">
                
                {registrationSuccess ? (
                  // Success State
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-sans">Registration Done!</h3>
                    <p className="mt-2 text-xs text-[#94A3B8] max-w-xs mx-auto">
                      Thank you for enrolling. Your seat has been securely reserved. Confirmation details will be get once admin Approves payment.
                    </p>

                    {/* Ticket Box */}
                    <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] relative text-left">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-mono text-[#00E5FF] uppercase">Workshop Pass</p>
                          <h4 className="text-xs font-bold text-white truncate max-w-[200px] mt-1">{title}</h4>
                        </div>
                        <QrCode className="w-8 h-8 text-white/80" />
                      </div>
                      
                      <div className="space-y-2.5 text-xs border-t border-white/[0.05] pt-4">
                        <div className="flex justify-between">
                          <span className="text-white/40 font-mono">ID:</span>
                          <span className="font-mono font-bold text-white">{registrationId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 font-mono">Attendee:</span>
                          <span className="font-semibold text-white">{fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40 font-mono">Payment Status:</span>
                          <span className="text-emerald-400 font-bold font-mono">Check Below (INR {offerPrice})</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        setRegistrationSuccess(false);
                        setFullName("");
                        setEmail("");
                        setPhone("");
                      }}
                      className="mt-6 text-xs text-[#00E5FF] hover:underline font-mono"
                    >
                      Register another attendee
                    </button>
                  </motion.div>
                ) : (
                  // Registration Inputs
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white font-sans">Secure Registration</h3>
                      <p className="text-xs text-[#94A3B8] mt-1">Provide your details to claim the offer price.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input 
                            type="text"
                            required
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input 
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input 
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* Refer by */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Refer by</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <input 
                            type="tel"
                            placeholder="mobile number"
                            value={referBy}
                            onChange={(e) => setReferBy(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      {/* Professional Role */}
                      <div>
                        <label className="block text-xs font-mono text-[#94A3B8] uppercase mb-1.5">Current Profile</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-white/30" />
                          <select 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#050816] border border-white/10 focus:border-[#00E5FF] focus:outline-none text-sm transition-all"
                          >
                            <option value="Professional">Working Professional</option>
                            <option value="Student">College Student</option>
                            <option value="Researcher">Researcher / Academician</option>
                            <option value="Freelancer">Independent Freelancer</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-mono uppercase text-[#64748B]">Total Payable</p>
                        <p className="text-xl font-bold text-white">₹{offerPrice}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs line-through text-white/40 block">₹{actualPrice}</span>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">Discount Applied</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    {/* <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#2563EB] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] text-white text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Secure Payment...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Pay & Register Now</span>
                        </>
                      )}
                    </button>  */}

                    {/* WhatsApp Pay Option */}
                    <div className="mt-4 pt-4 border-t border-white/[0.08] text-center space-y-2">
                      {/* <button
                        type="button"
                        onClick={handlePayViaWhatsapp}
                        disabled={isSubmitting || isWhatsappSubmitting || isDirectRegisterSubmitting}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#22c55e]/90 to-[#16a34a] hover:from-[#22c55e] hover:to-[#15803d] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] text-white text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isWhatsappSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Setting up WhatsApp desk...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.116-2.905-6.994s-4.352-2.91-6.989-2.91c-5.441 0-9.864 4.422-9.868 9.868-.001 1.748.463 3.454 1.344 4.964l-.996 3.633 3.723-.976zm11.366-7.76c-.328-.164-1.94-.957-2.24-1.066-.3-.11-.518-.164-.734.164-.216.328-.838 1.066-1.026 1.284-.188.218-.376.246-.704.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.824-2.274-.192-.328-.02-.505.144-.668.148-.146.328-.382.492-.574.164-.19.219-.328.328-.546.11-.218.055-.41-.027-.574-.082-.164-.734-1.77-.1005-2.59-.262-.63-.53-1.17-.735-1.17a5.523 5.523 0 0 0-.41-.01c-.218 0-.573.082-.872.41-.3.328-1.145 1.12-1.145 2.732s1.173 3.167 1.337 3.385c.164.218 2.31 3.527 5.59 4.945.78.336 1.39.537 1.865.688.784.248 1.497.214 2.061.13.629-.094 1.94-.794 2.215-1.529.275-.734.275-1.363.193-1.497-.082-.134-.3-.218-.629-.382z" />
                            </svg>
                            <span>Pay via WhatsApp</span>
                          </>
                        )}
                      </button> */}

                      {/* Direct Register Button */}
                      <button
                        type="button"
                        onClick={handleDirectRegister}
                        disabled={isSubmitting || isWhatsappSubmitting || isDirectRegisterSubmitting}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#2563EB] hover:from-[#00E5FF]/90 hover:to-[#2563EB]/90 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] text-white text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isDirectRegisterSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing Registration...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-white" />
                            <span>Register here</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust Footnote */}
                    <p className="text-[10px] font-mono text-[#64748B] text-center flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Secured with SSL 256-bit encryption.</span>
                    </p>
                  </form>
                )}

              </div>
            ) : (
              // Empty / Inactive state (dashes state as requested)
              <div className="bg-gradient-to-b from-[#0B1528]/80 to-[#050816]/95 border border-white/[0.08] rounded-2xl p-6 md:p-8 text-center space-y-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#94A3B8]">
                  <AlertCircle className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="text-base font-bold text-white">No Active Batches Scheduled</h3>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                    At a time, only one workshop is available. There is currently no active workshop batch accepting registrations.
                  </p>
                </div>

                <div className="border-t border-white/[0.08] pt-4 text-left space-y-2.5 text-xs font-mono text-[#94A3B8]">
                  <div className="flex justify-between">
                    <span>Active Status:</span>
                    <span className="text-[#EF4444] font-bold">DASHED (-)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee structure:</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Slots remaining:</span>
                    <span>-</span>
                  </div>
                </div>

                <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-4 text-left">
                  <p className="text-xs text-white leading-relaxed">
                    <span className="font-bold text-[#EF4444]">Note:</span> For customized corporate training, college collaboration requests, or early updates on the next batch, click below to connect with us immediately.
                  </p>
                </div>

                <Link
                  href="/contactus"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#050816] hover:bg-white/[0.06] border border-[#00E5FF]/20 text-white text-sm font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                >
                  <Mail className="w-4 h-4 text-[#00E5FF]" />
                  <span>Contact Us Now</span>
                </Link>
              </div>
            )}
          </div>

          {/* 4. Workshop Info Section */}
          <div className="order-4 lg:order-3 lg:col-span-7 w-full">
            <div className="bg-gradient-to-b from-[#0B1528]/80 to-[#050816]/95 border border-white/[0.08] rounded-2xl p-6 md:p-8 shadow-xl">
              
              {/* Badge & Duration */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 uppercase">
                  ⭐ Interactive Workshop
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8]">
                  <Clock className="w-4 h-4 text-[#00E5FF]" />
                  <span>Duration: {duration}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                {title}
              </h1>

              {/* Description below the Title (as requested) */}
              <p className="mt-4 text-sm md:text-base text-[#94A3B8] leading-relaxed">
                {description}
              </p>

              {/* Topics (Put as List and tick as requested) */}
              <div className="mt-8 pt-8 border-t border-white/[0.08]">
                <h3 className="text-lg font-sans font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-[#00E5FF]" />
                  Curriculum & Hands-on Topics
                </h3>
                <ul className="space-y-3.5">
                  {topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[#94A3B8]">
                      <div className="mt-1 shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-tight">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Speaker Profiles */}
              {isActive && (
                <div className="mt-8 pt-8 border-t border-white/[0.08]">
                  <h3 className="text-lg font-sans font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 rounded-full bg-[#00E5FF]" />
                    Distinguished Workshop Instructors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {speakers.map((speaker, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00E5FF] to-[#2563EB] flex items-center justify-center font-bold font-sans text-sm text-white shadow-md">
                          {speaker.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{speaker}</p>
                          <p className="text-[10px] font-mono text-[#00E5FF] uppercase">Lead Mentor</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Logistics Grid */}
              <div className="mt-8 pt-8 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <Calendar className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono uppercase text-[#64748B]">Date & Time</p>
                    <p className="text-sm font-semibold text-white mt-1">{dateTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <MapPin className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono uppercase text-[#64748B]">Venue & Format</p>
                    <p className="text-sm font-semibold text-white mt-1">{venue}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 2. Generate Ticket QR & Details Option */}
          <div className="order-2 lg:order-2 lg:col-span-5 w-full">
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B1528]/60 to-[#050816]/90 space-y-4">
              <h4 className="text-sm font-sans font-bold tracking-tight text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#00E5FF]" />
                <span>Generate QR & Ticket Details</span>
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                If you have paid via WhatsApp or completed your checkout, enter your Ticket ID or registered Mobile Number below to generate your QR entry pass (only active after payment status is marked as 'Success').
              </p>

              <div className="space-y-3 pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Ticket ID or Mobile Number"
                    value={ticketSearchQuery}
                    onChange={(e) => setTicketSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 focus:border-[#00E5FF] focus:outline-none text-xs text-gray-900 transition-all placeholder:text-gray-600 placeholder:font-semibold"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearchTicket}
                  disabled={isSearchingTicket || !ticketSearchQuery.trim()}
                  className="w-full py-2.5 rounded-lg bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold tracking-wide transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isSearchingTicket ? (
                    <>
                      <div className="w-3 h-3 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
                      <span>Searching registrations...</span>
                    </>
                  ) : (
                    <span>Generate Ticket QR</span>
                  )}
                </button>
              </div>

              {/* Search Result Display */}
              {searchError && (
                <p className="text-xs text-[#EF4444] bg-[#EF4444]/5 p-2.5 rounded-lg border border-[#EF4444]/15 mt-2">
                  {searchError}
                </p>
              )}

              {searchResult && (
                <div className="mt-4 p-4 rounded-xl bg-[#050816] border border-white/[0.08] space-y-3 text-xs">
                  {searchResult.status === "Success" ? (
                    <>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Verification Successful!</span>
                      </div>
                      
                      {/* Ticket Box */}
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] flex flex-col items-center text-center space-y-3">
                        <div className="bg-white p-2.5 rounded-xl">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(searchResult.ticket_id)}`}
                            alt="Ticket QR Code"
                            className="w-32 h-32"
                          />
                        </div>
                        <p className="font-mono text-[10px] text-white/60">
                          ID: <strong className="text-[#00E5FF]">{searchResult.ticket_id}</strong>
                        </p>
                      </div>

                      <div className="space-y-1.5 border-t border-white/[0.05] pt-3 text-left">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-white/40">Attendee:</span>
                          <span className="font-semibold text-white">{searchResult.name}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-white/40">Mobile:</span>
                          <span className="text-white/80 font-mono">{searchResult.mobile}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-white/40">Email:</span>
                          <span className="text-white/80 truncate max-w-[150px]">{searchResult.email}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-white/40">Attendance:</span>
                          <span className="text-white/80 font-mono">{searchResult.attendance ? "Present" : "Absent"}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-white/40">Status:</span>
                          <span className="text-emerald-400 font-bold font-mono">Paid & Active</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>Ticket Found (Pending Activation)</span>
                      </div>
                      <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                        Your registration for <strong>{searchResult.name}</strong> was found (ID: <code className="text-[#00E5FF]">{searchResult.ticket_id}</code>), but the payment status is currently <strong>"{searchResult.status}"</strong>. 
                      </p>
                      <p className="text-[11px] text-[#94A3B8] leading-relaxed mt-1">
                        If you paid via WhatsApp, please allow our support mentors some time to verify and update your status to 'Success'. Once approved, your QR pass will automatically display here.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 3. Poster display (Bottom Right, 1:1 format) */}
          <div className="order-3 lg:order-4 lg:col-span-5 w-full">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg aspect-square w-full">
              <img 
                src={poster} 
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/workshopmock1.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />
              {isActive && (
                <div className="absolute bottom-4 left-4 right-4 bg-[#050816]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/[0.08] flex justify-between items-center z-10">
                  <span className="text-xs font-mono text-[#94A3B8]">Remaining Slots:</span>
                  <span className="text-sm font-bold font-mono text-[#00E5FF]">{slots} Seats</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
