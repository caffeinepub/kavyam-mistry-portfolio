import { Gamepad2, MessageSquare } from "lucide-react";

export default function ProfileHeader() {
  return (
    <header className="mb-8">
      {/* Title Box with Gradient Border and pixelated texture */}
      <div className="minecraft-title-box mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold minecraft-text text-center">
          <span className="text-minecraft-green">Minecraft Server</span>{" "}
          <span className="text-minecraft-gold">Developer</span>
        </h2>
      </div>

      {/* Name and Profile Info */}
      <div className="text-center">
        {/* Name */}
        <h1 className="text-5xl font-bold mb-6 text-cyan-300 minecraft-text">
          Kavyam Mistry
        </h1>

        {/* Profile Info Grid */}
        <div className="flex flex-wrap justify-center gap-6 text-lg">
          <div className="flex items-center gap-2 minecraft-info-box">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-400">IGN:</span>
            <span className="text-cyan-300 font-semibold">Akgamer4354</span>
          </div>
          <div className="flex items-center gap-2 minecraft-info-box">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-400">Discord:</span>
            <span className="text-cyan-300 font-semibold">akgamer4354</span>
          </div>
        </div>
      </div>
    </header>
  );
}
