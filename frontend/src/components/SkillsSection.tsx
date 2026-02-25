import { Wrench, Shield, Zap, Layers } from 'lucide-react';

export default function SkillsSection() {
  const skillCategories = [
    {
      icon: Wrench,
      title: 'Plugin Installation & Config',
      skills: ['LuckPerms', 'EssentialsX', 'Geyser', 'ViaVersion', 'etc.'],
    },
    {
      icon: Zap,
      title: 'Server Setup & Optimization',
      skills: ['Performance tuning', 'Configuration management'],
    },
    {
      icon: Shield,
      title: 'Permissions & Rank Management',
      skills: ['Role hierarchies', 'Permission systems'],
    },
    {
      icon: Layers,
      title: 'Platform Support',
      skills: ['Minecraft Java', 'Bedrock support', 'Versions 1.8 to 1.20+'],
    },
  ];

  return (
    <section>
      {/* 4x8m Box with skin-themed decorations */}
      <div className="minecraft-box-medium h-full">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300 minecraft-text flex items-center gap-2">
          <Wrench className="w-6 h-6 text-minecraft-gold" />
          My Skills
        </h2>
        <div className="space-y-4">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="minecraft-item-box">
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-cyan-400 mb-2">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-sm text-gray-400 bg-gray-900 px-2 py-1 minecraft-badge"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
