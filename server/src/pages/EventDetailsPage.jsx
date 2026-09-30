import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { events } from '../data/events';
import EventDetails from '../components/EventDetails';
import BrochureModal from '../components/BrochureModal';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const [selectedEventForBrochure, setSelectedEventForBrochure] = useState(null);

  // Find matching event from centralized data
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="pt-36 pb-20 text-center max-w-xl mx-auto px-4 min-h-[60vh]">
        <div className="inline-block p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-6">
          <Sparkles className="w-8 h-8 mx-auto" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-3">Event Not Found</h1>
        <p className="text-slate-400 text-sm mb-8">
          The requested event could not be found. Please browse through the five flagship events.
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-md shadow-orange-500/25"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Events</span>
        </Link>
      </div>
    );
  }

  // Find next and other events
  const otherEvents = events.filter((e) => e.id !== event.id);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Event Details Content */}
      <EventDetails
        event={event}
        onOpenBrochure={(ev) => setSelectedEventForBrochure(ev)}
      />

      {/* Quick Navigation to Other Events */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-12 border-t border-white/10">
        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <span>Other Srijan Competitions</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherEvents.map((oe) => (
            <Link
              key={oe.id}
              to={`/events/${oe.id}`}
              className="p-4 rounded-xl bg-space-900/60 hover:bg-space-850 border border-white/10 hover:border-amber-500/40 transition-all group"
            >
              <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">
                EVENT {oe.number}
              </span>
              <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors block truncate">
                {oe.name}
              </span>
              <span className="text-xs text-slate-400 block truncate mt-1">
                {oe.category}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Brochure Coming Soon Modal */}
      <BrochureModal
        isOpen={Boolean(selectedEventForBrochure)}
        onClose={() => setSelectedEventForBrochure(null)}
        event={selectedEventForBrochure}
      />
    </div>
  );
}
