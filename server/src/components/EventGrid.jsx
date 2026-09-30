import React, { useState } from 'react';
import EventCard from './EventCard';
import BrochureModal from './BrochureModal';

export default function EventGrid({ events, title, subtitle }) {
  const [selectedEventForBrochure, setSelectedEventForBrochure] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...new Set(events.map(e => e.category))];

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Optional Category Pills if there are multiple categories */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20'
                  : 'bg-space-900/80 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Events (5 events: 3 on first row, 2 centered or 1-2-3 responsive grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onOpenBrochure={(ev) => setSelectedEventForBrochure(ev)}
          />
        ))}
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
