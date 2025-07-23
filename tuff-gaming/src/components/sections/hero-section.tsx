import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  const heroContent = {
    image: "/hero1.jpg",
    title: "ANTI-DRIFT THUMBSTICKS ARE NOW AVAILABLE.",
    description:
      "Reduce common symptoms of wear and tear with our new Hall effect thumbsticks, available on Reflex.",
    buttonText: "SHOP REFLEX",
    buttonLink: "/products/",
  };

  return (
    <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
      <Image
        src={heroContent.image}
        alt={heroContent.title}
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-10 flex items-center">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 flex items-center h-full">
          <div className="relative z-20 text-white max-w-lg text-left space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase tracking-wide">
              {heroContent.title}
            </h1>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              {heroContent.description}
            </p>
            <Link href={heroContent.buttonLink}>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm md:text-base font-semibold uppercase tracking-wide transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                {heroContent.buttonText}
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
