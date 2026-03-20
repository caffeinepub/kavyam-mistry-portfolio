import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  type: "rune" | "pixel";
  char?: string;
  color: string;
  size: number;
}

const RUNES = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";
const PIXEL_COLORS = [
  "#00ffff",
  "#00ff44",
  "#ffaa00",
  "#aa00ff",
  "#ff00ff",
  "#00ccff",
];

export default function MinecraftCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
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
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Spawn enchanting rune particles
      for (let i = 0; i < 2; i++) {
        const rune = RUNES[Math.floor(Math.random() * RUNES.length)];
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(Math.random() * 1.5 + 0.5),
          life: 80,
          maxLife: 80,
          type: "rune",
          char: rune,
          color: Math.random() > 0.5 ? "#cc44ff" : "#aa00ff",
          size: Math.random() * 6 + 10,
        });
      }

      // Spawn block pixel particles
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30,
          maxLife: 30,
          type: "pixel",
          color: PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
          size: Math.floor(Math.random() * 5) + 6,
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
        p.life--;

        if (p.type === "rune") {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.font = `bold ${p.size}px 'Courier New', monospace`;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8 * alpha;
          ctx.fillText(p.char!, p.x, p.y);
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6 * alpha;
          // Pixel-perfect square
          const s = Math.round(p.size);
          ctx.fillRect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), s, s);
          ctx.restore();
        }
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
