import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  FileText,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  AlertCircle,
  Share2
} from 'lucide-react';
import DynamicIcon from './DynamicIcon';

export default function EventDetails({ event, onOpenBrochure }) {
  if (!event) return null;

  const handleBrochureClick = (e) => {
    e.preventDefault();
    if (event.brochureAvailable && event.brochure) {
      window.open(event.brochure, '_blank', 'noopener,noreferrer');
    } else if (onOpenBrochure) {
      onOpenBrochure(event);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (event.registrationUrl) {
      window.open(event.registrationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation Breadcrumb */}
      <div className="mb-8">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Main Event Header Card */}
      <div className="relative rounded-3xl bg-space-900/90 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-bl-full pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="font-mono text-xs font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                EVENT {event.number}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 bg-white/5 px-3 py-1 rounded-md border border-white/10">
                {event.category}
              </span>
            </div>

            {/* Event Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mb-3">
              {event.name}
            </h1>

            {/* Tagline */}
            {event.tagline && (
              <p className="text-sm sm:text-base font-mono text-amber-400/90 mb-6">
                {event.tagline}
              </p>
            )}

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {event.description}
            </p>
          </div>

          {/* Large Event Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-space-850 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-lg shadow-amber-500/10">
            <DynamicIcon name={event.icon} className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </div>

        {/* Action Buttons bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            to={`/register/${event.id}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleBrochureClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 transition-colors"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{event.brochureAvailable ? "Download Brochure" : "View Brochure"}</span>
          </button>
        </div>
      </div>

      {/* Grid: Event Meta & Logistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Date Box */}
        <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Event Date
            </div>
            <div className="text-base font-semibold text-white">
              {event.date}
            </div>
          </div>
        </div>

        {/* Venue Box */}
        <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Venue
            </div>
            <div className="text-base font-semibold text-white">
              {event.venue}
            </div>
          </div>
        </div>

        {/* Team Size Box */}
        <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10 flex items-start gap-4 sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Team Structure
            </div>
            <div className="text-base font-semibold text-white">
              {event.teamSize}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Overview & Rules Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column: Full Overview */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-space-900/80 border border-white/10">
            <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Event Overview</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {event.fullDescription || event.description}
            </p>
          </div>

          {/* Rules & Guidelines */}
          <div className="p-6 sm:p-8 rounded-2xl bg-space-900/80 border border-white/10">
            <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Rules & Regulations</span>
            </h3>

            {event.rules && event.rules.length > 0 ? (
              <ul className="space-y-3">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 italic">
                Details will be announced soon.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Coordination & Notice */}
        <div className="space-y-6">
          {/* Important Notice Card */}
          <div className="p-6 rounded-2xl bg-space-950/80 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-3">
              <AlertCircle className="w-4 h-4" />
              <span>Registration Notice</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Online registrations are officially open. Complete the form to reserve your spot and receive your unique Registration ID.
            </p>
            <Link
              to={`/register/${event.id}`}
              className="w-full py-2.5 px-4 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Register Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Coordinators placeholder if available */}
          {event.coordinators && event.coordinators.length > 0 && (
            <div className="p-6 rounded-2xl bg-space-900/80 border border-white/10">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
                Event Coordination
              </h4>
              <div className="space-y-3">
                {event.coordinators.map((c, i) => (
                  <div key={i} className="text-sm">
                    <div className="text-white font-medium">{c.name}</div>
                    <div className="text-xs text-amber-400/80 font-mono">{c.contact}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
