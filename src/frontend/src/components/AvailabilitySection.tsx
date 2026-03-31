import { Briefcase } from "lucide-react";
import { useState } from "react";

export default function AvailabilitySection() {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section className="mb-8">
      <div className="minecraft-box-availability">
        <div className="flex items-start gap-4">
          <Briefcase className="w-8 h-8 text-minecraft-gold flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3 text-minecraft-gold minecraft-text">
              Availability
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Open to{" "}
              <span className="text-minecraft-green font-semibold">
                freelance
              </span>{" "}
              and{" "}
              <span className="text-minecraft-green font-semibold">
                paid development
              </span>{" "}
              or moderator positions. Can work in both{" "}
              <span className="text-cyan-400">long-term</span> and{" "}
              <span className="text-cyan-400">short-term</span> server
              developing.
            </p>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                data-ocid="availability.pricing.button"
                onClick={() => {
                  window.location.hash = "#/pricing";
                }}
                style={{
                  fontFamily: "'Courier New', monospace",
                  background: btnHovered
                    ? "rgba(0,65,0,0.92)"
                    : "rgba(0,45,0,0.75)",
                  border: "3px solid rgba(255,215,0,0.88)",
                  color: "rgba(255,215,0,0.97)",
                  padding: "0.75rem 2.25rem",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  letterSpacing: "0.06em",
                  textShadow: "1px 1px 0 rgba(0,0,0,0.8)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  boxShadow: btnHovered
                    ? "0 0 0 2px #000, 0 6px 18px rgba(255,215,0,0.45)"
                    : "0 0 0 2px #000, 0 4px 12px rgba(255,215,0,0.25)",
                  transform: btnHovered ? "translateY(-2px)" : "translateY(0)",
                }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                💰 View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
