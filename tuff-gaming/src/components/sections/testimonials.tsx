"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import type { Testimonial } from "@/types";

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "DG-Ehanniboi",
      represent: "Ex-Pro Player Clash of Clans",
      rating: 5,
      review:
        "The TUFF Reflex is easily the best option when it comes to competitive gaming. The paddles are responsive and the build quality is top-notch.",
    },
    {
      id: "2",
      name: "Iisan Nurmagedoph",
      represent: "Truncate Games",
      rating: 5,
      review:
        "Amazing controller! The customization options are endless and it gives me a real competitive edge in FPS games.",
    },
    {
      id: "3",
      name: "Hiko McGambris",
      represent: "PSHT Esports",
      rating: 5,
      review:
        "Solid build quality and great performance. The trigger stops make a huge difference in reaction time.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-orange-500 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <section className="bg-gray-100 text-gray-900 py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide mb-8">
            WHAT OTHERS ARE SAYING
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-8 h-8 text-gray-600" />
            </button>

            {/* Testimonial Content */}
            <div className="flex-1 text-center px-8">
              <div className="mb-6">
                <p className="text-lg md:text-xl font-medium text-gray-700 italic leading-relaxed">
                  &quot;{currentTestimonial.review}&quot;
                </p>
              </div>

              <div className="flex justify-center mb-4">
                {renderStars(currentTestimonial.rating)}
              </div>

              <div className="text-gray-600">
                <p className="font-semibold text-base">
                  {currentTestimonial.name}
                </p>
                <p className="text-sm">{currentTestimonial.represent}</p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-8 h-8 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
                  index === currentIndex ? "bg-orange-500" : "bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
