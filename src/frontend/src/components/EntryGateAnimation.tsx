import { useEffect, useRef, useState } from "react";

interface Props {
  onComplete: () => void;
}

export default function EntryGateAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<"idle" | "flash" | "opening" | "fadeout">(
    "idle",
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let bolts: {
      segs: { x1: number; y1: number; x2: number; y2: number }[];
      alpha: number;
      age: number;
      life: number;
    }[] = [];
    let nextBolt = 0;
    let flashAlpha = 0;

    function makeBolt(W: number, H: number) {
      const sx = W * (0.1 + Math.random() * 0.8);
      const sy = 0;
      const ex = sx + (Math.random() - 0.5) * 120;
      const ey = H * (0.4 + Math.random() * 0.4);
      const segs: { x1: number; y1: number; x2: number; y2: number }[] = [];
      let cx = sx;
      let cy = sy;
      const steps = 14 + Math.floor(Math.random() * 10);
      for (let i = 0; i < steps; i++) {
        const t = (i + 1) / steps;
        const nx = sx + (ex - sx) * t + (Math.random() - 0.5) * 60;
        const ny = sy + (ey - sy) * t + (Math.random() - 0.5) * 30;
        segs.push({ x1: cx, y1: cy, x2: nx, y2: ny });
        cx = nx;
        cy = ny;
      }
      return {
        segs,
        alpha: 1,
        age: 0,
        life: 6 + Math.floor(Math.random() * 5),
      };
    }

    const tick = (time: number) => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (time > nextBolt) {
        bolts.push(makeBolt(W, H));
        if (Math.random() > 0.5) bolts.push(makeBolt(W, H));
        flashAlpha = 0.3 + Math.random() * 0.2;
        nextBolt = time + 400 + Math.random() * 500;
      }

      if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(200,220,255,${flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
        flashAlpha = Math.max(0, flashAlpha - 0.04);
      }

      bolts = bolts.filter((b) => {
        b.age++;
        const p = b.age / b.life;
        const a = p < 0.3 ? p / 0.3 : 1 - (p - 0.3) / 0.7;
        if (b.age <= b.life) {
          ctx.save();
          ctx.strokeStyle = "rgba(200,230,255,1)";
          ctx.lineWidth = 2;
          ctx.shadowColor = "rgba(150,200,255,0.9)";
          ctx.shadowBlur = 20;
          ctx.globalAlpha = a * 0.9;
          ctx.beginPath();
          for (const s of b.segs) {
            ctx.moveTo(s.x1, s.y1);
            ctx.lineTo(s.x2, s.y2);
          }
          ctx.stroke();
          ctx.restore();
          return true;
        }
        return false;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    startTimeRef.current = performance.now();
    const t1 = setTimeout(() => setPhase("flash"), 1200);
    const t2 = setTimeout(() => setPhase("opening"), 1600);
    const t3 = setTimeout(() => setPhase("fadeout"), 3000);
    const t4 = setTimeout(() => onCompleteRef.current(), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        opacity: phase === "fadeout" ? 0 : 1,
        transition: phase === "fadeout" ? "opacity 0.8s ease-in-out" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, #0d0a1a 0%, #050308 50%, #000000 100%)",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
      />

      {phase === "flash" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(200,180,255,0.7) 30%, transparent 70%)",
            animation: "blastFlash 0.4s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          transformOrigin: "left center",
          transform:
            phase === "opening" || phase === "fadeout"
              ? "perspective(1200px) rotateY(-110deg)"
              : "perspective(1200px) rotateY(0deg)",
          transition:
            phase === "opening" || phase === "fadeout"
              ? "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          zIndex: 10,
        }}
      >
        <GateDoor side="left" />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          transformOrigin: "right center",
          transform:
            phase === "opening" || phase === "fadeout"
              ? "perspective(1200px) rotateY(110deg)"
              : "perspective(1200px) rotateY(0deg)",
          transition:
            phase === "opening" || phase === "fadeout"
              ? "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          zIndex: 10,
        }}
      >
        <GateDoor side="right" />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "2px",
          height: "100%",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(200,160,255,0.9) 20%, rgba(255,200,100,0.8) 50%, rgba(200,160,255,0.9) 80%, transparent 100%)",
          boxShadow:
            "0 0 30px 8px rgba(200,160,255,0.6), 0 0 80px 20px rgba(150,100,255,0.3)",
          transform: "translateX(-50%)",
          opacity: phase === "idle" ? 0.4 : phase === "flash" ? 1 : 0.6,
          transition: "opacity 0.2s",
          zIndex: 11,
        }}
      />

      {(phase === "idle" || phase === "flash") && (
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 20,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: "rgba(180,150,255,0.85)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              textShadow:
                "0 0 20px rgba(180,100,255,0.8), 0 0 40px rgba(100,50,200,0.5)",
              animation: "pulseText 1.5s ease-in-out infinite",
            }}
          >
            Kavyam Mistry
          </div>
          <div
            style={{
              fontSize: "clamp(0.65rem, 1.5vw, 0.85rem)",
              color: "rgba(120,100,200,0.7)",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              marginTop: "6px",
            }}
          >
            Portfolio
          </div>
        </div>
      )}

      <style>{`
        @keyframes blastFlash {
          0% { opacity: 0; }
          20% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes pulseText {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const STONE_BLOCKS = Array.from({ length: 20 }, (_, row) =>
  Array.from({ length: 8 }, (_, col) => ({ row, col })),
).flat();

const RUNES: {
  id: string;
  symbol: string;
  top: number;
  animDuration: string;
}[] = [
  { id: "rune-lightning-1", symbol: "\u26a1", top: 15, animDuration: "1.5s" },
  { id: "rune-star", symbol: "\u2726", top: 35, animDuration: "1.8s" },
  { id: "rune-diamond", symbol: "\u25c8", top: 55, animDuration: "2.1s" },
  { id: "rune-lightning-2", symbol: "\u26a1", top: 75, animDuration: "2.4s" },
];

function GateDoor({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background:
          "linear-gradient(to bottom, #1a1520 0%, #120e18 30%, #0d0a12 70%, #0a0810 100%)",
        overflow: "hidden",
      }}
    >
      {STONE_BLOCKS.map(({ row, col }) => (
        <div
          key={`stone-${row}-${col}`}
          style={{
            position: "absolute",
            top: `${row * 5}%`,
            left: `${col * 12.5}%`,
            width: "12.5%",
            height: "5%",
            border: "1px solid rgba(60,40,90,0.4)",
            background: `rgba(${18 + ((row + col) % 5)}, ${14 + ((row * col) % 4)}, ${24 + ((row + col * 2) % 6)}, 1)`,
            boxSizing: "border-box",
          }}
        />
      ))}

      <svg
        role="img"
        aria-label="Gate decorative cracks"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={`glow-${side}`}>
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {isLeft ? (
          <>
            <polyline
              points="100,10 85,22 90,38 75,50 80,65 70,80 75,95"
              fill="none"
              stroke="rgba(180,120,255,0.7)"
              strokeWidth="0.8"
              filter={`url(#glow-${side})`}
              style={{ animation: "crackGlow 2s ease-in-out infinite" }}
            />
            <polyline
              points="80,5 70,18 65,30 55,42 58,58 50,72"
              fill="none"
              stroke="rgba(255,150,80,0.5)"
              strokeWidth="0.5"
              filter={`url(#glow-${side})`}
              style={{ animation: "crackGlow 2.5s ease-in-out infinite" }}
            />
            <polyline
              points="95,55 82,63 78,75 70,82 65,95"
              fill="none"
              stroke="rgba(150,100,255,0.6)"
              strokeWidth="0.6"
              filter={`url(#glow-${side})`}
              style={{ animation: "crackGlow 1.8s ease-in-out infinite" }}
            />
          </>
        ) : (
          <>
            <polyline
              points="0,10 15,22 10,38 25,50 20,65 30,80 25,95"
              fill="none"
              stroke="rgba(180,120,255,0.7)"
              strokeWidth="0.8"
              filter={`url(#glow-${side})`}
              style={{ animation: "crackGlow 2s ease-in-out infinite" }}
            />
            <polyline
              points="20,5 30,18 35,30 45,42 42,58 50,72"
              fill="none"
              stroke="rgba(255,150,80,0.5)"
              strokeWidth="0.5"
              filter={`url(#glow-${side})`}
              style={{ animation: "crackGlow 2.5s ease-in-out infinite" }}
            />
            <polyline
              points="5,55 18,63 22,75 30,82 35,95"
              fill="none"
              stroke="rgba(150,100,255,0.6)"
              strokeWidth="0.6"
              filter={`url(#glow-${side})`}
              style={{ animation: "crackGlow 1.8s ease-in-out infinite" }}
            />
          </>
        )}
      </svg>

      <div
        style={{
          position: "absolute",
          top: 0,
          [isLeft ? "right" : "left"]: 0,
          width: "12px",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(120,80,200,0.6) 0%, rgba(80,50,150,0.8) 40%, rgba(100,60,180,0.6) 70%, rgba(60,40,120,0.5) 100%)",
          boxShadow: isLeft
            ? "inset -3px 0 12px rgba(180,120,255,0.5)"
            : "inset 3px 0 12px rgba(180,120,255,0.5)",
        }}
      />

      {RUNES.map((rune) => (
        <div
          key={`${rune.id}-${side}`}
          style={{
            position: "absolute",
            top: `${rune.top}%`,
            left: isLeft ? "30%" : "50%",
            color: "rgba(180,130,255,0.5)",
            fontSize: "clamp(16px, 2.5vw, 28px)",
            textShadow: "0 0 10px rgba(150,100,255,0.8)",
            animation: `runeGlow ${rune.animDuration} ease-in-out infinite`,
            fontFamily: "monospace",
          }}
        >
          {rune.symbol}
        </div>
      ))}

      <style>{`
        @keyframes crackGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes runeGlow {
          0%, 100% { opacity: 0.3; text-shadow: 0 0 8px rgba(150,100,255,0.5); }
          50% { opacity: 0.8; text-shadow: 0 0 20px rgba(200,150,255,0.9); }
        }
      `}</style>
    </div>
  );
}
