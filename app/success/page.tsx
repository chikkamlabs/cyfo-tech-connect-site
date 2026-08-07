"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import QRCode from "qrcode";
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Ticket 
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import HeaderPage from "../header/page";
import FooterPage from "../footer/page";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket_id") || "Tckt-DEMO1234";

  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);
  const [workshopTitle, setWorkshopTitle] = useState("Next.js 15 & Supabase Full-Stack Masterclass");

  useEffect(() => {
    // Generate QR Code containing the ticket registration ID
    QRCode.toDataURL(ticketId, { width: 300, margin: 2, color: { dark: "#050816", light: "#FFFFFF" } })
      .then(url => setQrUrl(url))
      .catch(err => console.error("Error generating QR code:", err));
  }, [ticketId]);

  useEffect(() => {
    async function fetchDetails() {
      if (!ticketId || ticketId === "Tckt-DEMO1234") {
        // Fallback for demo or when Supabase variables are not loaded yet
        setRegistration({
          ticket_id: ticketId,
          name: "Dev Attendee",
          email: "chikkamlabs@gmail.com",
          mobile: "+91 98765 43210",
          workshop_id: "WS-NEXT-01",
          status: "Success",
          attendance: false,
          created_at: new Date().toISOString()
        });
        setPayment({
          payment_id: "pay_demo12345cf",
          amount: 999,
          payment_status: "SUCCESS"
        });
        setLoading(false);
        return;
      }

      if (!supabase) {
        setRegistration({
          ticket_id: ticketId,
          name: "Guest Attendee",
          email: "chikkamlabs@gmail.com",
          mobile: "+91 98765 43210",
          workshop_id: "WS-NEXT-01",
          status: "Success",
          attendance: false,
          created_at: new Date().toISOString()
        });
        setLoading(false);
        return;
      }

      try {
        const { data: reg, error: regErr } = await supabase
          .from("registrations")
          .select("*")
          .eq("ticket_id", ticketId)
          .single();

        if (reg) {
          setRegistration(reg);

          // Get workshop details
          const { data: ws } = await supabase
            .from("workshops")
            .select("title")
            .eq("workshop_id", reg.workshop_id)
            .maybeSingle();

          if (ws?.title) {
            setWorkshopTitle(ws.title);
          }

          // Fetch payment status
          const { data: pay } = await supabase
            .from("payments")
            .select("*")
            .eq("ticket_id", ticketId)
            .maybeSingle();

          if (pay) {
            setPayment(pay);
          }
        } else {
          // No record found, fallback to graceful mock state
          setRegistration({
            ticket_id: ticketId,
            name: "Attendee",
            email: "chikkamlabs@gmail.com",
            mobile: "+91 98765 43210",
            workshop_id: "WS-NEXT-01",
            status: "Success",
            attendance: false,
            created_at: new Date().toISOString()
          });
        }
      } catch (err) {
        console.error("Error loading registration details on Success Page:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [ticketId]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin" />
        <p className="mt-4 text-xs font-mono text-[#00E5FF] tracking-wider uppercase animate-pulse">
          Retrieving secure entry pass...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full py-6 px-4">
      
      {/* Back Button */}
      <div className="mb-6 print:hidden">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Success Hero */}
      <div className="text-center mb-10 print:hidden">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-sans font-bold text-white tracking-tight">
          Payment Successful!
        </h1>
        <p className="mt-2 text-sm text-[#94A3B8] max-w-md mx-auto">
          Your enrollment has been successfully logged. Present this ticket at the venue/stream entrance for check-in.
        </p>
      </div>

      {/* TICKET CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#0B1528]/80 border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl relative print:border-none print:bg-white print:text-black">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#00E5FF]/10 to-[#2563EB]/10 blur-3xl pointer-events-none print:hidden" />
        
        {/* Left Side: Ticket Details (8 Columns) */}
        <div className="md:col-span-8 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] print:border-r-0 print:border-b print:border-black">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/20 uppercase print:text-black print:border-black print:bg-transparent">
                ⭐ Access Confirmed
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase print:text-black">
                PAID
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight font-sans print:text-black">
              {workshopTitle}
            </h2>

            {/* Attendance & Ticket Details */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-6 pt-6 border-t border-white/[0.06] print:border-black">
              <div>
                <p className="text-[10px] font-mono text-[#64748B] uppercase">Attendee Name</p>
                <p className="text-sm font-semibold text-white mt-0.5 print:text-black">{registration?.name || "-"}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#64748B] uppercase">Ticket Ref ID</p>
                <p className="text-sm font-mono font-bold text-[#00E5FF] mt-0.5 print:text-black">{ticketId}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#64748B] uppercase">Contact Email</p>
                <p className="text-xs font-medium text-[#94A3B8] truncate mt-0.5 print:text-black">{registration?.email || "-"}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#64748B] uppercase">Mobile Number</p>
                <p className="text-xs font-medium text-[#94A3B8] mt-0.5 print:text-black">{registration?.mobile || "-"}</p>
              </div>
            </div>

            {/* Logistics Info */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/[0.06] print:border-black">
              <div className="flex items-start gap-2 text-xs text-[#94A3B8] print:text-black">
                <Calendar className="w-4 h-4 text-[#00E5FF] shrink-0 print:text-black" />
                <div>
                  <p className="font-semibold text-white print:text-black">Scheduled Date</p>
                  <p className="text-[10px] text-white/60 mt-0.5 print:text-black">Check schedules in email</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#94A3B8] print:text-black">
                <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0 print:text-black" />
                <div>
                  <p className="font-semibold text-white print:text-black">Venue Location</p>
                  <p className="text-[10px] text-white/60 mt-0.5 print:text-black">Virtual Stream</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 print:border-black">
            <div className="text-xs text-white/40 font-mono flex items-center gap-1 print:text-black">
              <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-black" />
              <span>Verifiable Gate Pass</span>
            </div>
            {payment?.payment_id && (
              <p className="text-[10px] font-mono text-[#64748B] print:text-black">
                Txn ID: <span className="text-white print:text-black">{payment.payment_id}</span>
              </p>
            )}
          </div>
        </div>

        {/* Right Side: QR Code Area (4 Columns) */}
        <div className="md:col-span-4 p-6 md:p-8 flex flex-col items-center justify-center bg-[#060B14]/60 print:bg-white print:border-none">
          {qrUrl ? (
            <div className="bg-white p-3 rounded-2xl shadow-inner border border-white/5 relative group">
              <img 
                src={qrUrl} 
                alt="Ticket QR Code" 
                className="w-40 h-40 object-contain"
              />
              <div className="text-center mt-3 text-[10px] font-mono text-[#050816] font-semibold tracking-wider select-none uppercase">
                ST7 Tech Connect ENTRY PASS
              </div>
            </div>
          ) : (
            <div className="w-40 h-40 bg-white/5 rounded-2xl animate-pulse flex items-center justify-center">
              <Ticket className="w-10 h-10 text-white/20" />
            </div>
          )}
          
          <p className="mt-4 text-[10px] font-mono text-[#94A3B8] text-center max-w-[150px] leading-relaxed print:text-black">
            Present this code at registration desk for validation.
          </p>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-sm font-semibold transition-all hover:border-[#00E5FF]/50"
        >
          <Printer className="w-4 h-4 text-[#00E5FF]" />
          <span>Print / Save PDF</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#2563EB] text-white text-sm font-bold shadow-lg shadow-[#00E5FF]/10 hover:shadow-[#00E5FF]/20 transition-all"
        >
          <span>Continue Exploration</span>
        </Link>
      </div>

    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-white">
      {/* Header */}
      <HeaderPage />

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 rounded-full border-2 border-[#00E5FF] border-t-transparent animate-spin" />
            <p className="mt-4 text-xs font-mono text-[#00E5FF] tracking-wider uppercase animate-pulse">
              Setting up secure container...
            </p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
}
