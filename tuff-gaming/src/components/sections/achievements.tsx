import { Trophy, Globe, Crown } from "lucide-react";

import type { Achievement } from "@/types";

export function Achievements() {
  const achievements: Achievement[] = [
    {
      id: "1",
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
      stat: "100+",
      description: "MAJOR ESPORTS CHAMPIONSHIPS WON WITH SCUF",
    },
    {
      id: "2",
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      stat: "60+",
      description: "OF THE WORLD'S BEST GAMERS USE SCUF",
    },
    {
      id: "3",
      icon: <Crown className="w-8 h-8 text-orange-500" />,
      stat: "$8M+",
      description: "IN TOTAL PRIZING WON WITH SCUF",
    },
  ];

  return (
    <section className="bg-gray-600 text-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 uppercase tracking-wide">
            ACHIEVEMENTS
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center gap-4 text-center md:text-left"
            >
              <div className="flex-shrink-0">{achievement.icon}</div>
              <div>
                <div className="text-lg font-bold text-white">
                  {achievement.stat}
                </div>
                <div className="text-gray-200 text-sm uppercase tracking-wide leading-tight max-w-48">
                  {achievement.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
