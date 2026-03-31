import { useEffect, useRef, useState } from "react";

const SGA_CHARS = "ᔑᗑᒲᓵ↸ᐑ⚍⎓⌇꧹ᒷᓭᑑꖌꖎ";

const BLOCK_SIZE = 64;

const NETHERITE_BLOCK =
  "/assets/uploads/Minecraft-Netherite-Block-Texture-Pixel-Art-1.jpeg";
const ENCHANT_GLINT = "/assets/uploads/enchanted-glint-2.jpg";

interface Block {
  id: number;
  hovered: boolean;
  enchanting: boolean;
  enchantAlpha: number;
  sgaChar: string;
}

export default function DiamondBlockBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const timersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const buildGrid = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const c = Math.ceil(w / BLOCK_SIZE) + 1;
      const r = Math.ceil(h / BLOCK_SIZE) + 1;
      setCols(c);
      setRows(r);
      const newBlocks: Block[] = [];
      for (let row = 0; row < r; row++) {
        for (let col = 0; col < c; col++) {
          newBlocks.push({
            id: row * c + col,
            hovered: false,
            enchanting: false,
            enchantAlpha: 0,
            sgaChar: SGA_CHARS[Math.floor(Math.random() * SGA_CHARS.length)],
          });
        }
      }
      setBlocks(newBlocks);
    };
    buildGrid();
    window.addEventListener("resize", buildGrid);
    return () => window.removeEventListener("resize", buildGrid);
  }, []);

  const handleBlockEnter = (id: number) => {
    if (timersRef.current[id]) clearTimeout(timersRef.current[id]);
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, hovered: true, enchanting: true, enchantAlpha: 1 }
          : b,
      ),
    );
  };

  const handleBlockLeave = (id: number) => {
    let alpha = 1;
    const fade = () => {
      alpha -= 0.06;
      if (alpha <= 0) {
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === id
              ? { ...b, hovered: false, enchanting: false, enchantAlpha: 0 }
              : b,
          ),
        );
        return;
      }
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, hovered: false, enchantAlpha: alpha } : b,
        ),
      );
      timersRef.current[id] = setTimeout(fade, 16);
    };
    timersRef.current[id] = setTimeout(fade, 16);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${BLOCK_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${BLOCK_SIZE}px)`,
          width: `${cols * BLOCK_SIZE}px`,
          height: `${rows * BLOCK_SIZE}px`,
          pointerEvents: "all",
        }}
      >
        {blocks.map((block) => (
          <div
            key={block.id}
            onMouseEnter={() => handleBlockEnter(block.id)}
            onMouseLeave={() => handleBlockLeave(block.id)}
            style={{
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              position: "relative",
              transform: block.hovered
                ? "translateY(-10px) scale(1.1)"
                : "translateY(0px) scale(1)",
              transition:
                "transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease",
              zIndex: block.hovered ? 2 : 1,
              boxShadow: block.enchanting
                ? `0 0 ${14 * block.enchantAlpha}px ${7 * block.enchantAlpha}px rgba(180,100,255,${block.enchantAlpha * 0.9}), 0 0 ${28 * block.enchantAlpha}px rgba(100,50,200,${block.enchantAlpha * 0.5})`
                : "none",
              cursor: "none",
              overflow: "hidden",
            }}
          >
            {/* Base netherite block texture */}
            <img
              src={NETHERITE_BLOCK}
              alt=""
              draggable={false}
              style={{
                width: BLOCK_SIZE,
                height: BLOCK_SIZE,
                display: "block",
                imageRendering: "pixelated",
                userSelect: "none",
              }}
            />
            {/* Enchant glint overlay */}
            {block.enchantAlpha > 0 && (
              <img
                src={ENCHANT_GLINT}
                alt=""
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: BLOCK_SIZE,
                  height: BLOCK_SIZE,
                  display: "block",
                  imageRendering: "pixelated",
                  userSelect: "none",
                  opacity: block.enchantAlpha * 0.72,
                  mixBlendMode: "screen",
                  pointerEvents: "none",
                }}
              />
            )}
            {/* SGA rune overlay on enchant */}
            {block.enchanting && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: `rgba(220,180,255,${block.enchantAlpha * 0.95})`,
                  textShadow: `0 0 10px rgba(180,80,255,${block.enchantAlpha})`,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {block.sgaChar}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
