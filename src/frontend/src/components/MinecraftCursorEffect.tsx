import { useEffect, useRef } from "react";

// Standard Galactic Alphabet characters (approximated with unicode)
// These are the same cryptic symbols seen floating from bookshelves near enchanting tables
const SGA_CHARS = [
  "ᔑ",
  "ᗑ",
  "ᒲ",
  "ᓵ",
  "↸",
  "ᐑ",
  "⚍",
  "⎓",
  "⌇",
  "꧹",
  "ᒷ",
  "ᓭ",
  "ᑑ",
  "ꖌ",
  "ꖎ",
  "ꖌ",
  "ᒲ",
  "⍊",
  "∷",
  "⌦",
  "⚶",
  "⍙",
  "⌂",
  "⎗",
  "⌀",
  "⍾",
  "⌁",
  "⍡",
  "⌬",
  "⍫",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  char: string;
  size: number;
}

export default function MinecraftCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      // Spawn 1-2 SGA rune particles per move event - gray enchanting table particles
      const count = Math.random() > 0.4 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const char = SGA_CHARS[Math.floor(Math.random() * SGA_CHARS.length)];
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 18,
          y: e.clientY + (Math.random() - 0.5) * 18,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(Math.random() * 1.8 + 0.4),
          life: 70,
          maxLife: 70,
          char,
          size: Math.random() * 5 + 10,
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        const alpha = p.life / p.maxLife;
        p.x += p.vx;
        p.y += p.vy;
        // Slight drift / wobble
        p.vx += (Math.random() - 0.5) * 0.08;
        p.life--;

        // Gray color - like the enchanting table bookshelf particles
        // Slightly lighter as they fade for a ghost-like feel
        const grayVal = Math.floor(140 + 60 * alpha);
        const color = `rgba(${grayVal}, ${grayVal}, ${grayVal + 10}, ${alpha})`;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = `bold ${p.size}px 'Courier New', monospace`;
        ctx.fillStyle = color;
        ctx.shadowColor = `rgba(180, 180, 200, ${alpha * 0.6})`;
        ctx.shadowBlur = 4 * alpha;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
