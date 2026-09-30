import React from 'react';
import SectionHeading from '../components/SectionHeading';
import TechFlow from '../components/TechFlow';
import WhySrijan from '../components/WhySrijan';
import CTASection from '../components/CTASection';
import { siteConfig } from '../data/events';
import srijanLogo from '../assets/srijan-logo.jpg';
import { Sparkles, Terminal, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="BRAND & VISION"
          title="About"
          highlight="SRIJAN"
          subtitle={siteConfig.aboutText}
        />

        {/* Central Brand Narrative */}
        <div className="max-w-4xl mx-auto my-12 p-8 sm:p-12 rounded-3xl bg-space-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-amber-500/40 bg-space-950 flex-shrink-0 shadow-lg shadow-amber-500/10">
              <img
                src={srijanLogo}
                alt="SRIJAN"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-2">
                {siteConfig.tagline}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Where Ideas Turn Into Innovation
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {siteConfig.aboutText}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-space-950/80 border border-white/5 text-sm text-slate-300">
            <p>
              Designed as a modern, futuristic platform, Srijan provides college students the stage to demonstrate technical prowess, experiment boldly, and collaborate with like-minded peers across 5 specialized technical competitions.
            </p>
          </div>
        </div>

        {/* Technical Flow: IDEA → BUILD → COMPETE → CREATE */}
        {/* <div className="my-16">
          <TechFlow />
        </div> */}
      </div>

      {/* Why Srijan Highlights */}
      {/* <WhySrijan /> */}

      {/* Conversion CTA */}
      <CTASection />
    </div>
  );
}
