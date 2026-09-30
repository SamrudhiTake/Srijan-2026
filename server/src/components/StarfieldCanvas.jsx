import React, { useEffect, useRef } from 'react';

/**
 * StarfieldCanvas
 * High-performance cosmic starfield background with subtle particles and celestial drift.
 * Runs on HTML5 Canvas without heavy external libraries.
 */
export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const count = Math.min(120, Math.floor((width * height) / 10000));
    const particles = [];

    const colors = [
      'rgba(255, 255, 255, ',     // Pure white starlight
      'rgba(245, 158, 11, ',     // Srijan amber gold
      'rgba(251, 146, 60, ',     // Soft solar orange
      'rgba(56, 189, 248, '      // Deep cosmic cyan
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        increasing: Math.random() > 0.5
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Twinkle logic
        if (p.increasing) {
          p.alpha += p.twinkleSpeed;
          if (p.alpha >= 0.8) p.increasing = false;
        } else {
          p.alpha -= p.twinkleSpeed;
          if (p.alpha <= 0.15) p.increasing = true;
        }

        // Movement
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.colorBase + p.alpha + ')';
        ctx.shadowColor = p.colorBase + '0.8)';
        ctx.shadowBlur = p.radius > 1.2 ? 6 : 0;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
