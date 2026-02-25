import { Server } from 'lucide-react';

export default function ExperienceSection() {
  const experiences = [
    {
      server: 'Obsidian MC',
      roles: ['Moderator', 'Plugin Configuration', 'Server Setup'],
    },
    {
      server: 'Snow MC',
      roles: ['Moderator', 'Setup and Configuration'],
    },
    {
      server: 'King MC',
      roles: ['Full Development', 'Setup', 'Plugin Management'],
      highlight: true,
    },
    {
      server: 'Cursed SMP',
      roles: ['Moderator', 'Plugin Management'],
    },
  ];

  return (
    <section>
      {/* 4x8m Box with skin-themed decorations */}
      <div className="minecraft-box-medium h-full">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300 minecraft-text flex items-center gap-2">
          <Server className="w-6 h-6 text-minecraft-gold" />
          My Experience
        </h2>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`minecraft-item-box ${exp.highlight ? 'border-minecraft-gold' : ''}`}
            >
              <h3
                className={`font-bold text-lg mb-2 ${
                  exp.highlight ? 'text-minecraft-gold' : 'text-cyan-400'
                }`}
              >
                {exp.server}
                {exp.highlight && (
                  <span className="text-xs ml-2 text-minecraft-green">(My Own Server)</span>
                )}
              </h3>
              <div className="flex flex-wrap gap-2">
                {exp.roles.map((role, roleIndex) => (
                  <span
                    key={roleIndex}
                    className="text-sm px-2 py-1 bg-cyan-950 text-cyan-300 minecraft-badge"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
