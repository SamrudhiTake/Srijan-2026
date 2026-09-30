import React from 'react';
import SectionHeading from './SectionHeading';
import DynamicIcon from './DynamicIcon';
import { srijanPillars } from '../data/events';

export default function WhySrijan() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="SPIRIT OF SRIJAN"
          title="Engineered For"
          highlight="Excellence"
          subtitle="Four core pillars guiding the ethos of Srijan — empowering student technologists to push boundaries."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {srijanPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative flex flex-col justify-between p-7 rounded-2xl bg-space-900/80 backdrop-blur-md border border-white/10 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-space-850 border border-white/10 group-hover:border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:text-amber-300 transition-colors shadow-sm">
                    <DynamicIcon name={pillar.icon} className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-amber-400 transition-colors">
                    {pillar.step}
                  </span>
                </div>

                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/80 mb-1 block">
                  {pillar.tag}
                </span>

                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-mono text-slate-500 group-hover:text-amber-400/80 transition-colors">
                <span>SRIJAN 2026</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
