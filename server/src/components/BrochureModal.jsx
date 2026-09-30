import React from 'react';
import { X, Clock, FileText, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BrochureModal({ isOpen, onClose, event }) {
  if (!isOpen || !event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-space-900 border border-amber-500/30 shadow-2xl shadow-amber-500/10 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 border border-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
          <Clock className="w-8 h-8 animate-pulse-subtle" />
        </div>

        {/* Title */}
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/25 mb-3">
          Event {event.number} — {event.name}
        </span>
        <h3 id="modal-title" className="text-2xl font-display font-bold text-white mb-2">
          Brochure Coming Soon
        </h3>

        {/* Message */}
        <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
          The official informational brochure and detailed problem statements for{' '}
          <span className="text-amber-400 font-semibold">{event.name}</span> are currently being finalized by the organizing committee.
        </p>

        {/* Informative box */}
        <div className="p-3.5 rounded-xl bg-space-950/80 border border-white/10 text-xs sm:text-sm text-slate-400 text-left mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-slate-200 font-medium mb-1">Stay Tuned!</p>
            <p>
              Once published, the brochure will be directly downloadable here and sent to all pre-registered participants.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Close
          </button>
          <Link
            to={`/register/${event.id}`}
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-orange-500/20 transition-all"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
