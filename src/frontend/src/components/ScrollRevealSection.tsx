import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollRevealSection({
  children,
  className = "",
  delay = 0,
}: ScrollRevealSectionProps) {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`scroll-reveal${isRevealed ? " revealed" : ""} ${className}`}
      style={
        isRevealed && delay > 0 ? { animationDelay: `${delay}ms` } : undefined
      }
    >
      {children}
    </div>
  );
}
