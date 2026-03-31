import { useEffect, useRef } from "react";

interface LightningBolt {
  segments: { x1: number; y1: number; x2: number; y2: number }[];
  alpha: number;
  maxAlpha: number;
  age: number;
  lifetime: number;
  branches: LightningBolt[];
  color: string;
  glowColor: string;
}

function createLightning(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  depth: number,
): LightningBolt {
  const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
  let cx = startX;
  let cy = startY;
  const steps = Math.floor(16 + Math.random() * 12);

  for (let i = 0; i < steps; i++) {
    const t = (i + 1) / steps;
    const nx = startX + (endX - startX) * t + (Math.random() - 0.5) * 70;
    const ny = startY + (endY - startY) * t + (Math.random() - 0.5) * 40;
    segments.push({ x1: cx, y1: cy, x2: nx, y2: ny });
    cx = nx;
    cy = ny;
  }

  const branches: LightningBolt[] = [];
  if (depth > 0) {
    const numBranches = Math.floor(Math.random() * 3) + 1;
    for (let b = 0; b < numBranches; b++) {
      const branchStart = Math.floor(Math.random() * (segments.length - 2));
      const seg = segments[branchStart];
      const branchEndX = seg.x2 + (Math.random() - 0.3) * 140;
      const branchEndY = seg.y2 + 50 + Math.random() * 100;
      branches.push(
        createLightning(seg.x2, seg.y2, branchEndX, branchEndY, depth - 1),
      );
    }
  }

  const colorIdx = Math.floor(Math.random() * 3);
  const colors = [
    { color: "rgba(180,220,255,1)", glow: "rgba(100,180,255,0.9)" },
    { color: "rgba(220,200,255,1)", glow: "rgba(160,100,255,0.9)" },
    { color: "rgba(255,255,255,1)", glow: "rgba(200,220,255,0.9)" },
  ];

  return {
    segments,
    alpha: 1,
    maxAlpha: 0.8 + Math.random() * 0.2,
    age: 0,
    lifetime: 6 + Math.floor(Math.random() * 6),
    branches,
    color: colors[colorIdx].color,
    glowColor: colors[colorIdx].glow,
  };
}

function drawBolt(
  ctx: CanvasRenderingContext2D,
  bolt: LightningBolt,
  alpha: number,
) {
  ctx.save();
  ctx.strokeStyle = bolt.glowColor;
  ctx.lineWidth = 5;
  ctx.shadowColor = bolt.glowColor;
  ctx.shadowBlur = 28;
  ctx.globalAlpha = alpha * 0.5;
  ctx.beginPath();
  for (const seg of bolt.segments) {
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
  }
  ctx.stroke();

  ctx.strokeStyle = bolt.color;
  ctx.lineWidth = 2;
  ctx.shadowBlur = 15;
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  for (const seg of bolt.segments) {
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,1)";
  ctx.lineWidth = 0.8;
  ctx.shadowBlur = 4;
  ctx.globalAlpha = alpha * 0.9;
  ctx.beginPath();
  for (const seg of bolt.segments) {
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
  }
  ctx.stroke();

  ctx.restore();

  for (const branch of bolt.branches) {
    drawBolt(ctx, branch, alpha * 0.55);
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

    let lastTime = 0;

    const tick = (time: number) => {
      void (time - lastTime);
      lastTime = time;

      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      if (time >= nextBoltRef.current) {
        const skyX = W * (0.1 + Math.random() * 0.8);
        boltsRef.current.push(
          createLightning(
            skyX,
            0,
            skyX + (Math.random() - 0.5) * 100,
            H * (0.5 + Math.random() * 0.4),
            2,
          ),
        );
        if (Math.random() > 0.4) {
          const skyX2 = W * (0.1 + Math.random() * 0.8);
          boltsRef.current.push(
            createLightning(
              skyX2,
              0,
              skyX2 + (Math.random() - 0.5) * 80,
              H * 0.6,
              1,
            ),
          );
        }
        flashRef.current = { alpha: 0.22 + Math.random() * 0.18, active: true };
        nextBoltRef.current = time + 800 + Math.random() * 1000;
      }

      if (flashRef.current.active) {
        ctx.fillStyle = `rgba(180, 210, 255, ${flashRef.current.alpha})`;
        ctx.fillRect(0, 0, W, H);
        flashRef.current.alpha -= 0.03;
        if (flashRef.current.alpha <= 0) {
          flashRef.current.active = false;
          flashRef.current.alpha = 0;
        }
      }

      boltsRef.current = boltsRef.current.filter((bolt) => {
        bolt.age++;
        const progress = bolt.age / bolt.lifetime;
        const a =
          progress < 0.3
            ? bolt.maxAlpha * (progress / 0.3)
            : bolt.maxAlpha * (1 - (progress - 0.3) / 0.7);
        if (bolt.age <= bolt.lifetime) {
          drawBolt(ctx, bolt, a);
          return true;
        }
        return false;
      });

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
      {/* Dark storm sky background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 0%, #0a0a1a 0%, #050510 40%, #000005 100%)",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(0,0,20,0.45) 0%, rgba(0,0,10,0.2) 60%, rgba(0,0,20,0.55) 100%)",
        }}
      />

      {/* Player skin character — centered with red aura */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          width: "clamp(140px, 16vw, 300px)",
          height: "clamp(280px, 52vh, 580px)",
          zIndex: 2,
          pointerEvents: "none",
          animation: "breatheCenter 2.8s ease-in-out infinite",
          transformOrigin: "bottom center",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {/* Red aura pulse ring */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            animation: "redAuraPulse 1.8s ease-in-out infinite",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <img
          src="https://render.crafty.gg/3d/full/6bdad532-c3b6-4ee4-a4f7-bba80607e48c"
          alt="Akgamer4354's Minecraft Skin"
          crossOrigin="anonymous"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom",
            filter:
              "drop-shadow(0 0 18px rgba(220,0,0,0.85)) drop-shadow(0 0 45px rgba(180,0,0,0.55)) drop-shadow(0 0 8px rgba(255,80,80,0.7))",
            position: "relative",
            zIndex: 2,
          }}
        />
      </div>

      {/* Lightning canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          width: "100vw",
          height: "100vh",
        }}
      />

      <style>{`
        @keyframes breatheCenter {
          0%, 100% {
            transform: translateX(-50%) scaleY(1) translateY(0px);
          }
          50% {
            transform: translateX(-50%) scaleY(1.015) translateY(-6px);
          }
        }
        @keyframes redAuraPulse {
          0%, 100% {
            box-shadow: 0 0 30px 10px rgba(200,0,0,0.3), 0 0 80px 30px rgba(150,0,0,0.15);
            opacity: 0.7;
          }
          50% {
            box-shadow: 0 0 60px 25px rgba(255,0,0,0.55), 0 0 140px 60px rgba(200,0,0,0.3);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
