export default function MaintenanceScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Maintenance Box */}
        <div className="minecraft-box-large p-10 flex flex-col items-center justify-center gap-6">
          {/* Icon */}
          <div className="text-6xl minecraft-text select-none">⚙️</div>

          <h1 className="text-3xl font-bold text-minecraft-gold minecraft-text">
            Under Maintenance
          </h1>

          <div className="w-full border-t-2 border-cyan-900" />

          <p className="text-gray-300 text-lg leading-relaxed">
            This website is currently undergoing maintenance.
          </p>
          <p className="text-cyan-400 minecraft-text text-base">
            Please check back later. We'll be back soon!
          </p>

          {/* Decorative pixel blocks */}
          <div className="flex gap-3 mt-2">
            {['bg-minecraft-green', 'bg-minecraft-gold', 'bg-cyan-500', 'bg-minecraft-green'].map(
              (color, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 ${color} opacity-70`}
                  style={{ imageRendering: 'pixelated' }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
