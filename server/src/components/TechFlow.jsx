import React from 'react';
import { Lightbulb, Hammer, Trophy, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  {
    phase: "01",
    label: "IDEA",
    sub: "Conceptualize & Innovate",
    icon: Lightbulb,
    color: "from-amber-500 to-yellow-500"
  },
  {
    phase: "02",
    label: "BUILD",
    sub: "Engineer & Prototype",
    icon: Hammer,
    color: "from-orange-500 to-amber-500"
  },
  {
    phase: "03",
    label: "COMPETE",
    sub: "Evaluate & Excel",
    icon: Trophy,
    color: "from-amber-600 to-orange-600"
  },
  {
    phase: "04",
    label: "CREATE",
    sub: "Deliver & Inspire",
    icon: Sparkles,
    color: "from-yellow-400 to-amber-500"
  }
];

export default function TechFlow() {
  return (
    <div className="py-10">
      <div className="text-center mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          The Engineering Cycle
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Desktop connection line */}
        <div className="hidden md:block absolute top-1/2 left-8 right-8 h-[2px] -translate-y-1/2 bg-gradient-to-r from-amber-500/20 via-orange-500/40 to-amber-500/20 z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-space-900/90 backdrop-blur-md border border-white/10 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step number badge */}
                <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mb-3">
                  PHASE {step.phase}
                </span>

                {/* Step Icon */}
                <div className="w-14 h-14 rounded-2xl bg-space-950 border border-white/10 group-hover:border-amber-400/50 flex items-center justify-center text-amber-400 group-hover:text-amber-300 transition-colors shadow-inner mb-4">
                  <Icon className="w-7 h-7 transform group-hover:scale-110 transition-transform" />
                </div>

                {/* Title */}
                <h4 className="text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors mb-1 tracking-wider">
                  {step.label}
                </h4>

                {/* Subtitle */}
                <p className="text-xs text-slate-400 font-mono">
                  {step.sub}
                </p>

                {/* Mobile / flow arrow on cards except last */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden mt-4 text-amber-500/60 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 rotate-90 sm:rotate-0" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
