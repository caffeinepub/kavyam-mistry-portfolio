import { useEffect, useRef } from "react";

interface LightningBolt {
  x: number;
  segments: { x1: number; y1: number; x2: number; y2: number }[];
  alpha: number;
  maxAlpha: number;
  age: number;
  lifetime: number;
  branches: LightningBolt[];
}

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

function createLightningBolt(
  x: number,
  startY: number,
  endY: number,
  maxBranches: number,
  depth: number,
): LightningBolt {
  const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
  let cx = x;
  let cy = startY;
  const steps = Math.floor(12 + Math.random() * 10);
  const stepH = (endY - startY) / steps;

  for (let i = 0; i < steps; i++) {
    const nx = cx + (Math.random() - 0.5) * 80;
    const ny = cy + stepH + (Math.random() - 0.5) * 10;
    segments.push({ x1: cx, y1: cy, x2: nx, y2: ny });
    cx = nx;
    cy = ny;
  }

  const branches: LightningBolt[] = [];
  if (depth > 0 && maxBranches > 0) {
    const numBranches = Math.floor(Math.random() * 3) + 1;
    for (let b = 0; b < numBranches; b++) {
      const branchStart = Math.floor(Math.random() * (segments.length - 2));
      const seg = segments[branchStart];
      const branchLen = (endY - seg.y1) * (0.3 + Math.random() * 0.4);
      branches.push(
        createLightningBolt(seg.x2, seg.y2, seg.y2 + branchLen, 0, depth - 1),
      );
    }
  }

  return {
    x,
    segments,
    alpha: 1,
    maxAlpha: 0.7 + Math.random() * 0.3,
    age: 0,
    lifetime: 8 + Math.floor(Math.random() * 6),
    branches,
  };
}

function drawBolt(
  ctx: CanvasRenderingContext2D,
  bolt: LightningBolt,
  alpha: number,
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = `rgba(255, 255, 230, ${alpha})`;
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "#ffffaa";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  for (const seg of bolt.segments) {
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
  }
  ctx.stroke();

  // inner bright core
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
  ctx.lineWidth = 1;
  ctx.shadowBlur = 6;
  ctx.beginPath();
  for (const seg of bolt.segments) {
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
  }
  ctx.stroke();
  ctx.restore();

  for (const branch of bolt.branches) {
    drawBolt(ctx, branch, alpha * 0.65);
  }
}

export default function HerobrineStormBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const boltsRef = useRef<LightningBolt[]>([]);
  const nextBoltRef = useRef<number>(0);
  const flashRef = useRef<{ alpha: number; active: boolean }>({
    alpha: 0,
    active: false,
  });
  const rainRef = useRef<RainDrop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // init rain drops
      const drops: RainDrop[] = [];
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 12 + Math.random() * 10,
          length: 15 + Math.random() * 20,
          opacity: 0.15 + Math.random() * 0.35,
        });
      }
      rainRef.current = drops;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;

    const tick = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      const W = canvas.width;
      const H = canvas.height;

      // Schedule next bolt
      if (time >= nextBoltRef.current) {
        const x = W * 0.1 + Math.random() * W * 0.8;
        boltsRef.current.push(
          createLightningBolt(x, 0, H * (0.6 + Math.random() * 0.35), 3, 2),
        );
        flashRef.current = { alpha: 0.55 + Math.random() * 0.3, active: true };
        nextBoltRef.current = time + 800 + Math.random() * 1700;
      }

      // --- Draw storm sky gradient ---
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0, "#03000a");
      skyGrad.addColorStop(0.4, "#080318");
      skyGrad.addColorStop(1, "#050210");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // --- Lightning flash overlay ---
      if (flashRef.current.active) {
        ctx.fillStyle = `rgba(180, 160, 255, ${flashRef.current.alpha})`;
        ctx.fillRect(0, 0, W, H);
        flashRef.current.alpha -= 0.055;
        if (flashRef.current.alpha <= 0) {
          flashRef.current.active = false;
          flashRef.current.alpha = 0;
        }
      }

      // --- Rain ---
      ctx.save();
      for (const drop of rainRef.current) {
        drop.y += drop.speed;
        drop.x -= drop.speed * 0.15;
        if (drop.y > H + drop.length) {
          drop.y = -drop.length;
          drop.x = Math.random() * W;
        }
        ctx.strokeStyle = `rgba(180, 230, 255, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.length * 0.15, drop.y + drop.length);
        ctx.stroke();
      }
      ctx.restore();

      // --- Lightning bolts ---
      boltsRef.current = boltsRef.current.filter((bolt) => {
        bolt.age++;
        const progress = bolt.age / bolt.lifetime;
        const alpha =
          progress < 0.3
            ? bolt.maxAlpha * (progress / 0.3)
            : bolt.maxAlpha * (1 - (progress - 0.3) / 0.7);
        if (bolt.age <= bolt.lifetime) {
          drawBolt(ctx, bolt, alpha);
          return true;
        }
        return false;
      });

      // ignore dt to avoid unused warning in ts
      void dt;

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          width: "100vw",
          height: "100vh",
        }}
      />
      {/* Herobrine figure */}
      <img
        src="/assets/generated/herobrine-figure-transparent.dim_300x600.png"
        alt="Herobrine"
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          height: "55vh",
          zIndex: 1,
          pointerEvents: "none",
          animation: "herobrineGlow 2s ease-in-out infinite",
          opacity: 0.92,
        }}
      />
      <style>{`
        @keyframes herobrineGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.4))
                    drop-shadow(0 0 20px rgba(0,255,80,0.15))
                    drop-shadow(0 0 40px rgba(0,200,60,0.08));
          }
          50% {
            filter: drop-shadow(0 0 18px rgba(255,255,255,0.9))
                    drop-shadow(0 0 35px rgba(255,255,200,0.5))
                    drop-shadow(0 0 60px rgba(0,255,80,0.25))
                    drop-shadow(0 0 80px rgba(0,180,40,0.15));
          }
        }
      `}</style>
    </>
  );
}
