import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Terminal, Shield, ChevronDown } from 'lucide-react';
import srijanLogo from '../assets/srijan-logo.jpg';

export default function Hero() {
  const scrollToEvents = (e) => {
    e.preventDefault();
    const el = document.getElementById('events-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRegister = (e) => {
    e.preventDefault();
    const el = document.getElementById('register-cta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 sm:pb-24 overflow-hidden tech-grid-bg">
      {/* Soft atmospheric cosmic glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-orange-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Brand Logo Presentation */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative group">
            {/* Glowing aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
            
            {/* Logo frame preserving exact proportions */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden border border-amber-500/40 bg-space-950 shadow-2xl p-1">
              <img
                src={srijanLogo}
                alt="SRIJAN — Together, We Create"
                className="w-full h-full object-cover rounded-xl transform group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Technical Event Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-space-900/90 text-amber-400 border border-amber-500/30 mb-5 shadow-lg shadow-black/50 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Annual College Technical Fest</span>
        </div>

        {/* SRIJAN Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white mb-3 sm:mb-4">
          SRIJAN <span className ="text-gold-metallic">2026</span>
        </h1>

        {/* Exact Tagline */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-gold-metallic">
            TOGETHER, WE CREATE
          </h2>
        </div>

        {/* Official Subtitle Description */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          &ldquo;A Technical Fest Where Ideas Turn Into Innovation.&rdquo;
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
          <a
            href="#events-section"
            onClick={scrollToEvents}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="#register-cta"
            onClick={scrollToRegister}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-space-900/90 hover:bg-space-850 hover:text-white border border-white/15 hover:border-amber-500/40 backdrop-blur-md shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Register Now</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </a>
        </div>

        {/* Subtle Tech Highlights Strip */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center text-xs sm:text-sm text-slate-400 font-mono">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-display">05</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider">Competitions</div>
          </div>
          <div className="border-x border-white/10">
            <div className="text-xl sm:text-2xl font-bold text-amber-400 font-display">100%</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider">Innovation</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white font-display">2026</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider">Edition</div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#events-section"
            onClick={scrollToEvents}
            className="text-slate-500 hover:text-amber-400 transition-colors p-2"
            aria-label="Scroll to events"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
