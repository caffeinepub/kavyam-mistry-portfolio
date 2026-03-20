import { Briefcase } from "lucide-react";

export default function AvailabilitySection() {
  return (
    <section className="mb-8">
      <div className="minecraft-box-availability">
        <div className="flex items-start gap-4">
          <Briefcase className="w-8 h-8 text-minecraft-gold flex-shrink-0 mt-1" />
          <div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
