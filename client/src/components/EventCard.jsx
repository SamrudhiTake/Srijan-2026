import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, ArrowRight, Sparkles, Calendar, MapPin, Users } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

/**
 * EventCard Component
 * Fully decoupled reusable card accepting event data via props.
 * Cleanly prepared for future API / MongoDB integration.
 */
export default function EventCard({ event, onOpenBrochure }) {
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
    <div className="group relative flex flex-col justify-between rounded-2xl bg-space-900/80 backdrop-blur-md border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 p-6 sm:p-7 overflow-hidden">
      {/* Subtle top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header: Event Number & Category */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              EVENT {event.number}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              {event.category}
            </span>
          </div>

          {/* Event Icon with subtle glow */}
          <div className="w-10 h-10 rounded-xl bg-space-850 border border-white/10 group-hover:border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:text-amber-300 group-hover:scale-105 transition-all duration-300 shadow-sm">
            <DynamicIcon name={event.icon} className="w-5 h-5" />
          </div>
        </div>

        {/* Event Name */}
        <h3 className="text-2xl font-display font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
          {event.name}
        </h3>

        {/* Tagline / Subtitle */}
        {event.tagline && (
          <p className="text-xs font-mono text-amber-400/80 uppercase tracking-wide mb-3">
            {event.tagline}
          </p>
        )}

        {/* Short Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
          {event.description}
        </p>

        {/* Meta badges (Date / Venue / Team) */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-3 border-t border-white/5 mb-6">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-hidden">
            <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{event.teamSize}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="space-y-2.5 pt-2">
        <div className="grid grid-cols-2 gap-2">
          {/* View Details Button */}
          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* View Brochure Button */}
          <button
            onClick={handleBrochureClick}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-300 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            title={event.brochureAvailable ? "Open Brochure PDF" : "Brochure Coming Soon"}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Brochure</span>
          </button>
        </div>

        {/* Prominent Register Button */}
        <Link
          to={`/register/${event.id}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <span>Register Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
