import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Instagram, ExternalLink, ArrowUp } from 'lucide-react';
import { events, siteConfig } from '../data/events';
import sMarkImg from '../assets/srijan-s-mark.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-space-950 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle top amber gradient rim */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 mb-12">
          
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 group-hover:border-amber-400 transition-colors bg-space-900 flex-shrink-0">
                <img src={sMarkImg} alt="Srijan S Emblem" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black tracking-wider text-2xl text-white group-hover:text-amber-300 transition-colors">
                  SRIJAN
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-amber-400">
                  TOGETHER, WE CREATE
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              A college-level technical fest where ideas turn into innovation. Empowering student innovators, builders, and problem solvers.
            </p>

            {/* Social Links Placeholders */}
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                {/* PLACEHOLDER: Replace instagram URL in src/data/events.js */}
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (Placeholder Link)"
                  className="w-9 h-9 rounded-lg bg-space-900 border border-white/10 hover:border-amber-400/50 hover:text-amber-400 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* PLACEHOLDER: Replace LinkedIn URL in src/data/events.js */}
                {/* <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (Placeholder Link)"
                  className="w-9 h-9 rounded-lg bg-space-900 border border-white/10 hover:border-amber-400/50 hover:text-amber-400 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a> */}

                {/* PLACEHOLDER: Replace Email in src/data/events.js */}
                <a
                  href={siteConfig.socials.email}
                  aria-label="Email (Placeholder Link)"
                  className="w-9 h-9 rounded-lg bg-space-900 border border-white/10 hover:border-amber-400/50 hover:text-amber-400 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-slate-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#register-cta" className="text-slate-300 hover:text-white transition-colors">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 & 5: Event Links (5 events) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-4">
              Events Directory
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {events.map((evt) => (
                <li key={evt.id}>
                  <Link
                    to={`/events/${evt.id}`}
                    className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="font-mono text-xs text-amber-500/70">[{evt.number}]</span>
                    <span>{evt.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; 2026 Srijan. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-500/80">TOGETHER, WE CREATE</span>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
