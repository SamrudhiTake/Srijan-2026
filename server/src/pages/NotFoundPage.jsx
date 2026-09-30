import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import sMarkImg from '../assets/srijan-s-mark.png';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-space-900/80 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl overflow-hidden border border-amber-500/40 bg-space-950 p-1">
          <img src={sMarkImg} alt="Srijan" className="w-full h-full object-cover" />
        </div>
        <div className="text-5xl font-mono font-bold text-gold-metallic mb-2">404</div>
        <h1 className="text-2xl font-display font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-sm text-slate-300 mb-8">
          The requested path does not exist in this sector. Navigate back to explore Srijan competitions and events.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-orange-500/25"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
