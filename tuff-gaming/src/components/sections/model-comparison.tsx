"use client";

import Image from "next/image";
import {
  Gamepad2,
  Zap,
  Volume2,
  VolumeX,
  Weight,
  Target,
  Settings,
  Battery,
  Palette,
} from "lucide-react";

import type { ComparisonModel } from "@/types";

export function ModelComparison() {
  const models: ComparisonModel[] = [
    {
      id: "1",
      name: "SCUF REFLEX PRO",
      subtitle: "",
      image:
        "https://scufgaming.com/media/prismic/OGZlYmE5MzAtZDg4Yi00ODM2LTkzMmMtMGI0MzgyYmRiYmMx_a291c1af-a407-4120-a653-ecadfdf9750f_reflex_compare_model_pro_steel_gray_front_850x600.png",
      specs: [
        {
          icon: Gamepad2,
          text: "Adaptive triggers stimulate real feel of in-game interactions.",
        },
        {
          icon: Volume2,
          text: "Vibration rumbles for full, immersive experience.",
        },
        {
          icon: Weight,
          text: "300 grams.",
        },
        {
          icon: Target,
          text: "Pairs well with shooter, action, sports and adventure games.",
        },
        {
          icon: Settings,
          text: "Non-slip performance adds extra comfort and durability.",
        },
        {
          icon: Battery,
          text: "Over 8 hours of active gameplay.",
        },
        {
          icon: Gamepad2,
          text: "Four remappable back paddles keep your thumbs on the sticks.",
        },
        {
          icon: Palette,
          text: "Custom designs in-stock and ready-to-ship.",
        },
      ],
    },
    {
      id: "2",
      name: "SCUF REFLEX FPS",
      subtitle: "",
      image:
        "https://scufgaming.com/media/prismic/Zjk2ZTZlODctMmZkZS00Y2VlLTgxNmMtNmQzZmUyYjI4ZmZj_11a0b46a-25a9-4e3e-938f-4a152863d065_reflex_compare_model_fps_steel_gray_front_850x600.png",
      specs: [
        {
          icon: Zap,
          text: "Instant triggers and bumpers make for faster shots.",
        },
        {
          icon: VolumeX,
          text: "Vibration rumbles removed for more control in FPS games.",
        },
        {
          icon: Weight,
          text: "280 grams.",
        },
        {
          icon: Target,
          text: "Built for first-person shooter games and battle royale games.",
        },
        {
          icon: Settings,
          text: "Non-slip performance adds extra comfort and durability.",
        },
        {
          icon: Battery,
          text: "Over 9 hours of active gameplay.",
        },
        {
          icon: Gamepad2,
          text: "Four remappable back paddles keep your thumbs on the sticks.",
        },
        {
          icon: Palette,
          text: "Custom designs in-stock and ready-to-ship.",
        },
      ],
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-18">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wider mb-4">
            COMPARE MODELS
          </h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-4xl mx-auto px-16">
          {models.map((model) => (
            <div key={model.id} className="text-center">
              {/* Controller Image */}
              <div className="mb-8">
                <Image
                  src={model.image}
                  alt={model.name}
                  width={400}
                  height={300}
                  className="mx-auto"
                />
              </div>

              {/* Model Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 tracking-wide">
                {model.name}
              </h3>

              {/* Specifications */}
              <div className="space-y-4 text-left">
                {model.specs.map((spec, index) => {
                  const IconComponent = spec.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-gray-600" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {spec.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
