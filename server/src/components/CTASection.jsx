import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ExternalLink, ChevronRight } from 'lucide-react';
import { events } from '../data/events';
import sMarkImg from '../assets/srijan-s-mark.png';

export default function CTASection() {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <section id="register-cta" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-b from-space-900/90 to-space-950/95 border border-amber-500/30 shadow-2xl shadow-black/80 backdrop-blur-xl text-center overflow-hidden">
          {/* Subtle top amber border highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          {/* S Mark Badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-space-850 border border-amber-500/30 mb-6 shadow-md shadow-amber-500/10">
            <img src={sMarkImg} alt="Srijan" className="w-9 h-9 object-cover rounded-lg" />
          </div>

          {/* Tagline micro banner */}
          <div className="mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
              TOGETHER, WE CREATE
            </span>
          </div>

          {/* Exact Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mb-4">
            READY TO CREATE?
          </h2>

          {/* Exact Text */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Choose your challenge. Build your idea. Be part of Srijan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-6">
            <Link
              to="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setShowPicker(!showPicker)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/15 hover:border-amber-500/40 backdrop-blur-md transition-all duration-200"
            >
              <span>REGISTER NOW</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Direct Event Registration Quick Selector Dropdown/Drawer */}
          {showPicker && (
            <div className="mt-8 pt-8 border-t border-white/10 max-w-2xl mx-auto text-left animate-fade-in">
              <p className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4 text-center">
                Select an event to open its online registration form:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {events.map((evt) => (
                  <Link
                    key={evt.id}
                    to={`/register/${evt.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-space-950/80 border border-white/10 hover:border-amber-500/50 hover:bg-space-850 transition-all group"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold block">
                        EVENT {evt.number}
                      </span>
                      <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {evt.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-amber-400">
                      <span>Register</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-xs font-mono text-slate-400">
            Registration is free & open to eligible college teams.
          </div>
        </div>
      </div>
    </section>
  );
}
