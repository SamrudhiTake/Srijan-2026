import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { events } from '../data/events';
import RegistrationForm from '../components/RegistrationForm';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function Registration() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Find the selected event or default to the first event
  const selectedEvent = eventId
    ? events.find((e) => e.id.toLowerCase() === eventId.toLowerCase() || e.id.toLowerCase() === `event-${eventId.toLowerCase()}`)
    : events[0];

  const handleSelectEvent = (newId) => {
    navigate(`/register/${newId}`);
  };

  if (!selectedEvent) {
    return (
      <div className="pt-36 pb-20 text-center max-w-xl mx-auto px-4 min-h-[60vh]">
        <div className="inline-block p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-6">
          <Sparkles className="w-8 h-8 mx-auto" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-3">Event Not Found</h1>
        <p className="text-slate-400 text-sm mb-8">
          The requested event could not be found for registration.
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Events</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-6 max-w-3xl mx-auto">
          <Link
            to={`/events/${selectedEvent.id}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Event Details</span>
          </Link>
        </div>

        {/* Registration Form Component */}
        <RegistrationForm
          event={selectedEvent}
          eventsList={events}
          onSelectEvent={handleSelectEvent}
        />
      </div>
    </div>
  );
}