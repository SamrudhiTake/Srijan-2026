import React, { useState } from 'react';
import IndividualRegistrationForm from './IndividualRegistrationForm';
import TeamRegistrationForm from './TeamRegistrationForm';
import RegistrationSuccess from './RegistrationSuccess';
import { submitRegistration } from '../services/api';
import { AlertCircle, Calendar, MapPin, Users, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DynamicIcon from './DynamicIcon';

export default function RegistrationForm({ event, eventsList, onSelectEvent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [completedRegistration, setCompletedRegistration] = useState(null);

  if (!event) return null;

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await submitRegistration(payload);
      if (response.success && response.data) {
        setCompletedRegistration(response.data);
      } else {
        throw new Error(response.message || 'Registration could not be completed.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong while processing your registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If successfully registered, show the Success View
  if (completedRegistration) {
    return (
      <RegistrationSuccess
        registration={completedRegistration}
        onReset={() => setCompletedRegistration(null)}
      />
    );
  }

  const isTeamEvent = event.registrationType === 'team';

  return (
    <div className="max-w-3xl mx-auto">
      {/* Event Header Banner Card */}
      <div className="relative rounded-3xl bg-space-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/5 rounded-bl-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                EVENT {event.number}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                {event.category}
              </span>
              <span className={`text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                isTeamEvent ? 'bg-orange-500/10 text-orange-300 border-orange-500/20' : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
              }`}>
                {isTeamEvent ? `Team Event (${event.minTeamSize || 2}–${event.maxTeamSize || 4} Members)` : 'Individual Participation'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Register for {event.name}
            </h1>
            {event.tagline && (
              <p className="text-xs sm:text-sm font-mono text-amber-400/80 mt-1">
                {event.tagline}
              </p>
            )}
          </div>

          {/* Event Switcher Dropdown */}
          {eventsList && eventsList.length > 1 && (
            <div className="sm:self-start">
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Switch Event:
              </label>
              <select
                value={event.id}
                onChange={(e) => onSelectEvent(e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-space-950 border border-white/10 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {eventsList.map((evt) => (
                  <option key={evt.id} value={evt.id} className="bg-space-950">
                    [{evt.number}] {evt.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
          <div className="space-y-1">
            <p className="font-semibold text-red-200">Registration Notice</p>
            <p className="text-xs sm:text-sm leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Registration Card */}
      <div className="rounded-3xl bg-space-900/80 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-xl">
        {isTeamEvent ? (
          <TeamRegistrationForm
            event={event}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <IndividualRegistrationForm
            event={event}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
