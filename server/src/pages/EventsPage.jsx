import React from 'react';
import SectionHeading from '../components/SectionHeading';
import EventGrid from '../components/EventGrid';
import CTASection from '../components/CTASection';
import { events } from '../data/events';

export default function EventsPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SRIJAN 2026 COMPETITIONS"
          title="All Six"
          highlight="Flagship Events"
          subtitle="Explore the 6 core competitions of Srijan. Review guidelines, download brochures, and proceed to official Google Form registration."
        />

        <EventGrid events={events} />
      </div>

      <div className="mt-16">
        <CTASection />
      </div>
    </div>
  );
}
