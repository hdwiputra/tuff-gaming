import { Gamepad2, Zap, Grip, Settings } from "lucide-react";
import Link from "next/link";

import type { Feature } from "@/types";

export function WhyTuff() {
  const features: Feature[] = [
    {
      id: "1",
      icon: <Gamepad2 className="w-12 h-12 text-orange-500" />,
      title: "ALWAYS BE AIMING.",
      description:
        "Rear paddles let you jump, reload, and crouch without your thumbs leaving the sticks.",
    },
    {
      id: "2",
      icon: <Zap className="w-12 h-12 text-orange-500" />,
      title: "SHOOT FASTER.",
      description:
        "Set the adjustable triggers to instant for a mouse-click response.",
    },
    {
      id: "3",
      icon: <Grip className="w-12 h-12 text-orange-500" />,
      title: "GET A GRIP.",
      description:
        "Both our swappable thumbsticks and grip keep you connected and comfortable for hours.",
    },
    {
      id: "4",
      icon: <Settings className="w-12 h-12 text-orange-500" />,
      title: "DESIGN YOUR WAY.",
      description: "16+ possible configurations for every style.",
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 uppercase tracking-wide mb-8">
            WHY TUFF?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/customize">
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-8 py-3 rounded-lg uppercase tracking-wide transition-colors duration-300 mt-10 cursor-pointer">
              CUSTOMIZE ✏️
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
