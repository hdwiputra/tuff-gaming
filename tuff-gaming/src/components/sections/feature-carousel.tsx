"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { FeatureSlide } from "@/types";

export function FeatureCarousel() {
  const featureSlides: FeatureSlide[] = [
    {
      id: "1",
      title: "ABOUT REFLEX",
      description:
        "Engineered for better performance and a more responsive feel, TUFF Reflex was designed to take precious milliseconds off your reaction times in any game you play. We've redesigned our removable rear remappable paddles, placing them at your fingertips for faster play while also increasing their durability. Reflex's all-new textured thumbstick grip improves precision and accuracy. Every aspect of Reflex was designed to live up to its name. Play better. Play faster.",
      image:
        "https://scufgaming.com/media/prismic/fcb756b9-54dd-41ee-be12-42dd0f2a2cd3_reflex_feature_lifetyle_thumbsticks_ps5_controller_850X600.jpg",
      alt: "SCUF Reflex Controller Features",
    },
    {
      id: "2",
      title: "REMAPABLE PADDLES",
      description:
        "Built from the ground up for faster response times, the redesigned paddle on Reflex are ergonomically positioned for instant access. These durable paddles can be customized to your playstyle, allowing you to map any button function to gain a competitive advantage and execute complex maneuvers without lifting your thumbs from the sticks.",
      image:
        "https://scufgaming.com/media/prismic/37d9ceaf-63bb-423d-8de6-81abd75fe63b_reflex_feature_lifetyle_paddles_ps5_controller_850X600.jpg",
      alt: "Remapable Paddles",
    },
    {
      id: "3",
      title: "PROFILE SWITCHING",
      description:
        "Different games require different play styles. With Reflex, you can easily switch between multiple profiles on the fly. Each profile can have its own unique button mapping, sensitivity settings, and more, allowing you to adapt to any game or situation instantly.",
      image:
        "https://scufgaming.com/media/prismic/14271506-e6a5-497f-b284-a4d21f4d2cf1_reflex_feature_lifetyle_profile_ps5_controller_850X600.jpg",
      alt: "Profile Switching",
    },
    {
      id: "4",
      title: "ADAPTIVE TRIGGERS",
      description:
        "For the first time ever, the addaptive trigger being supported in all platforms, including PS5, Xbox Series X|S, and PC, Reflex's adaptive triggers provide varying levels of resistance based on in-game actions. This feature enhances immersion by simulating the feel of different actions, such as accelerating a vehicle or drawing a bowstring.",
      image:
        "https://scufgaming.com/media/prismic/160f8f4c-147e-4741-abf0-0971010a5dd8_reflex_feature_lifetyle_triggers_ps5_controller_850X600.jpg",
      alt: "Adaptive Triggers",
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % featureSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(
      (prev) => (prev - 1 + featureSlides.length) % featureSlides.length
    );
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`p-2 rounded-full transition-colors duration-200 z-10 ${
                currentSlideIndex === 0
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer hover:bg-gray-200"
              }`}
              aria-label="Previous feature"
            >
              <ChevronLeft className="w-8 h-8 text-gray-600" />
            </button>

            {/* Slide Content */}
            <div className="flex-1 px-8 relative overflow-hidden">
              <div className="relative">
                {featureSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ease-in-out absolute inset-0 ${
                      index === currentSlideIndex
                        ? "opacity-100 translate-x-0"
                        : index < currentSlideIndex
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                  >
                    {/* Text Content */}
                    <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                        {slide.title}
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {slide.description}
                      </p>
                    </div>

                    {/* Image */}
                    <div className="relative">
                      <div className="aspect-[85/60] rounded-lg overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          width={850}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Spacer to maintain height */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center opacity-0 pointer-events-none">
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                      Placeholder
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      This is a placeholder to maintain the height of the
                      container.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="aspect-[85/60] rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === featureSlides.length - 1}
              className={`p-2 rounded-full transition-colors duration-200 z-10 ${
                currentSlideIndex === featureSlides.length - 1
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer hover:bg-gray-200"
              }`}
              aria-label="Next feature"
            >
              <ChevronRight className="w-8 h-8 text-gray-600" />
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {featureSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
                  index === currentSlideIndex ? "bg-gray-900" : "bg-gray-400"
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
