export default function AboutMeSection() {
  return (
    <section className="mb-8">
      {/* 8x16m Box with skin-themed pixelated textures */}
      <div className="minecraft-box-large">
        <h2 className="text-3xl font-bold mb-4 text-cyan-300 minecraft-text flex items-center gap-2">
          <span className="text-minecraft-gold">▣</span> About Me
        </h2>
        <div className="text-gray-300 leading-relaxed text-lg space-y-4">
          <p>
            I'm a skilled Minecraft developer and server moderator with experience over{' '}
            <span className="text-cyan-400 font-semibold">3.5+ years</span> and also did
            developing in big servers. I specialize in plugin configuration, full server setup,
            and general moderation.
          </p>
          <p className="text-minecraft-green font-semibold">
            I am also available for freelance paid work.
          </p>
        </div>
      </div>
    </section>
  );
}
