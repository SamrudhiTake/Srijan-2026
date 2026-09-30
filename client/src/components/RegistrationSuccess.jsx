import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Copy, Check, Printer, ArrowRight, Calendar, Users, School, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import sMarkImg from '../assets/srijan-s-mark.png';

export default function RegistrationSuccess({ registration, onReset }) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!registration) return null;

  const {
    registrationId,
    eventName,
    registrationType,
    participant,
    teamName,
    teamLeader,
    members = [],
    registeredAt,
  } = registration;

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(registeredAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-2xl mx-auto animate-fade-in print:max-w-none print:m-0 print:p-0">
      <div className="relative rounded-3xl bg-space-900/90 border border-amber-500/40 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-amber-500/10 text-center print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Glow behind badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none print:hidden" />

        {/* Success Icon */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20 print:hidden">
          <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-amber-400" />
        </div>

        {/* Headings */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-3 print:border-slate-300 print:text-slate-800">
          Official Confirmation
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-2 print:text-black">
          Registration Successful!
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mb-6 print:text-slate-600">
          Thank you for registering for Srijan 2026. Your entry has been recorded in the database.
        </p>

        {/* REGISTRATION ID BADGE */}
        <div className="p-4 sm:p-6 rounded-2xl bg-space-950/90 border border-amber-500/30 mb-6 print:border-black print:bg-slate-50">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 print:text-slate-700">
            Official Registration ID
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl md:text-4xl font-mono font-black tracking-wider text-gold-metallic print:text-black">
              {registrationId}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors print:hidden"
              title="Copy Registration ID"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-amber-400/80 font-mono mt-2 print:text-slate-500">
            Please save or screenshot this ID for event-day entry and verification.
          </p>
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-space-950/60 border border-white/10 text-left text-xs sm:text-sm mb-6 print:border-slate-300 print:bg-white">
          <div>
            <span className="text-slate-400 font-mono text-[11px] block">Event:</span>
            <span className="text-white font-semibold print:text-black">{eventName}</span>
          </div>

          <div>
            <span className="text-slate-400 font-mono text-[11px] block">Type:</span>
            <span className="text-white font-semibold uppercase print:text-black">{registrationType}</span>
          </div>

          {registrationType === 'team' ? (
            <>
              <div>
                <span className="text-slate-400 font-mono text-[11px] block">Team Name:</span>
                <span className="text-amber-400 font-semibold print:text-black">{teamName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[11px] block">Team Leader:</span>
                <span className="text-white font-semibold print:text-black">{teamLeader?.name}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-slate-400 font-mono text-[11px] block">Participant:</span>
                <span className="text-amber-400 font-semibold print:text-black">{participant?.name}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[11px] block">College:</span>
                <span className="text-white font-semibold print:text-black truncate block">{participant?.college}</span>
              </div>
            </>
          )}

          <div className="col-span-2 pt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono print:border-slate-200">
            Registered on: {formattedDate}
          </div>
        </div>

        {/* Expandable Full Registration Details */}
        <div className="mb-6 print:block">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors py-1 print:hidden"
          >
            <span>{showDetails ? 'Hide' : 'View'} Full Registration Details</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {(showDetails || typeof window !== 'undefined') && (
            <div className={`mt-4 p-4 rounded-xl bg-space-950/80 border border-white/10 text-left text-xs space-y-3 ${showDetails ? 'block' : 'hidden print:block'}`}>
              {registrationType === 'team' ? (
                <>
                  <div className="border-b border-white/10 pb-2">
                    <span className="font-mono font-bold text-amber-300 block">Team Leader: {teamLeader?.name}</span>
                    <span className="text-slate-400 block">{teamLeader?.email} | {teamLeader?.phone}</span>
                    <span className="text-slate-400 block">{teamLeader?.college} ({teamLeader?.branch}, {teamLeader?.year})</span>
                  </div>
                  {members.map((m, idx) => (
                    <div key={idx} className="border-b border-white/5 last:border-none pb-2">
                      <span className="font-mono font-bold text-slate-200 block">Member {idx + 2}: {m.name}</span>
                      <span className="text-slate-400 block">{m.email} | {m.phone}</span>
                      <span className="text-slate-400 block">{m.college} ({m.branch}, {m.year})</span>
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  <span className="text-slate-300 block"><strong className="text-white">Email:</strong> {participant?.email}</span>
                  <span className="text-slate-300 block"><strong className="text-white">Phone:</strong> {participant?.phone}</span>
                  <span className="text-slate-300 block"><strong className="text-white">College:</strong> {participant?.college}</span>
                  <span className="text-slate-300 block"><strong className="text-white">Branch:</strong> {participant?.branch} ({participant?.year})</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print / Download Receipt</span>
          </button>

          <Link
            to="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-orange-500/20 transition-all"
          >
            <span>Explore Other Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
