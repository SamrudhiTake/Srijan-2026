import React from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import EventGrid from '../components/EventGrid';
import TechFlow from '../components/TechFlow';
import WhySrijan from '../components/WhySrijan';
import CTASection from '../components/CTASection';
import { events, siteConfig } from '../data/events';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Brief & Technical Flow */}
      <section className="py-16 sm:py-24 relative border-t border-white/5 bg-space-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="ABOUT SRIJAN"
            title="A Platform Where Ideas"
            highlight="Turn Into Innovation"
            subtitle={siteConfig.aboutText}
          />

          {/* "IDEA → BUILD → COMPETE → CREATE" Flow */}
          <TechFlow />

          <div className="text-center mt-6">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 group"
            >
              <span>Read more about Srijan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Events Section (Exactly 5 Events) */}
      <section id="events-section" className="py-20 sm:py-28 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="COMPETITIONS & CHALLENGES"
            title="Featured"
            highlight="Technical Events"
            subtitle="Explore our five flagship competitions. Dive into challenges, review guidelines, and register your team."
          />

          <EventGrid events={events} />
        </div>
      </section>

      {/* 4. Why Srijan / Highlights */}
      <WhySrijan />

      {/* 5. Ready to Create CTA */}
      <CTASection />
    </div>
  );
}
