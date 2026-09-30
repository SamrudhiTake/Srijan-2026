import React from 'react';

export default function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = "center"
}) {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4 shadow-sm shadow-amber-500/10 ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
        {title}{' '}
        {highlight && (
          <span className="text-gold-metallic">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
