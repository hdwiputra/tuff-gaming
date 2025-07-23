"use client";

import Link from "next/link";
import Image from "next/image";

export function ProductHero() {
  return (
    <section className="relative w-full h-[55vh] overflow-hidden">
      <Image
        src="/hero2.jpg"
        alt="PS5 Controllers Collection"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/35 z-10 flex items-end pb-16">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-white relative z-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight">
                TUFF
                <br />
                <span className="text-orange-500">REFLEX.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                Built for performance. Reflex has four customizable rear paddles
                and interchangeable thumbsticks. Available on two different
                models.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/products/">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-3 px-8 rounded-lg uppercase tracking-wide transition-colors duration-300 cursor-pointer">
                    SHOP REFLEX
                  </button>
                </Link>

                <Link href="/register">
                  <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 text-sm font-semibold py-3 px-8 rounded-lg uppercase tracking-wide transition-all duration-300 cursor-pointer">
                    SIGN UP FOR ANTI-DRIFT
                  </button>
                </Link>
              </div>
            </div>

            {/* Right side spacer for layout balance */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
