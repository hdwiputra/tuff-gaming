import Image from "next/image";
import Link from "next/link";

import type { Collection } from "@/types";

export function ShopByCollection() {
  const collections: Collection[] = [
    {
      id: "1",
      name: "THE CALL OF BOOTY COLLECTION.",
      image: "/rec2.webp",
      description:
        "Shop the new Call of Booty Dangerzone collection featuring exclusive designs and features.",
    },
    {
      id: "2",
      name: "LET THE SHOW BEGIN.",
      image: "/rec3.webp",
      description:
        "The Tuff Gaming x Betlix Octodad Game Collab is here. Gear up for the ultimate gaming experience.",
    },
    {
      id: "3",
      name: "The Perstaphen Racing Special.",
      image: "/rec1.webp",
      description:
        "Hashire Hashire Bakushin Perstaphen. Make history on the Derby with our special edition controller.",
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 uppercase tracking-wide">
            SHOP BY COLLECTION
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {collections.map((collection) => (
            <div key={collection.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-[3/5]">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  {/* Top spacing */}
                  <div></div>

                  {/* Bottom content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white text-lg font-bold uppercase tracking-wide leading-tight mb-3">
                        {collection.name}
                      </h3>
                      <p className="text-white text-sm opacity-90 leading-relaxed mb-4">
                        {collection.description}
                      </p>
                    </div>

                    <Link href={`/collections/${collection.id}`}>
                      <button className="text-orange-500 text-sm font-bold uppercase tracking-wide hover:text-orange-400 transition-colors duration-200 flex items-center gap-1 cursor-pointer">
                        SHOP <span className="text-lg">›</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/collections">
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-8 py-3 rounded-lg uppercase tracking-wide transition-colors duration-300 mt-10 cursor-pointer">
              VIEW ALL COLLECTIONS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
